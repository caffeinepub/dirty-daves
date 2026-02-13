import { ShieldAlert, Loader2, LogOut, ShieldCheck, RotateCcw, AlertTriangle } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useAdminBootstrapAccess } from '../../hooks/useAdminBootstrapAccess';
import { useAdminResetBootstrap } from '../../hooks/useAdminResetBootstrap';
import { useState } from 'react';

export default function AccessDeniedScreen() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const bootstrapMutation = useAdminBootstrapAccess();
  const resetBootstrapMutation = useAdminResetBootstrap();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

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

  const handleResetBootstrap = async () => {
    try {
      await resetBootstrapMutation.mutateAsync();
      setShowResetSuccess(true);
      setTimeout(() => {
        setShowResetSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to reset bootstrap:', error);
    }
  };

  const handleSetMeAsAdmin = async () => {
    try {
      await bootstrapMutation.mutateAsync();
      setShowSuccess(true);
      // Wait a moment to show success, then the parent component will re-check admin status
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to set admin:', error);
    }
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
            
            {/* Security Warning */}
            <div className="mb-4 p-4 bg-yellow-100 border-2 border-yellow-500 rounded-2xl flex items-start gap-2 text-yellow-900">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="font-bold">Security Notice:</strong> The "Reset Bootstrap" button is a temporary recovery mechanism. After successfully becoming admin, remove or disable the <code className="bg-yellow-200 px-1 rounded">resetBootstrap()</code> method from the backend for security.
              </div>
            </div>
            
            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-2xl flex items-center gap-2 text-green-800 font-bold">
                <ShieldCheck className="w-5 h-5" />
                Admin access granted! Refreshing...
              </div>
            )}
            
            {showResetSuccess && (
              <div className="mb-4 p-4 bg-blue-100 border-2 border-blue-500 rounded-2xl flex items-center gap-2 text-blue-800 font-bold">
                <RotateCcw className="w-5 h-5" />
                Bootstrap flag reset successfully!
              </div>
            )}
            
            {bootstrapMutation.isError && (
              <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-2xl text-red-800 font-medium text-sm">
                <strong>Error:</strong> {bootstrapMutation.error instanceof Error ? bootstrapMutation.error.message : 'Failed to set admin access. Please try again.'}
              </div>
            )}
            
            {resetBootstrapMutation.isError && (
              <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-2xl text-red-800 font-medium text-sm">
                <strong>Reset Error:</strong> {resetBootstrapMutation.error instanceof Error ? resetBootstrapMutation.error.message : 'Failed to reset bootstrap flag. Please try again.'}
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleResetBootstrap}
                disabled={resetBootstrapMutation.isPending || showResetSuccess}
                className="w-full px-6 py-3 bg-yellow-600 text-white rounded-2xl font-black hover:bg-yellow-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-yellow-500/50 flex items-center justify-center gap-2"
              >
                {resetBootstrapMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Resetting...
                  </>
                ) : showResetSuccess ? (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    Reset Complete!
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    Reset Bootstrap
                  </>
                )}
              </button>
              
              <button
                onClick={handleSetMeAsAdmin}
                disabled={bootstrapMutation.isPending || showSuccess}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-500/50 flex items-center justify-center gap-2"
              >
                {bootstrapMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting Admin...
                  </>
                ) : showSuccess ? (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Success!
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Set Me as Admin
                  </>
                )}
              </button>
              
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
