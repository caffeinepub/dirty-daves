import { useState } from 'react';
import { useGetAllContactSubmissions } from '../../hooks/useAdminContactSubmissions';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useBackendHealthCheck } from '../../hooks/useBackendHealthCheck';
import { useQueryClient } from '@tanstack/react-query';
import AccessDeniedScreen from '../../components/admin/AccessDeniedScreen';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { Loader2, RefreshCw, Mail, Phone, User, Calendar, MessageSquare, X, LogOut, CheckCircle2, XCircle, Clock, AlertTriangle, Server } from 'lucide-react';
import type { ContactSubmission } from '../../backend';

export default function ContactSubmissionsAdminPage() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const {
    healthStatus,
    error: healthError,
    isHealthy,
    isChecking,
    backendCanisterId,
    backendServerTimestamp,
    deploymentInfoError,
  } = useBackendHealthCheck();

  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const {
    data: submissions = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetAllContactSubmissions();

  // Check for access denied errors
  const isAccessDenied = error?.message === 'ACCESS_DENIED';

  // Show access denied screen if access is denied
  if (isAccessDenied) {
    return <AccessDeniedScreen />;
  }

  const handleRefresh = () => {
    refetch();
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

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

  // Backend connectivity status component with enhanced diagnostics
  const BackendConnectivityStatus = () => {
    let statusIcon;
    let statusText;
    let statusColor;

    if (isChecking) {
      statusIcon = <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      statusText = 'Checking...';
      statusColor = 'text-yellow-500';
    } else if (isHealthy) {
      statusIcon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
      statusText = 'Healthy';
      statusColor = 'text-green-500';
    } else {
      statusIcon = <XCircle className="w-5 h-5 text-red-500" />;
      statusText = 'Unhealthy';
      statusColor = 'text-red-500';
    }

    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';

    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5" />
          Backend Connectivity Diagnostics
        </h3>
        
        {/* Status */}
        <div className="mb-4">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Connection Status</label>
          <div className="flex items-center gap-2 mt-1">
            {statusIcon}
            <span className={`font-semibold ${statusColor}`}>{statusText}</span>
          </div>
        </div>

        {/* Backend Identity Info */}
        {(backendCanisterId || backendServerTimestamp) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Backend Canister ID</label>
              <p className="text-white text-sm font-mono mt-1 break-all">
                {backendCanisterId || 'Not available'}
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Backend Server Time</label>
              <p className="text-white text-sm font-mono mt-1">{formattedServerTimestamp}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {healthError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-sm font-mono">{healthError}</p>
          </div>
        )}

        {/* Deployment Info Error */}
        {deploymentInfoError && (
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Note:</strong> {deploymentInfoError}
            </p>
          </div>
        )}

        {/* Troubleshooting Guidance */}
        {!isHealthy && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <h4 className="text-sm font-bold text-white">Troubleshooting Checklist</h4>
            </div>
            <ul className="text-xs text-white/80 space-y-2 ml-7">
              <li>
                <strong>1. Frontend published but backend not deployed:</strong>
                <br />
                <span className="text-white/60">
                  The frontend may be live but the backend canister is not running or unreachable.
                  Verify the backend canister is deployed and accessible.
                </span>
              </li>
              <li>
                <strong>2. Canister binding / hostname mismatch:</strong>
                <br />
                <span className="text-white/60">
                  You're on <code className="bg-white/10 px-1 rounded">{hostname}</code> but the backend canister may be bound to a different environment.
                  Check that the live hostname is correctly mapped to the production backend canister.
                </span>
              </li>
              <li>
                <strong>3. Network / agent / browser issues:</strong>
                <br />
                <span className="text-white/60">
                  Check your internet connection, browser console for errors, and try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R).
                  If using a VPN or firewall, ensure Internet Computer endpoints are accessible.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Healthy State Info */}
        {isHealthy && (
          <p className="text-xs text-white/60">
            Backend canister is reachable and responding correctly. All systems operational.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Contact Submissions</h1>
              <p className="text-white/80 mt-1 font-medium">
                Manage and review contact form submissions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isFetching}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connectivity Diagnostics */}
        <div className="mb-6">
          <BackendConnectivityStatus />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
              <p className="text-white text-lg font-bold">Loading submissions...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isAccessDenied && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-black text-white mb-2">Error Loading Submissions</h2>
            <p className="text-white/90">{error.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && submissions.length === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 text-center border border-white/20">
            <Mail className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-2">No Submissions Yet</h2>
            <p className="text-white/80">
              Contact form submissions will appear here once users start reaching out.
            </p>
          </div>
        )}

        {/* Submissions Table */}
        {!isLoading && !error && submissions.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {submissions.map((submission, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-white/60" />
                          <span className="text-white font-semibold">{submission.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white/60" />
                          <a
                            href={`mailto:${submission.email}`}
                            className="text-teal hover:text-teal/80 font-medium underline"
                          >
                            {submission.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.phoneCountryCallingCode && submission.phoneNumber ? (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-white/60" />
                            <span className="text-white font-medium">
                              {submission.phoneCountryCallingCode} {submission.phoneNumber}
                            </span>
                          </div>
                        ) : (
                          <span className="text-white/40 italic">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                          <span className="text-white/90 line-clamp-2">
                            {truncateMessage(submission.message)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 text-sm">
                            {formatTimestamp(submission.timestamp)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="px-4 py-2 bg-teal hover:bg-teal/90 text-white rounded-lg font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-teal/30"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-navy to-teal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20 shadow-2xl">
            <div className="sticky top-0 bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-black text-white/80 uppercase tracking-wider mb-2">
                  <User className="w-4 h-4" />
                  Name
                </label>
                <p className="text-white text-lg font-semibold">{selectedSubmission.name}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black text-white/80 uppercase tracking-wider mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="text-teal hover:text-teal/80 text-lg font-semibold underline"
                >
                  {selectedSubmission.email}
                </a>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black text-white/80 uppercase tracking-wider mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {selectedSubmission.phoneCountryCallingCode && selectedSubmission.phoneNumber ? (
                  <p className="text-white text-lg font-semibold">
                    {selectedSubmission.phoneCountryCallingCode} {selectedSubmission.phoneNumber}
                  </p>
                ) : (
                  <p className="text-white/40 italic">Not provided</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black text-white/80 uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4" />
                  Submitted On
                </label>
                <p className="text-white text-lg font-semibold">
                  {formatTimestamp(selectedSubmission.timestamp)}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black text-white/80 uppercase tracking-wider mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </label>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-white whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-black transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
