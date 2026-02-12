import { useState } from 'react';
import { useGetAllContactSubmissions, useGetAllContactSubmissionsJunk } from '../../hooks/useAdminContactSubmissions';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import AccessDeniedScreen from '../../components/admin/AccessDeniedScreen';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { Loader2, RefreshCw, Mail, Phone, User, Calendar, MessageSquare, X } from 'lucide-react';
import type { ContactSubmission } from '../../backend';

export default function ContactSubmissionsAdminPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [activeTab, setActiveTab] = useState<'normal' | 'junk'>('normal');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const {
    data: normalSubmissions = [],
    isLoading: normalLoading,
    error: normalError,
    refetch: refetchNormal,
    isFetching: normalFetching,
  } = useGetAllContactSubmissions();

  const {
    data: junkSubmissions = [],
    isLoading: junkLoading,
    error: junkError,
    refetch: refetchJunk,
    isFetching: junkFetching,
  } = useGetAllContactSubmissionsJunk();

  // Check for access denied errors
  const isAccessDenied =
    normalError?.message === 'ACCESS_DENIED' || junkError?.message === 'ACCESS_DENIED';

  // Show access denied screen if not authenticated OR if access is denied
  if (!isAuthenticated || isAccessDenied) {
    return <AccessDeniedScreen />;
  }

  const submissions = activeTab === 'normal' ? normalSubmissions : junkSubmissions;
  const isLoading = activeTab === 'normal' ? normalLoading : junkLoading;
  const isFetching = activeTab === 'normal' ? normalFetching : junkFetching;
  const error = activeTab === 'normal' ? normalError : junkError;

  const handleRefresh = () => {
    if (activeTab === 'normal') {
      refetchNormal();
    } else {
      refetchJunk();
    }
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-teal">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Contact Submissions</h1>
              <p className="text-white/80 mt-1 font-medium">Admin Panel</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isFetching}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-teal hover:bg-teal/90 text-white rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('normal')}
            className={`px-6 py-3 rounded-xl font-black transition-all ${
              activeTab === 'normal'
                ? 'bg-white text-navy shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Normal Submissions ({normalSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('junk')}
            className={`px-6 py-3 rounded-xl font-black transition-all ${
              activeTab === 'junk'
                ? 'bg-white text-navy shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Junk Submissions ({junkSubmissions.length})
          </button>
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
        {error && error.message !== 'ACCESS_DENIED' && (
          <div className="bg-red-100/90 backdrop-blur-sm border-2 border-red-500 text-red-800 px-6 py-4 rounded-xl font-medium">
            Failed to load submissions: {error.message}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && submissions.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-navy mb-2">No Submissions Yet</h3>
            <p className="text-gray-600 font-medium">
              {activeTab === 'normal'
                ? 'No contact form submissions have been received yet.'
                : 'No junk submissions have been detected yet.'}
            </p>
          </div>
        )}

        {/* Submissions List */}
        {!isLoading && !error && submissions.length > 0 && (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-navy flex-shrink-0" />
                      <h3 className="text-xl font-black text-navy truncate">{submission.name}</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{submission.email}</span>
                      </div>
                      {submission.phoneNumber && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {submission.phoneCountryCallingCode} {submission.phoneNumber}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {formatTimestamp(submission.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium line-clamp-2">
                      {truncateMessage(submission.message)}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition-all flex-shrink-0">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-black text-navy">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-600 mb-2">Name</label>
                <p className="text-lg font-bold text-navy">{selectedSubmission.name}</p>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-600 mb-2">Email</label>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="text-lg font-bold text-teal hover:underline"
                >
                  {selectedSubmission.email}
                </a>
              </div>
              {selectedSubmission.phoneNumber && (
                <div>
                  <label className="block text-sm font-black text-gray-600 mb-2">Phone</label>
                  <a
                    href={`tel:${selectedSubmission.phoneCountryCallingCode}${selectedSubmission.phoneNumber}`}
                    className="text-lg font-bold text-teal hover:underline"
                  >
                    {selectedSubmission.phoneCountryCallingCode} {selectedSubmission.phoneNumber}
                  </a>
                </div>
              )}
              <div>
                <label className="block text-sm font-black text-gray-600 mb-2">Submitted</label>
                <p className="text-lg font-bold text-navy">
                  {formatTimestamp(selectedSubmission.timestamp)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-600 mb-2">Message</label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-800 font-medium whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
