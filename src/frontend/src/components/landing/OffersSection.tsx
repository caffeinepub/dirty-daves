import { MapPin, Users, Clock, Star, Bed, Compass } from 'lucide-react';

export default function OffersSection() {
  const features = [
    {
      icon: MapPin,
      emoji: '🗺️',
      title: 'Off the Beaten Path',
      description: 'Hidden gems, secret spots, and places the tour buses can\'t reach. This is Scotland unfiltered and RAW!'
    },
    {
      icon: Users,
      emoji: '👥',
      title: 'Private & Personal',
      description: 'Just you, your crew, and Dave. No strangers, no schedules, no bullshit. Your tour, your rules, your adventure!'
    },
    {
      icon: Clock,
      emoji: '⏰',
      title: 'Flexible as Hell',
      description: 'Want to spend an extra hour at that castle? Or skip it for a proper pub session? You\'re the boss!'
    },
    {
      icon: Star,
      emoji: '✨',
      title: 'Stories & Banter',
      description: 'History, legends, and the kind of stories that make you laugh until your face hurts. Pure entertainment!'
    },
    {
      icon: Bed,
      emoji: '🛏️',
      title: 'Stay Your Way',
      description: 'park bench, shitty hostel, tent, 5 star hotel or your own castle - I dont care where you stay, but will book what ever the fuck you want'
    },
    {
      icon: Compass,
      emoji: '🧭',
      title: 'Choose Your Own Adventure',
      description: 'History buffs? Castle lovers? Distillery piss-ups? Every strip club in Scotland? Or just a bit of everything? You decide!'
    }
  ];

  return (
    <section id="tours" className="relative py-20 md:py-32">
      {/* Subtle overlay - 18% opacity */}
      <div className="absolute inset-0 bg-white/18" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white animate-float text-shadow-strong text-glow-light">
            Why Choose Dirty Daves? 🤔
          </h2>
          <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto font-bold text-shadow-strong">
            Because cookie-cutter tours are boring as shit! 💤
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/25 backdrop-blur-sm p-8 rounded-3xl border-2 border-navy/30 hover:border-teal transition-all shadow-lg hover:shadow-2xl hover:shadow-teal/30 transform hover:scale-105 hover:-rotate-1 active:scale-100 focus-within:ring-4 focus-within:ring-teal/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-navy rounded-2xl flex items-center justify-center group-hover:animate-wiggle shadow-lg">
                  <span className="text-3xl">{feature.emoji}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 text-black group-hover:text-navy transition-colors text-shadow-subtle">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-black leading-relaxed font-medium text-shadow-subtle">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
