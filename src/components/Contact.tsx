import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/yourformid'; // Replace with your Formspree endpoint

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</h4>
                    <a href="mailto:etsubyetwale@gmail.com" className="text-lg font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      etsubyetwale@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone</h4>
                    <a href="tel:+1234567890" className="text-lg font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      +251 (931) 050 654
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h4>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      Debre Markos, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'github', Icon: Github, url: 'https://github.com/etsubie' },
                    { name: 'linkedin', Icon: Linkedin, url: 'https://linkedin.com/in/etsubdink-yetwale-85095b318' },
                  ].map(({ name, Icon, url }) => (
                    <a 
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors group"
                      aria-label={`Connect on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                    >
                      <Icon 
                        className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
                        size={20}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Send a Message</h3>
              {formSubmitted ? (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-4 rounded-lg">
                  <p className="font-medium text-center">Thank you for your message! I'll get back to you soon.</p>
                </div>
              ) : (
                <form 
                  action={FORMSPREE_ENDPOINT} 
                  method="POST" 
                  onSubmit={() => setFormSubmitted(true)}
                >
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                    ></textarea>
                  </div>
                  {/* Optional: Redirect after submit */}
                  {/* <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" /> */}
                  <button 
                    type="submit"
                    className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2`}
                  >
                    Send Message
                    <Send size={18} />
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