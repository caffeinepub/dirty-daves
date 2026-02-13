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

**Important**: The first admin must manually claim admin access using one of the methods below.

#### Method 1: Using the "Set Me as Admin" Button (Recommended)

1. Navigate to `/admin` in your browser
2. Click "Login with Internet Identity" and complete authentication
3. After login, you'll see "Access Denied" with a green **"Set Me as Admin"** button
4. Click the button to grant yourself admin access
5. The page will refresh automatically and show the admin dashboard

**If the button fails with "Unauthorized: Only admins can assign user roles":**

This means the bootstrap flag is already set to `true` but no admin was successfully assigned. Use the **Reset Bootstrap** button (see Method 4 below) or follow Method 2 or 3.

#### Method 2: Using dfx Command Line

If you prefer to use the command line or the button doesn't work:

