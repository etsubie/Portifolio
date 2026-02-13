import React, { useState } from 'react';
import { ExternalLink, Github, X, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio, type Project } from '../context/PortfolioContext';

const VISIBLE_COUNT = 5; // 1 featured + 4 grid cards

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { projects } = usePortfolio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const hasMore = projects.length > VISIBLE_COUNT;
  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT);
  const otherProjects = visibleProjects.slice(1);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">04.</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h2>
        <div className="h-px flex-1 max-w-[200px] bg-slate-200 dark:bg-slate-700" />
      </div>

      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Featured project */}
        {projects[0] && (
          <div className="mb-6 group">
            <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 relative h-56 md:h-auto overflow-hidden">
                  {projects[0].image ? (
                    <img src={projects[0].image} alt={projects[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full min-h-[220px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                      <span className="text-5xl font-bold text-blue-200 dark:text-slate-600">{projects[0].title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-3 p-6 sm:p-7 flex flex-col justify-center">
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">Featured Project</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{projects[0].title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{projects[0].description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {projects[0].tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    {projects[0].demoLink && (
                      <a href={projects[0].demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Live Demo <ArrowUpRight size={14} />
                      </a>
                    )}
                    {projects[0].codeLink && (
                      <a href={projects[0].codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <Github size={15} /> Source
                      </a>
                    )}
                    <button onClick={() => setActiveProject(projects[0])} className="text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 ml-auto">
                      Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 p-5 hover:shadow-lg hover:border-blue-200/60 dark:hover:border-blue-800/40 transition-all duration-300 flex flex-col"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {project.image && (
                  <div className="relative h-36 -mx-5 -mt-5 mb-4 rounded-t-2xl overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                        <Github size={15} />
                      </a>
                    )}
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-slate-400 dark:text-slate-500">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show more / less toggle */}
        {hasMore && (
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="mt-6 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mx-auto"
          >
            {showAll ? (
              <>Show less <ChevronUp size={16} /></>
            ) : (
              <>View all {projects.length} projects <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>

      {/* Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setActiveProject(null); }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-slate-200 dark:border-slate-700">
            <div className="relative h-48 sm:h-64">
              {activeProject.image ? (
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <span className="text-6xl font-bold text-blue-200 dark:text-slate-600">{activeProject.title.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{activeProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {activeProject.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-800">{tag}</span>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{activeProject.longDescription || activeProject.description}</p>
              <div className="flex flex-wrap gap-3">
                {activeProject.demoLink && (
                  <a href={activeProject.demoLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm flex items-center gap-2 font-medium">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {activeProject.codeLink && (
                  <a href={activeProject.codeLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-colors flex items-center gap-2 font-medium">
                    <Github size={16} /> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
