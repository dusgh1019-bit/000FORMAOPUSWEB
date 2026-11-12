import type { AnchorHTMLAttributes, ReactNode } from 'react';
export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode };
export default function Link({ href, children, ...props }: LinkProps){ return <a href={href} {...props}>{children}</a>; }
