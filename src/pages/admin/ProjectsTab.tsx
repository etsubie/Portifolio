import React, { useState, useRef } from 'react';
import { Plus, Search, Pencil, Trash2, X, ExternalLink, Github, Image, Upload, Loader2 } from 'lucide-react';
import { usePortfolio, type Project } from '../../context/PortfolioContext';

interface Props { showToast: (msg: string, type?: 'success' | 'error') => void; }

interface FormData {
  title: string; description: string; longDescription: string;
  image: string; tags: string[]; demoLink: string; codeLink: string;
}
const emptyForm: FormData = { title: '', description: '', longDescription: '', image: '', tags: [], demoLink: '', codeLink: '' };

const ProjectsTab: React.FC<Props> = ({ showToast }) => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<FormData>(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const openForm = (p?: Project) => {
    if (p) {
      setEditingId(p.id);
      setForm({ title: p.title, description: p.description, longDescription: p.longDescription, image: p.image, tags: [...p.tags], demoLink: p.demoLink, codeLink: p.codeLink });
    } else {
      setEditingId(null);
      setForm(emptyForm);
    }
    setTagInput('');
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); setTagInput(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    setSaving(true);
    try {
      if (editingId) { await updateProject(editingId, form); showToast('Project updated!'); }
      else { await addProject(form); showToast('Project added!'); }
      closeForm();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setDeleteId(null);
      showToast('Project deleted.');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete project.', 'error');
      setDeleteId(null);
    }
  };

  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) { setForm(p => ({ ...p, tags: [...p.tags, t] })); setTagInput(''); } };
  const removeTag = (t: string) => setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) }));
  const onTagKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB.', 'error'); return; }
    const r = new FileReader();
    r.onload = (ev) => setForm(p => ({ ...p, image: ev.target?.result as string }));
    r.readAsDataURL(f);
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all';

  return (
    <>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className={`${inputCls} pl-10`} />
        </div>
        <button onClick={() => openForm()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 font-medium whitespace-nowrap">
          <Plus size={18} />Add Project
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <Image size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{search ? 'No projects found' : 'No projects yet'}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{search ? 'Try a different search.' : 'Click "Add Project" to get started.'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(project => (
            <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">
              <div className="w-full sm:w-40 h-32 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700">
                {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Image size={24} className="text-slate-400" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">{project.title}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openForm(project)} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => setDeleteId(project.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">{project.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">{t}</span>)}</div>
                <div className="flex items-center gap-4 mt-3">
                  {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-blue-600 inline-flex items-center gap-1"><ExternalLink size={12} />Demo</a>}
                  {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-blue-600 inline-flex items-center gap-1"><Github size={12} />Code</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] bg-black/50 backdrop-blur-sm overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) closeForm(); }}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeForm} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X size={20} /></button>
            </div>
            <form id="proj-form" onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title <span className="text-red-500">*</span></label><input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputCls} placeholder="Project title" required /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Short Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className={`${inputCls} resize-none`} placeholder="Brief summary..." /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Detailed Description</label><textarea value={form.longDescription} onChange={e => setForm(p => ({ ...p, longDescription: e.target.value }))} rows={4} className={`${inputCls} resize-none`} placeholder="Full description for modal..." /></div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Image</label>
                <input type="url" value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className={inputCls} placeholder="https://example.com/image.jpg" />
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-400">or</span>
                  <button type="button" onClick={() => fileRef.current?.click()} className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 inline-flex items-center gap-1"><Upload size={14} />Upload</button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
                </div>
                {form.image && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 mt-3">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setForm(p => ({ ...p, image: '' }))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"><X size={14} /></button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tags</label>
                {form.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-2">{form.tags.map(t => <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">{t}<button type="button" onClick={() => removeTag(t)} className="hover:text-red-500"><X size={14} /></button></span>)}</div>}
                <div className="flex gap-2"><input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={onTagKey} className={`flex-1 ${inputCls}`} placeholder="Type tag, press Enter" /><button type="button" onClick={addTag} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-sm">Add</button></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Demo URL</label><input type="url" value={form.demoLink} onChange={e => setForm(p => ({ ...p, demoLink: e.target.value }))} className={inputCls} placeholder="https://myapp.netlify.app" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Code URL</label><input type="url" value={form.codeLink} onChange={e => setForm(p => ({ ...p, codeLink: e.target.value }))} className={inputCls} placeholder="https://github.com/..." /></div>
              </div>
            </form>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button type="button" onClick={closeForm} className="px-5 py-2.5 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 font-medium">Cancel</button>
              <button type="submit" form="proj-form" disabled={saving} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl shadow-sm font-medium flex items-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {editingId ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-600 dark:text-red-400" size={24} /></div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Project</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsTab;
