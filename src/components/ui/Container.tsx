import type { ElementType, HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: ElementType;
};

/** Centered max-width content container. */
export function Container({
  children,
  as: Tag = "div",
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <Tag className={`container ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
