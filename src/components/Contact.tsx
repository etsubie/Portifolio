import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe } from 'lucide-react';
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

  const email = contactContent.email ?? '';
  const phone = contactContent.phone ?? '';
  const location = contactContent.location ?? '';
  const socials = contactContent.socials ?? [];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div
            ref={ref}
            className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Contact Info */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Contact Information</h3>

              <div className="space-y-5">
                <a href={`mailto:${email}`} className="flex items-start group">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</h4>
                    <span className="text-base font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{email}</span>
                  </div>
                </a>

                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start group">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone</h4>
                    <span className="text-base font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{phone}</span>
                  </div>
                </a>

                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4">
                    <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h4>
                    <p className="text-base font-medium text-slate-900 dark:text-white">{location}</p>
                  </div>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Connect with me</h4>
                  <div className="flex flex-wrap gap-3">
                    {socials.map(soc => {
                      const Icon = platformIcons[soc.platform] || Globe;
                      return (
                        <a
                          key={soc.id}
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl transition-all group"
                          aria-label={`Connect on ${soc.name}`}
                        >
                          <Icon className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={18} />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{soc.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Send a Message</h3>
              {formSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="text-sm mt-1 text-green-600 dark:text-green-400">I'll get back to you soon.</p>
                </div>
              ) : (
                <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={() => setFormSubmitted(true)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Email</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Message</label>
                    <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all resize-none" placeholder="Tell me about your project..." />
                  </div>
                  <button type="submit" className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/25 flex items-center justify-center gap-2 font-medium">
                    Send Message<Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
