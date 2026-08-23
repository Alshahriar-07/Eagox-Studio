import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

export const WhatsAppSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+880 1893-134718';
  const cleanPhone = '8801893134718';
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Eagox Studio! I would like to inquire about professional website, web app, mobile app, or custom software development.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="eagox-whatsapp-support">
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl p-5 space-y-4 animate-fade-in backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">WhatsApp Support</h4>
                <p className="text-[10px] text-zinc-400">Eagox Studio project desk</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800" aria-label="Close WhatsApp Support">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">WhatsApp number</p>
            <p className="text-lg font-mono font-black text-white tracking-wide">{phoneNumber}</p>
          </div>

          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-300 flex items-center justify-center"
        aria-label="Open WhatsApp Support"
        id="whatsapp-fab-button"
        title="WhatsApp Support"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-zinc-950" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
      </button>
    </div>
  );
};
