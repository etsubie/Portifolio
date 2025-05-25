import React from 'react';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: 'React', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'JavaScript', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'HTML/CSS', category: 'frontend' },
    { name: 'Laravel', category: 'backend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Express.js', category: 'backend' },
    { name: 'RESTful APIs', category: 'backend' },
    { name: 'Git/GitHub', category: 'tools' },
    { name: 'Slack', category: 'tools' },
    { name: 'Jira', category: 'tools' },


  ];

  const frontend = skills.filter(skill => skill.category === 'frontend');
  const backend = skills.filter(skill => skill.category === 'backend');
  const tools = skills.filter(skill => skill.category === 'tools');

  const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => (
    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
      {skill.name}
    </span>
  );

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">My Skills</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              I specialize in building intuitive, responsive, and scalable applications using modern technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Frontend
              </h3>
              <div className="flex flex-wrap">
                {frontend.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Backend
              </h3>
              <div className="flex flex-wrap">
                {backend.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Tools & Others
              </h3>
              <div className="flex flex-wrap">
                {tools.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;