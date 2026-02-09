# Production Smoke Test Checklist - Version 34

Run these tests immediately after deploying to production to verify core functionality.

## 1. Landing Page Render

### Test Steps
1. Navigate to `/` (root URL)
2. Open browser DevTools Console (F12)
3. Verify page loads completely

### Expected Results
- [ ] Page renders without console errors (warnings are acceptable)
- [ ] Hero section displays with background image
- [ ] "DIRTY DAVES" title is visible
- [ ] Subtitle "Private Tours of Scotland by the S.H.I.T Tour company" is visible
- [ ] 6 offer cards are visible in the features section
- [ ] Reviews section displays with review cards
- [ ] Contact form section is visible
- [ ] Footer displays with social links and attribution

### Common Issues
- Missing background image: Check asset path in `public/assets/generated/`
- Console errors: Check for missing dependencies or build issues

---

## 2. Offer Route Navigation & Lazy Loading

### Test Steps
For each offer route, perform the following:

1. Click on an offer card from the landing page
2. Observe the loading state (should show navy-to-teal gradient spinner)
3. Verify the offer page loads completely
4. Check browser DevTools Console for errors
5. Click "Back to Home" or "Get in Touch" CTA
6. Verify navigation works correctly

### Routes to Test
- [ ] `/offers/off-the-beaten-path`
- [ ] `/offers/private-and-personal`
- [ ] `/offers/flexible-as-hell`
- [ ] `/offers/stories-and-banter`
- [ ] `/offers/stay-your-way`
- [ ] `/offers/choose-your-own-adventure`

### Expected Results
- [ ] PageLoader fallback (spinning loader) appears briefly during initial load
- [ ] Offer page renders with correct title, content, and SEO metadata
- [ ] No console errors during navigation
- [ ] Back navigation returns to landing page
- [ ] "Get in Touch" CTA navigates to `/#contact` and scrolls to contact form

### Common Issues
- Blank page: Check that lazy-loaded component exports are correct
- No loading fallback: Verify Suspense wrapper is present in App.tsx
- Navigation fails: Check router configuration

---

## 3. Contact Form Submission

### Test Steps

#### 3A. reCAPTCHA Not Configured (Expected if VITE_RECAPTCHA_SITE_KEY is not set)
1. Scroll to contact form section
2. Fill in all fields (name, email, phone, message)
3. Click "Send Message 🚀"

**Expected Results:**
- [ ] Form shows error: "Security verification is not configured. Please contact support."
- [ ] Form does NOT submit
- [ ] No console errors (reCAPTCHA script should not load)

#### 3B. reCAPTCHA Configured (Expected if VITE_RECAPTCHA_SITE_KEY is set)
1. Scroll to contact form section (reCAPTCHA should initialize when visible)
2. Wait 2-3 seconds for reCAPTCHA to become ready
3. Fill in all fields (name, email, phone, message)
4. Click "Send Message 🚀"

**Expected Results:**
- [ ] reCAPTCHA badge appears in bottom-right corner when form is visible
- [ ] Form submits successfully (shows success message with checkmark)
- [ ] Success message: "Thanks! Your message has been sent to Dirty Dave. 🎉"
- [ ] "Send Another Message" button is visible
- [ ] No console errors

#### 3C. Phone Field Behavior
1. Locate the Phone Number field in the contact form
2. Click on the country code dropdown
3. Select different country codes (e.g., "+1 US", "+44 GB", "+61 AU")
4. Type a phone number in the phone input field

**Expected Results:**
- [ ] Phone field exists with label "Phone Number 📱"
- [ ] Country code dropdown displays labels in format "+<code> <abbrev>" (e.g., "+1 US", "+44 GB")
- [ ] Dropdown does NOT show full country names (e.g., "United States")
- [ ] After selecting a country code, user can type phone number without form preventing entry
- [ ] Phone number input accepts numeric input
- [ ] Form can be submitted with phone data included

#### 3D. Form Validation
1. Try submitting empty form
2. Try submitting with invalid email

**Expected Results:**
- [ ] Name field shows error: "Name is required"
- [ ] Email field shows error: "Email is required" or "Please enter a valid email"
- [ ] Message field shows error: "Message is required"
- [ ] Form does NOT submit until all required fields are valid
- [ ] Phone field is optional (form can submit without phone number)

### Common Issues
- reCAPTCHA not loading: Check VITE_RECAPTCHA_SITE_KEY is set correctly
- reCAPTCHA "not ready" error: Wait longer for initialization, or check network tab for script load failures
- Form submits but no success message: Check backend canister is deployed and accessible
- Phone dropdown not showing correct format: Verify countryCallingCodes.ts exports correct label format

---

## 4. Access Control Verification

### Test Steps

#### 4A. Unauthenticated Access (Anonymous Principal)
1. Open browser DevTools Console
2. Do NOT log in with Internet Identity
3. Attempt to call admin-only backend methods directly (if you have access to the actor):
   ```javascript
   // This should fail with "Unauthorized" error
   await actor.getAllContactSubmissions();
   await actor.getAllContactSubmissionsJunk();
   ```

**Expected Results:**
- [ ] Backend returns error: "Unauthorized: Only admins can view all submissions"
- [ ] Backend returns error: "Unauthorized: Only admins can view all junk submissions"
- [ ] Anonymous users CANNOT access admin-only data

#### 4B. Authenticated Non-Admin User
1. Log in with Internet Identity (if auth is enabled)
2. Verify you are NOT assigned admin role
3. Attempt to call admin-only backend methods

**Expected Results:**
- [ ] Backend returns error: "Unauthorized: Only admins can view all submissions"
- [ ] Non-admin users CANNOT access admin-only data

#### 4C. Admin User (if applicable)
1. Log in with Internet Identity as admin principal
2. Call admin-only backend methods

**Expected Results:**
- [ ] Admin can successfully call `getAllContactSubmissions()`
- [ ] Admin can successfully call `getAllContactSubmissionsJunk()`
- [ ] Admin can update reCAPTCHA configuration
- [ ] Retrieved submissions include phone-related fields (phoneCountryCallingCode, phoneNumber)

### Common Issues
- Access control not working: Verify backend authorization mixin is properly initialized
- Admin cannot access: Check admin principal is correctly assigned in backend

---

## 5. Performance & Loading

### Test Steps
1. Open browser DevTools Network tab
2. Reload landing page
3. Navigate to an offer page
4. Check network waterfall

### Expected Results
- [ ] Hero background image loads quickly (preloaded)
- [ ] Initial bundle size is reasonable (offer pages are code-split)
- [ ] Lazy-loaded offer pages fetch separate chunks
- [ ] reCAPTCHA script loads only when contact section is visible (deferred)

---

## Summary Checklist

- [ ] Landing page renders without errors
- [ ] All 6 offer routes load with proper lazy-loading fallback
- [ ] Contact form behaves correctly based on reCAPTCHA configuration
- [ ] Phone field displays with country code dropdown in "+<code> <abbrev>" format
- [ ] Phone field allows user to select country code and enter phone number
- [ ] Form submission includes phone data
- [ ] Access control prevents unauthorized access to admin methods
- [ ] Navigation and routing work as expected
- [ ] No critical console errors

---

## Post-Deployment Actions

If any tests fail:
1. Check browser console for specific error messages
2. Verify environment variables are set correctly
3. Confirm all assets exist in `dist/assets/generated/`
4. Review backend canister deployment status
5. Check network tab for failed requests

If reCAPTCHA is not configured:
- See `PRODUCTION_CONFIGURATION.md` for setup instructions
