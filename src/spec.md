# Specification

## Summary
**Goal:** Configure ICP custom domain verification static assets for `dirtydaves.co.uk` and `www.dirtydaves.co.uk`, and update production/deployment documentation to support redeploy verification.

**Planned changes:**
- Add `frontend/public/.well-known/ic-domains` containing exactly two lines: `dirtydaves.co.uk` and `www.dirtydaves.co.uk`.
- Add `frontend/public/.well-known/ii-alternative-origins` containing the exact one-line JSON payload for alternative origins.
- Add `frontend/public/.ic-assets.json` to set content types and disable caching (`max_age: 0`) for both `/.well-known` assets.
- Update `frontend/SMOKE_TEST_PRODUCTION.md` to verify the new `ic-domains` two-line content and add a check for `ii-alternative-origins`.
- Add a short post-deploy checklist note in an existing production/deployment doc with the user-provided DNS records and optional boundary-node registration/status URLs for canister `fd6rd-maaaa-aaaah-atocq-cai`.

**User-visible outcome:** After redeploy, the two `/.well-known` endpoints are publicly accessible with the exact expected content for ICP custom domain verification, and the docs clearly describe how to verify them and complete the remaining manual DNS/boundary-node steps.
