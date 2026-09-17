"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type BackgroundProps = {
  src?: string;
};

/**
 * Environmental motion layer (assets/bg.mp4) per 05-ANIMATION-MOTION.md.
 *
 * - Static graphite fallback is always rendered underneath.
 * - Video fades in only after it can actually play — the site never
 *   depends on the video loading.
 * - Skipped for prefers-reduced-motion and Save-Data clients.
 * - Fixed layer, object-fit: cover to preserve framing, pointer-events none.
 */
export function Background({ src = "/assets/bg.mp4" }: BackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  const showVideo = !prefersReducedMotion && !saveData && !videoFailed;

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // Guard against autoplay being blocked: only fade in when playing.
    const tryPlay = () => {
      video.play().then(
        () => setCanPlay(true),
        () => setVideoFailed(true),
      );
    };

    if (video.readyState >= 3) {
      tryPlay();
      return;
    }

    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("error", () => setVideoFailed(true), { once: true });
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("error", () => setVideoFailed(true));
    };
  }, [showVideo]);

  return (
    <div className="background-layer" aria-hidden="true">
      <div className="background-fallback" />
      {showVideo && (
        <video
          ref={videoRef}
          className="background-media"
          data-loaded={canPlay ? "true" : "false"}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="background-overlay" />
    </div>
  );
}
