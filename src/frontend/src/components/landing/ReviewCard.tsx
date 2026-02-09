import { Star } from 'lucide-react';

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  excerpt: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group bg-white/25 backdrop-blur-sm p-6 rounded-3xl border-2 border-navy/30 hover:border-teal transition-all shadow-lg hover:shadow-2xl hover:shadow-teal/30 transform hover:scale-105 hover:rotate-1 active:scale-100 focus-within:ring-4 focus-within:ring-teal/50">
      <div className="flex items-center gap-1 mb-4 group-hover:animate-wiggle">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 transition-all ${
              i < review.rating
                ? 'fill-teal text-teal group-hover:scale-110'
                : 'fill-navy/20 text-navy/20'
            }`}
          />
        ))}
      </div>
      
      <p className="text-lg text-black mb-4 leading-relaxed italic font-medium text-shadow-subtle">
        "{review.excerpt}"
      </p>
      
      <p className="text-sm font-black text-black text-shadow-subtle">
        — {review.reviewer}
      </p>
    </div>
  );
}
