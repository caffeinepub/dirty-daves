import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import ContactSubmissionsAdminPage from './ContactSubmissionsAdminPage';
import AccessDeniedScreen from '../../components/admin/AccessDeniedScreen';
import { Loader2 } from 'lucide-react';

/**
 * Admin entry page that shows login when not authenticated,
 * the submissions page when authenticated as admin,
 * or access denied for authenticated non-admins.
 * Uses role-based access control from the authorization component.
 */
export default function AdminEntryPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading, isFetched, error } = useIsAdmin();

  const isAuthenticated = !!identity;

  // Show loading while initializing or checking admin status
  if (isInitializing || (isAuthenticated && (isAdminLoading || !isFetched))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy to-teal flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  // Log admin check errors for debugging (non-blocking)
  if (error) {
    console.error('[Admin Entry] Error checking admin status:', error);
  }

  // Show access denied if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <AccessDeniedScreen />;
  }

  return <ContactSubmissionsAdminPage />;
}
