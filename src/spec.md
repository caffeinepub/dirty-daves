# Specification

## Summary
**Goal:** Require users to provide a phone number on the landing page contact form, including a selectable country calling code, and store this information with each contact submission.

**Planned changes:**
- Update the contact form UI to add a required country calling code dropdown and a required local phone number input, matching existing form styling and disabled behavior during submission.
- Extend client-side validation to show field-level errors for missing country code or phone number and block submission until fixed, while keeping existing validations intact.
- Update the contact submission payload and backend method signature to accept and persist the country calling code and phone number.
- Extend the backend contact submission model and admin retrieval response to include the new phone fields for each submission.

**User-visible outcome:** The contact form requires selecting a country calling code and entering a phone number before submission, and admins can view the stored phone information with each contact submission.
