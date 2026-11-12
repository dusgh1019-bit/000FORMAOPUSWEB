'use client';

import Link from 'next/link';

export type SplitPanelItem = {
  id: string;
  name: string;
  href: string;
  descriptor: string;
  visualClass: string;
  ariaLabel?: string;
};

export default function SplitPanelScene({
  sceneId,
  sceneLabel,
  items,
  active,
}: {
  sceneId: string;
  sceneLabel: string;
  items: SplitPanelItem[];
  active: boolean;
}) {
  return (
    <section
      className={`splitPanelScene panelCount-${items.length}`}
      aria-label={sceneLabel}
      aria-hidden={!active}
      data-scene-id={sceneId}
    >
      {items.map((item) => (
        <article key={item.id} className={`splitPanel ${item.visualClass}`}>
          <div className="panelVisual" aria-hidden="true"><div className="abstractMass" /></div>
          <Link
            className="panelLink"
            href={item.href}
            aria-label={item.ariaLabel ?? `Enter ${item.name}`}
            tabIndex={active ? 0 : -1}
          />
          <div className="panelLabel">
            <div className="panelName">{item.name}</div>
            <div className="panelDescriptor">{item.descriptor}</div>
          </div>
        </article>
      ))}
    </section>
  );
}
