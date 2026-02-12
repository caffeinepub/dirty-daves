import { ShieldAlert, Loader2, LogOut } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function AccessDeniedScreen() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <ShieldAlert className="w-20 h-20 text-navy mx-auto mb-4" />
        
        {!isAuthenticated ? (
          <>
            <h1 className="text-3xl font-black text-navy mb-4 text-center">Admin Access Required</h1>
            <p className="text-gray-700 mb-6 font-medium text-center">
              Please log in with Internet Identity to access the admin dashboard.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full px-6 py-3 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-teal/50 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login with Internet Identity'
                )}
              </button>
              <a
                href="/"
                className="block w-full px-6 py-3 bg-teal text-white rounded-2xl font-black hover:bg-teal/90 transition-all shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-4 focus:ring-navy/50"
              >
                Go to Home
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black text-navy mb-4 text-center">Access Denied</h1>
            <p className="text-gray-700 mb-6 font-medium text-center">
              You are logged in, but you don't have admin permissions to access this area.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal/50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <a
                href="/"
                className="block w-full px-6 py-3 bg-teal text-white rounded-2xl font-black hover:bg-teal/90 transition-all shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-4 focus:ring-navy/50"
              >
                Go to Home
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
