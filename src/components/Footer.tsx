import React from 'react';
import { PageId } from '../types';
import { EagoxLogo } from './EagoxLogo';
import { Mail, MapPin, Github, ArrowUp, Radio, MessageCircle, HelpCircle, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-28 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors" id="eagox-global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-hidden cursor-pointer"
              aria-label="Eagox Studio Home"
            >
              <EagoxLogo size="md" />
            </button>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Eagox Studio delivers high-performance digital infrastructure, distributed real-time engines,
              and full-stack software applications. Built with mathematical craftsmanship in Dhaka, Bangladesh.
            </p>
            <div className="flex flex-col gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>DHAKA HUB [23.6850° N, 90.3563° E]</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Navigation</h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  Home (Index)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  About Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  Product Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-zinc-950 dark:hover:text-white transition-colors flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold cursor-pointer">
                  <span>Help & FAQ</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('author')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  Founder Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Software Suite */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Public Systems</h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  Seedcode CLI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  Seedcode Chat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  BeanRun Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  EagoxAIHub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
                  HMouse Interface
                </button>
              </li>
            </ul>
          </div>

          {/* Client Intake & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Live Support & Orders</h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <button onClick={() => onNavigate('order')} className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium text-zinc-900 dark:text-zinc-200 cursor-pointer">
                  Project Order Intake
                </button>
              </li>
              <li>
              </li>
              <li>
              </li>
              <li>
                <a
                  href="mailto:alshahriarsayon425@gmail.com"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors underline block pt-1 text-zinc-600 dark:text-zinc-400"
                >
                  alshahriarsayon425@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} Eagox Studio. Founded by Al Shahriar Sayon. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">Pure TypeScript · Tailwind v4 · Three.js</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
