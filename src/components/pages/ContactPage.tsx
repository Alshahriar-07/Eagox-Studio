import React, { useState } from 'react';
import { PageId, ContactFormState } from '../../types';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Shield,
  Loader2,
  Sparkles,
  Copy,
  Globe,
  Github,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: 'General Project Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, 'Copied');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      const err = 'Please provide your full name, email, and message.';
      setErrorMessage(err);
      toast.error(err, 'Missing Information');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Send directly to the contact Formspree endpoint.
      const response = await fetch('https://formspree.io/f/xdenvlko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `📨 Eagox Contact: ${formData.subject} from ${formData.name}`,
        }),
      });

      if (!response.ok) throw new Error('Formspree contact submission failed');

      setSubmitted(true);
      toast.success(
        `Thank you ${formData.name}! Your message has been routed to lead engineer Al Shahriar Sayon.`,
        'Message Transmitted',
        6000
      );

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      const msg = 'Failed to transmit message. Please email directly to alshahriarsayon425@gmail.com';
      setErrorMessage(msg);
      toast.error(msg, 'Transmission Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What is the standard turnaround time for a custom project?',
      a: 'Small websites and landing pages take 1 to 2 weeks. Full-Stack Web Applications, Native Android apps, or Desktop software typically range from 2 to 4 weeks depending on scope.',
    },
    {
      q: 'How does Eagox Studio handle payments and contracts?',
      a: 'We work with clear, milestone-based agreements (e.g., 40% kickoff deposit, 30% milestone review, 30% production delivery). We accept bKash, Nagad, Bank Transfer for Bangladesh clients (BDT / Tk), and International Wire/Stripe.',
    },
    {
      q: 'Do you provide maintenance and updates post-launch?',
      a: 'Yes, all custom engineering contracts include 30 days of complimentary post-launch bug fixes and telemetry monitoring. Extended monthly maintenance packages are available.',
    },
    {
      q: 'How can I discuss my project requirements urgently?',
      a: 'Use the official WhatsApp support button for rapid project scoping and consultation. We provide rapid responses and real-time scoping.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in" id="eagox-contact-page">
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>DIRECT INTAKE & INQUIRY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 dark:text-white font-display uppercase leading-[1.02]">
          Get in Touch with Eagox Studio
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          Have an engineering inquiry, custom software proposal, or partnership opportunity? Fill out the
          form below or contact our founder directly.
        </p>
      </section>

      {/* Main Form & Contact Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Badges */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-lg space-y-5">
            <h3 className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Studio Communications</span>
            </h3>

            <div className="space-y-4 text-xs font-mono text-zinc-300">
              </div>

              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Lead Engineer Email:</span>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <a
                    href="mailto:alshahriarsayon425@gmail.com"
                    className="text-sm font-semibold text-white hover:text-emerald-400 underline transition-colors break-all"
                  >
                    alshahriarsayon425@gmail.com
                  </a>
                  <button
                    onClick={() => handleCopy('alshahriarsayon425@gmail.com', 'Email address')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Studio Location:</span>
                <span className="text-sm text-white">Dhaka, Bangladesh</span>
                <div className="text-[11px] text-zinc-400 mt-0.5">Coordinates: 23.6850° N, 90.3563° E</div>
              </div>

              <div>
                <span className="text-zinc-500 block uppercase text-[10px]">Response SLA:</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  Within 24 Hours (Guaranteed)
                </span>
              </div>
            </div>

            {/* Quick Links with Copy */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
              <button
                onClick={() => handleCopy('https://alshahriarsowan.vercel.app/', 'Portfolio link')}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>Copy Portfolio</span>
              </button>
              <button
                onClick={() => handleCopy('https://github.com/Alshahriar-07', 'GitHub profile link')}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Github className="w-3 h-3 text-emerald-400" />
                <span>Copy GitHub</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-zinc-950 dark:text-white font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Client Privacy & NDA</span>
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We treat all project specifications and proprietary algorithms with strict confidentiality. Mutual
              NDAs are available before detailed architectural discovery.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Message Transmitted!</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Eagox Studio has received your inquiry. We will review
                  your requirements and reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Project Inquiry', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-mono font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2 font-mono">Send Direct Inquiry</h3>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono">Subject / Category</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono"
                  >
                    <option value="General Project Inquiry">General Project Inquiry</option>
                    <option value="Custom Web Application (14,999 Tk)">Full-Stack Web App (14,999 Tk)</option>
                    <option value="Modern Website / Portfolio (12,999 Tk)">Modern Website / Portfolio (12,999 Tk)</option>
                    <option value="Native Android / Mobile App (15,999 Tk)">Android App (15,999 Tk)</option>
                    <option value="Desktop Application (17,999 Tk)">Desktop App (17,999 Tk)</option>
                    <option value="AI Tooling & Gemini Grounding (19,999 Tk)">AI Pipeline & Tooling (19,999 Tk)</option>
                    <option value="Open Source & Seedcode Sponsorship">Open Source & Seedcode Sponsorship</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono">Your Message / Project Scope *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the software you want to build, tech requirements, target timeline..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:border-zinc-900 dark:focus:border-zinc-500 focus:bg-white dark:focus:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 text-white dark:text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message to Eagox Studio</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
<section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            COMMON INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
