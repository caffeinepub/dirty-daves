# Production Smoke Test Checklist

Run these tests immediately after deploying to production to verify core functionality.

## 1. Landing Page Render

### Test Steps
1. Navigate to `/` (root URL)
2. Open browser DevTools Console (F12)
3. Verify page loads completely
4. Check for backend health check log: `[Backend Health Check] ✅ Backend canister connection successful`
5. Check for build environment log: `[Build Environment] Host: <hostname>, Mode: production, Build: <version>`

### Expected Results
- [ ] Page renders without critical console errors (warnings are acceptable)
- [ ] Backend health check passes and logs success message with hostname
- [ ] Build environment indicator logs current host, mode, and build version
- [ ] Hero section displays with background image
- [ ] "DIRTY DAVES" title is visible
- [ ] Subtitle "Private Tours of Scotland by the S.H.I.T Tour company" is visible
- [ ] 6 offer cards are visible in the features section
- [ ] Reviews section displays with review cards
- [ ] Contact form section is visible
- [ ] Footer displays with social links, attribution, and Build & Environment indicator
- [ ] Build & Environment indicator shows: hostname, production mode, and build timestamp/version

### Common Issues
- Missing background image: Check asset path in `dist/assets/generated/`
- Backend health check fails: Verify backend canister is deployed and accessible; check console for single labeled diagnostic message with hostname
- Build indicator missing: Check footer component and BuildEnvironmentIndicator import
- Console errors: Check for missing dependencies or build issues

---

## 2. Offer Route Navigation & Lazy Loading

### Test Steps
For each offer route, perform the following:

1. Click on an offer card from the landing page
2. Observe the loading state (should show navy-to-teal gradient spinner with "Loading..." text)
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
- [ ] PageLoader fallback (spinning loader with "Loading..." text) appears briefly during initial load
- [ ] Offer page renders with correct title, content, and SEO metadata
- [ ] No critical console errors during navigation
- [ ] Back navigation returns to landing page
- [ ] "Get in Touch" CTA navigates to `/#contact` and scrolls to contact form

### Common Issues
- Blank page: Check that lazy-loaded component exports are correct
- No loading fallback: Verify Suspense wrapper is present in App.tsx
- Navigation fails: Check router configuration

---

## 3. Contact Form Submission

### Test Steps

#### 3A. Form Submission
1. Scroll to contact form section
2. Fill in all required fields (name, email, message)
3. Optionally fill in phone number
4. Wait at least 2 seconds before submitting (to avoid spam detection)
5. Click "Send Message 🚀"

**Expected Results:**
- [ ] Form submits successfully (shows success message with checkmark)
- [ ] Success message: "Thanks! Your message has been sent to Dirty Dave. 🎉"
- [ ] "Send Another Message" button is visible
- [ ] No critical console errors

#### 3B. Phone Field Behavior
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

#### 3C. Form Validation
1. Try submitting empty form
2. Try submitting with invalid email

**Expected Results:**
- [ ] Name field shows error: "Name is required"
- [ ] Email field shows error: "Email is required" or "Please enter a valid email"
- [ ] Message field shows error: "Message is required"
- [ ] Form does NOT submit until all required fields are valid
- [ ] Phone field is optional (form can submit without phone number)

#### 3D. Spam Protection
1. Fill out form and submit immediately (within 1 second)
2. Check console for spam detection log: `[Contact Form] Spam protection triggered`
3. Fill out form normally (wait 2+ seconds) and submit

**Expected Results:**
- [ ] Very fast submissions (< 2 seconds) show user-friendly error: "Please take a moment to fill out the form before submitting."
- [ ] Spam detection logs to console but does NOT show as critical error
- [ ] Normal submissions (> 2 seconds) are accepted
- [ ] Honeypot field (hidden) catches bot submissions

### Common Issues
- Form submits but no success message: Check backend canister is deployed and accessible
- Phone dropdown not showing correct format: Verify countryCallingCodes.ts exports correct label format
- All submissions flagged as spam: Check timing logic in backend
- Network errors: Check browser console for `[Contact Form] Network error` logs

---

## 4. Access Control Verification

### Test Steps

#### 4A. Admin Routes - Unauthenticated Access
1. Navigate to `/admin` (or `/admin/contact` or `/admin/submissions`)
2. Verify you are NOT logged in with Internet Identity

**Expected Results:**
- [ ] AccessDeniedScreen displays with "Admin Access Required" heading
- [ ] "Login with Internet Identity" button is visible
- [ ] "Go to Home" button is visible
- [ ] No critical console errors

#### 4B. Admin Routes - Authenticated Non-Admin User
1. Log in with Internet Identity (use a principal that is NOT an admin)
2. Navigate to `/admin`
3. Wait for admin check to complete

**Expected Results:**
- [ ] Loading screen appears briefly with spinner and "Loading..." text
- [ ] AccessDeniedScreen displays with "Access Denied" heading
- [ ] Message: "You are logged in, but you don't have admin permissions to access this area."
- [ ] "Logout" button is visible
- [ ] "Go to Home" button is visible
- [ ] No critical console errors

#### 4C. Admin Routes - Admin User
1. Log in with Internet Identity as an admin principal
2. Navigate to `/admin` (or `/admin/contact` or `/admin/submissions`)
3. Wait for admin check to complete

**Expected Results:**
- [ ] Loading screen appears briefly
- [ ] ContactSubmissionsAdminPage loads successfully
- [ ] Admin can view all contact submissions
- [ ] Retrieved submissions include phone-related fields (phoneCountryCallingCode, phoneNumber)
- [ ] Backend connectivity diagnostics section shows "Backend: Healthy" with green checkmark
- [ ] Diagnostics section includes explanatory text about draft/live/misconfiguration scenarios
- [ ] No critical console errors

