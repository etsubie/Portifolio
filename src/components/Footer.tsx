import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Etsub
                </span>{' '}
                Dev
              </h2>
              <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
                Crafting digital experiences with clean code.
              </p>
            </div>

            <div className="flex items-center gap-6">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize hidden sm:block"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={scrollToTop}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp size={18} className="text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              Made with
              <Heart size={14} className="text-red-500 fill-red-500" />
              by Etsub &middot; &copy; {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
