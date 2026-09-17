import type { ReactNode } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";

type PageStatusProps = {
  title: string;
  message: ReactNode;
};

/**
 * Honest content-status panel for pages awaiting owner-approved material.
 * Used instead of fabricated content (11-CONTENT-DATA.md).
 */
export function PageStatus({ title, message }: PageStatusProps) {
  return (
    <GlassPanel
      tone="light"
      blur="sm"
      radius="lg"
      className="page-status"
      role="note"
    >
      <p className="text-label">{title}</p>
      <div className="page-status-message text-secondary">{message}</div>
    </GlassPanel>
  );
}
