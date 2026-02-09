import ReviewCard from './ReviewCard';
import { curatedReviews } from '../../content/curatedReviews';
import TripAdvisorCta from './TripAdvisorCta';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-20 md:py-32">
      {/* Subtle overlay - 22% opacity */}
      <div className="absolute inset-0 bg-black/22" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white animate-float text-shadow-strong">
            Don't Take Our Word For It! 🗣️
          </h2>
          <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto mb-8 font-bold text-shadow-subtle">
            Here's what the legends have to say... 🌟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {curatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="flex justify-center">
          <TripAdvisorCta />
        </div>
      </div>
    </section>
  );
}
