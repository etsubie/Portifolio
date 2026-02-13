import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const platformIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
};

const Sidebar: React.FC = () => {
  const { heroContent, contactContent } = usePortfolio();

  const profileImage = heroContent?.profileImage;
  const resumeUrl = heroContent?.resumeUrl;
  const name = heroContent?.name ?? '';
  const badge = heroContent?.badge ?? '';
  const email = contactContent?.email ?? '';
  const phone = contactContent?.phone ?? '';
  const location = contactContent?.location ?? '';
  const socials = contactContent?.socials ?? [];

  return (
    <aside className="sticky top-24">
      <div className="bg-white dark:bg-slate-900/80 dark:backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-lg shadow-slate-200/50 dark:shadow-black/20 flex flex-col overflow-hidden">

        {/* Profile photo + name */}
        <div className="flex flex-col items-center px-6 pt-8 pb-5 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-800/50 dark:to-transparent">
          {profileImage ? (
            <div className="w-[180px] rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-lg ring-4 ring-slate-100 dark:ring-slate-800 mb-5 bg-slate-50 dark:bg-slate-800">
              <img src={profileImage} alt={name} className="w-full h-auto" />
            </div>
          ) : (
            <div className="w-[180px] h-[180px] rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-lg ring-4 ring-slate-100 dark:ring-slate-800 mb-5 flex items-center justify-center">
              <span className="text-5xl font-bold text-slate-300 dark:text-slate-500">{name.charAt(0) || '?'}</span>
            </div>
          )}

          <h2 className="text-lg font-bold text-slate-900 dark:text-white text-center leading-tight">{name}</h2>

          {badge && (
            <span className="mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-800/50 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              {badge}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Contact info */}
        <div className="px-5 py-5 space-y-4">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                <Mail className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email</p>
                <p className="text-[13px] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">{email}</p>
              </div>
            </a>
          )}

          {phone && (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                <Phone className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Phone</p>
                <p className="text-[13px] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{phone}</p>
              </div>
            </a>
          )}

          {location && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <MapPin className="text-slate-400 dark:text-slate-500" size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Location</p>
                <p className="text-[13px] text-slate-600 dark:text-slate-400">{location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Social links + resume */}
        <div className="px-5 py-5 space-y-4">
          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map(soc => {
                const Icon = platformIcons[soc.platform] || Globe;
                return (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                    title={soc.name}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          )}

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-black/20 transition-all"
            >
              <FileText size={14} />
              View Resume
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
