import { forwardRef, useId } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

type BaseFieldProps = {
  label: string;
  /** Optional hint line under the label (e.g. "Optional"). */
  hint?: string;
  error?: string | null;
};

function FieldWrap({
  label,
  hint,
  error,
  id,
  children,
}: BaseFieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {hint && <span className="form-label-hint"> — {hint}</span>}
      </label>
      {children}
      {error && (
        <p className="form-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

const fieldClasses = (error?: string | null) =>
  `form-input${error ? " form-input-invalid" : ""}`;

/** Text input with programmatic label + error wiring. */
export const TextInput = forwardRef<
  HTMLInputElement,
  BaseFieldProps & InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ label, hint, error, ...rest }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <FieldWrap label={label} hint={hint} error={error} id={id}>
      <input
        ref={ref}
        id={id}
        className={fieldClasses(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
    </FieldWrap>
  );
});

/** Textarea with programmatic label + error wiring. */
export const TextArea = forwardRef<
  HTMLTextAreaElement,
  BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ label, hint, error, ...rest }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <FieldWrap label={label} hint={hint} error={error} id={id}>
      <textarea
        ref={ref}
        id={id}
        className={fieldClasses(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
    </FieldWrap>
  );
});

/** Select with programmatic label + error wiring. */
export const Select = forwardRef<
  HTMLSelectElement,
  BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ label, hint, error, children, ...rest }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <FieldWrap label={label} hint={hint} error={error} id={id}>
      <select
        ref={ref}
        id={id}
        className={fieldClasses(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {children}
      </select>
    </FieldWrap>
  );
});
