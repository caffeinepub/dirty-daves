import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) {
        throw new Error('Backend actor not available');
      }

      const submissionId = await actor.submitContactForm(
        data.name,
        data.email,
        data.subject,
        data.message
      );

      return submissionId;
    },
    onSuccess: () => {
      // Invalidate any queries that might display contact submissions
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}
