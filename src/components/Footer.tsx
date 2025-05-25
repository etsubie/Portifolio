import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-500">Etsub</span> Dev
              </h2>
              <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">Crafting digital experiences with code.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="#home" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Back to top
              </a>
              
              <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {/* <p className="flex items-center justify-center gap-1">
              Made with 
              <Heart size={14} className="text-red-500 fill-red-500" /> 
              in 2025
            </p> */}
            <p className="mt-1">
              &copy; {currentYear} Etsub Dev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;