'use client';

import Link from 'next/link';

const ROOT_STATE_KEY = 'forma-opus-root-state';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export default function BreadcrumbTrail({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={`breadcrumbTrail ${className}`.trim()} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span className="breadcrumbItem" key={`${item.label}-${item.href}`}>
          {index > 0 && <span className="breadcrumbSeparator" aria-hidden="true">/</span>}
          <Link
            href={item.href}
            onClick={() => {
              if (item.href === '/' || item.href.startsWith('/?scene=')) sessionStorage.setItem(ROOT_STATE_KEY, 'brands');
            }}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
