import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizeClass: Record<Size, string> = {
  md: "",
  lg: "btn-lg",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button/link primitive.
 * Renders <button>, Next <Link> (internal), or <a> (external).
 * Subtle press feedback only — no glow or neon per design spec.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children } = props;
  const classes = `btn ${variantClass[variant]} ${sizeClass[size]}`.trim();

  if (props.href !== undefined) {
    const { variant: _v, size: _s, ...anchorProps } = props;
    const isExternal = props.href.startsWith("http");

    if (isExternal) {
      return (
        <a
          {...anchorProps}
          className={classes}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noopener noreferrer"}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        {...(anchorProps as Omit<ButtonAsLink, keyof ButtonBaseProps>)}
        href={props.href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, ...buttonProps } = props;
  return (
    <button type={buttonProps.type ?? "button"} {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
