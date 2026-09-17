"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TextInput, TextArea, FormStatus } from "@/components/forms";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { services } from "@/data/services";
import { formEndpoints, getWhatsAppLink } from "@/data/integrations";
import { contactEmail } from "@/data/site";
import {
  validateRequired,
  validateEmail,
  clampText,
  type FormErrors,
} from "@/lib/validation/inquiry";

const STEPS = ["Service", "Project", "Contact", "Review"] as const;

type OrderFormProps = {
  /** Preselected service slug (e.g. from a service card CTA). */
  initialService?: string;
};

/**
 * Order flow per 10-CONTACT-ORDER.md:
 * select service → describe requirements → references/links → contact
 * details → review → submit. Submits to the approved Formspree endpoint
 * from the environment; never silently loses input — without a configured
 * endpoint it offers a mailto fallback with the inquiry content.
 *
 * Note: the fallback mailto uses the approved contact address from
 * siteConfig (contactEmail).
 */
export function OrderForm({ initialService }: OrderFormProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(() => ({
    // Normalize any preselected slug (?service=...) to a known service.
    service:
      services.some((s) => s.slug === initialService)
        ? (initialService as string)
        : services[0].slug,
    description: "",
    references: "",
    name: "",
    email: "",
    budget: "",
    timeline: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const selectedService =
    services.find((s) => s.slug === values.service) ?? services[0];

  const set = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: clampText(value) }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (current: number): boolean => {
    const next: FormErrors = {};
    if (current === 2) {
      Object.assign(next, validateRequired(values, ["name"]));
      const emailError = validateEmail(values.email);
      if (emailError) next.email = emailError;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Guard both explicit submit and implicit Enter-key submit.
    if (status === "submitting") return;
    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    const endpoint = formEndpoints.order;
    if (!endpoint) {
      setStatus("error");
      setStatusMessage(
        "Submission is not configured yet. Use the email fallback below — your inquiry details are preserved.",
      );
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Project inquiry — ${selectedService.title}`,
          type: "order",
          service: selectedService.title,
          description: values.description,
          references: values.references,
          budget: values.budget,
          timeline: values.timeline,
          name: values.name,
          email: values.email,
        }),
      });

      if (response.ok) {
        // Successful order submission → dedicated thank-you page.
        window.location.assign("/thank-you");
      } else {
        setStatus("error");
        setStatusMessage(
          "Something went wrong sending your inquiry. Please try again — nothing was lost.",
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network error — your inquiry was not sent. Please try again.",
      );
    }
  };

  const buildMailto = () => {
    const body = [
      `Service: ${selectedService.title}`,
      `Description: ${values.description}`,
      `References: ${values.references}`,
      `Budget: ${values.budget}`,
      `Timeline: ${values.timeline}`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
    ].join("\n");
    return `mailto:${contactEmail}?subject=${encodeURIComponent(
      `Project inquiry — ${selectedService.title}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const whatsappLink = getWhatsAppLink(
    `Hello Eagox Studio — I want to start a project (${selectedService.shortTitle}).`,
  );

  return (
    <GlassPanel tone="dark" blur="lg" radius="xl" className="form-panel">
      <form onSubmit={onSubmit} noValidate>
        {/* Step indicator */}
        <ol className="form-steps" aria-label="Order steps">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className="form-step"
              data-state={index === step ? "current" : index < step ? "done" : "upcoming"}
              aria-current={index === step ? "step" : undefined}
            >
              <span className="form-step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="form-step-label">{label}</span>
            </li>
          ))}
        </ol>

        {status === "success" ? (
          <div className="form-success-panel">
            <h2 className="text-display">Inquiry received</h2>
            <p className="text-secondary">
              Thanks — your project inquiry is in. We reply to the email you
              provided.
            </p>
          </div>
        ) : (
          <>
            {step === 0 && (
              <fieldset className="form-step-panel">
                <legend className="form-legend">Select a service</legend>
                <div className="order-service-options">
                  {services.map((service) => (
                    <label
                      key={service.slug}
                      className="order-service-option"
                      data-checked={values.service === service.slug}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.slug}
                        checked={values.service === service.slug}
                        onChange={(e) => set("service", e.target.value)}
                        className="visually-hidden"
                      />
                      <span className="order-service-name">{service.shortTitle}</span>
                      <span className="order-service-price">
                        {service.startingPrice}
                      </span>
                      <span className="order-service-desc text-muted">
                        {service.suitableFor}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-muted form-hint">
                  {selectedService.title} — starting from{" "}
                  {selectedService.startingPrice}. Starting price; the final
                  quote depends on scope.
                </p>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="form-step-panel">
                <legend className="form-legend">Describe the project</legend>
                <TextArea
                  label="What do you want to build?"
                  rows={5}
                  value={values.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Goals, core features, anything that helps us understand the product…"
                />
                <TextArea
                  label="References / links"
                  hint="optional"
                  rows={3}
                  value={values.references}
                  onChange={(e) => set("references", e.target.value)}
                  placeholder="Links to anything useful — existing sites, docs, repos…"
                />
                <div className="form-row">
                  <TextInput
                    label="Budget"
                    hint="optional"
                    value={values.budget}
                    onChange={(e) => set("budget", e.target.value)}
                    placeholder="e.g. ৳8,000–15,000"
                  />
                  <TextInput
                    label="Timeline"
                    hint="optional"
                    value={values.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                    placeholder="e.g. 4–6 weeks"
                  />
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="form-step-panel">
                <legend className="form-legend">Contact details</legend>
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
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="form-step-panel">
                <legend className="form-legend">Review your inquiry</legend>
                <dl className="order-review">
                  <div>
                    <dt className="text-label">Service</dt>
                    <dd>
                      {selectedService.title}{" "}
                      <Badge>{selectedService.startingPrice} starting</Badge>
                    </dd>
                  </div>
                  {values.description && (
                    <div>
                      <dt className="text-label">Project</dt>
                      <dd>{values.description}</dd>
                    </div>
                  )}
                  {values.references && (
                    <div>
                      <dt className="text-label">References</dt>
                      <dd>{values.references}</dd>
                    </div>
                  )}
                  {values.budget && (
                    <div>
                      <dt className="text-label">Budget</dt>
                      <dd>{values.budget}</dd>
                    </div>
                  )}
                  {values.timeline && (
                    <div>
                      <dt className="text-label">Timeline</dt>
                      <dd>{values.timeline}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-label">Contact</dt>
                    <dd>
                      {values.name} — {values.email}
                    </dd>
                  </div>
                </dl>
              </fieldset>
            )}

            <FormStatus
              state={status}
              message={
                status === "submitting" ? "Sending your inquiry…" : statusMessage
              }
            />

            <div className="form-controls">
              {step > 0 && (
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button type="button" variant="primary" onClick={goNext}>
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send inquiry"}
                </Button>
              )}
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
