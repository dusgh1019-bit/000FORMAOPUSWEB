const ROOT_STATE_KEY = 'forma-opus-root-state';

const HISTORY_ORIGIN_KEY = 'forma-opus-history-entry-origin';

function bindHistoryChannelBridge(root: HTMLElement) {
  const link = root.querySelector<HTMLAnchorElement>('[data-panel-id="history"] .panelLink');
  const panel = link?.closest<HTMLElement>('[data-panel-id="history"]');
  if (!link || !panel) return () => {};

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    sessionStorage.setItem(HISTORY_ORIGIN_KEY, 'academia');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      window.location.href = link.href;
      return;
    }

    const rect = panel.getBoundingClientRect();
    const bridge = document.createElement('div');
    bridge.setAttribute('aria-hidden', 'true');
    bridge.style.cssText = [
      'position:fixed',
      `left:${rect.left}px`,
      `top:${rect.top}px`,
      `width:${rect.width}px`,
      `height:${rect.height}px`,
      'z-index:9999',
      'background:linear-gradient(135deg,#151411 0%,#201d18 62%,#332a21 100%)',
      'border:1px solid rgba(244,241,235,.08)',
      'pointer-events:none',
      'overflow:hidden',
      'box-sizing:border-box',
      'will-change:left,top,width,height,opacity,filter',
    ].join(';');

    const name = panel.querySelector<HTMLElement>('.panelName')?.textContent?.trim() || 'HISTORY';
    const descriptor = panel.querySelector<HTMLElement>('.panelDescriptor')?.textContent?.trim() || '';
    bridge.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-items:center;box-sizing:border-box;color:#f4f1eb;font-family:var(--fo-font-ui,Inter,sans-serif)"><div style="text-align:center"><strong style="display:block;font-size:clamp(72px,13vw,204px);line-height:.76;letter-spacing:-.065em">${name}</strong><span style="display:block;margin-top:16px;font-size:9px;letter-spacing:.22em;opacity:.34">${descriptor}</span></div></div>`;
    document.body.append(bridge);

    const animation = bridge.animate([
      { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderColor: 'rgba(244,241,235,.08)', filter: 'brightness(1)' },
      { left: '0px', top: '0px', width: '100vw', height: '100vh', borderColor: 'rgba(244,241,235,0)', filter: 'brightness(.93)' },
    ], { duration: 620, easing: 'cubic-bezier(.2,.76,.16,1)', fill: 'forwards' });

    animation.finished.then(() => { window.location.href = link.href; }).catch(() => { window.location.href = link.href; });
  };

  link.addEventListener('click', onClick);
  return () => link.removeEventListener('click', onClick);
}

// PARVUS Five States v2: restrained full-screen fade at the WORKS -> PARVUS boundary.
// No other domain navigation is altered.
function bindParvusRouteFade(root: HTMLElement) {
  const link = root.querySelector<HTMLAnchorElement>('[data-panel-id="parvus"] .panelLink');
  if (!link) return;
  let locked = false;
  link.addEventListener('click', (event: MouseEvent) => {
    if (locked || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    locked = true;
    const curtain = document.createElement('div');
    curtain.setAttribute('aria-hidden', 'true');
    curtain.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#0a0d13;pointer-events:none;opacity:0';
    document.body.append(curtain);
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const animation = curtain.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: reduced ? 80 : 390,
      easing: 'cubic-bezier(.32,0,.58,1)',
      fill: 'forwards',
    });
    void animation.finished.then(() => { window.location.assign(link.href); }).catch(() => { window.location.assign(link.href); });
  }, { capture: true });
}

const WHEEL_THRESHOLD = 46;
const TOUCH_THRESHOLD = 54;
const TRANSITION_LOCK_MS = 760;
type Scene = 'works' | 'academia';

