import type { CSSProperties, ReactNode } from "react";

interface Props {
  show: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Text wipe via clip-path. Uses a CSS keyframe animation (not a
 * transition) so it plays reliably on first mount — see comment in
 * animations.css for why this matters.
 */
export function MaskReveal({
  show,
  delay = 0,
  duration,
  className,
  children,
}: Props) {
  const cls = ["mask-reveal", show ? "in" : "", className]
    .filter(Boolean)
    .join(" ");
  const style: CSSProperties = {
    // Pass timings to the keyframe via CSS custom properties so each
    // call site can tune duration / delay without overriding the
    // animation shorthand (which would clobber the timing function).
    ["--mr-delay" as string]: `${delay}ms`,
    ...(duration ? { ["--mr-duration" as string]: `${duration}ms` } : null),
  };
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}
