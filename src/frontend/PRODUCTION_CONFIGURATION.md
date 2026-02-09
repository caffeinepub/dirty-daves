# Production Configuration - Version 33

## Frontend Environment Variables

### VITE_RECAPTCHA_SITE_KEY

**Purpose:** Google reCAPTCHA v3 site key (public key) for spam protection on the contact form.

**Required:** No (optional, but recommended for production)

**Behavior:**
- **If configured:** Contact form will initialize reCAPTCHA when the contact section becomes visible, validate user interactions, and submit with a reCAPTCHA token.
- **If NOT configured:** Contact form will show a user-friendly error message: "Security verification is not configured. Please contact support." Users will not be able to submit the form.

**How to Set:**
1. Obtain a reCAPTCHA v3 site key from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Set the environment variable before building:
   ```bash
   export VITE_RECAPTCHA_SITE_KEY="your-site-key-here"
   npm run build
   ```
3. Or create a `.env.production` file:
   ```
   VITE_RECAPTCHA_SITE_KEY=your-site-key-here
   ```

**Example:** See `.env.production.example` for reference.

---

## Backend Configuration

### reCAPTCHA Secret Key

**Purpose:** Google reCAPTCHA v3 secret key (private key) for server-side verification of reCAPTCHA tokens.

**Required:** Yes (if frontend reCAPTCHA is configured)

**How to Configure:**

1. **Obtain the secret key** from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) (same project as site key)

2. **Log in as admin** using Internet Identity (the first principal to interact with the backend is automatically assigned admin role)

3. **Call the backend method** to set the secret key:
   ```javascript
   // Using the actor in browser console or admin panel
   await actor.updateRecaptchaSecret("your-secret-key-here");
   ```

4. **(Optional) Adjust minimum score threshold:**
   ```javascript
   // Default is 0.6, adjust as needed (0.0 to 1.0)
   await actor.updateRecaptchaMinScore(0.5);
   ```

**Security Notes:**
- ⚠️ **NEVER** commit the secret key to version control
- ⚠️ **NEVER** expose the secret key in frontend code
- ✅ Store the secret key securely (e.g., password manager, secrets vault)
- ✅ Only admin principals can update the secret key via backend method

---

## Post-Deploy Admin Steps

### Step 1: Verify Deployment
1. Navigate to the production URL
2. Verify landing page loads without errors
3. Check that all routes are accessible

### Step 2: Configure reCAPTCHA (if not already done)

#### Frontend (Build-time)
1. Set `VITE_RECAPTCHA_SITE_KEY` environment variable
2. Rebuild and redeploy frontend

#### Backend (Runtime)
1. Log in with Internet Identity as admin
2. Call `updateRecaptchaSecret("your-secret-key")` via backend actor
3. (Optional) Adjust score threshold with `updateRecaptchaMinScore(0.6)`

### Step 3: Test Contact Form
1. Navigate to `/#contact`
2. Fill out and submit the contact form
3. Verify submission succeeds and shows success message

### Step 4: Verify Access Control
1. Log out (or use incognito mode)
2. Verify anonymous users cannot access admin methods
3. Log in as admin and verify admin methods work

---

## Configuration States

### State 1: No reCAPTCHA (Development/Testing)
- Frontend: `VITE_RECAPTCHA_SITE_KEY` not set
- Backend: Secret key not configured
- **Result:** Contact form shows configuration error, submissions blocked

### State 2: Frontend Only (Incomplete)
- Frontend: `VITE_RECAPTCHA_SITE_KEY` set
- Backend: Secret key NOT configured
- **Result:** Contact form allows submission, but backend cannot verify tokens (submissions may be flagged as spam)

### State 3: Fully Configured (Production)
- Frontend: `VITE_RECAPTCHA_SITE_KEY` set
- Backend: Secret key configured via `updateRecaptchaSecret()`
- **Result:** Contact form fully functional with spam protection

---

## Troubleshooting

### Contact form shows "Security verification is not configured"
- **Cause:** `VITE_RECAPTCHA_SITE_KEY` is not set
- **Fix:** Set the environment variable and rebuild

### Contact form shows "Security verification is not ready"
- **Cause:** reCAPTCHA script failed to load or initialize
- **Fix:** Check network tab for script load errors, verify site key is correct

### reCAPTCHA badge not appearing
- **Cause:** Contact section not visible yet (deferred loading)
- **Fix:** Scroll to contact section and wait 2-3 seconds

### Backend rejects reCAPTCHA token
- **Cause:** Backend secret key not configured or incorrect
- **Fix:** Call `updateRecaptchaSecret()` with correct secret key as admin

---

## Security Best Practices

1. **Rotate keys periodically** - Generate new reCAPTCHA keys every 6-12 months
2. **Monitor submissions** - Use `getAllContactSubmissions()` and `getAllContactSubmissionsJunk()` to review spam detection
3. **Adjust score threshold** - If too many false positives/negatives, tune `updateRecaptchaMinScore()`
4. **Limit admin access** - Only assign admin role to trusted principals
5. **Use HTTPS** - Always deploy to HTTPS domains (required for reCAPTCHA)
