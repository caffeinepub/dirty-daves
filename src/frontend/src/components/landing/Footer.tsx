import { SiX, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { Mail } from 'lucide-react';
import BuildEnvironmentIndicator from '../diagnostics/BuildEnvironmentIndicator';

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
                href="mailto:dirtydave69@protonmail.com"
                className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://twitter.com/realdavidwatson"
                target="_blank"
                rel="noopener noreferrer"
                title="@realdavidwatson"
                className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center hover:bg-black/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-navy/50"
                aria-label="X (Twitter)"
              >
                <SiX className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@YOUR_CHANNEL_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#FF0000] rounded-2xl flex items-center justify-center hover:bg-[#CC0000] transition-all shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/50"
                aria-label="YouTube"
              >
                <SiYoutube className="w-6 h-6 text-white" />
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

        <div className="mt-8 pt-8 border-t border-white/20 space-y-4">
          <div className="text-center">
            <p className="text-sm text-white font-medium text-shadow-subtle">
              built by Dave and thats why the website is so shit
            </p>
          </div>
          
          {/* Build & Environment Indicator */}
          <div className="flex justify-center">
            <BuildEnvironmentIndicator />
          </div>
        </div>
      </div>
    </footer>
  );
}
