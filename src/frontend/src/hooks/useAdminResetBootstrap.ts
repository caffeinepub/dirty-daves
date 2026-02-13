import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

/**
 * Hook to reset the admin bootstrap flag by calling resetBootstrap().
 * This is a TEMPORARY recovery mechanism that should be removed after
 * successfully bootstrapping the first admin.
 */
export function useAdminResetBootstrap() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not available');
      }
      if (!identity) {
        throw new Error('Must be authenticated to reset bootstrap flag');
      }
      await actor.resetBootstrap();
    },
    onSuccess: () => {
      // Invalidate admin-related queries to ensure fresh state after reset
      const principal = identity?.getPrincipal().toString();
      queryClient.invalidateQueries({ queryKey: ['isAdmin', principal] });
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}
