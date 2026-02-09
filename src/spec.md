# Specification

## Summary
**Goal:** Update landing page copy by removing specific location-card heading text while preserving the Scotland flag emoji, and replace the footer attribution text.

**Planned changes:**
- In `frontend/src/components/landing/ContactSection.tsx`, remove the location card heading text “Start Your Adventure” and remove any “Location?” text if present, while keeping the Scotland flag emoji (🏴) visible in the heading area.
- In `frontend/src/components/landing/Footer.tsx`, remove the existing “Built with … using caffeine.ai” attribution/link and replace it with exactly: “built by Dave and thats why the website is so shit”.

**User-visible outcome:** The location card no longer shows “Start Your Adventure” or “Location?” (but still shows the Scotland flag emoji), and the footer shows the new attribution sentence instead of the caffeine.ai credit.
