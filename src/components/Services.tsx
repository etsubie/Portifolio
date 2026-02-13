import React, { useState } from 'react';
import { Code2, Server, Layers, Smartphone, Database, Globe, Shield, Palette, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';

const VISIBLE_COUNT = 3;

/* Map icon name strings (from admin) to Lucide components */
const iconMap: Record<string, React.ElementType> = {
  Code2, Server, Layers, Smartphone, Database, Globe, Shield, Palette, Terminal,
};

const Services: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { services } = usePortfolio();
  const [showAll, setShowAll] = useState(false);

  if (services.length === 0) return null;

  const hasMore = services.length > VISIBLE_COUNT;
  const visible = showAll ? services : services.slice(0, VISIBLE_COUNT);

  return (
    <section className="py-20 px-4 sm:px-6">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">02.</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What I Do</h2>
        <div className="h-px flex-1 max-w-[200px] bg-slate-200 dark:bg-slate-700" />
      </div>

      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((service, index) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <div
                key={service.id}
                className="group bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/50 p-6 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="inline-flex p-3 rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                  <Icon className="text-slate-500 dark:text-slate-400" size={22} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="mt-6 flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mx-auto"
          >
            {showAll ? (<>Show less <ChevronUp size={16} /></>) : (<>View all {services.length} services <ChevronDown size={16} /></>)}
          </button>
        )}
      </div>
    </section>
  );
};

export default Services;
