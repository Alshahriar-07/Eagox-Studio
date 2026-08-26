import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { WhatsAppSupportWidget } from './components/WhatsAppSupportWidget';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { AuthorPage } from './components/pages/AuthorPage';
import { ContactPage } from './components/pages/ContactPage';
import { OrderPage } from './components/pages/OrderPage';
import { FAQPage } from './components/pages/FAQPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    if (['home', 'about', 'projects', 'author', 'order', 'contact', 'faq'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Sync hash with browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'projects', 'author', 'order', 'contact', 'faq'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    handleNavigate('projects');
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 flex flex-col justify-between font-sans antialiased transition-colors duration-200">
          {/* Top Banner: Global Network Node */}
          <div className="w-full bg-zinc-950 text-zinc-300 px-4 py-1.5 text-center text-[11px] font-mono border-b border-zinc-800 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EAGOX CLOUD INFRASTRUCTURE ACTIVE</span>
            <span className="text-zinc-500">|</span>
            <span className="text-emerald-400 font-semibold">DHAKA NODE 23.6850° N, 90.3563° E</span>
          </div>

          {/* Main Navigation Header */}
          <Navigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                {currentPage === 'home' && (
                  <HomePage
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    onSelectProject={handleSelectProject}
                  />
                )}

                {currentPage === 'about' && (
                  <AboutPage currentPage={currentPage} onNavigate={handleNavigate} />
                )}

                {currentPage === 'projects' && (
                  <ProjectsPage
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    selectedProjectId={selectedProjectId}
                  />
                )}

                {currentPage === 'faq' && (
                  <FAQPage currentPage={currentPage} onNavigate={handleNavigate} />
                )}

                {currentPage === 'author' && (
                  <AuthorPage currentPage={currentPage} onNavigate={handleNavigate} />
                )}

                {currentPage === 'order' && (
                  <OrderPage currentPage={currentPage} onNavigate={handleNavigate} />
                )}

                {currentPage === 'contact' && (
                  <ContactPage currentPage={currentPage} onNavigate={handleNavigate} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Live WhatsApp Floating Support Widget */}
          <WhatsAppSupportWidget />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
