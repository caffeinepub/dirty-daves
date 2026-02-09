import { SiFacebook, SiInstagram, SiX, SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-navy/30 py-12">
      {/* Subtle overlay - 25% opacity */}
      <div className="absolute inset-0 bg-black/25" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xl font-black text-white mb-2 text-shadow-subtle">DIRTY DAVES 🏴󠁧󠁢󠁳󠁣󠁴󠁿</p>
            <p className="text-sm text-white font-bold text-shadow-subtle">
              Private Tours of Scotland
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
                aria-label="Facebook"
              >
                <SiFacebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
                aria-label="Instagram"
              >
                <SiInstagram className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://twitter.com/realdavidwatson"
                target="_blank"
                rel="noopener noreferrer"
                title="@realdavidwatson"
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-navy/50"
                style={{ backgroundColor: '#00BFFF' }}
                aria-label="X (Twitter)"
              >
                <SiX className="w-6 h-6 text-white" />
              </a>
            </div>

            <a
              href="https://wa.me/447397318422"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-2xl font-black hover:bg-[#20BA5A] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
              aria-label="Chat on WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white flex items-center justify-center gap-2 flex-wrap font-medium text-shadow-subtle">
            © 2026. Built with <Heart className="w-4 h-4 text-teal fill-teal animate-pulse" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:text-teal/90 font-black transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-teal/50 rounded"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
