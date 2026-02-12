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
        throw new Error('Backend connection not available. Please refresh the page and try again.');
      }

      try {
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
      } catch (error: any) {
        // Parse backend errors into user-friendly messages
        let errorMessage = 'Failed to send message. Please try again.';
        
        if (error?.message) {
          const msg = error.message.toLowerCase();
          
          // Handle validation errors
          if (msg.includes('phone number must be present')) {
            errorMessage = 'Please enter a phone number or remove the country code.';
          } 
          // Handle spam/bot detection (expected behavior, not a critical error)
          else if (msg.includes('too fast') || msg.includes('bot') || msg.includes('suspicious')) {
            errorMessage = 'Please take a moment to fill out the form before submitting.';
            // Don't log spam detection as error - it's working as intended
            console.log('[Contact Form] Spam protection triggered');
          }
          // Handle backend traps
          else if (msg.includes('trap')) {
            const trapMatch = error.message.match(/trapped[:\s]+(.+)/i);
            if (trapMatch && trapMatch[1]) {
              errorMessage = trapMatch[1];
            }
          }
          // Handle network/connection errors
          else if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
            errorMessage = 'Network error. Please check your connection and try again.';
            console.error('[Contact Form] Network error:', error.message);
          }
          // Log unexpected errors for debugging
          else if (!msg.includes('validation')) {
            console.error('[Contact Form] Unexpected error:', error.message);
          }
        }
        
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      // Invalidate admin submission queries so they refresh
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}
