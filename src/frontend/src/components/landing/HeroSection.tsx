import TripAdvisorCta from './TripAdvisorCta';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle overlay - 20% opacity for background visibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-white tracking-tight animate-float text-shadow-strong">
          DIRTY DAVES
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white max-w-4xl mx-auto font-bold leading-relaxed text-shadow-subtle">
          Private Tours of Scotland by the S.H.I.T Tour company
        </p>

        <p className="text-xl md:text-2xl lg:text-3xl mb-14 text-white max-w-4xl mx-auto font-medium leading-relaxed text-shadow-subtle">
          Forget the tourist traps. Get the REAL Scotland — the stories they don't tell, the places they don't show, and <span className="whitespace-nowrap">banter you won't forget!&nbsp;🍻</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#contact"
            className="group px-10 py-5 bg-navy text-white rounded-2xl font-black text-xl hover:bg-navy/90 transition-all shadow-2xl hover:shadow-navy/50 transform hover:scale-110 hover:rotate-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
          >
            <span className="inline-block group-hover:animate-wiggle">🚀</span> Book Your Adventure
          </a>
          <TripAdvisorCta />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-teal rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-teal rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
