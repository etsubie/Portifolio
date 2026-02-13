import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer: React.FC = () => {
  const { footerContent } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const text = footerContent?.text || 'Built with';
  const author = footerContent?.authorName || 'Etsub';

  return (
    <footer className="px-4 sm:px-6 pb-8 pt-4">
      <div className="border-t border-slate-200/80 dark:border-slate-800 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1">
            &copy; {currentYear} {text} <Heart size={12} className="text-rose-400" /> by{' '}
            <span className="text-slate-600 dark:text-slate-400 font-medium">{author}</span>
          </p>
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
          >
            Back to top
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
