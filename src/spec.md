# Specification

## Summary
**Goal:** Persist contact form submissions in stable canister storage and add a protected admin-only messages page to view them.

**Planned changes:**
- Update the backend contact submission flow to save every successful (non-junk) contact form submission to stable storage with: name, email, phoneCountryCallingCode, phoneNumber, message, and timestamp.
- Add admin bootstrapping via `bootstrapAdminWithCredentials(username, password)` that grants admin permissions to the authenticated caller only when credentials match, without storing plaintext passwords in canister state.
- Ensure admin-only backend endpoints exist for retrieving saved submissions (normal and junk), sorted by timestamp, and return authorization errors for non-admin callers.
- Create a private admin-only frontend route (choose one: `/admin/contact` or `/dashboard/messages`) that requires Internet Identity login and admin permission, and supports credential bootstrap when authenticated but not yet an admin.
- Keep `/admin/submissions` working by redirecting or aliasing it to the new admin messages route with identical access control.

**User-visible outcome:** Contact form messages are retained across canister upgrades, and an authenticated Internet Identity admin can bootstrap access and view all saved submissions (including junk) on a protected admin messages page; existing `/admin/submissions` links still work.
