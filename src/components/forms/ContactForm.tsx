"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput, TextArea, Select, FormStatus } from "@/components/forms";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { services } from "@/data/services";
import { web3Forms, getWhatsAppLink } from "@/data/integrations";
import { contactEmail } from "@/data/site";
import {
  validateRequired,
  validateEmail,
  clampText,
  type FormErrors,
} from "@/lib/validation/inquiry";

/**
 * Contact form per 10-CONTACT-ORDER.md:
 * name, email, project type, message, optional budget, optional timeline.
 * Submits through Web3Forms with the approved contact access key; offers a
 * mailto fallback so input is never silently lost.
 */
export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const set = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: clampText(value) }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Guard against duplicate submission (double-click or Enter key).
    if (status === "submitting") return;
    const next: FormErrors = {
      ...validateRequired(values, ["name", "message"]),
    };
    const emailError = validateEmail(values.email);
    if (emailError) next.email = emailError;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch(web3Forms.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Forms.accessKeyContact,
          subject: "Contact — Eagox Studio",
          form_type: "contact",
          ...values,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Message sent. We will reply by email.");
      } else {
        const detail = await response
          .json()
          .then((d: { message?: string }) => d.message)
          .catch(() => null);
        setStatus("error");
        setStatusMessage(
          detail
            ? `Something went wrong sending your message: ${detail} Please try again — nothing was lost.`
          : "Something went wrong sending your message. Please try again — nothing was lost.",
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error — your message was not sent. Please try again.");
    }
  };

  const buildMailto = () => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project type: ${values.projectType || "—"}`,
      `Budget: ${values.budget || "—"}`,
      `Timeline: ${values.timeline || "—"}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Contact — Eagox Studio",
    )}&body=${encodeURIComponent(body)}`;
  };

  const whatsappLink = getWhatsAppLink("Hello Eagox Studio —");

  return (
    <GlassPanel tone="dark" blur="lg" radius="xl" className="form-panel">
      <form onSubmit={onSubmit} noValidate>
        {status === "success" ? (
          <div className="form-success-panel">
            <h2 className="text-display">Message sent</h2>
            <p className="text-secondary">
              Thanks for reaching out — we will reply to your email.
            </p>
          </div>
        ) : (
          <>
            <div className="form-row">
              <TextInput
                label="Name"
                autoComplete="name"
                required
                value={values.name}
                error={errors.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <TextInput
                label="Email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                error={errors.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <Select
              label="Project type"
              hint="optional"
              value={values.projectType}
              onChange={(e) => set("projectType", e.target.value)}
            >
              <option value="">Select a project type…</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
              <option value="other">Something else</option>
            </Select>

            <TextArea
              label="Message"
              required
              rows={5}
              value={values.message}
              error={errors.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="What do you need?"
            />

            <div className="form-row">
              <TextInput
                label="Budget"
                hint="optional"
                value={values.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="e.g. ৳10,000"
              />
              <TextInput
                label="Timeline"
                hint="optional"
                value={values.timeline}
                onChange={(e) => set("timeline", e.target.value)}
                placeholder="e.g. 2 months"
              />
            </div>

            <FormStatus
              state={status}
              message={
                status === "submitting" ? "Sending your message…" : statusMessage
              }
            />

            <div className="form-controls">
              <Button
                type="submit"
                variant="primary"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </Button>
            </div>

            {status === "error" && (
              <div className="form-fallbacks">
                <a href={buildMailto()} className="btn btn-secondary">
                  Send as email instead
                </a>
                {whatsappLink && (
                  <a href={whatsappLink} className="btn btn-ghost">
                    WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </form>
    </GlassPanel>
  );
}
