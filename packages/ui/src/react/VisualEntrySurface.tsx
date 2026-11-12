import type { AnchorHTMLAttributes } from 'react';
import Link from './Link';

export type VisualEntrySurfaceProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label: string;
  className?: string;
};

/**
 * Shared navigation hit-area for visible media/panel surfaces.
 * The visual design remains domain-owned; this component only standardizes
 * navigation semantics, keyboard access and a predictable focus target.
 * Do not place it above independent controls such as sliders, drag handles,
 * play buttons or configuration inputs.
 */
export default function VisualEntrySurface({ href, label, className = '', ...props }: VisualEntrySurfaceProps) {
  return (
    <Link
      href={href}
      className={`visualEntrySurface ${className}`.trim()}
      aria-label={label}
      {...props}
    >
      <span className="visualEntrySrOnly">{label}</span>
    </Link>
  );
}
