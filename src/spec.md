# Specification

## Summary
**Goal:** Restore a Phone field in the landing page contact form, allowing users to choose a country calling code (shown with a country abbreviation) and enter a phone number, and ensure this data is saved with contact submissions.

**Planned changes:**
- Update `frontend/src/components/landing/ContactForm.tsx` to add a Phone field composed of a country calling code dropdown (labels like “+1 US”) and a phone number text input.
- Add a typed, exported calling-code option list in `frontend/src/content/countryCallingCodes.ts` containing `callingCode`, `countryAbbrev`, and a stable dropdown value; drive the dropdown from this list.
- Extend `frontend/src/hooks/useSubmitContactForm.ts` to include the selected calling code and phone number in the contact form submission payload and types.
- Update `backend/main.mo` to accept, persist, and return phone-related fields on `ContactSubmission` records for both normal and junk submissions, keeping existing anti-bot routing intact.
- Add/update `backend/migration.mo` to migrate existing stored submissions by adding default empty values for the new phone fields on upgrade.
- Update `frontend/SMOKE_TEST_PRODUCTION.md` to include production smoke-test steps verifying the phone field UI (dropdown label format), phone entry, and successful submission including phone data.

**User-visible outcome:** The contact form includes a phone number field with a country calling code dropdown (e.g., “+1 US”); users can select a code, enter a phone number, submit the form successfully, and admins can see saved phone details on submissions.
