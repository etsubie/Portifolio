import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
