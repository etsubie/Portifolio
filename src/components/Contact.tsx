import React, { useState } from 'react';
import { Send, Github, Linkedin, Globe } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

const platformIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
};

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal();
  const { contactContent } = usePortfolio();

  if (!contactContent) return null;

  const socials = contactContent.socials ?? [];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">05.</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact</h2>
        <div className="h-px flex-1 max-w-[200px] bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* CTA text */}
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg text-sm leading-relaxed">
        Have a project in mind or want to chat? Drop me a message and I'll get back to you as soon as possible.
      </p>

      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Form */}
        <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 p-6 sm:p-8">
          {formSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Send className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Message Sent!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={() => setFormSubmitted(true)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none text-sm" placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/20 font-medium flex items-center justify-center gap-2 text-sm">
                Send Message <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Socials below form */}
        {socials.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map(soc => {
              const Icon = platformIcons[soc.platform] || Globe;
              return (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 rounded-xl transition-all group text-sm hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-sm"
                >
                  <Icon className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={16} />
                  <span className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">{soc.name}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
