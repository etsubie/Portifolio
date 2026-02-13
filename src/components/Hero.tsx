import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero: React.FC = () => {
  const { heroContent } = usePortfolio();

  const name = heroContent?.name ?? '';
  const badge = heroContent?.badge ?? '';
  const roles = heroContent?.roles ?? [];
  const description = heroContent?.description ?? '';
  const stats = heroContent?.stats ?? [];

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;
    const currentRole = roles[roleIndex % roles.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, roles]);

  if (!heroContent) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300/10 dark:bg-orange-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block animate-fadeIn">
            <span className="px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
              {badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-12 sm:h-14">
            I build{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2 font-medium"
            >
              View My Work
              <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all font-medium"
            >
              Get In Touch
            </a>
          </div>

          {stats.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
