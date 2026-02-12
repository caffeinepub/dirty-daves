import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

/**
 * Hook to check if the current caller is an admin.
 * Returns loading state while actor is initializing or identity is being loaded.
 */
export function useIsAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isAdmin();
    },
    enabled: !!actor && !actorFetching && !isInitializing && !!identity,
    retry: false,
    staleTime: 0, // Always refetch to ensure fresh admin status
  });

  return {
    ...query,
    isLoading: actorFetching || isInitializing || query.isLoading,
    isFetched: !!actor && !isInitializing && query.isFetched,
  };
}
