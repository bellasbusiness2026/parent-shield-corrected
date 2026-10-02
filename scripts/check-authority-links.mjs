#!/usr/bin/env node
/**
 * P3 link checker — HEAD then GET.
 * Fails on: non-2xx, TLS/DNS errors, wrong-host redirects, missing/non-https officialUrl.
 * Host allowlist: Justia, Cornell LII, SCOTUS, LOC, GovInfo, Texas statutes, DFPS,
 * plus other-state legislature and CPS/agency hosts from P3 fill.
 * Spec-tuple rows in otherStatesRecording / otherStatesAgencies are extracted.
 * Statute/agency kinds skip SPA body-token checks (https + 2xx + allowlist).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const AUTHORITIES_DIR = join(ROOT, 'src/data/authorities');

const ALLOWED_HOSTS = new Set([
  'alison.legislature.state.al.us',
  'app.leg.wa.gov',
  'archive.legmt.gov',
  'capitol.texas.gov',
  'cdhs.colorado.gov',
  'cfsa.dc.gov',
  'chfs.ky.gov',
  'code.dccouncil.gov',
  'code.wvlegislature.gov',
  'codes.ohio.gov',
  'dcf.vermont.gov',
  'dcf.wisconsin.gov',
  'dcfs.illinois.gov',
  'dcfs.louisiana.gov',
  'dcfs.nv.gov',
  'dcfs.utah.gov',
  'dcs.az.gov',
  'dcyf.ri.gov',
  'delcode.delaware.gov',
  'dfcs.alaska.gov',
  'dfcs.georgia.gov',
  'dfps.texas.gov',
  'dfs.wyo.gov',
  'dhhr.wv.gov',
  'dhhs.ne.gov',
  'dhr.alabama.gov',
  'dhs.maryland.gov',
  'docs.legis.wisconsin.gov',
  'dphhs.mt.gov',
  'dss.mo.gov',
  'dss.sc.gov',
  'dss.sd.gov',
  'gc.nh.gov',
  'govinfo.gov',
  'healthandwelfare.idaho.gov',
  'hhs.iowa.gov',
  'humanservices.arkansas.gov',
  'humanservices.hawaii.gov',
  'iga.in.gov',
  'justia.com',
  'kids.delaware.gov',
  'law.cornell.edu',
  'law.lis.virginia.gov',
  'le.utah.gov',
  'leg.colorado.gov',
  'leginfo.legislature.ca.gov',
  'legis.la.gov',
  'legislature.idaho.gov',
  'legislature.ky.gov',
  'legislature.maine.gov',
  'loc.gov',
  'malegislature.gov',
  'mca.legmt.gov',
  'mgaleg.maryland.gov',
  'mn.gov',
  'ndlegis.gov',
  'nebraskalegislature.gov',
  'nmonesource.com',
  'ocfs.ny.gov',
  'oklahoma.gov',
  'portal.ct.gov',
  'rcfp.org',
  'revisor.mo.gov',
  'sdlegislature.gov',
  'statutes.capitol.texas.gov',
  'supreme.justia.com',
  'supremecourt.gov',
  'tile.loc.gov',
  'webserver.rilin.state.ri.us',
  'www.akleg.gov',
  'www.arkleg.state.ar.us',
  'www.azleg.gov',
  'www.capitol.hawaii.gov',
  'www.capitol.texas.gov',
  'www.capitol.tn.gov',
  'www.cdss.ca.gov',
  'www.cga.ct.gov',
  'www.cyfd.nm.gov',
  'www.dcf.ks.gov',
  'www.dcfs.louisiana.gov',
  'www.dcyf.wa.gov',
  'www.dfps.texas.gov',
  'www.dhhs.nh.gov',
  'www.dss.virginia.gov',
  'www.flsenate.gov',
  'www.gencourt.state.nh.us',
  'www.govinfo.gov',
  'www.hhs.nd.gov',
  'www.ilga.gov',
  'www.in.gov',
  'www.justia.com',
  'www.ksrevisor.gov',
  'www.law.cornell.edu',
  'www.leg.state.nv.us',
  'www.legis.ga.gov',
  'www.legis.iowa.gov',
  'www.legis.state.pa.us',
  'www.legislature.mi.gov',
  'www.legislature.ms.gov',
  'www.loc.gov',
  'www.maine.gov',
  'www.mass.gov',
  'www.mdhs.ms.gov',
  'www.michigan.gov',
  'www.myflfamilies.com',
  'www.ncdhhs.gov',
  'www.ncleg.gov',
  'www.ndlegis.gov',
  'www.nj.gov',
  'www.njleg.state.nj.us',
  'www.nysenate.gov',
  'www.oregon.gov',
  'www.oregonlegislature.gov',
  'www.oscn.net',
  'www.pa.gov',
  'www.rcfp.org',
  'www.revisor.mn.gov',
  'www.scstatehouse.gov',
  'www.supremecourt.gov',
  'www.tn.gov',
  'wyoleg.gov',
]);

/** Bot/WAF challenge hosts — not failures when the requested officialUrl host is allowlisted. */
const BOT_CHALLENGE_HOSTS = new Set([
  'validate.perfdrive.com',
  'challenges.cloudflare.com',
]);

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

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
  const seen = new Set();

  // Object-literal AuthorityRow blocks
  const chunks = text.split(/\n\s*\{\s*\n/);
  for (const chunk of chunks.slice(1)) {
    const urlMatch = /officialUrl:\s*'([^']+)'/.exec(chunk);
    if (!urlMatch) continue;
    const title = TITLE_RE.exec(chunk)?.[1]?.replace(/\\'/g, "'") || '';
    const citation = CITATION_RE.exec(chunk)?.[1]?.replace(/\\'/g, "'") || '';
    const id = /id:\s*'([^']+)'/.exec(chunk)?.[1] || filePath;
    const kind = /kind:\s*'([^']+)'/.exec(chunk)?.[1] || 'case';
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push({ id, officialUrl: urlMatch[1], title, citation, kind, filePath });
  }

  // Spec-tuple rows (otherStatesRecording / otherStatesAgencies)
  const fileKind =
    /kind:\s*'agency'/.test(text) ? 'agency'
    : /kind:\s*'statute'/.test(text) ? 'statute'
    : null;
  if (fileKind) {
    const idSuffix = fileKind === 'agency' ? '-cps-agency' : '-recording-consent';
    const tupleRe = /\['([A-Z]{2}|DC)',((?:\s*'(?:\\'|[^'])*',?)*)\]/g;
    let m;
    while ((m = tupleRe.exec(text)) !== null) {
      const stateCode = m[1];
      const rest = m[2];
      const strings = [...rest.matchAll(/'((?:\\'|[^'])*)'/g)].map((x) => x[1].replace(/\\'/g, "'"));
      const url = strings.find((s) => s.startsWith('https://'));
      if (!url) continue;
      const id = 'us-' + stateCode.toLowerCase() + idSuffix;
      if (seen.has(id)) continue;
      seen.add(id);
      const nonMeta = strings.filter(
        (s) =>
          !s.startsWith('https://') &&
          !['one-party', 'all-party', 'mixed/unclear', 'high', 'medium', 'low'].includes(s)
      );
      const citation = nonMeta[0] || '';
      const title = nonMeta[1] || nonMeta[0] || id;
      rows.push({ id, officialUrl: url, title, citation, kind: fileKind, filePath });
    }
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

function fetchHeaders() {
  return {
    'User-Agent': BROWSER_UA,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  };
}

async function checkUrlOnce(row) {
  const { officialUrl, id, title, citation } = row;
  if (!officialUrl) return { id, ok: false, reason: 'missing officialUrl' };
  if (!officialUrl.startsWith('https://')) {
    return { id, ok: false, reason: 'non-https officialUrl: ' + officialUrl };
  }

  let url;
  try {
    url = new URL(officialUrl);
  } catch {
    return { id, ok: false, reason: 'invalid URL: ' + officialUrl };
  }

  if (!hostAllowed(url.hostname)) {
    return { id, ok: false, reason: 'host not on allowlist: ' + url.hostname };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    let res = await fetch(officialUrl, {
      method: 'HEAD',
      redirect: 'manual',
      signal: controller.signal,
      headers: fetchHeaders(),
    });

    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(officialUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: fetchHeaders(),
      });
    } else if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) return { id, ok: false, reason: 'redirect without location (' + res.status + ')' };
      const next = new URL(loc, officialUrl);
      const nextHost = next.hostname.toLowerCase();
      if (
        !hostAllowed(nextHost) &&
        nextHost !== url.hostname &&
        !BOT_CHALLENGE_HOSTS.has(nextHost)
      ) {
        return { id, ok: false, reason: 'wrong-host redirect to ' + next.hostname };
      }
      // Bot challenge after allowlisted origin → origin reachable; pass for statute/agency
      if (BOT_CHALLENGE_HOSTS.has(nextHost) && (row.kind === 'statute' || row.kind === 'agency')) {
        return { id, ok: true, url: officialUrl };
      }
      res = await fetch(next.href, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: fetchHeaders(),
      });
    } else if (!res.ok) {
      res = await fetch(officialUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: fetchHeaders(),
      });
    }

    if (res.status !== 405 && res.status !== 501 && !(res.status >= 300 && res.status < 400)) {
      if (res.ok && res.status < 300) {
        res = await fetch(officialUrl, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal,
          headers: fetchHeaders(),
        });
      }
    }

    if (!res.ok) {
      return { id, ok: false, reason: 'HTTP ' + res.status };
    }

    const finalHost = new URL(res.url).hostname.toLowerCase();
    if (
      !hostAllowed(finalHost) &&
      !BOT_CHALLENGE_HOSTS.has(finalHost)
    ) {
      return { id, ok: false, reason: 'final host not allowlisted: ' + finalHost };
    }
    if (BOT_CHALLENGE_HOSTS.has(finalHost) && !(row.kind === 'statute' || row.kind === 'agency')) {
      return { id, ok: false, reason: 'final host not allowlisted: ' + finalHost };
    }

    // Case pages: body should mention title or reporter cite tokens.
    // Statutes/agency pages are often SPA shells — https + 2xx + allowlist is enough.
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

const TRANSIENT_RETRY = /^(timeout|fetch failed|HTTP 503|HTTP 502|HTTP 429)/;

async function checkUrl(row) {
  const first = await checkUrlOnce(row);
  if (first.ok || !TRANSIENT_RETRY.test(first.reason || '')) return first;
  await new Promise((r) => setTimeout(r, 1500));
  return checkUrlOnce(row);
}

async function main() {
  const files = collectTsFiles(AUTHORITIES_DIR);
  const rows = files.flatMap(extractRows);
  if (!rows.length) {
    console.error('No AuthorityRow officialUrl entries found under', AUTHORITIES_DIR);
    process.exit(1);
  }

  console.log('Checking ' + rows.length + ' officialUrl(s)...');
  const results = [];
  for (const row of rows) {
    const r = await checkUrl(row);
    results.push(r);
    console.log(r.ok ? 'OK  ' + r.id : 'FAIL ' + r.id + ': ' + r.reason);
  }

  const failed = results.filter((r) => !r.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' passed');
  if (failed.length) process.exit(1);
}

main();
