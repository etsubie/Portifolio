import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero: React.FC = () => {
  const { heroContent, contactContent } = usePortfolio();

  const name = heroContent?.name ?? '';
  const roles = heroContent?.roles ?? [];
  const description = heroContent?.description ?? '';
  const stats = heroContent?.stats ?? [];
  const socials = contactContent?.socials ?? [];

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

  const githubUrl = socials.find(s => s.platform === 'github')?.url;
  const linkedinUrl = socials.find(s => s.platform === 'linkedin')?.url;

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6">
      <div className="w-full">
        {/* Top: badge */}
        {/* <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-800/50">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {badge}
          </span>
        </div> */}

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-3">
          {name}
          <span className="text-blue-600 dark:text-blue-400">.</span>
        </h1>

        {/* Typing role */}
        <div className="text-xl sm:text-2xl font-medium text-slate-400 dark:text-slate-500 mb-6 h-8 sm:h-9">
          <span className="text-blue-600 dark:text-blue-400">{text}</span>
          <span className="animate-blink text-blue-600 dark:text-blue-400">|</span>
        </div>

        {/* Description */}
        <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
          {description}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/20 font-medium flex items-center gap-2 text-sm"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <a
            href="#contact"
            className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all font-medium text-sm"
          >
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 mb-12">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-sm transition-all">
              <Github size={18} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-sm transition-all">
              <Linkedin size={18} />
            </a>
          )}
          <div className="h-px flex-1 max-w-[60px] bg-slate-200 dark:bg-slate-700 ml-2" />
        </div>

        {/* Code block + Stats bento */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Decorative code block */}
          <div className="bg-slate-900 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 font-mono text-xs sm:text-sm shadow-xl shadow-slate-900/10 dark:shadow-black/20">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="text-slate-400">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">developer</span>{' '}
              <span className="text-slate-500">=</span>{' '}
              <span className="text-slate-400">{'{'}</span>
            </div>
            <div className="text-slate-400 pl-4">
              <span className="text-emerald-400">name</span>: <span className="text-amber-300">'{name}'</span>,
            </div>
            <div className="text-slate-400 pl-4">
              <span className="text-emerald-400">passion</span>: <span className="text-amber-300">'building things'</span>,
            </div>
            <div className="text-slate-400 pl-4">
              <span className="text-emerald-400">tea</span>: <span className="text-orange-400">Infinity</span>,
            </div>
            <div className="text-slate-400">{'};'}</div>
          </div>

          {/* Stats grid */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 content-start">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/50 p-4 text-center hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 transition-all group"
                >
                  <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{stat.value}</div>
                  <div className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
