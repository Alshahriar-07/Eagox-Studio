"use client";

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Visual weight of the glass surface. */
  tone?: "light" | "dark";
  /** Backdrop blur strength. */
  blur?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "xl";
  as?: "div" | "section" | "article" | "aside" | "footer" | "header";
};

const toneMap: Record<NonNullable<GlassPanelProps["tone"]>, string> = {
  light: "glass-light",
  dark: "glass-dark",
};

const blurMap: Record<NonNullable<GlassPanelProps["blur"]>, string> = {
  sm: "glass-blur-sm",
  md: "glass-blur-md",
  lg: "glass-blur-lg",
};

const radiusMap: Record<NonNullable<GlassPanelProps["radius"]>, string> = {
  sm: "radius-sm",
  md: "radius-md",
  lg: "radius-lg",
  xl: "radius-xl",
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel(
    {
      children,
      tone = "light",
      blur = "md",
      radius = "lg",
      as: Tag = "div",
      className = "",
      ...rest
    },
    ref,
  ) {
    return (
      <Tag
        ref={ref}
        className={`glass-base ${toneMap[tone]} ${blurMap[blur]} ${radiusMap[radius]} ${className}`.trim()}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
