import React, { useState } from 'react';
import { Calendar, Briefcase, GraduationCap, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';

const VISIBLE_COUNT = 4;

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { aboutContent, contactContent } = usePortfolio();
  const [showAllExp, setShowAllExp] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);

  if (!aboutContent) return null;

  const paragraphs = aboutContent.paragraphs ?? [];
  const experiences = aboutContent.experiences ?? [];
  const education = aboutContent.education ?? [];
  const location = contactContent?.location ?? '';

  const visibleExp = showAllExp ? experiences : experiences.slice(0, VISIBLE_COUNT);
  const visibleEdu = showAllEdu ? education : education.slice(0, VISIBLE_COUNT);
  const hasMoreExp = experiences.length > VISIBLE_COUNT;
  const hasMoreEdu = education.length > VISIBLE_COUNT;

  return (
    <section id="about" className="py-20 px-4 sm:px-6">
      <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">01.</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <div className="h-px flex-1 max-w-[200px] bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Bio */}
        {paragraphs.length > 0 && (
          <div className="mb-12">
            {paragraphs.map((p, i) => (
              <p key={i} className={`text-base text-slate-600 dark:text-slate-400 leading-relaxed ${i < paragraphs.length - 1 ? 'mb-4' : ''}`}>{p}</p>
            ))}
            {location && (
              <div className="flex items-center gap-2 mt-5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}
          </div>
        )}

        {/* ═══════ Education ═══════ */}
        {education.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="text-blue-600 dark:text-blue-400" size={18} />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Education</h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">{education.length}</span>
            </div>

            <div className="space-y-3">
              {visibleEdu.map((edu) => (
                <div
                  key={edu.id}
                  className="group bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/50 p-4 hover:shadow-md hover:border-blue-200/60 dark:hover:border-blue-800/40 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {edu.image ? (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white">
                        <img src={edu.image} alt={edu.institution} className="w-full h-full object-contain p-1" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center">
                        <GraduationCap size={18} className="text-blue-500 dark:text-blue-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{edu.degree}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{edu.institution}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                        <Calendar size={11} />
                        <span>{edu.period}</span>
                      </div>
                      {edu.description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreEdu && (
              <button
                onClick={() => setShowAllEdu(prev => !prev)}
                className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mx-auto"
              >
                {showAllEdu ? (
                  <>Show less <ChevronUp size={16} /></>
                ) : (
                  <>View all {education.length} entries <ChevronDown size={16} /></>
                )}
              </button>
            )}
          </div>
        )}

        {/* ═══════ Work Experience ═══════ */}
        {experiences.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Briefcase className="text-blue-600 dark:text-blue-400" size={18} />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Experience</h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">{experiences.length} role{experiences.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {visibleExp.map((exp) => (
                <div
                  key={exp.id}
                  className="group bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/50 p-4 hover:shadow-md hover:border-blue-200/60 dark:hover:border-blue-800/40 transition-all duration-300 relative"
                >
                  {exp.isCurrent && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200/80 dark:border-green-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Current</span>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    {exp.image ? (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white">
                        <img src={exp.image} alt={exp.company} className="w-full h-full object-contain p-0.5" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/50 flex items-center justify-center">
                        <Briefcase size={16} className="text-slate-400 dark:text-slate-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{exp.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2.5 text-xs text-slate-400 dark:text-slate-500">
                    <Calendar size={11} />
                    <span>{exp.period}</span>
                  </div>

                  {exp.description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2 line-clamp-3 group-hover:line-clamp-none transition-all">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {hasMoreExp && (
              <button
                onClick={() => setShowAllExp(prev => !prev)}
                className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mx-auto"
              >
                {showAllExp ? (
                  <>Show less <ChevronUp size={16} /></>
                ) : (
                  <>View all {experiences.length} roles <ChevronDown size={16} /></>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
