/**
 * Database operations – wraps Supabase queries and maps between
 * PostgreSQL snake_case columns and TypeScript camelCase interfaces.
 */
import { supabase } from './supabase';
import type {
  Project,
  SkillCategory,
  HeroContent,
  AboutContent,
  ContactContent,
  ServiceItem,
  FooterContent,
} from '../context/PortfolioContext';

// ════════════════════════════════════════════════
// Row ↔ App mappers
// ════════════════════════════════════════════════

/* eslint-disable @typescript-eslint/no-explicit-any */

function toProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    longDescription: row.long_description ?? '',
    image: row.image ?? '',
    tags: row.tags ?? [],
    demoLink: row.demo_link ?? '',
    codeLink: row.code_link ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function fromProject(p: Project) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    long_description: p.longDescription,
    image: p.image,
    tags: p.tags,
    demo_link: p.demoLink,
    code_link: p.codeLink,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  };
}

function toSkillCategory(row: any): SkillCategory {
  return {
    id: row.id,
    name: row.name,
    colorScheme: row.color_scheme ?? 'blue',
    skills: row.skills ?? [],
  };
}

function fromSkillCategory(c: SkillCategory) {
  return {
    id: c.id,
    name: c.name,
    color_scheme: c.colorScheme,
    skills: c.skills,
  };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// ════════════════════════════════════════════════
// Projects
// ════════════════════════════════════════════════

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`fetchProjects: ${error.message}`);
  return (data ?? []).map(toProject);
}

export async function upsertProject(project: Project): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .upsert(fromProject(project));
  if (error) throw new Error(`upsertProject: ${error.message}`);
}

export async function removeProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`removeProject: ${error.message}`);
}

// ════════════════════════════════════════════════
// Skill categories
// ════════════════════════════════════════════════

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const { data, error } = await supabase
    .from('skill_categories')
    .select('*');
  if (error) throw new Error(`fetchSkillCategories: ${error.message}`);
  return (data ?? []).map(toSkillCategory);
}

export async function saveAllSkillCategories(categories: SkillCategory[]): Promise<void> {
  // Upsert all incoming categories
  const rows = categories.map(fromSkillCategory);
  if (rows.length > 0) {
    const { error } = await supabase.from('skill_categories').upsert(rows);
    if (error) throw new Error(`upsert skill_categories: ${error.message}`);
  }

  // Remove categories that no longer exist
  const keepIds = categories.map((c) => c.id);
  const { data: existing } = await supabase.from('skill_categories').select('id');
  const deleteIds = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
  if (deleteIds.length > 0) {
    const { error } = await supabase.from('skill_categories').delete().in('id', deleteIds);
    if (error) throw new Error(`delete stale skill_categories: ${error.message}`);
  }
}

// ════════════════════════════════════════════════
// Site settings (hero / about / contact as JSONB)
// ════════════════════════════════════════════════

export async function fetchSetting<T>(key: string): Promise<T | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  if (error) throw new Error(`fetchSetting(${key}): ${error.message}`);
  return (data?.value as T) ?? null;
}

export async function saveSetting(key: string, value: HeroContent | AboutContent | ContactContent | ServiceItem[] | FooterContent): Promise<void> {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(`saveSetting(${key}): ${error.message}`);
}
