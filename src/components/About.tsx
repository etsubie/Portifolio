import React from 'react';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-10">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              I'm a dedicated Software Engineer and freelance frontend developer with a passion for creating 
              elegant solutions to complex problems. Currently completing my degree and set to graduate in 
              June 2025, I've been honing my skills both academically and professionally.
            </p>
            
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              My approach combines technical expertise with creative problem-solving to build 
              intuitive, responsive, and scalable applications. I'm committed to writing clean, 
              maintainable code and continuously learning new technologies to stay at the forefront 
              of web development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-transform hover:translate-y-[-4px]">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Work Experience</h3>
              </div>
              
              <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200">Software Engineer Intern</h4>
                  <div className="flex items-center mt-1 mb-2 flex-wrap">
                    <p className="text-blue-600 dark:text-blue-400 font-medium mr-2">Omishtu-Joy Tech Solutions</p>
                    <span className="mx-2 text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mt-1 sm:mt-0">
                      <Calendar size={14} className="mr-1" />
                      <p>Sep 2024 - Dec 2024</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Gained hands-on experience developing web applications using Laravel and modern frontend technologies.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200">Frontend Developer</h4>
                  <div className="flex items-center mt-1 mb-2 flex-wrap">
                    <p className="text-blue-600 dark:text-blue-400 font-medium mr-2">Amplitude Ventures AS</p>
                    <span className="mx-2 text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mt-1 sm:mt-0">
                      <Calendar size={14} className="mr-1" />
                      <p>Feb 2025 - Present</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Contributing to modern web solutions with a focus on performance and usability.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-transform hover:translate-y-[-4px]">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Education</h3>
              </div>
              
              <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200">Bachelor's Degree in Software Engineering</h4>
                <div className="flex items-center mt-1 mb-2">
                  <p className="text-blue-600 dark:text-blue-400 font-medium">University of Technology</p>
                  <span className="mx-2 text-slate-400 dark:text-slate-600">•</span>
                  <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <p>Expected Graduation: Jun 2025</p>
                  </div>
                </div>
                {/* <p className="text-slate-700 dark:text-slate-300">
                  Specializing in Web Technologies and Software Development.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;