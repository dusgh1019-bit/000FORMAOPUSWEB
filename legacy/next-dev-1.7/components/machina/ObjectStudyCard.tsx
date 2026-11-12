'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { MachinaObjectProduct } from '@/content/machina';
import TechnicalVisual from './TechnicalVisual';

export default function ObjectStudyCard({ item, featured = false, index = 0 }: { item: MachinaObjectProduct; featured?: boolean; index?: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <article
      className={`machinaObjectStudy ${featured ? 'isFeatured' : ''} ${revealed ? 'isRevealed' : ''}`}
      onPointerEnter={() => setRevealed(true)}
      onPointerLeave={() => setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setRevealed(false); }}
    >
      <button className="machinaObjectVisualToggle" type="button" onClick={() => setRevealed(!revealed)} aria-pressed={revealed}>
        <TechnicalVisual
          variant={(index % 4) + 1}
          label={`${item.id} / ${revealed ? 'STRUCTURE' : 'FINAL FORM'}`}
          mode={revealed ? 'OBJECT_STRUCTURE' : 'OBJECT_FINAL'}
        />
        <span className="machinaObjectCompareLabel"><b>{revealed ? 'STRUCTURE' : 'FINAL FORM'}</b><i>↕</i><small>{revealed ? 'FINAL FORM' : 'STRUCTURE'}</small></span>
      </button>
      <div className="machinaObjectStudyMeta">
        <div><span>{item.id}</span><strong>{item.title}</strong><small>{item.subject}</small></div>
        <dl>
          <div><dt>DOMAIN</dt><dd>{item.domain}</dd></div>
          <div><dt>MEDIUM</dt><dd>{item.medium}</dd></div>
          {item.scale && <div><dt>SCALE</dt><dd>{item.scale}</dd></div>}
          <div><dt>STATUS</dt><dd>{item.status}</dd></div>
        </dl>
        <Link href={`/machina/objects/${item.slug}`}>OPEN OBJECT <b>→</b></Link>
      </div>
    </article>
  );
}
