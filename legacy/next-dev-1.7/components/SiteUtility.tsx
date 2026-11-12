'use client';

import Link from 'next/link';
import BreadcrumbTrail, { type BreadcrumbItem } from './BreadcrumbTrail';

function trailFromCurrent(current?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'FORMA OPUS', href: '/' }];
  if (!current) return items;

  const parts = current.split('/').map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return items;

  const first = parts[0].toUpperCase();
  if (['GREA', 'PARVUS', 'MACHINA'].includes(first)) {
    const brandPath = `/${first.toLowerCase()}`;
    items.push({ label: first, href: brandPath });
    if (parts[1]) {
      const second = parts[1].toUpperCase();
      if (second === 'PROJECTS' || second === 'ARCHIVE') items.push({ label: second, href: `${brandPath}/${second.toLowerCase()}` });
    }
    return items;
  }

  if (['ABOUT', 'ARCHIVE', 'CONTACT'].includes(first)) items.push({ label: first, href: `/${first.toLowerCase()}` });
  return items;
}

export default function SiteUtility({ current, trail }: { current?: string; trail?: BreadcrumbItem[] }) {
  return (
    <div className="utility">
      <BreadcrumbTrail items={trail ?? trailFromCurrent(current)} />
      <nav className="utilityNav" aria-label="Site utility">
        <Link href="/about">About</Link>
        <Link href="/archive">Archive</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
