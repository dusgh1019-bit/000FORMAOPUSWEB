'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from '@forma-opus/ui/react/Link';
import ParvusNav from './ParvusNav';
import ParvusVisual from './ParvusVisual';
import { parvusProjects, parvusThemeCopy, type ParvusTheme } from '@content/parvus/index';

const themes: ParvusTheme[] = ['KEEP','PLAY','PLACE'];

function themeFromHash(): ParvusTheme {
  if (typeof window === 'undefined') return 'KEEP';
  const candidate = window.location.hash.replace('#','').toUpperCase();
  return themes.includes(candidate as ParvusTheme) ? candidate as ParvusTheme : 'KEEP';
}

export default function ParvusProjectsIndex() {
  const [activeTheme, setActiveTheme] = useState<ParvusTheme>('KEEP');

  useEffect(() => {
    const sync = () => setActiveTheme(themeFromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const items = useMemo(() => parvusProjects.filter((project) => project.theme === activeTheme), [activeTheme]);
  const copy = parvusThemeCopy[activeTheme];

  const selectTheme = (theme: ParvusTheme) => {
    setActiveTheme(theme);
    if (typeof window === 'undefined') return;
    const next = `#${theme.toLowerCase()}`;
    if (window.location.hash !== next) window.history.pushState(null, '', next);
    const focus = document.getElementById('parvus-theme-focus');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    focus?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return <main className={`parvusPage parvusProjectsPage active-${activeTheme.toLowerCase()}`}>
    <ParvusNav />
    <section className="parvusSectionHero"><div><span>PARVUS / PROJECTS</span><h1>BRICK<br/>PROJECTS</h1></div><div><strong>CHOOSE A THEME.<br/>STAY IN THE THEME.</strong><p>KEEP / PLAY / PLACE는 연속 Chapter가 아니라 서로 다른 탐색 의도입니다. Theme 변경은 사용자가 직접 선택합니다.</p></div></section>

    <nav className="parvusThemeSelector" aria-label="PARVUS theme selector">
      <span>CURRENT THEME</span>
      <div>
        {themes.map((theme) => <button key={theme} type="button" className={theme === activeTheme ? 'isActive' : ''} aria-pressed={theme === activeTheme} onClick={() => selectTheme(theme)}>{theme}</button>)}
      </div>
      <small>{copy.statement}</small>
    </nav>

    <section className={`parvusThemeFocus theme-${activeTheme.toLowerCase()}`} id="parvus-theme-focus" aria-live="polite">
      <header className="parvusThemeFocusHeader">
        <div><span>THEME / {activeTheme}</span><h2>{activeTheme}</h2><strong>{copy.statement}</strong></div>
        <div><p>{copy.meaning}</p><small>B2B / {copy.b2b}</small><b>{copy.interactions.join(' → ')}</b></div>
      </header>

      <div className="parvusThemeFocusRail">
        {items.map((project, index) => (
          <article className="parvusThemeProjectScene" key={project.id}>
            <Link href={`/parvus/projects/${project.slug}`} className="parvusThemeProjectEntry" aria-label={`${project.title} 상세 열기`}>
              <div className="parvusThemeProjectVisual">
                <ParvusVisual variant={project.visualVariant} mode={activeTheme==='PLAY'?'play':activeTheme==='PLACE'?'place':'object'} label={`${project.id} / ${project.medium}`} />
                <div className="parvusThemeProjectVerb" aria-hidden="true"><span>{project.interactions[index % project.interactions.length]}</span><small>{project.interactions.join(' / ')}</small></div>
              </div>
              <div className="parvusThemeProjectCopy">
                <span>{project.id} / {String(index + 1).padStart(2,'0')}</span>
                <small>{project.contentType} / {project.structure} / {project.medium}</small>
                <h3>{project.title}</h3>
                <em>{project.koreanTitle}</em>
                <p>{project.descriptor}</p>
                <dl><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>CLIENT</dt><dd>{project.clientType}</dd></div><div><dt>STATUS</dt><dd>{project.status}</dd></div></dl>
                <b className="parvusThemeProjectCue">OPEN {activeTheme} WORK <i>→</i></b>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <footer className="parvusThemeFocusFooter">
        <div><span>STAY IN {activeTheme}</span><strong>{copy.b2b}</strong><p>Related Work는 현재 Theme를 우선합니다. 다른 Theme는 위 Selector에서 명시적으로 선택합니다.</p></div>
        <Link href={`/parvus/contact#inquiry`}>CUSTOM {activeTheme} PROJECT <b>→</b></Link>
      </footer>
    </section>

    <section className="parvusB2BRule"><span>BRAND RULE</span><h2>A CHOSEN THEME<br/>REMAINS THE FOCUS.</h2><p>PARVUS는 기억·놀이·장소를 서로 다른 Experience로 다룹니다. Scroll이 사용자의 Theme Intent를 바꾸지 않습니다.</p><Link href="/parvus/contact#inquiry">CUSTOM BRICK PROJECT →</Link></section>
  </main>;
}
