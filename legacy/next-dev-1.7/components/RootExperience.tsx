'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import BreadcrumbTrail from './BreadcrumbTrail';
import SplitPanelScene, { SplitPanelItem } from './SplitPanelScene';
import { academia, brands } from '@/content/model';

const ROOT_STATE_KEY = 'forma-opus-root-state';
const WHEEL_THRESHOLD = 46;
const TOUCH_THRESHOLD = 54;
const TRANSITION_LOCK_MS = 760;

type Scene = 'works' | 'academia';

export default function RootExperience() {
  const [entered, setEntered] = useState(false);
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState<Scene>('works');
  const [transitioning, setTransitioning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wheelAccumulator = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const worksItems = useMemo<SplitPanelItem[]>(() => brands.map((brand) => ({
    id: brand.slug,
    name: brand.name,
    href: `/${brand.slug}`,
    descriptor: brand.previewLabel,
    visualClass: `panel-${brand.slug}`,
    ariaLabel: `Enter ${brand.name}`,
  })), []);

  const academiaItems = useMemo<SplitPanelItem[]>(() => academia.map((item) => ({
    id: item.slug,
    name: item.name,
    href: `/academia/${item.slug}`,
    descriptor: item.previewLabel,
    visualClass: `panel-academia-${item.slug}`,
    ariaLabel: `Enter ACADEMIA ${item.name}`,
  })), []);

  useEffect(() => {
    const stored = sessionStorage.getItem(ROOT_STATE_KEY) === 'brands';
    const requestedScene = new URLSearchParams(window.location.search).get('scene');
    setEntered(stored || requestedScene === 'academia');
    setScene(requestedScene === 'academia' ? 'academia' : 'works');
    if (requestedScene === 'academia') sessionStorage.setItem(ROOT_STATE_KEY, 'brands');
    setReady(true);
    return () => { if (unlockTimer.current) clearTimeout(unlockTimer.current); };
  }, []);

  function enter() {
    sessionStorage.setItem(ROOT_STATE_KEY, 'brands');
    setScene('works');
    setEntered(true);
  }

  function changeScene(next: Scene) {
    if (!entered || transitioning || scene === next) return;
    setTransitioning(true);
    setScene(next);
    wheelAccumulator.current = 0;
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(() => setTransitioning(false), TRANSITION_LOCK_MS);
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !entered) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 2) return;
      event.preventDefault();
      if (transitioning) return;
      wheelAccumulator.current += event.deltaY;
      if (wheelAccumulator.current > WHEEL_THRESHOLD && scene === 'works') changeScene('academia');
      if (wheelAccumulator.current < -WHEEL_THRESHOLD && scene === 'academia') changeScene('works');
      if ((scene === 'works' && wheelAccumulator.current < 0) || (scene === 'academia' && wheelAccumulator.current > 0)) {
        wheelAccumulator.current = 0;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY.current == null || transitioning) return;
      const y = event.touches[0]?.clientY;
      if (y == null) return;
      const delta = touchStartY.current - y;
      if (Math.abs(delta) < 8) return;
      event.preventDefault();
      if (delta > TOUCH_THRESHOLD && scene === 'works') {
        touchStartY.current = null;
        changeScene('academia');
      } else if (delta < -TOUCH_THRESHOLD && scene === 'academia') {
        touchStartY.current = null;
        changeScene('works');
      }
    };

    const onTouchEnd = () => { touchStartY.current = null; };
    const onKeyDown = (event: KeyboardEvent) => {
      if (transitioning) return;
      if ((event.key === 'ArrowDown' || event.key === 'PageDown') && scene === 'works') {
        event.preventDefault(); changeScene('academia');
      }
      if ((event.key === 'ArrowUp' || event.key === 'PageUp') && scene === 'academia') {
        event.preventDefault(); changeScene('works');
      }
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchmove', onTouchMove, { passive: false });
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
      root.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [entered, scene, transitioning]);

  if (!ready) {
    return <main className="entry" aria-label="FORMA OPUS"><span className="entryWordmark">FORMA OPUS</span></main>;
  }

  return (
    <div
      ref={rootRef}
      className={`rootExperience ${entered ? 'isBrands' : 'isEntry'} scene-${scene} ${transitioning ? 'isSceneTransitioning' : ''}`}
      data-root-state={entered ? 'brands' : 'entry'}
      data-scene={scene}
    >
      <main className="entry rootEntry" aria-hidden={entered}>
        <a href="#works-scene" className="skipLink" onClick={(event) => { event.preventDefault(); enter(); }}>WORKS로 건너뛰기</a>
        <button className="entryButton" onClick={enter} aria-label="Enter FORMA OPUS" disabled={entered}>
          <span className="entryWordmark">FORMA OPUS</span>
          <span className="entryCue">Enter</span>
        </button>
      </main>

      <main className="rootBrands" aria-hidden={!entered}>
        <div className="utility rootSceneUtility">
          <BreadcrumbTrail items={[{ label: 'FORMA OPUS', href: '/' }]} />
          <nav className="utilityNav" aria-label="Secondary">
            <Link href="/about">About</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="sceneViewport" id="works-scene">
          <div className="sceneTrack" aria-live="polite">
            <div className="rootScene sceneWorks">
              <SplitPanelScene sceneId="works" sceneLabel="SCENE 01 — WORKS" items={worksItems} active={scene === 'works'} />
              <div className="sceneMeta sceneMetaWorks" aria-hidden="true"><span>01</span><strong>WORKS</strong><small>SCROLL ↓ ACADEMIA</small></div>
            </div>
            <div className="rootScene sceneAcademia">
              <SplitPanelScene sceneId="academia" sceneLabel="SCENE 02 — ACADEMIA" items={academiaItems} active={scene === 'academia'} />
              <div className="sceneMeta sceneMetaAcademia" aria-hidden="true"><span>02</span><strong>ACADEMIA</strong><small>SCROLL ↑ WORKS</small></div>
            </div>
          </div>
        </div>
        <nav className="sceneRail" aria-label="Main scenes">
          <button className={scene === 'works' ? 'active' : ''} onClick={() => changeScene('works')} aria-label="Go to WORKS"><span>01</span></button>
          <button className={scene === 'academia' ? 'active' : ''} onClick={() => changeScene('academia')} aria-label="Go to ACADEMIA"><span>02</span></button>
        </nav>
      </main>
    </div>
  );
}
