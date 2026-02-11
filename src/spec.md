# Specification

## Summary
**Goal:** Persist website contact form submissions in the backend and provide an in-app admin page to view both valid and junk/spam submissions.

**Planned changes:**
- Update the contact form flow so submissions are sent to the backend, persisted as ContactSubmission records (name, email, phone with calling code + number, message, timestamp), and return success so the existing success UI is shown.
- Implement server-side spam handling for contact submissions using the provided reCAPTCHA token (when a secret is configured), plus existing honeypot/elapsed-time checks; store low-confidence/invalid items in a separate junk submissions collection while still returning an id.
- Add a new admin-only route/page in the React app that lists normal and junk contact submissions, supports viewing full message details, and includes a manual refresh that refetches via React Query.
- Ensure unauthorized access to the admin page/queries shows a clear English access-denied message without crashing.

**User-visible outcome:** Visitors can submit the contact form and see the existing success state; admins can open an in-app admin page to review contact messages (including junk/spam), view full details, and refresh the list on demand.
