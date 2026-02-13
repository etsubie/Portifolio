import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { skillCategories } = usePortfolio();

  return (
    <section id="skills" className="py-20 px-4 sm:px-6">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">03.</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skills & Tools</h2>
        <div className="h-px flex-1 max-w-[200px] bg-slate-200 dark:bg-slate-700" />
      </div>

      <div
        ref={ref}
        className={`space-y-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {skillCategories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-500 dark:text-slate-400">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 transition-all hover:shadow-sm hover:scale-[1.03] cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
