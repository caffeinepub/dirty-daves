# Specification

## Summary
**Goal:** Provide a temporary admin bootstrap recovery mechanism so an authenticated user can reset the bootstrap flag and successfully self-assign admin again.

**Planned changes:**
- Backend: Add a temporary `public shared func resetBootstrap() : async ()` in `backend/main.mo` that sets `firstAdminBootstrapped := false`, placed immediately after the `firstAdminBootstrapped` variable declaration and before `setMeAsAdmin()`, and ensure it is exposed via Candid.
- Frontend: On `/admin` when an authenticated non-admin user sees the access denied screen, add a temporary **Reset Bootstrap** button that calls `actor.resetBootstrap()`, displays success/failure, and leaves the existing **Set Me as Admin** button available to call `setMeAsAdmin()` right after.
- Frontend: Add an explicit English security warning on the authenticated access-denied UI stating `resetBootstrap()` is temporary and must be removed/disabled after admin is bootstrapped.
- Docs: Update `frontend/PRODUCTION_CONFIGURATION.md` with copy/paste-ready Candid UI URL pattern using `?id=<BACKEND_CANISTER_ID>`, steps to find the backend canister id from the app’s Diagnostics page, and instructions to call `resetBootstrap()` first then `setMeAsAdmin()` in the same Candid UI.
- Deployment: Redeploy backend and frontend so the live environment includes the new method and updated `/admin` UI.

**User-visible outcome:** An authenticated non-admin user can go to `/admin`, click **Reset Bootstrap**, then click **Set Me as Admin** to regain admin access (and access the submissions page), with a visible warning that the reset path is temporary; admins also have documented steps to perform the same calls via the Candid UI.
