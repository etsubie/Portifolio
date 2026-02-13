import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import {
  usePortfolio,
  generateId,
  skillColorSchemes,
  type SkillCategory,
  type SkillColorScheme,
} from '../../context/PortfolioContext';

interface Props { showToast: (msg: string, type?: 'success' | 'error') => void; }

const colorOptions: { value: SkillColorScheme; label: string; dot: string }[] = [
  { value: 'blue', label: 'Blue', dot: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', dot: 'bg-purple-500' },
  { value: 'emerald', label: 'Green', dot: 'bg-emerald-500' },
  { value: 'orange', label: 'Orange', dot: 'bg-orange-500' },
  { value: 'rose', label: 'Rose', dot: 'bg-rose-500' },
  { value: 'cyan', label: 'Cyan', dot: 'bg-cyan-500' },
];

interface FormData { name: string; colorScheme: SkillColorScheme; skills: string[]; }
const emptyForm: FormData = { name: '', colorScheme: 'blue', skills: [] };

const SkillsTab: React.FC<Props> = ({ showToast }) => {
  const { skillCategories, saveSkillCategories } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);

  const openForm = (cat?: SkillCategory) => {
    if (cat) {
      setEditingId(cat.id);
      setForm({ name: cat.name, colorScheme: cat.colorScheme, skills: [...cat.skills] });
    } else {
      setEditingId(null);
      setForm(emptyForm);
    }
    setSkillInput('');
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); setSkillInput(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { showToast('Category name is required.', 'error'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await saveSkillCategories(skillCategories.map(c => c.id === editingId ? { ...c, ...form } : c));
        showToast('Category updated!');
      } else {
        await saveSkillCategories([...skillCategories, { id: `cat-${generateId()}`, ...form }]);
        showToast('Category added!');
      }
      closeForm();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save category.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await saveSkillCategories(skillCategories.filter(c => c.id !== id));
      setDeleteId(null);
      showToast('Category deleted.');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete category.', 'error');
      setDeleteId(null);
    }
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) { setForm(p => ({ ...p, skills: [...p.skills, s] })); setSkillInput(''); }
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all';

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Skill Categories</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your skill categories and technologies.</p>
        </div>
        <button onClick={() => openForm()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm flex items-center gap-2 font-medium">
          <Plus size={18} />Add Category
        </button>
      </div>

      {/* Category List */}
      {skillCategories.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No categories yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {skillCategories.map(cat => {
            const colors = skillColorSchemes[cat.colorScheme] || skillColorSchemes.blue;
            return (
              <div key={cat.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${colorOptions.find(c => c.value === cat.colorScheme)?.dot || 'bg-blue-500'}`} />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
                    <span className="text-xs text-slate-400">({cat.skills.length})</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openForm(cat)} className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"><Pencil size={14} /></button>
                    <button onClick={() => setDeleteId(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(s => (
                    <span key={s} className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${colors.badge} ${colors.badgeText}`}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] bg-black/50 backdrop-blur-sm overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) closeForm(); }}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={closeForm} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"><X size={20} /></button>
            </div>
            <form id="skill-form" onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category Name <span className="text-red-500">*</span></label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="e.g. Frontend" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setForm(p => ({ ...p, colorScheme: opt.value }))} title={opt.label}
                      className={`w-8 h-8 rounded-full ${opt.dot} transition-all ${form.colorScheme === opt.value ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-800' : 'opacity-60 hover:opacity-100'}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Skills</label>
                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.skills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">
                        {s}<button type="button" onClick={() => setForm(p => ({ ...p, skills: p.skills.filter(x => x !== s) }))} className="hover:text-red-500"><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(); } }} className={`flex-1 ${inputCls}`} placeholder="Type skill, press Enter" />
                  <button type="button" onClick={addSkill} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 font-medium text-sm">Add</button>
                </div>
              </div>
            </form>
            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button type="button" onClick={closeForm} className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">Cancel</button>
              <button type="submit" form="skill-form" disabled={saving} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl shadow-sm font-medium flex items-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {editingId ? 'Save Changes' : 'Add Category'}
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
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Category</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">All skills in this category will be removed.</p>
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

export default SkillsTab;
