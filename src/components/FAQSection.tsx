import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqData';
import { PageId } from '../types';
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  ExternalLink,
  Search,
  CheckCircle2,
  Phone,
  Layers,
  CreditCard,
  Truck,
  LifeBuoy,
} from 'lucide-react';

interface FAQSectionProps {
  onNavigate?: (page: PageId) => void;
  showTitle?: boolean;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigate,
  showTitle = true,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'orders', label: 'Orders & Scoping', icon: Layers },
    { id: 'pricing', label: 'Pricing & Payments', icon: CreditCard },
    { id: 'support', label: 'Support & WhatsApp', icon: LifeBuoy },
    { id: 'delivery', label: 'Delivery Timelines', icon: Truck },
  ];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`space-y-8 ${className}`} id="eagox-faq-section">
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-zinc-950 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about commissioning software, project timelines, rates, and live WhatsApp support.
          </p>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono"
          />
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No questions matched your query</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Need help? Use the floating WhatsApp support button
            </p>
          </div>
        ) : (
          filteredItems.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-600 shadow-md ring-1 ring-zinc-900/5'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono shrink-0 font-bold transition-colors ${
                        isOpen ? 'bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      ?
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-zinc-950 dark:bg-white border-zinc-950 dark:border-white text-white dark:text-zinc-950' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pl-14 animate-fade-in">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Action Footer Callout */}
      {onNavigate && (
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Ready to build your system?</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Submit your project brief with our interactive estimator in under 2 minutes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('order')}
            className="px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            Go to Project Order Form
          </button>
        </div>
      )}
    </section>
  );
};
