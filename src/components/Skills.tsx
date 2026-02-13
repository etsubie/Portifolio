import React from 'react';
import { Monitor, Server, Database, Wrench } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio, skillColorSchemes, type SkillColorScheme } from '../context/PortfolioContext';

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
};
const defaultIcon = Wrench;

function pickIcon(name: string) {
  const lower = name.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return Icon;
  }
  return defaultIcon;
}

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { skillCategories } = usePortfolio();

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Skills</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies I work with to build modern, performant applications.
            </p>
          </div>

          <div
            ref={ref}
            className={`grid sm:grid-cols-2 gap-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {skillCategories.map((category, index) => {
              const colors = skillColorSchemes[category.colorScheme as SkillColorScheme] || skillColorSchemes.blue;
              const Icon = pickIcon(category.name);

              return (
                <div
                  key={category.id}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-5">
                    <div className={`p-2.5 rounded-lg ${colors.iconBg} mr-3`}>
                      <Icon className={colors.badgeText} size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border ${colors.badge} ${colors.badgeText} transition-all hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
