import React from 'react';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { aboutContent } = usePortfolio();

  if (!aboutContent) return null;

  const paragraphs = aboutContent.paragraphs ?? [];
  const experiences = aboutContent.experiences ?? [];
  const education = aboutContent.education ?? [];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Bio */}
            {paragraphs.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-10 mb-10">
                {paragraphs.map((p, i) => (
                  <p key={i} className={`text-lg text-slate-700 dark:text-slate-300 leading-relaxed ${i < paragraphs.length - 1 ? 'mb-6' : ''}`}>{p}</p>
                ))}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Work Experience */}
              {experiences.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4"><Briefcase className="text-blue-600 dark:text-blue-400" size={24} /></div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Work Experience</h3>
                  </div>
                  <div className="space-y-6 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                    {experiences.map(exp => (
                      <div key={exp.id} className="relative">
                        <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${exp.isCurrent ? 'bg-blue-500' : 'bg-blue-300 dark:bg-blue-700'}`} />
                        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200">{exp.title}</h4>
                        <div className="flex items-center mt-1 mb-2 flex-wrap gap-x-2">
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                            <Calendar size={14} className="mr-1" /><p>{exp.period}</p>
                          </div>
                        </div>
                        {exp.description && <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4"><GraduationCap className="text-blue-600 dark:text-blue-400" size={24} /></div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Education</h3>
                  </div>
                  <div className="space-y-6 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                    {education.map(edu => (
                      <div key={edu.id} className="relative">
                        <div className="absolute -left-[25px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800" />
                        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200">{edu.degree}</h4>
                        <div className="flex items-center mt-1 mb-2 flex-wrap gap-x-2">
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                            <Calendar size={14} className="mr-1" /><p>{edu.period}</p>
                          </div>
                        </div>
                        {edu.description && <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
