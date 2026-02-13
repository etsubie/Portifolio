import React from 'react';
import { Code2, Server, Layers } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Building modern, responsive user interfaces with React and TypeScript that deliver exceptional user experiences across all devices.',
    color: 'blue' as const,
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Developing robust server-side applications and RESTful APIs using Laravel, Node.js, and Express for reliable, scalable systems.',
    color: 'purple' as const,
  },
  {
    icon: Layers,
    title: 'Full-Stack Solutions',
    description:
      'End-to-end application development from concept to deployment, combining frontend and backend expertise for complete solutions.',
    color: 'orange' as const,
  },
];

const colorMap = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    icon: 'text-blue-600 dark:text-blue-400',
    border: 'group-hover:border-blue-300 dark:group-hover:border-blue-700',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    icon: 'text-purple-600 dark:text-purple-400',
    border: 'group-hover:border-purple-300 dark:group-hover:border-purple-700',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    icon: 'text-orange-600 dark:text-orange-400',
    border: 'group-hover:border-orange-300 dark:group-hover:border-orange-700',
  },
};

const Services: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What I Do
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              I offer comprehensive development services to help bring your ideas to life with
              clean code and modern technologies.
            </p>
          </div>

          <div
            ref={ref}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {services.map((service, index) => {
              const colors = colorMap[service.color];
              return (
                <div
                  key={index}
                  className={`group bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${colors.border}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-4 rounded-xl ${colors.bg} mb-6`}>
                    <service.icon className={colors.icon} size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
