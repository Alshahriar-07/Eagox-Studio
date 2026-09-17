/**
 * Integration configuration.
 * Formspree endpoints are owner-supplied and centralized here
 * (10-CONTACT-ORDER.md, 16-FORM-SECURITY.md). NEXT_PUBLIC_* env overrides
 * remain supported for staging/preview deployments.
 */
export const formEndpoints = {
  order:
    process.env.NEXT_PUBLIC_ORDER_FORM_ENDPOINT ??
    "https://formspree.io/f/mvkgoapr",
  contact:
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ??
    "https://formspree.io/f/mgavekwo",
} as const;

/**
 * WhatsApp — the documented interaction is an icon/button, never the raw
 * number as body text. A wa.me deep link is constructed from the number
 * stored in the environment; null when unconfigured.
 */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null;

export function getWhatsAppLink(message?: string): string | null {
  if (!whatsappNumber) return null;
  const digits = whatsappNumber.replace(/[^\d]/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
