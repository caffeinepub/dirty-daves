# Production Configuration

This document describes the production configuration for the Dirty Daves application, including admin access, security, and deployment settings.

## Admin Access

### Admin Panel Routes
The admin panel for viewing contact form submissions is accessible at:
- **Primary route**: `/admin`
- **Legacy routes**: `/admin/contact` and `/admin/submissions` (both alias to /admin)

All three routes provide the same functionality and access control.

### Access Control System
The application uses **role-based access control (RBAC)** provided by the authorization component:

1. **Internet Identity Authentication**: Users must first log in with Internet Identity
2. **Admin Role Check**: The backend verifies if the authenticated principal has admin permissions
3. **Access Denied Screen**: Unauthorized users see a clear access denied message

### Admin Access Flow
1. User navigates to `/admin`
2. If not authenticated: AccessDeniedScreen shows "Admin Access Required" with login button
3. If authenticated but not admin: AccessDeniedScreen shows "Access Denied" with logout option
4. If authenticated and admin: ContactSubmissionsAdminPage loads successfully

### First-Time Admin Setup
For the first deployment, admin access is initialized automatically:
- The first principal to authenticate is granted admin access
- Subsequent admins must be added by existing admins
- Admin credentials are managed securely by the backend canister

### Security Notes
- Admin permissions are verified on every backend call
- The backend uses the authorization mixin for consistent access control
- Only authenticated principals with admin role can view submissions
- Anonymous principals are treated as guests with no admin access
- Logging out clears all cached data including user profile

## Contact Form

### Spam Protection
The contact form includes built-in spam protection without requiring external services:

1. **Honeypot Field**: Hidden field that bots typically fill out
2. **Timing Check**: Submissions faster than 2 seconds are flagged as suspicious
3. **User-Friendly Error Handling**: Spam detection shows helpful messages, not critical errors

Spam protection is logged to console for debugging:
