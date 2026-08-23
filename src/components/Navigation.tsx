import React, { useState } from 'react';
import { PageId } from '../types';
import { EagoxLogo } from './EagoxLogo';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ArrowRight, Radio, MessageCircle, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { theme, isDark, toggleTheme } = useTheme();

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Index' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects', badge: '6 Live' },
    { id: 'faq', label: 'FAQ', badge: 'Help' },
    { id: 'author', label: 'Author' },
    { id: 'order', label: 'Order', badge: 'Intake' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-hidden group cursor-pointer"
          aria-label="Eagox Studio Home"
        >
          <EagoxLogo size="md" className="group-hover:opacity-90 transition-opacity" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/70 dark:bg-zinc-900/80 p-1.5 rounded-full border border-zinc-200/70 dark:border-zinc-800">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`ml-1.5 text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Actions: Theme Toggle, WhatsApp & Start Project */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Global Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
            id="desktop-theme-toggle-btn"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          {/* Live WhatsApp Button */}

          {/* Primary Order CTA */}
          <button
            onClick={() => handleNavClick('order')}
            className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-white dark:text-zinc-950 bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-xs flex items-center gap-1.5 transition-all active:scale-98 cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
            id="mobile-theme-toggle-btn"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          <div className="flex items-center justify-between px-2 py-1 mb-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              DHAKA NODE [23.685°N]
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-xs font-semibold cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
            {/* Quick Theme Switch Row inside Mobile Drawer */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono">
              <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                {isDark ? <Moon className="w-3.5 h-3.5 text-zinc-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                Theme: <strong className="text-zinc-950 dark:text-white capitalize">{theme} Mode</strong>
              </span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold font-mono cursor-pointer"
              >
                Switch to {isDark ? 'Light' : 'Dark'}
              </button>
            </div>

            <button
              onClick={() => handleNavClick('order')}
              className="w-full py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Build / Order Software</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
