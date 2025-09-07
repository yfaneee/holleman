import { useState } from 'react';
import { sendContactEmail, sendCareerEmail, ContactFormData, CareerFormData } from '../services/emailService';

interface UseEmailFormReturn {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  submitContactForm: (data: ContactFormData) => Promise<void>;
  submitCareerForm: (data: CareerFormData) => Promise<void>;
  resetForm: () => void;
}

export const useEmailForm = (): UseEmailFormReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  const submitContactForm = async (data: ContactFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const success = await sendContactEmail(data);
      
      if (success) {
        setIsSuccess(true);
      } else {
        setError('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.');
      }
    } catch (err) {
      setError('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.');
      console.error('Contact form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitCareerForm = async (data: CareerFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const success = await sendCareerEmail(data);
      
      if (success) {
        setIsSuccess(true);
      } else {
        setError('A apărut o eroare la trimiterea aplicației. Vă rugăm să încercați din nou.');
      }
    } catch (err) {
      setError('A apărut o eroare la trimiterea aplicației. Vă rugăm să încercați din nou.');
      console.error('Career form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSuccess,
    error,
    submitContactForm,
    submitCareerForm,
    resetForm
  };
};
