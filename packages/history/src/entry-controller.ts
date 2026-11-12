const HISTORY_SEEN_KEY = 'forma-opus-history-entry-seen';
const HISTORY_ORIGIN_KEY = 'forma-opus-history-entry-origin';

type Cleanup = () => void;
type ChannelPhase = 'prelude' | 'gate' | 'opening' | 'exposure' | 'axis' | 'ready';

const delay = (ms: number, fn: () => void, timers: number[]) => {
  const id = window.setTimeout(fn, ms);
  timers.push(id);
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function entrySeed() {
  const override = Number(new URLSearchParams(window.location.search).get('historySeed'));
  if (Number.isFinite(override) && override > 0) return override >>> 0;
  const data = new Uint32Array(1);
  crypto.getRandomValues?.(data);
  return (data[0] || Date.now()) >>> 0;
}

export function mountHistoryChannelEntry(root: HTMLElement): Cleanup {
  const stage = root.querySelector<HTMLElement>('[data-history-stage]');
  const gate = root.querySelector<HTMLElement>('[data-history-gate]');
  const openButton = root.querySelector<HTMLButtonElement>('[data-history-open]');
  const particles = root.querySelector<HTMLElement>('[data-history-particles]');
  const live = root.querySelector<HTMLElement>('[data-history-live]');
  const brush = root.querySelector<HTMLCanvasElement>('[data-history-brush]');
  const axisNode = root.querySelector<HTMLButtonElement>('[data-history-axis-node]');
  const summary = root.querySelector<HTMLElement>('[data-history-summary]');
  const detailButton = root.querySelector<HTMLButtonElement>('[data-history-detail]');
  const detailHook = root.querySelector<HTMLElement>('[data-history-detail-hook]');
  const detailClose = root.querySelector<HTMLButtonElement>('[data-history-detail-close]');
  if (!stage || !gate || !openButton || !particles) return () => {};

  const stageEl = stage;
  const gateEl = gate;
  const openButtonEl = openButton;
  const particlesEl = particles;
  const timers: number[] = [];
  const listeners: Array<() => void> = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem(HISTORY_SEEN_KEY) === '1';
  const cameFromAcademia = sessionStorage.getItem(HISTORY_ORIGIN_KEY) === 'academia';
  sessionStorage.removeItem(HISTORY_ORIGIN_KEY);

  let phase: ChannelPhase = 'prelude';
  let committed = false;
  let brushFrame = 0;
  let resizeTimer = 0;
  const seed = entrySeed();
  const rand = mulberry32(seed);

  function drawBrushAxis(immediate = false) {
    if (!brush) return;
    if (brushFrame) cancelAnimationFrame(brushFrame);
    const ctx = brush.getContext('2d');
    if (!ctx) return;

    const rect = brush.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    brush.width = Math.max(1, Math.round(rect.width * dpr));
    brush.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;
    const pad = Math.max(10, height * .014);
    const total = Math.max(1, height - pad * 2);
    const brushSeed = seed ^ 0x9e3779b9;
    const hash = (n: number) => {
      const x = Math.sin((n + brushSeed) * 12.9898) * 43758.5453123;
      return x - Math.floor(x);
    };
    const point = (t: number) => ({
      x: width * .5 + Math.sin(t * 7.2) * 2.8 + Math.sin(t * 21.7) * 1.2 + Math.sin(t * 53.1) * .48,
      y: pad + total * t,
    });
    const pressure = (t: number) => {
      const start = Math.min(1, t * 11);
      const end = Math.min(1, (1 - t) * 13);
      const envelope = Math.min(start, end);
      return (18 + Math.sin(t * Math.PI) * 8.5 + Math.sin(t * 14.8) * 2.3) * (.42 + .58 * envelope);
    };

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let lastIndex = 0;
    const samples = Math.max(340, Math.round(height * .72));

    const paintTo = (progress: number) => {
      const target = Math.min(samples, Math.floor(samples * progress));
      for (let i = lastIndex; i <= target; i += 1) {
        const t = i / samples;
        const p = point(t);
        const p0 = point(Math.max(0, (i - 1) / samples));
        const w = pressure(t);
        const lateral = (hash(i * 17) - .5) * 2.7;

        // wet core: overlapping opacity gives visible ink density variation.
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `rgba(18,20,16,${.58 + hash(i * 3) * .25})`;
        ctx.lineWidth = w * (.75 + hash(i * 5) * .21);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p.x + lateral, p.y);
        ctx.stroke();

        if (hash(i * 7) > .42) {
          ctx.strokeStyle = `rgba(11,13,10,${.08 + hash(i * 11) * .16})`;
          ctx.lineWidth = w * (.30 + hash(i * 13) * .28);
          ctx.beginPath();
          ctx.moveTo(p0.x - w * .08, p0.y);
          ctx.lineTo(p.x + w * .04, p.y + .6);
          ctx.stroke();
        }

        // Bristle fibres and split hairs keep the contour organic.
        const fibreCount = 3 + Math.floor(hash(i * 19) * 5);
        for (let f = 0; f < fibreCount; f += 1) {
          const side = hash(i * 29 + f) > .5 ? 1 : -1;
          const offset = side * w * (.30 + hash(i * 31 + f) * .46);
          const trail = .8 + hash(i * 37 + f) * 4.8;
          ctx.strokeStyle = `rgba(18,20,16,${.055 + hash(i * 41 + f) * .19})`;
          ctx.lineWidth = .35 + hash(i * 43 + f) * 1.45;
          ctx.beginPath();
          ctx.moveTo(p0.x + offset * .84, p0.y - .4);
          ctx.lineTo(p.x + offset + (hash(i * 47 + f) - .5) * 3.2, p.y + trail);
          ctx.stroke();
        }

        // Dry brush gaps: paper peeks through as the pressure lifts.
        if (i > 14 && i < samples - 10 && hash(i * 53) > .67) {
          ctx.globalCompositeOperation = 'destination-out';
          const channels = 1 + Math.floor(hash(i * 59) * 3);
          for (let c = 0; c < channels; c += 1) {
            const off = (hash(i * 61 + c) - .5) * w * .88;
            ctx.strokeStyle = `rgba(0,0,0,${.08 + hash(i * 67 + c) * .28})`;
            ctx.lineWidth = .35 + hash(i * 71 + c) * 1.55;
            ctx.beginPath();
            ctx.moveTo(p0.x + off, p0.y);
            ctx.lineTo(p.x + off + (hash(i * 73 + c) - .5) * 2.4, p.y + 2.2 + hash(i * 79 + c) * 2.2);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      lastIndex = target + 1;
    };

    if (immediate || reducedMotion) {
      paintTo(1);
      brush.classList.add('isPainted');
      return;
    }

    const started = performance.now();
    const duration = window.matchMedia('(max-width: 620px)').matches ? 820 : 1120;
    const frame = (now: number) => {
      const raw = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - raw, 3.4);
      paintTo(eased);
      if (raw < 1) brushFrame = requestAnimationFrame(frame);
      else {
        brushFrame = 0;
        brush.classList.add('isPainted');
      }
    };
    brush.classList.remove('isPainted');
    brushFrame = requestAnimationFrame(frame);
  }

  function setPhase(next: ChannelPhase) {
    phase = next;
    stageEl.dataset.phase = next;
    stageEl.classList.toggle('isReentry', seen);
    stageEl.classList.toggle('cameFromAcademia', cameFromAcademia);
    if (next === 'axis') drawBrushAxis(false);
    if (next === 'ready' && brush && !brush.classList.contains('isPainted')) drawBrushAxis(true);
    if (live) {
      if (next === 'gate') live.textContent = 'KOREA / AXIS로 들어가는 문이 준비되었습니다.';
      if (next === 'ready') live.textContent = 'KOREA / AXIS 마스터 축이 준비되었습니다.';
    }
  }

  function createParticles() {
    particlesEl.replaceChildren();
    if (reducedMotion) return;
    const compact = window.matchMedia('(max-width: 700px)').matches;
    const count = compact ? 28 : 52;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement('i');
      const x = 31 + rand() * 38;
      const y = 38 + rand() * 24;
      const angle = (-155 + rand() * 130) * Math.PI / 180;
      const travel = 24 + rand() * (compact ? 32 : 50);
      const driftX = Math.cos(angle) * travel + (rand() - .5) * 14;
      const driftY = Math.sin(angle) * travel - 6 - rand() * 16;
      const size = .8 + rand() * 2.9;
      const duration = 1050 + rand() * 1500;
      const delayMs = rand() * 520;
      const curveX = (rand() - .5) * 14;
      const curveY = (rand() - .5) * 10;
      particle.style.setProperty('--x', `${x}%`);
      particle.style.setProperty('--y', `${y}%`);
      particle.style.setProperty('--dx', `${driftX}vw`);
      particle.style.setProperty('--dy', `${driftY}vh`);
      particle.style.setProperty('--cx', `${curveX}vw`);
      particle.style.setProperty('--cy', `${curveY}vh`);
      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--duration', `${duration}ms`);
      particle.style.setProperty('--delay', `${delayMs}ms`);
      particlesEl.append(particle);
    }
  }

  function showGate(immediate = false) {
    if (phase !== 'prelude') return;
    setPhase('gate');
    if (immediate) stageEl.classList.add('skipPrelude');
    delay(immediate ? 20 : 220, () => openButtonEl.focus({ preventScroll: true }), timers);
  }

  function finishReady() {
    committed = true;
    setPhase('ready');
    sessionStorage.setItem(HISTORY_SEEN_KEY, '1');
  }

  function commitOpen() {
    if (committed || (phase !== 'gate' && phase !== 'opening')) return;
    committed = true;
    gateEl.classList.remove('isPreview', 'isPressing');
    openButtonEl.disabled = true;
    setPhase('opening');

    if (reducedMotion) {
      delay(100, () => setPhase('exposure'), timers);
      delay(200, () => setPhase('axis'), timers);
      delay(360, finishReady, timers);
      return;
    }

    delay(580, () => setPhase('exposure'), timers);
    delay(1160, () => setPhase('axis'), timers);
    delay(2440, finishReady, timers);
  }

  function onPointerEnter() {
    if (phase === 'gate' && !committed) gateEl.classList.add('isPreview');
  }
  function onPointerMove(event: PointerEvent) {
    if (phase !== 'gate' || committed) return;
    const rect = gateEl.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
    gateEl.style.setProperty('--pointer-x', nx.toFixed(3));
    gateEl.style.setProperty('--pointer-y', ny.toFixed(3));
  }
  function onPointerLeave() {
    if (phase === 'gate' && !committed) gateEl.classList.remove('isPreview', 'isPressing');
    gateEl.style.removeProperty('--pointer-x');
    gateEl.style.removeProperty('--pointer-y');
  }
  function onPointerDown(event: PointerEvent) {
    if (phase !== 'gate' || committed) return;
    gateEl.classList.add('isPressing');
    openButtonEl.setPointerCapture?.(event.pointerId);
  }
  function onPointerUp() {
    if (phase !== 'gate' || committed) return;
    gateEl.classList.remove('isPressing');
    commitOpen();
  }
  function onPointerCancel() {
    if (phase === 'gate' && !committed) gateEl.classList.remove('isPressing');
  }
  function onClick(event: MouseEvent) {
    if ((event as PointerEvent).pointerType) return;
    if (phase === 'gate' && !committed) commitOpen();
  }
  function onKeydown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && phase === 'prelude') {
      event.preventDefault();
      showGate(true);
      return;
    }
    if (event.key === 'Enter' && (phase === 'opening' || phase === 'exposure' || phase === 'axis')) {
      event.preventDefault();
      timers.splice(0).forEach((id) => window.clearTimeout(id));
      finishReady();
    }
  }

  function openSummary() {
    if (!axisNode || !summary || phase !== 'ready') return;
    const open = axisNode.getAttribute('aria-expanded') !== 'true';
    axisNode.setAttribute('aria-expanded', String(open));
    summary.setAttribute('aria-hidden', String(!open));
    stageEl.classList.toggle('hasSummary', open);
    if (live) live.textContent = open ? '요약 구조가 열렸습니다.' : '요약 구조가 닫혔습니다.';
  }
  function openDetail() {
    if (!detailHook) return;
    detailHook.setAttribute('aria-hidden', 'false');
    stageEl.classList.add('hasDetailHook');
    detailClose?.focus({ preventScroll: true });
    if (live) live.textContent = '상세 전환 기반 상태가 열렸습니다.';
  }
  function closeDetail() {
    if (!detailHook) return;
    detailHook.setAttribute('aria-hidden', 'true');
    stageEl.classList.remove('hasDetailHook');
    detailButton?.focus({ preventScroll: true });
  }

  function onResize() {
    if (!brush || (phase !== 'axis' && phase !== 'ready')) return;
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => drawBrushAxis(true), 120);
  }

  window.addEventListener('resize', onResize, { passive: true });
  openButtonEl.addEventListener('pointerenter', onPointerEnter);
  openButtonEl.addEventListener('pointermove', onPointerMove);
  openButtonEl.addEventListener('pointerleave', onPointerLeave);
  openButtonEl.addEventListener('pointerdown', onPointerDown);
  openButtonEl.addEventListener('pointerup', onPointerUp);
  openButtonEl.addEventListener('pointercancel', onPointerCancel);
  openButtonEl.addEventListener('click', onClick);
  window.addEventListener('keydown', onKeydown);
  axisNode?.addEventListener('click', openSummary);
  detailButton?.addEventListener('click', openDetail);
  detailClose?.addEventListener('click', closeDetail);

  listeners.push(
    () => openButtonEl.removeEventListener('pointerenter', onPointerEnter),
    () => openButtonEl.removeEventListener('pointermove', onPointerMove),
    () => openButtonEl.removeEventListener('pointerleave', onPointerLeave),
    () => openButtonEl.removeEventListener('pointerdown', onPointerDown),
    () => openButtonEl.removeEventListener('pointerup', onPointerUp),
    () => openButtonEl.removeEventListener('pointercancel', onPointerCancel),
    () => openButtonEl.removeEventListener('click', onClick),
    () => window.removeEventListener('keydown', onKeydown),
    () => window.removeEventListener('resize', onResize),
    () => axisNode?.removeEventListener('click', openSummary),
    () => detailButton?.removeEventListener('click', openDetail),
    () => detailClose?.removeEventListener('click', closeDetail),
  );

  createParticles();
  setPhase('prelude');

  if (reducedMotion) {
    delay(70, () => showGate(true), timers);
  } else if (seen) {
    delay(170, () => stageEl.classList.add('isDissolving'), timers);
    delay(520, () => showGate(true), timers);
  } else {
    delay(cameFromAcademia ? 340 : 520, () => stageEl.classList.add('isDissolving'), timers);
    delay(cameFromAcademia ? 1180 : 1380, () => showGate(false), timers);
  }

  return () => {
    timers.forEach((id) => window.clearTimeout(id));
    listeners.forEach((dispose) => dispose());
    if (brushFrame) cancelAnimationFrame(brushFrame);
    if (resizeTimer) window.clearTimeout(resizeTimer);
  };
}
