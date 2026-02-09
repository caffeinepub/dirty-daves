import { ExternalLink } from 'lucide-react';

export default function TripAdvisorCta() {
  return (
    <a
      href="https://www.tripadvisor.com/Attraction_Review-g186525-d17433503-Reviews-Dirty_Daves-Edinburgh_Scotland.html"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-10 py-5 bg-teal text-white rounded-2xl font-black text-xl hover:bg-teal/90 transition-all shadow-2xl hover:shadow-teal/50 transform hover:scale-110 hover:-rotate-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-navy/50"
    >
      <span>See Reviews on TripAdvisor</span>
      <ExternalLink className="w-6 h-6 group-hover:animate-wiggle" />
    </a>
  );
}
