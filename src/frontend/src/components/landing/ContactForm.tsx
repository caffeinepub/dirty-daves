import { useState } from 'react';
import { useSubmitContactForm } from '../../hooks/useSubmitContactForm';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const { mutate: submitForm, isPending, isSuccess, isError, error } = useSubmitContactForm();

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitForm(
      { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          setErrors({});
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
        <label htmlFor="subject" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Subject 📝
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-medium placeholder:text-black/50"
          placeholder="What's this about?"
          disabled={isPending}
        />
        {errors.subject && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-black mb-2 text-black text-shadow-subtle">
          Your Message 💭
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-navy/30 rounded-xl text-black focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none font-medium placeholder:text-black/50"
          placeholder="Tell us about your dream Scottish adventure..."
          disabled={isPending}
        />
        {errors.message && <p className="text-black text-sm mt-1 font-bold text-shadow-subtle">{errors.message}</p>}
      </div>

      {isError && (
        <div className="p-4 bg-white/40 backdrop-blur-sm border-2 border-black rounded-xl animate-wiggle">
          <p className="text-black font-black text-shadow-subtle">
            {error?.message || 'Something went wrong. Please try again.'}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-4 bg-navy text-white rounded-2xl font-black text-lg hover:bg-navy/90 transition-all shadow-lg hover:shadow-2xl hover:shadow-navy/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <span>Send Message</span>
            <span className="text-xl">🚀</span>
          </>
        )}
      </button>
    </form>
  );
}
