import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useActor } from './useActor';

/**
 * Hook for bootstrapping admin access with username/password after authentication
 * Allows authenticated users to enter admin credentials and gain admin permissions
 */
export function useAdminBootstrapAccess() {
  const queryClient = useQueryClient();
  const { actor } = useActor();
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  const bootstrapWithCredentials = async (username: string, password: string): Promise<boolean> => {
    if (!username || username.trim() === '') {
      setBootstrapError('Please enter a valid username');
      return false;
    }

    if (!password || password.trim() === '') {
      setBootstrapError('Please enter a valid password');
      return false;
    }

    if (!actor) {
      setBootstrapError('Backend actor not available. Please try again.');
      return false;
    }

    setIsBootstrapping(true);
    setBootstrapError(null);

    try {
      // Call the backend method to bootstrap admin access with credentials
      // The backend method should verify credentials and grant admin role to the caller
      await (actor as any).bootstrapAdminWithCredentials(username.trim(), password.trim());

      // Wait a moment for the backend to process
      await new Promise(resolve => setTimeout(resolve, 300));

      // Invalidate and refetch admin submissions queries to verify access
      await queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
      await queryClient.refetchQueries({ queryKey: ['contactSubmissions'] });

      setIsBootstrapping(false);
      return true;
    } catch (error: any) {
      console.error('Bootstrap error:', error);
      
      // Parse error message for user-friendly display
      let errorMessage = 'Failed to verify credentials. Please check your username and password.';
      
      if (error?.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes('unauthorized') || msg.includes('invalid') || msg.includes('incorrect')) {
          errorMessage = 'Invalid username or password. Please try again.';
        } else if (msg.includes('trap')) {
          // Extract trap message if available
          const trapMatch = error.message.match(/Canister trapped: (.+)/i);
          if (trapMatch && trapMatch[1]) {
            errorMessage = trapMatch[1];
          }
        }
      }
      
      setBootstrapError(errorMessage);
      setIsBootstrapping(false);
      return false;
    }
  };

  const clearError = () => {
    setBootstrapError(null);
  };

  return {
    bootstrapWithCredentials,
    isBootstrapping,
    bootstrapError,
    clearError,
  };
}
