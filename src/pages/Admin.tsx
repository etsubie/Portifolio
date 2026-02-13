import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, LogOut, Eye, EyeOff, AlertCircle,
  Layers, Code, FileText, Check, Loader2,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import ProjectsTab from './admin/ProjectsTab';
import SkillsTab from './admin/SkillsTab';
import ContentTab from './admin/ContentTab';
import { supabase } from '../lib/supabase';

type TabId = 'projects' | 'skills' | 'content';

const tabs: { id: TabId; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'projects', label: 'Projects', Icon: Layers },
  { id: 'skills', label: 'Skills', Icon: Code },
  { id: 'content', label: 'Content', Icon: FileText },
];

interface Toast { message: string; type: 'success' | 'error'; }

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const [toast, setToast] = useState<Toast | null>(null);

  // ── Check existing session on mount ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.title = 'Admin Dashboard | Etsub Dev';
    return () => { document.title = 'Etsub | Software Engineer & Frontend Developer'; };
  }, []);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type });

  // ── Login via Supabase Auth ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoginLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Logout ──
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPassword('');
    setEmail('');
  };

  // ═══ LOADING ═══
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  // ═══ LOGIN SCREEN ═══
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Etsub</span>{' '}Dev
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Admin Dashboard</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">Sign In</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  placeholder="admin@example.com"
                  autoFocus
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="admin-pw" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="admin-pw"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {authError && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <AlertCircle size={16} />{authError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 font-medium flex items-center justify-center gap-2"
              >
                {loginLoading && <Loader2 size={18} className="animate-spin" />}
                {loginLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                <ArrowLeft size={14} />Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══ DASHBOARD ═══
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft size={18} /><span className="text-sm font-medium hidden sm:inline">Back to Site</span>
              </Link>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <LogOut size={16} /><span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 -mb-px">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon size={16} />{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <ProjectsTab showToast={showToast} />}
        {activeTab === 'skills' && <SkillsTab showToast={showToast} />}
        {activeTab === 'content' && <ContentTab showToast={showToast} />}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border animate-slideUp ${
          toast.type === 'success'
            ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
        }`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Admin;
