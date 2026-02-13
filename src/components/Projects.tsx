import React, { useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePortfolio, type Project } from '../context/PortfolioContext';

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const { projects } = usePortfolio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>

          <div
            ref={ref}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                      <span className="text-4xl font-bold text-blue-300 dark:text-slate-600">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full flex justify-end space-x-2">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                          aria-label="View code"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors inline-flex items-center gap-1 group/btn"
                  >
                    View Details
                    <span className="group-hover/btn:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-slate-200 dark:border-slate-700">
            <div className="relative h-56 sm:h-72">
              {activeProject.image ? (
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <span className="text-6xl font-bold text-blue-300 dark:text-slate-600">
                    {activeProject.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {activeProject.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-5">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {activeProject.longDescription || activeProject.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {activeProject.demoLink && (
                  <a
                    href={activeProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm flex items-center gap-2 font-medium"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {activeProject.codeLink && (
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors flex items-center gap-2 font-medium"
                  >
                    <Github size={16} />
                    View Code
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
