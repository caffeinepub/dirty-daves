import { useState, useCallback } from 'react';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';

let scriptLoaded = false;
let scriptLoading = false;
let loadPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (scriptLoaded) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  if (!RECAPTCHA_SITE_KEY) {
    return Promise.reject(new Error('reCAPTCHA site key is not configured'));
  }

  loadPromise = new Promise((resolve, reject) => {
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      scriptLoaded = true;
      resolve();
      return;
    }

    scriptLoading = true;
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
    };

    script.onerror = () => {
      scriptLoading = false;
      loadPromise = null;
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useRecaptchaV3(shouldLoad: boolean = false) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeRecaptcha = useCallback(async () => {
    if (!RECAPTCHA_SITE_KEY) {
      setError('reCAPTCHA site key is not configured');
      return;
    }

    if (isReady || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await loadRecaptchaScript();
      
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
          setError(null);
          setIsLoading(false);
        });
      } else {
        setError('reCAPTCHA failed to initialize');
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load reCAPTCHA');
      setIsLoading(false);
    }
  }, [isReady, isLoading]);

  const executeRecaptcha = async (action: string): Promise<string> => {
    if (!RECAPTCHA_SITE_KEY) {
      throw new Error('reCAPTCHA site key is not configured');
    }

    // If not ready, try to initialize first
    if (!isReady) {
      await initializeRecaptcha();
      // Wait a bit for grecaptcha to be ready
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (!isReady || !window.grecaptcha) {
      throw new Error('reCAPTCHA is not ready');
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token;
    } catch (err) {
      throw new Error('Failed to generate reCAPTCHA token');
    }
  };

  return {
    isReady,
    error,
    isLoading,
    executeRecaptcha,
    initializeRecaptcha,
    isConfigured: !!RECAPTCHA_SITE_KEY,
  };
}
