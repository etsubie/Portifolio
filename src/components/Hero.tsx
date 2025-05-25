import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative pt-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -left-10 bottom-1/4 w-80 h-80 bg-orange-300 dark:bg-orange-700 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium">
              Software Engineer & Frontend Developer
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Crafting <span className="text-blue-500">Digital Experiences</span> With Code
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            A passionate developer specializing in building intuitive, responsive, and 
            scalable applications with a focus on user experience and modern technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToProjects} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              View Projects
              <ArrowDown size={18} />
            </button>
            
            <a 
              href="#contact" 
              className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-slate-700 dark:text-slate-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;