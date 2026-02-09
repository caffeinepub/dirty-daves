import { useState, useRef, useEffect } from 'react';
import { useSubmitContactForm } from '../../hooks/useSubmitContactForm';
import { useRecaptchaV3 } from '../../hooks/useRecaptchaV3';
import { countryCallingCodes } from '../../content/countryCallingCodes';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  shouldLoadRecaptcha?: boolean;
}

export default function ContactForm({ shouldLoadRecaptcha = false }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCallingCode, setPhoneCountryCallingCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    phoneNumber?: string;
    message?: string;
    recaptcha?: string;
  }>({});

  // Track form start time for bot detection
  const formStartTimeRef = useRef<number>(Date.now());

  // Reset start time when component mounts
  useEffect(() => {
    formStartTimeRef.current = Date.now();
  }, []);

  const { mutate: submitForm, isPending, isSuccess, isError, error } = useSubmitContactForm();
  const { isReady: recaptchaReady, executeRecaptcha, isConfigured: recaptchaConfigured, initializeRecaptcha } = useRecaptchaV3();

  // Initialize reCAPTCHA when contact section becomes visible
  useEffect(() => {
    if (shouldLoadRecaptcha && recaptchaConfigured && !recaptchaReady) {
      initializeRecaptcha();
    }
  }, [shouldLoadRecaptcha, recaptchaConfigured, recaptchaReady, initializeRecaptcha]);

  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      phoneNumber?: string;
      message?: string;
      recaptcha?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check reCAPTCHA configuration and readiness
    if (!recaptchaConfigured) {
      setErrors({ recaptcha: 'Security verification is not configured. Please contact support.' });
      return;
    }

    if (!recaptchaReady) {
      setErrors({ recaptcha: 'Security verification is not ready. Please wait a moment and try again.' });
      return;
    }

    // Generate reCAPTCHA token
    let recaptchaToken: string;
    try {
      recaptchaToken = await executeRecaptcha('contact_form');
    } catch (err) {
      setErrors({ recaptcha: 'Failed to verify security. Please refresh the page and try again.' });
      return;
    }

    // Calculate elapsed time since form was presented
    const elapsedTime = Date.now() - formStartTimeRef.current;

    submitForm(
      { 
        name: name.trim(), 
        email: email.trim(), 
        phoneCountryCallingCode,
        phoneNumber: phoneNumber.trim(),
        message: message.trim(),
        honeypot,
        elapsedTime,
        recaptchaToken,
      },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPhoneCountryCallingCode('+44');
          setPhoneNumber('');
          setMessage('');
          setHoneypot('');
          setErrors({});
          // Reset form start time for potential next submission
          formStartTimeRef.current = Date.now();
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl border-2 border-teal text-center shadow-2xl shadow-teal/30 animate-pop">
        <CheckCircle2 className="w-20 h-20 text-teal mx-auto mb-4 animate-wiggle" />
        <h3 className="text-3xl font-black mb-2 text-black text-shadow-subtle">Thanks! Your message has been sent to Dirty Dave. 🎉</h3>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-4 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl border-2 border-navy/30 hover:border-teal/50 transition-all shadow-lg space-y-6">
      {/* Honeypot field - visually hidden but accessible to bots */}
      <div className="absolute left-[-9999px] w-1 h-1 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Your Name 👤
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium placeholder:text-black/50"
          placeholder="What should we call you?"
          disabled={isPending}
        />
        {errors.name && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Email Address 📧
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium placeholder:text-black/50"
          placeholder="your@email.com"
          disabled={isPending}
        />
        {errors.email && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Phone Number 📱
        </label>
        <div className="flex gap-2">
          <select
            id="phoneCountryCode"
            value={phoneCountryCallingCode}
            onChange={(e) => setPhoneCountryCallingCode(e.target.value)}
            className="px-3 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium"
            disabled={isPending}
          >
            {countryCallingCodes.map((country) => (
              <option key={country.value} value={country.callingCode}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium placeholder:text-black/50"
            placeholder="Your phone number"
            disabled={isPending}
          />
        </div>
        {errors.phoneNumber && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.phoneNumber}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Your Message 💬
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium placeholder:text-black/50 resize-none"
          placeholder="Tell us about your dream Scottish adventure..."
          disabled={isPending}
        />
        {errors.message && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.message}</p>}
      </div>

      {errors.recaptcha && (
        <div className="bg-red-100/80 backdrop-blur-sm border-2 border-red-500 text-red-800 px-4 py-3 rounded-xl font-medium">
          {errors.recaptcha}
        </div>
      )}

      {isError && (
        <div className="bg-red-100/80 backdrop-blur-sm border-2 border-red-500 text-red-800 px-4 py-3 rounded-xl font-medium">
          {error?.message || 'Failed to send message. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-8 py-4 bg-navy text-white rounded-2xl font-black hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-teal/50"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </span>
        ) : (
          'Send Message 🚀'
        )}
      </button>

      <p className="text-xs text-black/70 text-center font-medium text-shadow-subtle">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </form>
  );
}
