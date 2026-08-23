import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Sparkles } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string, duration?: number) => string;
    error: (message: string, title?: string, duration?: number) => string;
    info: (message: string, title?: string, duration?: number) => string;
    warning: (message: string, title?: string, duration?: number) => string;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const toastHelpers = {
    success: (message: string, title?: string, duration?: number) =>
      showToast({ type: 'success', title: title || 'Success', message, duration }),
    error: (message: string, title?: string, duration?: number) =>
      showToast({ type: 'error', title: title || 'Error', message, duration }),
    info: (message: string, title?: string, duration?: number) =>
      showToast({ type: 'info', title: title || 'Information', message, duration }),
    warning: (message: string, title?: string, duration?: number) =>
      showToast({ type: 'warning', title: title || 'Notice', message, duration }),
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, toast: toastHelpers }}>
      {children}

      {/* Floating Toast Portal Container */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        <AnimatePresence mode="sync">
          {toasts.map((item) => {
            const isSuccess = item.type === 'success';
            const isError = item.type === 'error';
            const isWarning = item.type === 'warning';
            const isInfo = item.type === 'info';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: 8, transition: { duration: 0.18 } }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto relative overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-md transition-all ${
                  isSuccess
                    ? 'bg-zinc-950/95 text-white border-emerald-500/40 shadow-emerald-950/20'
                    : isError
                    ? 'bg-zinc-950/95 text-white border-rose-500/40 shadow-rose-950/20'
                    : isWarning
                    ? 'bg-zinc-950/95 text-white border-amber-500/40 shadow-amber-950/20'
                    : 'bg-zinc-950/95 text-white border-zinc-700 shadow-zinc-950/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                    {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                    {isInfo && <Info className="w-5 h-5 text-blue-400" />}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    {item.title && (
                      <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200 mb-0.5">
                        {item.title}
                      </h4>
                    )}
                    <p className="text-xs text-zinc-300 font-medium leading-relaxed break-words">
                      {item.message}
                    </p>
                  </div>

                  <button
                    onClick={() => dismissToast(item.id)}
                    className="shrink-0 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtle bottom progress animation line */}
                {item.duration && item.duration > 0 && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: item.duration / 1000, ease: 'linear' }}
                    className={`absolute bottom-0 left-0 h-0.5 ${
                      isSuccess
                        ? 'bg-emerald-500'
                        : isError
                        ? 'bg-rose-500'
                        : isWarning
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
