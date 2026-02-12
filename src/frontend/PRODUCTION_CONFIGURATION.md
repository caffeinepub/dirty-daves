# Production Configuration

## Admin Access

### Admin Panel Routes
The admin panel for viewing contact form submissions is accessible at:
- **Primary route**: `/admin/contact`
- **Legacy route**: `/admin/submissions` (alias to /admin/contact)

Both routes provide the same functionality and access control.

### Access Control
Admin access requires two steps:
1. **Internet Identity Authentication**: Users must first log in with Internet Identity
2. **Credential Bootstrap**: After authentication, users must enter admin credentials to gain admin permissions

The credential bootstrap is a one-time process per principal. Once a principal is granted admin access, they can access the admin panel directly after Internet Identity login.

### Security Notes
- Admin credentials are verified by the backend canister
- Credentials are NOT stored in the frontend code or browser
- The backend uses secure credential verification (not plaintext storage)
- Only authenticated principals with admin permissions can view submissions

## Contact Form

### Spam Protection
The contact form includes built-in spam protection without requiring external services:

1. **Honeypot Field**: Hidden field that bots typically fill out
2. **Timing Check**: Submissions faster than 2 seconds are flagged as suspicious
3. **Junk Storage**: Suspicious submissions are stored separately in a junk collection

Legitimate submissions are stored in the main submissions collection and visible in the "Normal Submissions" tab of the admin panel.

### Data Storage
All contact form submissions are permanently stored in the backend canister with the following fields:
- Name
- Email
- Phone (country calling code + number)
- Message
- Timestamp
- Unique ID

## Deployment Checklist

Before deploying to production:

- [ ] Verify admin credentials are configured correctly in the backend
- [ ] Test Internet Identity login flow
- [ ] Test admin credential bootstrap process
- [ ] Verify contact form submissions are saved correctly
- [ ] Test spam protection (honeypot and timing checks)
- [ ] Verify both admin routes work (`/admin/contact` and `/admin/submissions`)
- [ ] Check that unauthorized users see the access denied screen
- [ ] Verify all offer pages load correctly
- [ ] Test mobile responsiveness
- [ ] Verify all assets load correctly (images, fonts)
- [ ] Test navigation between all pages
- [ ] Verify footer attribution and links

## Environment Variables

No environment variables are required for production builds. All configuration is handled through the backend canister.
