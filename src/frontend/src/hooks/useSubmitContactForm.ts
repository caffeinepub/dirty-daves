import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface ContactFormData {
  name: string;
  email: string;
  phoneCountryCallingCode: string;
  phoneNumber: string;
  message: string;
  honeypot: string;
  elapsedTime: number;
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
        data.phoneCountryCallingCode,
        data.phoneNumber,
        data.message,
        data.honeypot,
        data.elapsedTime
      );

      return submissionId;
    },
    onSuccess: () => {
      // Invalidate admin submission queries so they refresh
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
    onError: (error: any) => {
      // Ensure error messages are readable for the UI
      if (!error.message || error.message === 'Call failed') {
        error.message = 'Failed to send message. Please try again.';
      }
    },
  });
}
