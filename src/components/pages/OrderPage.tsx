import React, { useState } from 'react';
import { PageId, OrderFormState } from '../../types';
import { SERVICE_OPTIONS, ADDON_OPTIONS } from '../../data/projectsData';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Send,
  Loader2,
  AlertCircle,
  FileText,
  Calculator,
  HelpCircle,
  Copy,
  MessageCircle,
} from 'lucide-react';

interface OrderPageProps {
  onNavigate: (page: PageId) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[1].id);
  const [selectedBudget, setSelectedBudget] = useState<string>('15,000 - 25,000 Tk (Standard Release)');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Standard (2-4 Weeks)');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['search-grounding']);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    company: string;
    requirements: string;
  }>({
    name: '',
    email: '',
    company: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<{ orderId: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const budgetOptions = [
    '< 15,000 Tk (Starter MVP)',
    '15,000 - 25,000 Tk (Standard Release)',
    '25,000 - 45,000 Tk (Production SaaS / App)',
    '45,000 - 75,000 Tk (Complex Full-Stack System)',
    '75,000+ Tk (Enterprise Suite)',
  ];

  const timelineOptions = [
    'Urgent Sprint (1-2 Weeks)',
    'Standard (2-4 Weeks)',
    'Flexible (1-2 Months)',
    'Monthly Retainer / Custom Milestone',
  ];

  const currentServiceObj = SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];

  const toggleAddOn = (addonId: string) => {
    if (selectedAddOns.includes(addonId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addonId));
      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
      if (addon) {
        toast.info(`Removed "${addon.title}" from configuration`, 'Add-On Removed', 2500);
      }
    } else {
      setSelectedAddOns([...selectedAddOns, addonId]);
      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
      if (addon) {
        toast.success(`Added "${addon.title}" (+${addon.price.toLocaleString()} Tk)`, 'Add-On Added', 2500);
      }
    }
  };

  // Calculate estimated total price
  const calculateTotal = () => {
    const base = currentServiceObj.basePrice;
    const addOnsTotal = selectedAddOns.reduce((acc, id) => {
      const found = ADDON_OPTIONS.find((a) => a.id === id);
      return acc + (found ? found.price : 0);
    }, 0);
    return base + addOnsTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.requirements.trim()) {
      const err = 'Please provide your full name, email, and project scope requirements.';
      setErrorMessage(err);
      toast.error(err, 'Missing Information');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedId = `EAG-${Date.now().toString(36).toUpperCase()}`;
    const payload = {
      ...formData,
      projectType: currentServiceObj.title,
      budget: selectedBudget,
      timeline: selectedTimeline,
      addOns: selectedAddOns,
      estimatedPrice: `${calculateTotal().toLocaleString()} Tk`,
    };

    try {
      // Submit directly to the order Formspree endpoint.
      const orderId = generatedId;

      // Submit directly to Formspree order intake endpoint
      try {
        const response = await fetch('https://formspree.io/f/xrpzvlyg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            orderId: orderId,
            clientName: formData.name,
            clientEmail: formData.email,
            company: formData.company || 'Not provided',
            service: currentServiceObj.title,
            estimatedPrice: `${calculateTotal().toLocaleString()} BDT (Tk)`,
            budgetTier: selectedBudget,
            targetTimeline: selectedTimeline,
            selectedAddOns: selectedAddOns.join(', ') || 'None',
            requirements: formData.requirements,
            _replyto: formData.email,
            _subject: `⚡ New Eagox Order [${orderId}]: ${currentServiceObj.title} from ${formData.name}`,
          }),
        });
        if (!response.ok) throw new Error('Formspree order submission failed');
      } catch (fErr) {
        throw fErr;
      }

      setOrderResult({
        orderId: orderId,
        message: 'Your project brief has been submitted to Eagox Studio.',
      });

      toast.success(
        `Your order brief (#${orderId}) was submitted successfully! Confirmation sent to ${formData.email}`,
        'Order Received!',
        6000
      );

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.55 },
      });
    } catch (err: any) {
      setErrorMessage('Could not process order automatically. Please email alshahriarsayon425@gmail.com');
      toast.error('Failed to submit brief automatically. Please reach out to alshahriarsayon425@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Order reference #${id} copied to clipboard!`, 'Copied');
  };

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in" id="eagox-order-page">
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>CLIENT INTAKE & PRICING CONFIGURATION (BDT)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 dark:text-white font-display uppercase leading-[1.02]">
          Configure Your Custom Software Project
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          Select your service category, configure modular add-ons, view transparent pricing in Bangladeshi Taka (Tk),
          and submit your technical brief directly to lead engineer Al Shahriar Sayon.
        </p>
      </section>

      {orderResult ? (
        /* Order Success View */
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              PROJECT ORDER REGISTERED
            </span>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Order Reference #{orderResult.orderId}</h2>
              <button
                onClick={() => handleCopyOrderId(orderResult.orderId)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Copy order ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              {orderResult.message} A confirmation has been routed to <strong>{formData.email}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left text-xs font-mono space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-zinc-400">
              <span>Service:</span>
              <span className="text-white font-bold">{currentServiceObj.title}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Target Budget:</span>
              <span className="text-white font-bold">{selectedBudget}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Timeline:</span>
              <span className="text-white font-bold">{selectedTimeline}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated Base:</span>
              <span className="text-emerald-400 font-bold">{calculateTotal().toLocaleString()} Tk</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-mono font-bold hover:bg-zinc-200 transition-all"
            >
              Return to Home
            </button>
            <button
              onClick={() => {
                setOrderResult(null);
                setFormData({ name: '', email: '', company: '', requirements: '' });
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-700 text-xs font-mono hover:bg-zinc-800 transition-all"
            >
              Submit Another Project
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Configurator Grid */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Service Type Cards */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                1. Select Service Category (Transparent Rates)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedService === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-zinc-950 dark:bg-zinc-900 text-white border-zinc-950 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/50'
                          : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                            {srv.subtitle}
                          </span>
                          <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {srv.basePrice.toLocaleString()} Tk
                          </span>
                        </div>
                        <h4 className="text-sm font-bold">{srv.title}</h4>
                      </div>
                      <div className={`text-[11px] mt-3 font-mono ${isSelected ? 'text-zinc-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        Est. {srv.estimatedWeeks}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Add-Ons Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                2. Modular Technical Add-Ons (Optional)
              </label>

              <div className="space-y-2.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-zinc-950 dark:text-zinc-100'
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-zinc-900 dark:text-white">{addon.title}</div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{addon.description}</div>
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold text-zinc-900 dark:text-white shrink-0">+{addon.price.toLocaleString()} Tk</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  3. Budget Tier (BDT)
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 text-zinc-900 dark:text-zinc-100 font-mono"
                >
                  {budgetOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  4. Desired Timeline
                </label>
                <select
                  value={selectedTimeline}
                  onChange={(e) => setSelectedTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 text-zinc-900 dark:text-zinc-100"
                >
                  {timelineOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Client Contact Fields */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                5. Client Information & Scope Brief
              </label>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Company / Project Name (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Labs"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Project Requirements & Scope *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Describe your core user flow, desired integrations (Stripe, AI models, Auth), and any reference links..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculation Summary & Submit */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-sm font-mono text-white">Project Scope Summary</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">ESTIMATION</span>
              </div>

              {/* Service & Inclusions */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Selected Architecture:</span>
                  <span className="font-bold text-white text-right">{currentServiceObj.title}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-300">
                  <span>Base Engineering Fee:</span>
                  <span className="font-bold text-white">{currentServiceObj.basePrice.toLocaleString()} Tk</span>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 uppercase block">Selected Add-Ons:</span>
                    {selectedAddOns.map((aId) => {
                      const found = ADDON_OPTIONS.find((a) => a.id === aId);
                      if (!found) return null;
                      return (
                        <div key={aId} className="flex justify-between text-zinc-400 text-[11px]">
                          <span className="truncate max-w-[180px]">• {found.title}</span>
                          <span className="text-emerald-400">+{found.price.toLocaleString()} Tk</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between items-center text-zinc-300 pt-2 border-t border-zinc-800/80">
                  <span>Target Timeline:</span>
                  <span className="font-bold text-white">{selectedTimeline}</span>
                </div>
              </div>

              {/* Price Total */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Calculated Minimum Estimate
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  {calculateTotal().toLocaleString()}{' '}
                  <span className="text-xs font-bold text-zinc-300 font-sans">BDT (Tk)</span>
                </div>
                <div className="text-[10px] text-zinc-500 leading-tight">
                  Final quote is confirmed following discovery review. Transparent rates with zero hidden charges.
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Dispatching Order Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Order Brief</span>
                    <Send className="w-3.5 h-3.5 fill-current" />
                  </>
                )}
              </button>

            </div>
          </div>
        </form>
      )}
    </div>
  );
};
