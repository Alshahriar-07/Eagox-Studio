/**
 * Integration configuration.
 * Forms submit through Web3Forms (owner-supplied access keys, centralized
 * here). Web3Forms access keys are designed for client-side use — they are
 * never rendered in the visible UI. WhatsApp env override remains supported
 * for staging/preview deployments.
 */
export const web3Forms = {
  /** Single Web3Forms submission endpoint for all forms. */
  endpoint: "https://api.web3forms.com/submit",
  /** Contact page form. */
  accessKeyContact: "074dfdcb-7445-4817-9888-604b30c8c58f",
  /** Project / order request form. */
  accessKeyOrder: "e9e55d03-1c94-421a-aea1-052361dc8912",
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
