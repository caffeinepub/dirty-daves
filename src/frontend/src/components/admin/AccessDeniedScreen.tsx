import { ShieldAlert, Key } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminBootstrapAccess } from '../../hooks/useAdminBootstrapAccess';
import { useState } from 'react';

export default function AccessDeniedScreen() {
  const { login, identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { bootstrapWithCredentials, isBootstrapping, bootstrapError, clearError } = useAdminBootstrapAccess();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCredentialsInput, setShowCredentialsInput] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await bootstrapWithCredentials(username, password);
    if (success) {
      // Clear form on success
      setUsername('');
      setPassword('');
      setShowCredentialsInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <ShieldAlert className="w-20 h-20 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-black text-navy mb-4 text-center">Access Denied</h1>
        
        {!isAuthenticated ? (
          <>
            <p className="text-gray-700 mb-6 font-medium text-center">
              You must be logged in as an administrator to view this page.
            </p>
            <div className="text-center">
              <button
                onClick={login}
                className="px-8 py-4 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
              >
                Login with Internet Identity
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4 font-medium text-center">
              Your Internet Identity principal is not registered as an administrator yet.
            </p>
            <p className="text-gray-600 mb-6 text-sm text-center">
              To gain admin access, you need to enter your admin credentials.
            </p>

            {!showCredentialsInput ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowCredentialsInput(true)}
                  className="w-full px-6 py-3 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal/50 flex items-center justify-center gap-2"
                >
                  <Key className="w-5 h-5" />
                  Enter Admin Credentials
                </button>
                <a
                  href="/"
                  className="block w-full px-6 py-3 bg-teal text-white rounded-2xl font-black hover:bg-teal/90 transition-all shadow-lg hover:shadow-xl text-center focus:outline-none focus:ring-4 focus:ring-navy/50"
                >
                  Go to Home
                </a>
              </div>
            ) : (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label htmlFor="adminUsername" className="block text-sm font-bold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    id="adminUsername"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      clearError();
                    }}
                    placeholder="Enter admin username"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                    disabled={isBootstrapping}
                    autoFocus
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label htmlFor="adminPassword" className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                    disabled={isBootstrapping}
                    autoComplete="current-password"
                  />
                </div>

                {bootstrapError && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-medium">
                    {bootstrapError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isBootstrapping || !username.trim() || !password.trim()}
                    className="flex-1 px-6 py-3 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-teal/50"
                  >
                    {isBootstrapping ? 'Verifying...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCredentialsInput(false);
                      setUsername('');
                      setPassword('');
                      clearError();
                    }}
                    disabled={isBootstrapping}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-black hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-400/50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
