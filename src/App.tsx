import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { usePortfolio } from './context/PortfolioContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Sidebar from './components/Sidebar';

function Portfolio() {
  const { loading, error } = usePortfolio();

  useEffect(() => {
    document.title = 'Etsub | Software Engineer & Frontend Developer';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Failed to load portfolio</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative">
      {/* Subtle background texture */}
      <div className="fixed inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <Header />

      {/* Layout: sidebar + content side by side inside a centered container */}
      <div className="relative max-w-7xl mx-auto lg:flex lg:gap-8 lg:px-8">
        {/* Sidebar — sticky, scrolls with content */}
        <div className="hidden lg:block lg:w-[260px] flex-shrink-0 pt-24 pb-12">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Hero />
          <div className="space-y-0">
            <About />
            <Services />
            <Skills />
            <Projects />
            <Contact />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = '404 | Page Not Found';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
