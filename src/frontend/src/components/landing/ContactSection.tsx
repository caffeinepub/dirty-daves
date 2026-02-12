import ContactForm from './ContactForm';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      {/* Subtle overlay - 20% opacity */}
      <div className="absolute inset-0 bg-white/20" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-black animate-float text-shadow-strong">
              Ready for an Adventure? 🎉
            </h2>
            <p className="text-2xl md:text-3xl text-black font-bold text-shadow-subtle">
              Drop us a line and let's make it happen! 📬
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="group bg-white/30 backdrop-blur-sm p-6 rounded-3xl border-2 border-navy/30 hover:border-teal transition-all shadow-lg hover:shadow-xl transform hover:scale-105 focus-within:ring-4 focus-within:ring-teal/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-navy rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-black font-medium text-shadow-subtle">
                      Start your adventure in Edinburgh, Glasgow, Inverness or where ever you want ! Tours across Scotland — from the Highlands to the Islands, and everywhere in between!
                    </p>
                  </div>
                </div>
              </div>

              <div id="get-in-touch" className="group bg-white/30 backdrop-blur-sm p-6 rounded-3xl border-2 border-navy/30 hover:border-teal transition-all shadow-lg hover:shadow-xl transform hover:scale-105 focus-within:ring-4 focus-within:ring-teal/50 scroll-mt-20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-navy rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 text-black text-shadow-subtle">Get in Touch 💬</h3>
                    <p className="text-black font-medium text-shadow-subtle mb-2">
                      Fill out the form and we'll get back to you as soon as Im back from the pub.
                    </p>
                    <a 
                      href="mailto:dirtydave69@protonmail.com"
                      className="text-navy hover:text-teal font-black text-shadow-subtle transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-teal/50 rounded"
                    >
                      dirtydave69@protonmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-white/30 backdrop-blur-sm p-6 rounded-3xl border-2 border-navy/30 hover:border-teal transition-all shadow-lg hover:shadow-xl transform hover:scale-105 focus-within:ring-4 focus-within:ring-teal/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-navy rounded-2xl flex items-center justify-center group-hover:animate-wiggle">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 text-black text-shadow-subtle">Txt me on WhatsApp</h3>
                    <p className="text-black font-medium text-shadow-subtle mb-2">
                      Prefer WhatsApp? Hit me up for a quick chat!
                    </p>
                    <a 
                      href="https://wa.me/447397318422"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy hover:text-teal font-black text-shadow-subtle transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-teal/50 rounded"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
