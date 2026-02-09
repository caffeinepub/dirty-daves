import { Link } from '@tanstack/react-router';

/**
 * Reusable CTA link component for offer pages that navigates to the home page
 * and scrolls to the contact section using hash navigation.
 */
export default function GetInTouchCtaLink() {
  return (
    <Link
      to="/"
      hash="contact"
      className="inline-block bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl focus-visible:ring-4 focus-visible:ring-teal focus-visible:outline-none"
    >
      Get in Touch 💬
    </Link>
  );
}
