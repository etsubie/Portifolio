import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as db from '../lib/db';

// ════════════════════════════════════════════════
// Types
// ════════════════════════════════════════════════

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  createdAt: string;
  updatedAt: string;
}

export type SkillColorScheme = 'blue' | 'purple' | 'emerald' | 'orange' | 'rose' | 'cyan';

export interface SkillCategory {
  id: string;
  name: string;
  colorScheme: SkillColorScheme;
  skills: string[];
}

export interface HeroContent {
  name: string;
  badge: string;
  roles: string[];
  description: string;
  stats: { value: string; label: string }[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  isCurrent: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface AboutContent {
  paragraphs: string[];
  experiences: Experience[];
  education: EducationItem[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'other';
}

export interface ContactContent {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
}

// ════════════════════════════════════════════════
// Color scheme map (shared by display + admin)
// ════════════════════════════════════════════════

export const skillColorSchemes: Record<
  SkillColorScheme,
  { badge: string; badgeText: string; iconBg: string }
> = {
  blue: {
    badge: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  purple: {
    badge: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  emerald: {
    badge: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  orange: {
    badge: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-700 dark:text-orange-300',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
  },
  rose: {
    badge: 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
  },
  cyan: {
    badge: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
};

// ════════════════════════════════════════════════
// Context type
// ════════════════════════════════════════════════

interface PortfolioContextType {
  projects: Project[];
  addProject: (p: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, u: Partial<Omit<Project, 'id' | 'createdAt'>>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  skillCategories: SkillCategory[];
  saveSkillCategories: (c: SkillCategory[]) => Promise<void>;

  heroContent: HeroContent | null;
  saveHeroContent: (c: HeroContent) => Promise<void>;

  aboutContent: AboutContent | null;
  saveAboutContent: (c: AboutContent) => Promise<void>;

  contactContent: ContactContent | null;
  saveContactContent: (c: ContactContent) => Promise<void>;

  /** true while the initial fetch from Supabase is in progress */
  loading: boolean;
  /** non-null when the initial fetch failed */
  error: string | null;
}

// ════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════

export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// ════════════════════════════════════════════════
// Provider
// ════════════════════════════════════════════════

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch everything from Supabase on mount ──
  useEffect(() => {
    const load = async () => {
      try {
        const [dbProjects, dbSkills, dbHero, dbAbout, dbContact] = await Promise.all([
          db.fetchProjects(),
          db.fetchSkillCategories(),
          db.fetchSetting<HeroContent>('hero'),
          db.fetchSetting<AboutContent>('about'),
          db.fetchSetting<ContactContent>('contact'),
        ]);

        setProjects(dbProjects);
        setSkillCategories(dbSkills);
        setHeroContent(dbHero);
        setAboutContent(dbAbout);
        setContactContent(dbContact);
      } catch (err) {
        console.error('[PortfolioContext] Failed to load from Supabase:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ── Projects CRUD ──
  const addProject = useCallback(async (p: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = { ...p, id: `proj-${generateId()}`, createdAt: now, updatedAt: now };
    await db.upsertProject(newProject);
    setProjects((prev) => [newProject, ...prev]);
  }, []);

  const updateProject = useCallback(async (id: string, u: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...u, updatedAt: new Date().toISOString() } : p
      );
      const target = updated.find((p) => p.id === id);
      if (target) db.upsertProject(target).catch(console.error);
      return updated;
    });
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await db.removeProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── Settings save ──
  const saveSkillCategories = useCallback(async (c: SkillCategory[]) => {
    await db.saveAllSkillCategories(c);
    setSkillCategories(c);
  }, []);

  const saveHeroContent = useCallback(async (c: HeroContent) => {
    await db.saveSetting('hero', c);
    setHeroContent(c);
  }, []);

  const saveAboutContent = useCallback(async (c: AboutContent) => {
    await db.saveSetting('about', c);
    setAboutContent(c);
  }, []);

  const saveContactContent = useCallback(async (c: ContactContent) => {
    await db.saveSetting('contact', c);
    setContactContent(c);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        projects, addProject, updateProject, deleteProject,
        skillCategories, saveSkillCategories,
        heroContent, saveHeroContent,
        aboutContent, saveAboutContent,
        contactContent, saveContactContent,
        loading,
        error,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
