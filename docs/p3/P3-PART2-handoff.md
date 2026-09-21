# P3 PART 2 handoff (Theo → Sable + Jax)

**Branch:** `feat/p3-state-selector` (PR #6)
**Verified:** 2026-09-21 CT
**Schema:** Jax AuthorityRow (`confidence`: high|medium|low)

## Files in this pack
- `texas-deep-pack.md` — 6 TX statutes (261.307, 261.303, 261.3027, Penal 16.02, 262.201, 263.401)
- `other-states-recording-consent.md` — 50+DC consent table + interstate/hidden-camera/CPS flags
- `other-states-cps-agency-links.md` — outbound .gov agency URLs (Ohio = NEED_LOOKUP blank)

## Preferred TX short note (recording)
> Texas is generally a one-party-consent state (Penal Code § 16.02). DFPS-related recording rights also appear in Family Code § 261.307. Not legal advice.

## Soften rules (P2 PASS)
- § 261.307 miss: civil inadmissibility — NOT automatic dismissal / NOT blanket criminal bar
- § 261.303: generally refuse without court order — fact-specific; warrant/exigency/order can change events
- Clocks: generally / subject to exceptions

## Jax wiring notes
- Map `medium-high` → `medium` (keep caveat); `low-medium` → `low`
- Skip Ohio agency row until officialUrl confirmed (NEED_LOOKUP)
- Prefer https officialUrls; flag any http:// benchbook secondaries for P4
- Recording rows: kind=`statute`, tags include `recording-consent`, `one-party`|`all-party`|`mixed`
- Agency rows: kind=`agency`, tags `cps-agency`

## Product footnote (other states)
> Recording laws differ by state and by situation. Interstate calls, hidden cameras, and CPS-specific rules may differ from this general map. Not legal advice.
