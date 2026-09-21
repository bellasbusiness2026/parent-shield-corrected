#!/usr/bin/env node
/**
 * P3 link checker — HEAD then GET.
 * Fails on: non-2xx, TLS/DNS errors, wrong-host redirects, missing/non-https officialUrl.
 * Host allowlist: Justia, Cornell LII, SCOTUS, LOC, GovInfo, Texas statutes, DFPS.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const AUTHORITIES_DIR = join(ROOT, 'src/data/authorities');

const ALLOWED_HOSTS = new Set([
  'supreme.justia.com',
  'www.justia.com',
  'justia.com',
  'www.law.cornell.edu',
  'law.cornell.edu',
  'www.supremecourt.gov',
  'supremecourt.gov',
  'www.loc.gov',
  'loc.gov',
  'www.govinfo.gov',
  'govinfo.gov',
  'statutes.capitol.texas.gov',
  'www.dfps.texas.gov',
  'dfps.texas.gov',
  'capitol.texas.gov',
  'www.capitol.texas.gov',
  'www.rcfp.org',
  'rcfp.org',
  'tile.loc.gov',
]);

const URL_RE = /officialUrl:\s*'([^']+)'/g;
const TITLE_RE = /title:\s*'((?:\\'|[^'])*)'/;
const CITATION_RE = /citation:\s*'((?:\\'|[^'])*)'/;

function collectTsFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...collectTsFiles(p));
    else if (name.endsWith('.ts') && name !== 'index.ts') out.push(p);
  }
  return out;
}

function extractRows(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const rows = [];
  // Split roughly on object starts after array export
  const chunks = text.split(/\n\s*\{\s*\n/);
  for (const chunk of chunks.slice(1)) {
    const urlMatch = /officialUrl:\s*'([^']+)'/.exec(chunk);
    if (!urlMatch) continue;
    const title = TITLE_RE.exec(chunk)?.[1]?.replace(/\\'/g, "'") || '';
    const citation = CITATION_RE.exec(chunk)?.[1]?.replace(/\\'/g, "'") || '';
    const id = /id:\s*'([^']+)'/.exec(chunk)?.[1] || filePath;
    const kind = /kind:\s*'([^']+)'/.exec(chunk)?.[1] || 'case';
    rows.push({ id, officialUrl: urlMatch[1], title, citation, kind, filePath });
  }
  return rows;
}

function hostAllowed(hostname) {
  const h = hostname.toLowerCase();
  if (ALLOWED_HOSTS.has(h)) return true;
  for (const allowed of ALLOWED_HOSTS) {
    if (h.endsWith('.' + allowed)) return true;
  }
  return false;
}

async function checkUrl(row) {
  const { officialUrl, id, title, citation } = row;
  if (!officialUrl) return { id, ok: false, reason: 'missing officialUrl' };
  if (!officialUrl.startsWith('https://')) {
    return { id, ok: false, reason: `non-https officialUrl: ${officialUrl}` };
  }

  let url;
  try {
    url = new URL(officialUrl);
  } catch {
    return { id, ok: false, reason: `invalid URL: ${officialUrl}` };
  }

  if (!hostAllowed(url.hostname)) {
    return { id, ok: false, reason: `host not on allowlist: ${url.hostname}` };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    let res = await fetch(officialUrl, {
      method: 'HEAD',
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'User-Agent': 'ParentShield-authority-link-check/1.0' },
    });

    // Some hosts reject HEAD — fall through to GET
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(officialUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'ParentShield-authority-link-check/1.0' },
      });
    } else if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) return { id, ok: false, reason: `redirect without location (${res.status})` };
      const next = new URL(loc, officialUrl);
      if (!hostAllowed(next.hostname) && next.hostname !== url.hostname) {
        return { id, ok: false, reason: `wrong-host redirect to ${next.hostname}` };
      }
      res = await fetch(next.href, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'ParentShield-authority-link-check/1.0' },
      });
    } else if (!res.ok) {
      // Retry GET on other non-OK HEAD
      res = await fetch(officialUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'ParentShield-authority-link-check/1.0' },
      });
    }

    // Always GET for final status + body (HEAD may be empty even on 200)
    if (res.status !== 405 && res.status !== 501 && !(res.status >= 300 && res.status < 400)) {
      if (res.ok && res.status < 300) {
        res = await fetch(officialUrl, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal,
          headers: { 'User-Agent': 'ParentShield-authority-link-check/1.0' },
        });
      }
    }

    if (!res.ok) {
      return { id, ok: false, reason: `HTTP ${res.status}` };
    }

    const finalHost = new URL(res.url).hostname;
    if (!hostAllowed(finalHost)) {
      return { id, ok: false, reason: `final host not allowlisted: ${finalHost}` };
    }

    // Case pages: body should mention title or reporter cite tokens.
    // Statutes/agency pages are often SPA shells (e.g. statutes.capitol.texas.gov)
    // — https + 2xx + allowlist is enough.
    if (row.kind === 'case' || !row.kind) {
      const body = await res.text();
      const tokens = [];
      if (title) tokens.push(...title.split(/\s+/).filter((t) => t.length > 4).slice(0, 3));
      const citeBits = citation.match(/\d+\s+U\.S\.\s+\d+/);
      if (citeBits) tokens.push(citeBits[0]);
      const nameBits = citation.match(/^([^,]+)/);
      if (nameBits) tokens.push(nameBits[1].trim());
      const lower = body.toLowerCase();
      const hit = tokens.some((t) => t && lower.includes(String(t).toLowerCase()));
      if (tokens.length && !hit) {
        return { id, ok: false, reason: 'page body missing title/citation tokens' };
      }
    }

    return { id, ok: true, url: officialUrl };
  } catch (err) {
    return { id, ok: false, reason: err.name === 'AbortError' ? 'timeout' : String(err.message || err) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const files = collectTsFiles(AUTHORITIES_DIR);
  const rows = files.flatMap(extractRows);
  if (!rows.length) {
    console.error('No AuthorityRow officialUrl entries found under', AUTHORITIES_DIR);
    process.exit(1);
  }

  console.log(`Checking ${rows.length} officialUrl(s)...`);
  const results = [];
  for (const row of rows) {
    const r = await checkUrl(row);
    results.push(r);
    console.log(r.ok ? `OK  ${r.id}` : `FAIL ${r.id}: ${r.reason}`);
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  if (failed.length) process.exit(1);
}

main();
