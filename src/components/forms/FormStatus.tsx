import type { ReactNode } from "react";

type FormStatusProps = {
  /** idle | submitting | success | error */
  state: "idle" | "submitting" | "success" | "error";
  message?: ReactNode;
};

/**
 * Accessible status messaging (16-FORM-SECURITY.md):
 * idle → non-announcing hint, submitting → polite progress notice,
 * success → role="status" (polite), error → role="alert" (assertive).
 */
export function FormStatus({ state, message }: FormStatusProps) {
  if (state === "idle" || !message) return null;

  if (state === "submitting") {
    return (
      <div
        className="form-status form-status-submitting"
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    );
  }

  return (
    <div
      className={`form-status form-status-${state}`}
      role={state === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
