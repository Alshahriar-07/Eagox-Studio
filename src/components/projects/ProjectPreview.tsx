"use client";

import { useEffect, useRef, useState } from "react";

type ProjectPreviewProps = {
  /** Live website URL to preview. */
  url: string;
  /** Accessible name for the frame (project context). */
  title: string;
  /** Desktop website preview ratio — default 16/9. */
  ratio?: string;
};

const LOAD_TIMEOUT_MS = 9000;

/**
 * Website preview inside minimal browser chrome.
 *
 * Compact by design: a small 16:9 thumbnail with the live site inside —
 * never a full-width section. Width is capped by CSS (280–340px depending
 * on breakpoint); the iframe fills only that frame.
 *
 * - Real site rendered in a sandboxed iframe — the website itself is the visual.
 * - X-Frame-Options / CSP frame-ancestors blocks are detected by a load
 *   timeout: replaced by a minimal "Preview unavailable — Open Project"
 *   panel instead of a broken frame.
 * - Lazy-loaded, GPU-friendly, never overflows the parent layout.
 */
export function ProjectPreview({
  url,
  title,
  ratio = "16 / 9",
}: ProjectPreviewProps) {
  const [blocked, setBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (loaded) return;
    timerRef.current = window.setTimeout(() => {
      // No load event within the window → embed almost certainly blocked.
      setBlocked(true);
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [loaded]);

  if (blocked) {
    return (
      <div className="project-preview project-preview--blocked" style={{ aspectRatio: ratio }}>
        <p className="text-label">Preview unavailable</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-preview-open"
        >
          Open Project <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  // Derive a display host for the chrome address strip.
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    // Keep the raw URL if parsing fails.
  }

  return (
    <figure className="project-preview">
      <div className="project-preview-chrome" aria-hidden="true">
        <span className="project-preview-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="project-preview-url">{host}</span>
      </div>
      <div className="project-preview-body" style={{ aspectRatio: ratio }}>
        <iframe
          src={url}
          title={`${title} — live website preview`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={() => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            setLoaded(true);
          }}
          tabIndex={-1}
        />
        {!loaded && <span className="project-preview-loading" aria-hidden="true" />}
      </div>
      <figcaption className="visually-hidden">
        Live preview of {title}
      </figcaption>
    </figure>
  );
}