export function mountRootSceneController(root: HTMLElement) {
  let scene: Scene = 'works';
  let entered = false;
  let transitioning = false;
  let wheelAccumulator = 0;
  let touchStartY: number | null = null;
  let unlockTimer: number | undefined;

  const scenesRoot = root.querySelector<HTMLElement>('[data-root-scenes]');
  const sceneButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-scene-target]')];
  const scenePanels = [...root.querySelectorAll<HTMLElement>('[data-scene-panel]')];
  // HISTORY is now a blank canvas: no animated transition bridge.
  bindParvusRouteFade(root);

  const requested = new URLSearchParams(window.location.search).get('scene');
  const stored = sessionStorage.getItem(ROOT_STATE_KEY) === 'brands';
  if (requested === 'academia') scene = 'academia';

  function sync() {
    root.dataset.rootState = entered ? 'brands' : 'entry';
    root.dataset.scene = scene;
    root.classList.toggle('isEntry', !entered);
    root.classList.toggle('isBrands', entered);
    root.classList.toggle('scene-works', scene === 'works');
    root.classList.toggle('scene-academia', scene === 'academia');
    root.classList.toggle('isSceneTransitioning', transitioning);
    scenesRoot?.setAttribute('aria-hidden', entered ? 'false' : 'true');
    sceneButtons.forEach((button) => button.classList.toggle('active', button.dataset.sceneTarget === scene));
    scenePanels.forEach((panel) => {
      const active = panel.dataset.scenePanel === scene;
      panel.querySelector('.splitPanelScene')?.setAttribute('aria-hidden', active ? 'false' : 'true');
      panel.querySelectorAll<HTMLElement>('.panelLink').forEach((link) => link.tabIndex = active ? 0 : -1);
    });
  }

  function enter() {
    sessionStorage.setItem(ROOT_STATE_KEY, 'brands');
    entered = true;
    if (requested !== 'academia') scene = 'works';
    sync();
  }

  function changeScene(next: Scene) {
    if (!entered || transitioning || scene === next) return;
    transitioning = true;
    scene = next;
    wheelAccumulator = 0;
    sync();
    if (unlockTimer) window.clearTimeout(unlockTimer);
    unlockTimer = window.setTimeout(() => { transitioning = false; sync(); }, TRANSITION_LOCK_MS);
  }

  root.querySelectorAll<HTMLElement>('[data-enter-root]').forEach((node) => node.addEventListener('click', (event) => {
    event.preventDefault(); enter();
  }));
  sceneButtons.forEach((button) => button.addEventListener('click', () => changeScene(button.dataset.sceneTarget as Scene)));

  root.addEventListener('wheel', (event) => {
    if (!entered || Math.abs(event.deltaY) < 2) return;
    event.preventDefault();
    if (transitioning) return;
    wheelAccumulator += event.deltaY;
    if (wheelAccumulator > WHEEL_THRESHOLD && scene === 'works') changeScene('academia');
    if (wheelAccumulator < -WHEEL_THRESHOLD && scene === 'academia') changeScene('works');
    if ((scene === 'works' && wheelAccumulator < 0) || (scene === 'academia' && wheelAccumulator > 0)) wheelAccumulator = 0;
  }, { passive: false });

  root.addEventListener('touchstart', (event) => { touchStartY = event.touches[0]?.clientY ?? null; }, { passive: true });
  root.addEventListener('touchmove', (event) => {
    if (!entered || touchStartY == null || transitioning) return;
    const y = event.touches[0]?.clientY;
    if (y == null) return;
    const delta = touchStartY - y;
    if (Math.abs(delta) < 8) return;
    event.preventDefault();
    if (delta > TOUCH_THRESHOLD && scene === 'works') { touchStartY = null; changeScene('academia'); }
    else if (delta < -TOUCH_THRESHOLD && scene === 'academia') { touchStartY = null; changeScene('works'); }
  }, { passive: false });
  root.addEventListener('touchend', () => { touchStartY = null; }, { passive: true });

  window.addEventListener('keydown', (event) => {
    if (!entered || transitioning) return;
    if ((event.key === 'ArrowDown' || event.key === 'PageDown') && scene === 'works') { event.preventDefault(); changeScene('academia'); }
    if ((event.key === 'ArrowUp' || event.key === 'PageUp') && scene === 'academia') { event.preventDefault(); changeScene('works'); }
  });

  entered = stored || requested === 'academia';
  if (requested === 'academia') sessionStorage.setItem(ROOT_STATE_KEY, 'brands');
  sync();
}
