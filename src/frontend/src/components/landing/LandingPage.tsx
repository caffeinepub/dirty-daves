import HeroSection from './HeroSection';
import OffersSection from './OffersSection';
import ReviewsSection from './ReviewsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/generated/dirty-daves-hero-bg.dim_1920x1080.png"
          alt="Scotland landscape"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content sections with translucent overlays */}
      <div className="relative z-10">
        <HeroSection />
        <OffersSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
