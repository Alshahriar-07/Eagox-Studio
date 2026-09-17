/**
 * Shared, framework-free form validation for the order/contact flows
 * (16-FORM-SECURITY.md: client-side validation for UX; endpoint-side
 * validation happens at the Web3Forms/spam-protection layer).
 */

export type FormErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequired(
  values: Record<string, string>,
  fields: readonly string[],
): FormErrors {
  const errors: FormErrors = {};
  for (const field of fields) {
    if (!values[field]?.trim()) {
      errors[field] = "This field is required.";
    }
  }
  return errors;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "This field is required.";
  if (!EMAIL_RE.test(email.trim())) {
    return "Enter a valid email address.";
  }
  return null;
}

/** Cap free-text length before it ever leaves the browser. */
export function clampText(value: string, maxLength = 5000): string {
  return value.slice(0, maxLength);
}