#### 4D. Backend Authorization (Advanced)
If you have direct access to the backend actor in console:

1. As anonymous user, attempt to call admin-only methods:
   ```javascript
   await actor.getAllContactSubmissions();
   ```

**Expected Results:**
- [ ] Backend returns error: "Unauthorized: Only admins can perform this action"
- [ ] Anonymous users CANNOT access admin-only data

### Common Issues
- Access control not working: Verify backend authorization is properly initialized
- Admin cannot access: Check admin principal is correctly assigned in backend
- Loading state never completes: Check useIsAdmin hook and backend isAdmin() method
- Backend diagnostics not showing: Check BuildEnvironmentIndicator component is imported in admin page

---

## 5. Performance & Loading

### Test Steps
1. Open browser DevTools Network tab
2. Reload landing page (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
3. Navigate to an offer page
4. Check network waterfall

### Expected Results
- [ ] Hero background image loads quickly (preloaded)
- [ ] Initial bundle size is reasonable (offer pages are code-split)
- [ ] Lazy-loaded offer pages fetch separate chunks
- [ ] No unnecessary third-party scripts loading
- [ ] Backend health check completes within 2 seconds

---

## 6. Build & Environment Diagnostics

### Test Steps
1. Scroll to footer on landing page
2. Locate the Build & Environment indicator (small text line)
3. Navigate to admin page (if you have access)
4. Check backend connectivity diagnostics section

### Expected Results
- [ ] Footer shows Build & Environment indicator with: hostname, production mode, build version/timestamp
- [ ] Indicator is subtle and non-intrusive (small text, low visual weight)
- [ ] Admin page shows backend connectivity status (Healthy/Unhealthy/Checking)
- [ ] Backend connectivity section includes explanatory label for troubleshooting
- [ ] When backend is healthy, shows green checkmark and "Healthy" status
- [ ] When backend is unhealthy, shows red X and "Unhealthy" status with error message

### Common Issues
- Indicator not showing: Check BuildEnvironmentIndicator component is imported in Footer
- Build version shows "dev" or "unknown": Build-time env vars not set (optional, defaults are OK)
- Backend status always "Checking": Health check hook may be stuck; check console for errors

---

## 7. Custom Domain Verification

### Test Steps
1. Navigate to `https://<your-canister-url>/.well-known/ic-domains` (e.g., `https://fd6rd-maaaa-aaaah-atocq-cai.icp0.io/.well-known/ic-domains`)
2. Navigate to `https://<your-canister-url>/.well-known/ii-alternative-origins`
3. Verify the responses

### Expected Results
- [ ] `/.well-known/ic-domains` returns HTTP 200 status code
- [ ] Response body contains exactly two lines:
  ```
  dirtydaves.co.uk
  www.dirtydaves.co.uk
  ```
- [ ] Content-Type header is `text/plain`
- [ ] No trailing newlines or extra content
- [ ] `/.well-known/ii-alternative-origins` returns HTTP 200 status code
- [ ] Response body contains exactly: `{"alternativeOrigins":["https://dirtydaves.co.uk","https://www.dirtydaves.co.uk"]}`
- [ ] Content-Type header is `application/json`

### Common Issues
- 404 Not Found: Files not deployed; check `frontend/public/.well-known/` directory exists and was included in build
- Wrong content: Verify files contain exact content with no extra lines or spaces
- CORS errors: Should not occur for simple GET requests to same origin
- Wrong number of domains: Verify both apex and www domains are listed

---

## Summary Checklist

- [ ] Landing page renders without critical errors
- [ ] Backend health check passes and logs success with hostname
- [ ] Build & Environment indicator displays in footer with correct info
- [ ] All 6 offer routes load with proper lazy-loading fallback (PageLoader with spinner)
- [ ] Contact form submits successfully
- [ ] Phone field displays with country code dropdown in "+<code> <abbrev>" format
- [ ] Phone field allows user to select country code and enter phone number
- [ ] Form submission includes phone data
- [ ] Spam protection (honeypot + timing) works as expected and logs appropriately
- [ ] Access control prevents unauthorized access to admin routes
- [ ] Admin routes show proper loading states and access denied screens
- [ ] Admin page displays backend connectivity diagnostics
- [ ] Navigation and routing work as expected
- [ ] Custom domain verification files are accessible at `/.well-known/ic-domains` and `/.well-known/ii-alternative-origins`
- [ ] Both verification files return correct content (two domains for ic-domains, JSON for ii-alternative-origins)
- [ ] No critical console errors (warnings and info logs are acceptable)

---

## Post-Deployment Actions

If any tests fail:
1. Check browser console for specific error messages, health check logs, and build environment logs
2. Verify backend canister is deployed and accessible
3. Confirm all assets exist in `dist/assets/generated/`
4. Check network tab for failed requests
5. Review backend canister deployment status with `dfx canister status backend --network ic`
6. Check frontend canister status with `dfx canister status frontend --network ic`
7. Verify the Build & Environment indicator shows the correct hostname (should match canister URL)
8. Check admin diagnostics page for backend connectivity status
9. Test with different browsers (Chrome, Firefox, Safari)
10. Test on mobile devices for responsive behavior
11. Verify custom domain verification files at `/.well-known/ic-domains` and `/.well-known/ii-alternative-origins` return HTTP 200 with correct content

For reference, see:
- **Deployment Guide**: `PRODUCTION_DEPLOYMENT_NOTES.md`
- **Configuration Details**: `PRODUCTION_CONFIGURATION.md`
