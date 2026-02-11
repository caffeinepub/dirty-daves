import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactSubmission } from '../backend';

export function useGetAllContactSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions', 'normal'],
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
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useGetAllContactSubmissionsJunk() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions', 'junk'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getAllContactSubmissionsJunk();
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
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}
