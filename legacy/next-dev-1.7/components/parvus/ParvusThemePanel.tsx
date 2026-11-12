'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import ParvusVisual from './ParvusVisual';
import type { ParvusTheme } from '@/content/parvus';

const verbs: Record<ParvusTheme, string[]> = {
  KEEP: ['GATHER', 'FRAME', 'HOLD'],
  PLAY: ['BREAK', 'MOVE', 'REBUILD'],
  PLACE: ['TRACE', 'RISE', 'BECOME'],
};

const mode: Record<ParvusTheme, 'object' | 'play' | 'place'> = {
  KEEP: 'object', PLAY: 'play', PLACE: 'place',
};

export default function ParvusThemePanel({
  theme,
  index,
  statement,
  meaning,
  emotions,
}: {
  theme: ParvusTheme;
  index: number;
  statement: string;
  meaning: string;
  emotions: string[];
}) {
  const [active, setActive] = useState(false);
  const variant = (index + 1) as 1 | 2 | 3;
  return (
    <article
      className={`parvusThemePanel theme-${theme.toLowerCase()} ${active ? 'is-interacting' : ''}`}
      data-theme={theme}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <button
        type="button"
        className="parvusThemeTouchLayer"
        onClick={() => setActive((v) => !v)}
        aria-pressed={active}
        aria-label={`${theme} interaction preview`}
      />
      <ParvusVisual variant={variant} mode={mode[theme]} label={`${theme} / BRICK`} />
      <div className="parvusThemeMotion" aria-hidden="true">
        <div className="parvusMotionSubject" />
        {Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--u': i } as CSSProperties} />)}
        <b className="parvusMotionFrame" />
        <b className="parvusMotionTrace" />
      </div>
      <div className="parvusThemeShade" />
      <div className="parvusThemeVerb" aria-hidden="true">
        {verbs[theme].map((verb, i) => <span key={verb}>{String(i + 1).padStart(2, '0')} {verb}</span>)}
      </div>
      <div className="parvusThemeContent">
        <span>0{index + 1} / {theme}</span>
        <h2>{theme}</h2>
        <strong>{statement}</strong>
        <p>{meaning}</p>
        <div>{emotions.join(' · ')}</div>
        <Link href={`/parvus/projects#${theme.toLowerCase()}`}>VIEW PROJECTS <b>→</b></Link>
      </div>
    </article>
  );
}
