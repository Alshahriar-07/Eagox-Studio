import React from 'react';
import { PageId } from '../../types';
import { FAQSection } from '../FAQSection';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: PageId) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-fade-in" id="eagox-faq-page">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SUPPORT DESK ONLINE</span>
        </div>
      </div>

      <FAQSection onNavigate={onNavigate} />

      <div className="p-6 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Need a project consultation?</h4>
            <p className="text-xs text-zinc-400">Use WhatsApp for direct project discussions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
