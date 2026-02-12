/**
 * BuildEnvironmentIndicator
 * 
 * Displays build and environment metadata for production verification.
 * Shows: hostname, production mode, and build version/timestamp.
 * Gracefully handles missing environment variables with safe defaults.
 */

export default function BuildEnvironmentIndicator() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
  const mode = import.meta.env.MODE || 'development';
  const isProd = import.meta.env.PROD;
  
  // Build metadata with graceful fallbacks
  const buildVersion = import.meta.env.VITE_BUILD_VERSION || 'dev';
  const buildTimestamp = import.meta.env.VITE_BUILD_TIMESTAMP || 'unknown';
  
  // Format timestamp if available
  const formattedTimestamp = buildTimestamp !== 'unknown' 
    ? new Date(buildTimestamp).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    : buildTimestamp;

  // Log to console for debugging
  if (typeof window !== 'undefined') {
    console.log(
      `[Build Environment] Host: ${hostname}, Mode: ${mode}, Build: ${buildVersion} (${formattedTimestamp})`
    );
  }

  return (
    <div className="text-xs text-white/60 font-mono space-y-0.5">
      <div>
        <span className="opacity-70">Host:</span> {hostname}
      </div>
      <div>
        <span className="opacity-70">Mode:</span> {isProd ? 'production' : mode}
      </div>
      <div>
        <span className="opacity-70">Build:</span> {buildVersion}
        {buildTimestamp !== 'unknown' && (
          <span className="ml-2 opacity-60">({formattedTimestamp})</span>
        )}
      </div>
    </div>
  );
}
