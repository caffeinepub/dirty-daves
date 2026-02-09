# Specification

## Summary
**Goal:** Deploy the current app draft (Version 33) to production on the Internet Computer and confirm it works via a focused production smoke test.

**Planned changes:**
- Deploy/upgrade the backend canister (single-actor Motoko canister) using the current Version 33 code, preserving existing stable data.
- Deploy/upgrade the frontend asset canister for Version 33 and verify production routing renders for `/` and all `/offers/*` pages.
- Run a post-deploy production smoke test covering landing page render (no console errors), offer-page navigation with lazy-loading fallback, contact form submission path (including reCAPTCHA readiness/error handling), and access control for admin-only backend query methods.
- Verify production configuration needed for this version (including reCAPTCHA settings) and add a short deployment note documenting whether it’s configured and any required post-deploy admin step (e.g., setting the reCAPTCHA secret via the existing admin method).

**User-visible outcome:** The Version 33 app is live in production; users can load the landing page and offer pages, submit the contact form (or see the existing configured reCAPTCHA error state), and admin-only backend queries remain inaccessible to unauthenticated callers.
