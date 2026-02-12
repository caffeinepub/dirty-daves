import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactSubmission } from '../backend';

export function useGetAllContactSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getAllContactSubmissions();
      } catch (error: any) {
        // Map backend authorization traps to user-friendly errors
        if (error?.message?.includes('Unauthorized') || error?.message?.includes('Only admins')) {
          throw new Error('ACCESS_DENIED');
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 0, // Always refetch to ensure fresh data after login
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}
