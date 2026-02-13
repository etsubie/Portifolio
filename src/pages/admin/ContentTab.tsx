import React, { useState, useRef } from 'react';
import { Save, Plus, X, Trash2, ChevronDown, ChevronUp, Loader2, Upload, FileText } from 'lucide-react';
import {
  usePortfolio,
  generateId,
  type HeroContent,
  type Experience,
  type EducationItem,
  type ContactContent,
  type SocialLink,
  type ServiceItem,
  type FooterContent,
} from '../../context/PortfolioContext';
import { uploadImage, deleteImage } from '../../lib/storage';

interface Props { showToast: (msg: string, type?: 'success' | 'error') => void; }

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all';
const labelCls = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';

const Section: React.FC<{ title: string; open: boolean; onToggle: () => void; children: React.ReactNode }> = ({ title, open, onToggle, children }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
    <button type="button" onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {open ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
    </button>
    {open && <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-5">{children}</div>}
  </div>
);

const defaultHero: HeroContent = { name: '', badge: '', roles: [], description: '', stats: [], profileImage: undefined, resumeUrl: undefined };
const defaultContact: ContactContent = { email: '', phone: '', location: '', socials: [] };

const ContentTab: React.FC<Props> = ({ showToast }) => {
  const { heroContent, saveHeroContent, aboutContent, saveAboutContent, contactContent, saveContactContent, services: dbServices, saveServices, footerContent, saveFooterContent } = usePortfolio();
  const [openSection, setOpenSection] = useState<string>('hero');
  const toggle = (id: string) => setOpenSection(prev => prev === id ? '' : id);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingImg, setUploadingImg] = useState<string | null>(null);
  const heroFileRef = useRef<HTMLInputElement | null>(null);
  const resumeFileRef = useRef<HTMLInputElement | null>(null);
  const expFileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const eduFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleImageUpload = async (
    file: File,
    id: string,
    folder: string,
    type: 'experience' | 'education',
  ) => {
    setUploadingImg(id);
    try {
      const url = await uploadImage(file, folder);
      if (type === 'experience') {
        setExperiences(p => p.map(x => x.id === id ? { ...x, image: url } : x));
      } else {
        setEducation(p => p.map(x => x.id === id ? { ...x, image: url } : x));
      }
      showToast('Image uploaded!');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploadingImg(null);
    }
  };

  const handleImageRemove = async (id: string, imageUrl: string | undefined, type: 'experience' | 'education') => {
    if (imageUrl) {
      try { await deleteImage(imageUrl); } catch { /* ignore */ }
    }
    if (type === 'experience') {
      setExperiences(p => p.map(x => x.id === id ? { ...x, image: undefined } : x));
    } else {
      setEducation(p => p.map(x => x.id === id ? { ...x, image: undefined } : x));
    }
  };

  // ── Hero state ──
  const [hero, setHero] = useState<HeroContent>(heroContent ?? defaultHero);
  const [roleInput, setRoleInput] = useState('');
  const addRole = () => { const r = roleInput.trim(); if (r && !hero.roles.includes(r)) { setHero(p => ({ ...p, roles: [...p.roles, r] })); setRoleInput(''); } };

  // ── About state ──
  const [paragraphs, setParagraphs] = useState<string[]>(aboutContent?.paragraphs ?? []);
  const [experiences, setExperiences] = useState<Experience[]>(aboutContent?.experiences ?? []);
  const [education, setEducation] = useState<EducationItem[]>(aboutContent?.education ?? []);

  // ── Contact state ──
  const [contact, setContact] = useState<ContactContent>(contactContent ?? defaultContact);

  // ── Services state ──
  const [svcList, setSvcList] = useState<ServiceItem[]>(dbServices ?? []);

  // ── Footer state ──
  const [footer, setFooter] = useState<FooterContent>(footerContent ?? { text: 'Built with', authorName: '' });

  const save = async (key: string, fn: () => Promise<void>, msg: string) => {
    setSaving(key);
    try {
      await fn();
      showToast(msg);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Save failed.', 'error');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-4">

      {/* ════════════ HERO SECTION ════════════ */}
      <Section title="Hero Section" open={openSection === 'hero'} onToggle={() => toggle('hero')}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Display Name</label><input type="text" value={hero.name} onChange={e => setHero(p => ({ ...p, name: e.target.value }))} className={inputCls} /></div>
            <div><label className={labelCls}>Badge Text</label><input type="text" value={hero.badge} onChange={e => setHero(p => ({ ...p, badge: e.target.value }))} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Description</label><textarea value={hero.description} onChange={e => setHero(p => ({ ...p, description: e.target.value }))} rows={3} className={`${inputCls} resize-none`} /></div>
          <div>
            <label className={labelCls}>Typing Roles</label>
            <div className="flex flex-wrap gap-2 mb-2">{hero.roles.map(r => <span key={r} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">{r}<button type="button" onClick={() => setHero(p => ({ ...p, roles: p.roles.filter(x => x !== r) }))} className="hover:text-red-500"><X size={14} /></button></span>)}</div>
            <div className="flex gap-2"><input type="text" value={roleInput} onChange={e => setRoleInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addRole(); } }} className={`flex-1 ${inputCls}`} placeholder="Type a role, press Enter" /><button type="button" onClick={addRole} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-sm text-slate-700 dark:text-slate-300">Add</button></div>
          </div>
          <div>
            <label className={labelCls}>Stats</label>
            <div className="space-y-2">
              {hero.stats.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" value={s.value} onChange={e => setHero(p => ({ ...p, stats: p.stats.map((st, idx) => idx === i ? { ...st, value: e.target.value } : st) }))} className={`${inputCls} w-24`} placeholder="5+" />
                  <input type="text" value={s.label} onChange={e => setHero(p => ({ ...p, stats: p.stats.map((st, idx) => idx === i ? { ...st, label: e.target.value } : st) }))} className={`${inputCls} flex-1`} placeholder="Projects Built" />
                  <button type="button" onClick={() => setHero(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) }))} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setHero(p => ({ ...p, stats: [...p.stats, { value: '', label: '' }] }))} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Stat</button>
            </div>
          </div>
          {/* Profile Image */}
          <div>
            <label className={labelCls}>Profile Picture</label>
            {hero.profileImage ? (
              <div className="flex items-center gap-4">
                <img src={hero.profileImage} alt="Profile" className="w-24 h-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                <button
                  type="button"
                  onClick={async () => {
                    if (hero.profileImage) {
                      try { await deleteImage(hero.profileImage); } catch { /* ignore */ }
                    }
                    setHero(p => ({ ...p, profileImage: undefined }));
                  }}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={heroFileRef}
                  className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImg('hero-profile');
                    try {
                      const url = await uploadImage(file, 'profile');
                      setHero(p => ({ ...p, profileImage: url }));
                      showToast('Profile picture uploaded!');
                    } catch (err) {
                      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
                    } finally {
                      setUploadingImg(null);
                    }
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  disabled={uploadingImg === 'hero-profile'}
                  onClick={() => heroFileRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60"
                >
                  {uploadingImg === 'hero-profile' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploadingImg === 'hero-profile' ? 'Uploading...' : 'Upload photo'}
                </button>
              </div>
            )}
          </div>
          {/* Resume Upload */}
          <div>
            <label className={labelCls}>Resume / CV</label>
            {hero.resumeUrl ? (
              <div className="flex items-center gap-4">
                <a href={hero.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <FileText size={14} />
                  View uploaded resume
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    if (hero.resumeUrl) {
                      try { await deleteImage(hero.resumeUrl); } catch { /* ignore */ }
                    }
                    setHero(p => ({ ...p, resumeUrl: undefined }));
                  }}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={resumeFileRef}
                  className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImg('hero-resume');
                    try {
                      const url = await uploadImage(file, 'resume');
                      setHero(p => ({ ...p, resumeUrl: url }));
                      showToast('Resume uploaded!');
                    } catch (err) {
                      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
                    } finally {
                      setUploadingImg(null);
                    }
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  disabled={uploadingImg === 'hero-resume'}
                  onClick={() => resumeFileRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60"
                >
                  {uploadingImg === 'hero-resume' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploadingImg === 'hero-resume' ? 'Uploading...' : 'Upload resume (PDF)'}
                </button>
              </div>
            )}
          </div>
          <button disabled={saving === 'hero'} onClick={() => save('hero', () => saveHeroContent(hero), 'Hero section saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
            {saving === 'hero' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Hero
          </button>
        </div>
      </Section>

      {/* ════════════ BIO ════════════ */}
      <Section title="About - Bio" open={openSection === 'bio'} onToggle={() => toggle('bio')}>
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <div key={i} className="relative">
              <textarea value={p} onChange={e => setParagraphs(prev => prev.map((x, idx) => idx === i ? e.target.value : x))} rows={3} className={`${inputCls} resize-none pr-10`} placeholder="Write a paragraph..." />
              {paragraphs.length > 1 && <button type="button" onClick={() => setParagraphs(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><X size={16} /></button>}
            </div>
          ))}
          <button type="button" onClick={() => setParagraphs(p => [...p, ''])} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Paragraph</button>
          <div>
            <button disabled={saving === 'bio'} onClick={() => save('bio', () => saveAboutContent({ paragraphs, experiences, education }), 'Bio saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
              {saving === 'bio' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Bio
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════ WORK EXPERIENCE ════════════ */}
      <Section title="About - Work Experience" open={openSection === 'experience'} onToggle={() => toggle('experience')}>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 relative">
              <button type="button" onClick={() => setExperiences(p => p.filter(e => e.id !== exp.id))} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>Job Title</label><input type="text" value={exp.title} onChange={e => setExperiences(p => p.map(x => x.id === exp.id ? { ...x, title: e.target.value } : x))} className={inputCls} /></div>
                <div><label className={labelCls}>Company</label><input type="text" value={exp.company} onChange={e => setExperiences(p => p.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x))} className={inputCls} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>Period</label><input type="text" value={exp.period} onChange={e => setExperiences(p => p.map(x => x.id === exp.id ? { ...x, period: e.target.value } : x))} className={inputCls} placeholder="Feb 2025 - Present" /></div>
                <div className="flex items-end pb-1"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={exp.isCurrent} onChange={e => setExperiences(p => p.map(x => x.id === exp.id ? { ...x, isCurrent: e.target.checked } : x))} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /><span className="text-sm text-slate-700 dark:text-slate-300">Current position</span></label></div>
              </div>
              <div><label className={labelCls}>Description</label><textarea value={exp.description} onChange={e => setExperiences(p => p.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x))} rows={2} className={`${inputCls} resize-none`} /></div>
              {/* Image upload */}
              <div>
                <label className={labelCls}>Image</label>
                {exp.image ? (
                  <div className="flex items-center gap-3">
                    <img src={exp.image} alt={exp.company} className="w-20 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                    <button type="button" onClick={() => handleImageRemove(exp.id, exp.image, 'experience')} className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={el => { expFileRefs.current[exp.id] = el; }}
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, exp.id, 'experience', 'experience');
                        e.target.value = '';
                      }}
                    />
                    <button
                      type="button"
                      disabled={uploadingImg === exp.id}
                      onClick={() => expFileRefs.current[exp.id]?.click()}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60"
                    >
                      {uploadingImg === exp.id ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploadingImg === exp.id ? 'Uploading...' : 'Upload image'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setExperiences(p => [...p, { id: `exp-${generateId()}`, title: '', company: '', period: '', description: '', isCurrent: false, image: undefined }])} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Experience</button>
          <div>
            <button disabled={saving === 'exp'} onClick={() => save('exp', () => saveAboutContent({ paragraphs, experiences, education }), 'Experience saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
              {saving === 'exp' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Experience
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════ EDUCATION ════════════ */}
      <Section title="About - Education" open={openSection === 'education'} onToggle={() => toggle('education')}>
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 relative">
              <button type="button" onClick={() => setEducation(p => p.filter(e => e.id !== edu.id))} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>Degree</label><input type="text" value={edu.degree} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x))} className={inputCls} /></div>
                <div><label className={labelCls}>Institution</label><input type="text" value={edu.institution} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, institution: e.target.value } : x))} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>Period</label><input type="text" value={edu.period} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, period: e.target.value } : x))} className={inputCls} /></div>
              <div><label className={labelCls}>Description</label><textarea value={edu.description} onChange={e => setEducation(p => p.map(x => x.id === edu.id ? { ...x, description: e.target.value } : x))} rows={2} className={`${inputCls} resize-none`} /></div>
              {/* Image upload */}
              <div>
                <label className={labelCls}>Image</label>
                {edu.image ? (
                  <div className="flex items-center gap-3">
                    <img src={edu.image} alt={edu.institution} className="w-20 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                    <button type="button" onClick={() => handleImageRemove(edu.id, edu.image, 'education')} className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={el => { eduFileRefs.current[edu.id] = el; }}
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, edu.id, 'education', 'education');
                        e.target.value = '';
                      }}
                    />
                    <button
                      type="button"
                      disabled={uploadingImg === edu.id}
                      onClick={() => eduFileRefs.current[edu.id]?.click()}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60"
                    >
                      {uploadingImg === edu.id ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploadingImg === edu.id ? 'Uploading...' : 'Upload image'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setEducation(p => [...p, { id: `edu-${generateId()}`, degree: '', institution: '', period: '', description: '', image: undefined }])} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Education</button>
          <div>
            <button disabled={saving === 'edu'} onClick={() => save('edu', () => saveAboutContent({ paragraphs, experiences, education }), 'Education saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
              {saving === 'edu' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Education
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════ CONTACT INFO ════════════ */}
      <Section title="Contact Information" open={openSection === 'contact'} onToggle={() => toggle('contact')}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Email</label><input type="email" value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} className={inputCls} /></div>
            <div><label className={labelCls}>Phone</label><input type="text" value={contact.phone} onChange={e => setContact(p => ({ ...p, phone: e.target.value }))} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Location</label><input type="text" value={contact.location} onChange={e => setContact(p => ({ ...p, location: e.target.value }))} className={inputCls} /></div>
          <div>
            <label className={labelCls}>Social Links</label>
            <div className="space-y-2">
              {contact.socials.map(soc => (
                <div key={soc.id} className="flex gap-2 items-center">
                  <select value={soc.platform} onChange={e => setContact(p => ({ ...p, socials: p.socials.map(s => s.id === soc.id ? { ...s, platform: e.target.value as SocialLink['platform'], name: e.target.value === 'github' ? 'GitHub' : e.target.value === 'linkedin' ? 'LinkedIn' : e.target.value === 'twitter' ? 'Twitter' : soc.name } : s) }))} className={`${inputCls} w-36`}>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="other">Other</option>
                  </select>
                  {soc.platform === 'other' && <input type="text" value={soc.name} onChange={e => setContact(p => ({ ...p, socials: p.socials.map(s => s.id === soc.id ? { ...s, name: e.target.value } : s) }))} className={`${inputCls} w-28`} placeholder="Name" />}
                  <input type="url" value={soc.url} onChange={e => setContact(p => ({ ...p, socials: p.socials.map(s => s.id === soc.id ? { ...s, url: e.target.value } : s) }))} className={`${inputCls} flex-1`} placeholder="https://..." />
                  <button type="button" onClick={() => setContact(p => ({ ...p, socials: p.socials.filter(s => s.id !== soc.id) }))} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setContact(p => ({ ...p, socials: [...p.socials, { id: `soc-${generateId()}`, name: 'GitHub', url: '', platform: 'github' }] }))} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Social Link</button>
            </div>
          </div>
          <button disabled={saving === 'contact'} onClick={() => save('contact', () => saveContactContent(contact), 'Contact info saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
            {saving === 'contact' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Contact
          </button>
        </div>
      </Section>

      {/* ════════════ SERVICES ════════════ */}
      <Section title="Services" open={openSection === 'services'} onToggle={() => toggle('services')}>
        <div className="space-y-4">
          {svcList.map((svc) => (
            <div key={svc.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 relative">
              <button type="button" onClick={() => setSvcList(p => p.filter(s => s.id !== svc.id))} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>Title</label><input type="text" value={svc.title} onChange={e => setSvcList(p => p.map(s => s.id === svc.id ? { ...s, title: e.target.value } : s))} className={inputCls} placeholder="Frontend Development" /></div>
                <div>
                  <label className={labelCls}>Icon</label>
                  <select value={svc.icon} onChange={e => setSvcList(p => p.map(s => s.id === svc.id ? { ...s, icon: e.target.value } : s))} className={inputCls}>
                    <option value="Code2">Code</option>
                    <option value="Server">Server</option>
                    <option value="Layers">Layers</option>
                    <option value="Smartphone">Mobile</option>
                    <option value="Database">Database</option>
                    <option value="Globe">Globe</option>
                    <option value="Shield">Security</option>
                    <option value="Palette">Design</option>
                    <option value="Terminal">Terminal</option>
                  </select>
                </div>
              </div>
              <div><label className={labelCls}>Description</label><textarea value={svc.description} onChange={e => setSvcList(p => p.map(s => s.id === svc.id ? { ...s, description: e.target.value } : s))} rows={2} className={`${inputCls} resize-none`} /></div>
            </div>
          ))}
          <button type="button" onClick={() => setSvcList(p => [...p, { id: `svc-${generateId()}`, icon: 'Layers', title: '', description: '' }])} className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1"><Plus size={14} />Add Service</button>
          <div>
            <button disabled={saving === 'services'} onClick={() => save('services', () => saveServices(svcList), 'Services saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
              {saving === 'services' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Services
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════ FOOTER ════════════ */}
      <Section title="Footer" open={openSection === 'footer'} onToggle={() => toggle('footer')}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Footer Text</label><input type="text" value={footer.text} onChange={e => setFooter(p => ({ ...p, text: e.target.value }))} className={inputCls} placeholder="Built with" /></div>
            <div><label className={labelCls}>Author Name</label><input type="text" value={footer.authorName} onChange={e => setFooter(p => ({ ...p, authorName: e.target.value }))} className={inputCls} placeholder="Etsub" /></div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">Preview: &copy; {new Date().getFullYear()} {footer.text} ♥ by {footer.authorName || '...'}</p>
          <button disabled={saving === 'footer'} onClick={() => save('footer', () => saveFooterContent(footer), 'Footer saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-medium flex items-center gap-2">
            {saving === 'footer' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save Footer
          </button>
        </div>
      </Section>
    </div>
  );
};

export default ContentTab;
