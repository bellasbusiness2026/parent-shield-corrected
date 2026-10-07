# Stripe Checkout integration: status and TODO

Branch `feat/stripe-checkout-test` adds a **test-mode** Stripe Checkout flow for the five
one-time support tiers. Nothing here is deployed, and no live-mode Stripe objects were used or created.

## What was added

- `POST /api/create-checkout-session` in `server.ts`
  - Body: `{ "tier": "together" | "defender" | "protector" | "shield" | "guardian" }`
  - The server maps the tier name to a price ID from env vars (allowlist). The client never sends a price ID or amount.
  - Stripe client is created lazily with `new Stripe(process.env.STRIPE_SECRET_KEY)` (no `apiVersion` argument).
  - Responses: `200 { url }` (redirect to Stripe-hosted Checkout), `400` unknown tier,
    `503` if `STRIPE_SECRET_KEY` or the tier's `STRIPE_PRICE_*` var is missing (the app still starts without them),
    `500` if Stripe returns an error (details only go to the server log).
- Support tab: preset tier "Contribute via Stripe" now calls the endpoint and redirects to Checkout
  (replaces the old `buy.stripe.com` Payment Link `window.open`). Custom amounts keep the old local-pledge behavior.
- `?checkout=success` / `?checkout=cancel` show a short message at the top of the app (Support tab opens);
  on success the pending pledge is added to the community wall and the thank-you modal opens.

## Checkout Session parameters (as fixed by Checkout Studio)

| Param | Value |
| --- | --- |
| `mode` | `payment` (one-time prices; `payment_method_collection` is subscription-only so it is not sent) |
| `line_items` | `[{ price: <tier price ID>, quantity: 1 }]` |
| `billing_address_collection` | `auto` |
| `phone_number_collection` | `{ enabled: false }` |
| `automatic_tax` | `{ enabled: false }` |
| `allow_promotion_codes` | `false` |
| `submit_type` | `auto` |
| `ui_mode` | `hosted_page` (see SDK note below) |
| `integration_identifier` | `hosted_web_0002` |
| `origin_context` | `web` |
| `success_url` | `${APP_URL}/?checkout=success&session_id={CHECKOUT_SESSION_ID}` |
| `cancel_url` | `${APP_URL}/?checkout=cancel` |

**Rejected params:** none. The Stripe API accepted every param above in test mode
(verified 2026-10-07 by creating and retrieving sessions for all five tiers).

## Environment variables to set

All are server-only. Never use a `VITE_` prefix for these, and never commit a `.env` file.

| Var | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Stripe secret or **restricted** key. Test: `rk_test_...`. Live: a separate `rk_live_...` key, set only when Lucy approves going live. |
| `STRIPE_PRICE_TOGETHER` | Together ($2) price ID |
| `STRIPE_PRICE_DEFENDER` | Defender ($15) price ID |
| `STRIPE_PRICE_PROTECTOR` | Protector ($35) price ID |
| `STRIPE_PRICE_SHIELD` | Shield ($75) price ID |
| `STRIPE_PRICE_GUARDIAN` | Guardian ($150) price ID |
| `APP_URL` | Public **https** URL of the deployed app, used to build success/cancel URLs. Falls back to `http://localhost:$PORT` when unset, which is only fine for local testing. |

### Test-mode price IDs (account `acct_1UHVsOAbraVoO00K`, livemode false, one-time USD)

| Tier | Amount | Price ID |
| --- | --- | --- |
| Together | $2 | `price_1UNrCSAbraVoO00KJALoroYy` |
| Defender | $15 | `price_1UNrCUAbraVoO00KfVLzytDL` |
| Protector | $35 | `price_1UNrCWAbraVoO00KV0J1BVy9` |
| Shield | $75 | `price_1UNrCZAbraVoO00K8lMZansB` |
| Guardian | $150 | `price_1UNrCaAbraVoO00KjVI4dDuk` |

### Live-mode price IDs

**Not set up.** Live prices are a separate set of IDs that Lucy approves later. Do not reuse the test IDs in production.
Before going live: create or confirm the live one-time prices, set the five `STRIPE_PRICE_*` vars to the live IDs,
set a live restricted key in `STRIPE_SECRET_KEY`, and set `APP_URL` to the https production URL.

## Restricted key permissions

The key in `STRIPE_SECRET_KEY` can be a restricted key. It needs **Checkout Sessions: Write** permission
(to call `checkout.sessions.create`). Prices are referenced by ID only, so no Products/Prices write permission is needed.

## SDK / `ui_mode` note

- Installed `stripe` npm package: **23.0.0** (pinned as `^23.0.0`). Its default API version is `2026-09-30.endive`; no `apiVersion` is passed.
- `ui_mode: 'hosted_page'` is used because the SDK is >= 21.0.0. On an older SDK (< 21.0.0) the equivalent value is `'hosted'`.
  If you ever downgrade the SDK, change this value.

## Not built yet

- **Webhook** (`checkout.session.completed`): not built. The success page message and community-wall pledge are client-side
  only and are **not** proof of payment. If fulfillment, receipts, or accurate totals are ever needed, add a webhook endpoint
  that verifies the Stripe signature (`STRIPE_WEBHOOK_SECRET`) and records completed sessions.
- No auth, middleware, or database changes were made.
- Monthly / subscription giving is not wired to Stripe; preset tiers are charged once, even if "Monthly Sustainer" is selected
  (the button says "(one-time)").
- `STRIPE_PAYMENT_LINKS` (the live `buy.stripe.com` links) is still exported from `src/components/support/supportData.ts`
  but is no longer used by the Support tab on this branch.
