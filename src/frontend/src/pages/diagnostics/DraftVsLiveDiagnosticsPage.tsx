import { useBackendHealthCheck } from '../../hooks/useBackendHealthCheck';
import { CheckCircle2, XCircle, Clock, Server, Globe, Code, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

/**
 * Public diagnostics page for verifying draft vs live deployment status.
 * Shows environment metadata, backend health, and canister identity info
 * with clear guidance on interpreting mismatches.
 */
export default function DraftVsLiveDiagnosticsPage() {
  const {
    healthStatus,
    error,
    isHealthy,
    isChecking,
    backendCanisterId,
    backendServerTimestamp,
    deploymentInfoError,
  } = useBackendHealthCheck();

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
  const mode = import.meta.env.MODE || 'development';
  const isProd = import.meta.env.PROD;
  const buildVersion = import.meta.env.VITE_BUILD_VERSION || 'dev';
  const buildTimestamp = import.meta.env.VITE_BUILD_TIMESTAMP || 'unknown';

  const formattedBuildTimestamp = buildTimestamp !== 'unknown'
    ? new Date(buildTimestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : 'Not available';

  const formattedServerTimestamp = backendServerTimestamp
    ? new Date(Number(backendServerTimestamp / 1_000_000n)).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      })
    : 'Not available';

  // Determine if this looks like a live domain
  const isLiveDomain = hostname.includes('.caffeine.') || (!hostname.includes('localhost') && !hostname.includes('127.0.0.1'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Draft vs Live Diagnostics</h1>
              <p className="text-white/80 mt-1 font-medium">
                Verify deployment status and troubleshoot publish issues
              </p>
            </div>
            <Link
              to="/"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Frontend Environment Info */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Frontend Environment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Hostname</label>
              <p className="text-white text-lg font-mono mt-1">{hostname}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Build Mode</label>
              <p className="text-white text-lg font-mono mt-1">
                {isProd ? '🟢 Production' : `🟡 ${mode}`}
              </p>
            </div>
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Build Version</label>
              <p className="text-white text-lg font-mono mt-1">{buildVersion}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Build Timestamp</label>
              <p className="text-white text-lg font-mono mt-1">{formattedBuildTimestamp}</p>
            </div>
          </div>
        </section>

        {/* Backend Health & Identity */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Server className="w-6 h-6" />
            Backend Health & Identity
          </h2>
          
          {/* Health Status */}
          <div className="mb-6">
            <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Connection Status</label>
            <div className="flex items-center gap-3 mt-2">
              {isChecking && (
                <>
                  <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />
                  <span className="text-yellow-500 text-lg font-bold">Checking...</span>
                </>
              )}
              {!isChecking && isHealthy && (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-green-500 text-lg font-bold">Healthy</span>
                </>
              )}
              {!isChecking && !isHealthy && (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-500 text-lg font-bold">Unhealthy</span>
                </>
              )}
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm font-mono">{error}</p>
              </div>
            )}
          </div>

          {/* Backend Identity Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Backend Canister ID</label>
              <p className="text-white text-lg font-mono mt-1 break-all">
                {backendCanisterId || 'Not available'}
              </p>
            </div>
            <div>
              <label className="text-sm font-bold text-white/70 uppercase tracking-wider">Backend Server Time</label>
              <p className="text-white text-lg font-mono mt-1">{formattedServerTimestamp}</p>
            </div>
          </div>

          {deploymentInfoError && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> Deployment info unavailable: {deploymentInfoError}
              </p>
            </div>
          )}
        </section>

        {/* Interpretation Guide */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            How to Interpret This Data
          </h2>
          <div className="space-y-4 text-white/90">
            <div>
              <h3 className="font-bold text-white mb-2">✅ Healthy Deployment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Connection status shows "Healthy"</li>
                <li>Backend canister ID is displayed</li>
                <li>Build mode matches your expectation (production for live, development for draft)</li>
                <li>Build timestamp is recent</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">⚠️ Draft vs Live Mismatch</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>
                  <strong>If hostname is a live domain</strong> (e.g., yourapp.caffeine.xyz) <strong>but backend canister ID differs from expected:</strong>
                  <br />
                  → The frontend may be published but pointing to the wrong backend canister
                  <br />
                  → Check canister binding configuration in your deployment settings
                </li>
                <li>
                  <strong>If build mode shows "development" on a live domain:</strong>
                  <br />
                  → The draft version may not have been properly published to production
                  <br />
                  → Verify the publish/deploy process completed successfully
                </li>
                <li>
                  <strong>If build timestamp is old:</strong>
                  <br />
                  → The live site may be serving a cached or outdated version
                  <br />
                  → Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or clear browser cache
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">❌ Backend Connection Issues</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>
                  <strong>If connection status shows "Unhealthy":</strong>
                  <br />
                  → Backend canister may not be deployed or is unreachable
                  <br />
                  → Check network connectivity and canister status
                  <br />
                  → Verify the backend canister is running on the Internet Computer
                </li>
                <li>
                  <strong>If backend canister ID shows "Not available":</strong>
                  <br />
                  → The actor may not be initialized properly
                  <br />
                  → Check browser console for initialization errors
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Troubleshooting Steps
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-white/90">
            <li className="font-semibold">
              Check if you're viewing the correct environment
              <p className="text-sm text-white/70 ml-6 mt-1">
                Draft URLs typically contain "draft" or use localhost. Live URLs use your production domain.
              </p>
            </li>
            <li className="font-semibold">
              Verify both frontend and backend are deployed
              <p className="text-sm text-white/70 ml-6 mt-1">
                A healthy connection requires both to be published. Check your deployment logs.
              </p>
            </li>
            <li className="font-semibold">
              Confirm canister binding matches your environment
              <p className="text-sm text-white/70 ml-6 mt-1">
                The backend canister ID should match what you expect for this environment (draft vs live).
              </p>
            </li>
            <li className="font-semibold">
              Try a hard refresh to clear cached assets
              <p className="text-sm text-white/70 ml-6 mt-1">
                Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac) to force reload.
              </p>
            </li>
            <li className="font-semibold">
              Check browser console for detailed error messages
              <p className="text-sm text-white/70 ml-6 mt-1">
                Open DevTools (F12) and look for red errors in the Console tab.
              </p>
            </li>
          </ol>
        </section>

        {/* Environment Detection */}
        {isLiveDomain && !isProd && (
          <section className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-black text-white mb-2">⚠️ Potential Mismatch Detected</h3>
                <p className="text-white/90">
                  Your hostname appears to be a live domain (<strong>{hostname}</strong>), but the build mode is <strong>{mode}</strong> instead of production.
                  This suggests the draft version may not have been properly published to the live environment.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
