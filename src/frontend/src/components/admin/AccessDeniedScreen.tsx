import { ShieldAlert } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function AccessDeniedScreen() {
  const { login, identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <ShieldAlert className="w-20 h-20 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-black text-navy mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6 font-medium">
          {isAuthenticated
            ? 'You do not have permission to view this page. Only administrators can access the admin panel.'
            : 'You must be logged in as an administrator to view this page.'}
        </p>
        {!isAuthenticated && (
          <button
            onClick={login}
            className="px-8 py-4 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
          >
            Login
          </button>
        )}
        {isAuthenticated && (
          <a
            href="/"
            className="inline-block px-8 py-4 bg-teal text-white rounded-2xl font-black hover:bg-teal/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-navy/50"
          >
            Go to Home
          </a>
        )}
      </div>
    </div>
  );
}
