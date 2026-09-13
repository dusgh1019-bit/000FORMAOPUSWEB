const HISTORY_SEEN_KEY = 'forma-opus-history-entry-seen';
const HISTORY_ORIGIN_KEY = 'forma-opus-history-entry-origin';
const HISTORY_BRIDGE_KEY = 'forma-opus-history-entry-bridge';
const HISTORY_BRIDGE_STYLE_KEY = 'forma-opus-history-entry-bridge-style';
const HISTORY_BRIDGE_GEOMETRY_KEY = 'forma-opus-history-entry-bridge-geometry';
const HISTORY_NATIVE_VT_KEY = 'forma-opus-history-entry-native-vt';

type Cleanup = () => void;
type ChannelPhase = 'prelude' | 'dissolving' | 'forming' | 'gate' | 'opening' | 'exposure' | 'axis' | 'ready';

type PointerState = { x: number; y: number };

type TextParticle = {
  x: number;
  y: number;
  delay: number;
  duration: number;
  vx: number;
  vy: number;
  swirl: number;
  size: number;
  alpha: number;
  depth: number;
  edge: number;
  hue: number;
  drag: number;
  flowPhase: number;
  linger: boolean;
};

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

class HistoryMatterDissolver {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private source: HTMLElement;
  private stage: HTMLElement;
  private reducedMotion: boolean;
  private rand: () => number;
  private particles: TextParticle[] = [];
  private frame = 0;
  private startAt = 0;
  private stopAt = 0;
  private stopDuration = 320;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private glyph: HTMLCanvasElement | null = null;
  private glyphX = 0;
  private glyphY = 0;
  private glyphW = 0;
  private glyphH = 0;
  private sprite: HTMLCanvasElement | null = null;
  private phase: 'idle' | 'dissolving' | 'done' = 'idle';

  constructor(canvas: HTMLCanvasElement, source: HTMLElement, stage: HTMLElement, seed: number, reducedMotion: boolean) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.source = source;
    this.stage = stage;
    this.reducedMotion = reducedMotion;
    this.rand = mulberry32(seed ^ 0xa511e9b3);
    this.layout();
  }

  layout() {
    if (!this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const compact = window.matchMedia('(max-width: 700px)').matches;
    this.dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.55);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.canvas.width = Math.max(1, Math.round(this.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(this.height * this.dpr));
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.phase === 'dissolving') this.captureGlyph();
  }

  destroy() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  trigger() {
    if (this.reducedMotion || this.phase !== 'idle') {
      this.phase = 'done';
      this.clear();
      return;
    }
    this.captureGlyph();
    if (!this.glyph) return;
    this.phase = 'dissolving';
    this.startAt = performance.now();
    this.stopAt = 0;
    this.stopDuration = 320;
    const tick = (now: number) => {
      this.draw(now);
      if (this.phase === 'dissolving') this.frame = requestAnimationFrame(tick);
      else this.frame = 0;
    };
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(tick);
  }

  fadeOut(ms = 320) {
    if (this.phase !== 'dissolving') return;
    this.stopDuration = Math.max(1, ms);
    this.stopAt = performance.now() + this.stopDuration;
  }

  private captureGlyph() {
    if (!this.ctx) return;
    const canvasRect = this.canvas.getBoundingClientRect();
    const sourceRect = this.source.getBoundingClientRect();
    const style = getComputedStyle(this.source);
    const pad = Math.max(18, sourceRect.height * .18);
    const off = document.createElement('canvas');
    const offW = Math.max(1, sourceRect.width + pad * 2);
    const offH = Math.max(1, sourceRect.height + pad * 2);
    off.width = Math.round(offW * this.dpr);
    off.height = Math.round(offH * this.dpr);
    const ctx = off.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, offW, offH);
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fill = ctx.createLinearGradient(0, 0, offW, offH);
    fill.addColorStop(0, 'rgba(255,249,240,.98)');
    fill.addColorStop(.48, 'rgba(244,241,235,1)');
    fill.addColorStop(1, 'rgba(225,220,211,.94)');
    ctx.fillStyle = fill;
    ctx.shadowBlur = Math.max(2, parseFloat(style.fontSize) * .025);
    ctx.shadowColor = 'rgba(255,255,255,.08)';
    ctx.fillText(this.source.textContent?.trim() || 'HISTORY', offW / 2, offH / 2 + parseFloat(style.fontSize) * .005);
    ctx.shadowBlur = 0;

    this.glyph = off;
    this.glyphX = sourceRect.left - canvasRect.left - pad;
    this.glyphY = sourceRect.top - canvasRect.top - pad;
    this.glyphW = offW;
    this.glyphH = offH;
    this.particles = this.sampleParticles(off, this.glyphX, this.glyphY);
    this.sprite = this.buildSprite();
  }

  private buildSprite() {
    const sprite = document.createElement('canvas');
    sprite.width = 44;
    sprite.height = 44;
    const ctx = sprite.getContext('2d');
    if (!ctx) return null;
    const g = ctx.createRadialGradient(22, 22, 0, 22, 22, 21);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(.09, 'rgba(255,251,242,.95)');
    g.addColorStop(.28, 'rgba(233,242,238,.36)');
    g.addColorStop(.52, 'rgba(216,205,231,.12)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 44, 44);
    return sprite;
  }

  private sampleParticles(glyph: HTMLCanvasElement, ox: number, oy: number) {
    const ctx = glyph.getContext('2d', { willReadFrequently: true });
    if (!ctx) return [];
    const img = ctx.getImageData(0, 0, glyph.width, glyph.height);
    const data = img.data;
    const w = glyph.width;
    const h = glyph.height;
    const compact = window.matchMedia('(max-width: 700px)').matches;
    const step = compact ? 7 : 6;
    const points: TextParticle[] = [];
    const alphaAt = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= w || y >= h) return 0;
      return data[(y * w + x) * 4 + 3];
    };

    for (let y = step; y < h - step; y += step) {
      for (let x = step; x < w - step; x += step) {
        const alpha = alphaAt(x, y);
        if (alpha < 90) continue;
        const neighbors = [alphaAt(x-step,y), alphaAt(x+step,y), alphaAt(x,y-step), alphaAt(x,y+step)];
        const edge = neighbors.some((n) => n < 36) ? 1 : 0;
        if (!edge && this.rand() > (compact ? .16 : .22)) continue;

        const px = ox + x / this.dpr;
        const py = oy + y / this.dpr;
        const angle = this.rand() * Math.PI * 2;
        const linger = this.rand() < (compact ? .22 : .29);
        const speed = linger ? 8 + this.rand() * 22 : 34 + this.rand() * (edge ? 86 : 64);
        const broad = .72 + this.rand() * .7;
        points.push({
          x: px,
          y: py,
          delay: 160 + this.rand() * (edge ? 1450 : 1750),
          duration: linger ? 17000 + this.rand() * 13000 : 4700 + this.rand() * 3700,
          vx: Math.cos(angle) * speed * broad,
          vy: Math.sin(angle) * speed * (.58 + this.rand() * .34) + (linger ? (this.rand() - .5) * 4 : -6 + (this.rand() - .5) * 12),
          swirl: linger ? 18 + this.rand() * 44 : 8 + this.rand() * 28,
          size: linger ? .48 + this.rand() * 1.05 : edge ? .85 + this.rand() * 1.55 : .55 + this.rand() * 1.15,
          alpha: linger ? .19 + this.rand() * .30 : edge ? .46 + this.rand() * .38 : .26 + this.rand() * .28,
          depth: .5 + this.rand() * .9,
          edge,
          hue: this.rand(),
          drag: linger ? .92 + this.rand() * .06 : .78 + this.rand() * .18,
          flowPhase: this.rand() * Math.PI * 2,
          linger,
        });
      }
    }

    points.sort((a,b) => a.delay - b.delay);
    return points.slice(0, compact ? 360 : 620);
  }

  private clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private draw(now: number) {
    if (!this.ctx || !this.glyph) return;
    const elapsed = now - this.startAt;
    const erosionDuration = 2300;
    const erosion = Math.min(1, elapsed / erosionDuration);
    const e = 1 - Math.pow(1 - erosion, 2.15);
    const handoff = Math.max(0, Math.min(1, elapsed / 240));
    this.clear();

    if (erosion < 1) {
      this.ctx.save();
      this.ctx.globalAlpha = handoff * Math.max(0, 1 - e * .16);
      this.ctx.drawImage(this.glyph, this.glyphX, this.glyphY, this.glyphW, this.glyphH);
      this.ctx.globalCompositeOperation = 'destination-out';
      for (const particle of this.particles) {
        const local = Math.max(0, Math.min(1, (elapsed - particle.delay) / 1300));
        if (local <= 0) break;
        const p = 1 - Math.pow(1 - local, 2.2);
        const r = particle.size * (particle.edge ? 2.1 : 1.45) * (.8 + p * 2.2);
        this.ctx.globalAlpha = .42 + p * .44;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, r, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    const stopFade = this.stopAt > 0 ? Math.max(0, Math.min(1, (this.stopAt - now) / this.stopDuration)) : 1;
    for (const particle of this.particles) {
      const age = elapsed - particle.delay;
      if (age <= 0 || age >= particle.duration) continue;
      const t = age / particle.duration;
      const seconds = age / 1000;
      const drag = Math.pow(1 - t, .2 + particle.drag * .35);
      const currentX = particle.x + particle.vx * seconds * (.78 + .22 * drag)
        + Math.sin(seconds * (1.1 + particle.depth * .25) + particle.flowPhase) * particle.swirl
        + Math.sin(seconds * 2.7 + particle.hue * 6.2) * 4.2;
      const currentY = particle.y + particle.vy * seconds * (.8 + .2 * drag)
        + Math.cos(seconds * (1.35 + particle.depth * .2) + particle.flowPhase * .7) * particle.swirl * .42
        + Math.sin(seconds * 2.1 + particle.flowPhase) * 3.6;
      const birth = Math.min(1, age / 180);
      const tail = particle.linger ? (.55 + .45 * Math.pow(1 - t, .38)) : Math.pow(1 - t, .48);
      const twinkle = particle.linger
        ? .46 + .54 * Math.sin(seconds * (.72 + particle.hue * .95) + particle.flowPhase) * Math.sin(seconds * .31 + particle.flowPhase * 1.7)
        : .72 + .28 * Math.sin(seconds * (2.1 + particle.hue * 1.7) + particle.flowPhase);
      const alpha = particle.alpha * birth * tail * Math.max(.22, twinkle) * stopFade * Math.min(1, handoff * 1.2);
      const radius = particle.size * (1 + Math.sin(seconds * (particle.linger ? .72 : 1.8) + particle.flowPhase) * (particle.linger ? .18 : .12));

      if (this.sprite) {
        const halo = 16 + radius * (8 + particle.depth * 5);
        this.ctx.globalAlpha = alpha * .72;
        this.ctx.drawImage(this.sprite, currentX - halo/2, currentY - halo/2, halo, halo);
      }
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = particle.hue > .68 ? 'rgba(235,244,241,.96)' : particle.hue < .24 ? 'rgba(244,236,248,.94)' : 'rgba(255,249,239,.96)';
      this.ctx.beginPath();
      this.ctx.arc(currentX, currentY, Math.max(.45, radius), 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;

    const longest = this.particles.reduce((m,p) => Math.max(m, p.delay + p.duration), 0);
    if ((this.stopAt && now >= this.stopAt) || elapsed > Math.max(9000, longest)) {
      this.phase = 'done';
      this.clear();
    }
  }
}



class HistoryInkOpening {
  private dropsCanvas: HTMLCanvasElement;
  private strokeCanvas: HTMLCanvasElement;
  private dropsCtx: CanvasRenderingContext2D | null;
  private strokeCtx: CanvasRenderingContext2D | null;
  private stage: HTMLElement;
  private reducedMotion: boolean;
  private seed: number;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private frame = 0;
  private startedAt = 0;
  private finalFrame = false;
  private drops: Array<{x:number;y:number;r:number;delay:number;fall:number;spread:number;tilt:number;seed:number}> = [];

  constructor(dropsCanvas: HTMLCanvasElement, strokeCanvas: HTMLCanvasElement, stage: HTMLElement, seed: number, reducedMotion: boolean) {
    this.dropsCanvas = dropsCanvas;
    this.strokeCanvas = strokeCanvas;
    this.dropsCtx = dropsCanvas.getContext('2d');
    this.strokeCtx = strokeCanvas.getContext('2d');
    this.stage = stage;
    this.seed = seed ^ 0x72f4a1d9;
    this.reducedMotion = reducedMotion;
    this.layout();
  }

  private hash(n: number) {
    const x = Math.sin((n + this.seed) * 12.9898) * 43758.5453123;
    return x - Math.floor(x);
  }

  private smooth(t: number) {
    const v = Math.max(0, Math.min(1, t));
    return v * v * (3 - 2 * v);
  }

  layout() {
    if (!this.dropsCtx || !this.strokeCtx) return;
    const rect = this.dropsCanvas.getBoundingClientRect();
    const compact = window.matchMedia('(max-width: 700px)').matches;
    this.dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.55);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    for (const canvas of [this.dropsCanvas, this.strokeCanvas]) {
      canvas.width = Math.max(1, Math.round(this.width * this.dpr));
      canvas.height = Math.max(1, Math.round(this.height * this.dpr));
    }
    this.dropsCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.strokeCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.buildDrops();
    if (this.finalFrame) this.draw(1);
  }

  destroy() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  play() {
    if (!this.dropsCtx || !this.strokeCtx) return;
    this.stage.classList.remove('mainBrushImpact','mainZooming','mainCompose','mainSettled');
    this.stage.style.setProperty('--history-main-scale', this.reducedMotion ? '1' : '1.245');
    this.stage.style.setProperty('--history-hanja-x', this.reducedMotion ? '0px' : `${Math.round(this.width * .42)}px`);
    this.stage.style.setProperty('--history-hanja-opacity', this.reducedMotion ? '1' : '0');
    if (this.reducedMotion) {
      this.finalFrame = true;
      this.stage.classList.add('mainBrushImpact','mainZooming','mainCompose','mainSettled');
      this.draw(1);
      return;
    }
    if (this.frame) cancelAnimationFrame(this.frame);
    this.startedAt = performance.now();
    this.finalFrame = false;
    const duration = window.matchMedia('(max-width:700px)').matches ? 4300 : 5000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - this.startedAt) / duration);
      this.draw(p);
      if (p < 1) this.frame = requestAnimationFrame(tick);
      else {
        this.frame = 0;
        this.finalFrame = true;
        this.stage.classList.add('mainSettled');
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  private buildDrops() {
    const compact = this.width < 700;
    const count = compact ? 7 : 10;
    this.drops = [];
    for (let i = 0; i < count; i += 1) {
      const x = this.width * (.37 + this.hash(10+i*11) * .26);
      const y = this.height * (.25 + this.hash(30+i*13) * .24);
      this.drops.push({
        x,
        y,
        r: (compact ? 2.1 : 2.5) + this.hash(60+i*17) * (compact ? 4.6 : 6.1),
        delay: .025 + this.hash(90+i*19) * .18,
        fall: .10 + this.hash(110+i*23) * .075,
        spread: .13 + this.hash(130+i*29) * .12,
        tilt: (this.hash(150+i*31) - .5) * .55,
        seed: 200 + i*37,
      });
    }
  }

  private irregularBlob(ctx: CanvasRenderingContext2D, x:number, y:number, rx:number, ry:number, seed:number, alpha:number) {
    const points = 22;
    ctx.beginPath();
    for (let i=0;i<=points;i+=1) {
      const a = (i/points)*Math.PI*2;
      const jitter = .76 + this.hash(seed+i*7)*.38;
      const px = x + Math.cos(a) * rx * jitter;
      const py = y + Math.sin(a) * ry * (.80 + this.hash(seed+80+i*9)*.36);
      if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    const g = ctx.createRadialGradient(x-rx*.18,y-ry*.22,0,x,y,Math.max(rx,ry));
    g.addColorStop(0,`rgba(10,12,9,${alpha})`);
    g.addColorStop(.58,`rgba(18,20,16,${alpha*.92})`);
    g.addColorStop(1,`rgba(44,43,36,${alpha*.36})`);
    ctx.fillStyle=g;
    ctx.fill();
  }

  private drawDrops(progress: number) {
    if (!this.dropsCtx) return;
    const ctx = this.dropsCtx;
    ctx.clearRect(0,0,this.width,this.height);
    const fade = 1 - this.smooth((progress - .66) / .22);
    ctx.save();
    ctx.globalAlpha = fade;
    for (const drop of this.drops) {
      const fallT = Math.max(0, Math.min(1, (progress-drop.delay)/drop.fall));
      const spreadT = Math.max(0, Math.min(1, (progress-(drop.delay+drop.fall*.84))/drop.spread));
      if (fallT > 0 && fallT < 1) {
        const e = fallT*fallT;
        const y = -40 - drop.r*3 + (drop.y + 40 + drop.r*3)*e;
        ctx.save();
        ctx.translate(drop.x,y);
        ctx.rotate(drop.tilt*.28);
        ctx.fillStyle='rgba(20,21,17,.78)';
        ctx.beginPath();
        ctx.ellipse(0,0,drop.r*.62,drop.r*1.45,0,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
      }
      if (spreadT > 0) {
        const s = 1 - Math.pow(1-spreadT,2.5);
        this.irregularBlob(ctx,drop.x,drop.y,drop.r*(1.08+s*1.18),drop.r*(.72+s*.70),drop.seed,.42+.42*s);
        const satelliteCount = 2 + Math.floor(this.hash(drop.seed+91)*4);
        for (let j=0;j<satelliteCount;j+=1) {
          const a = this.hash(drop.seed+120+j*11)*Math.PI*2;
          const d = drop.r*(1.9+this.hash(drop.seed+190+j*13)*3.2)*s;
          const rr = .55+this.hash(drop.seed+250+j*17)*1.35;
          ctx.fillStyle=`rgba(19,20,16,${(.13+.24*s)*(1-j/(satelliteCount+2))})`;
          ctx.beginPath();ctx.arc(drop.x+Math.cos(a)*d,drop.y+Math.sin(a)*d*.58,rr,0,Math.PI*2);ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  private drawBrushStroke(progress: number) {
    if (!this.strokeCtx) return;
    const ctx = this.strokeCtx;
    ctx.clearRect(0,0,this.width,this.height);
    const compact = this.width < 700;
    const impact = this.smooth((progress-.22)/.11);
    const strokeP = this.smooth((progress-.31)/.38);
    const zoomP = this.smooth((progress-.31)/.43);
    const composeP = this.smooth((progress-.70)/.24);
    const axisTargetX = compact ? 38 : Math.min(168, Math.max(68, this.width*.105));
    const originX = this.width*.5;
    const xBase = originX + (axisTargetX-originX)*composeP;
    const y0 = this.height*(compact ? .11 : .105);
    const y1 = this.height*(compact ? .93 : .94);
    const scale = 1.245 - .245*zoomP;
    this.stage.style.setProperty('--history-main-scale', scale.toFixed(4));
    this.stage.style.setProperty('--history-hanja-x', `${Math.round(this.width*.42*(1-composeP))}px`);
    this.stage.style.setProperty('--history-hanja-opacity', composeP.toFixed(4));
    if (impact > .02) this.stage.classList.add('mainBrushImpact');
    if (zoomP > .02) this.stage.classList.add('mainZooming');
    if (composeP > .02) this.stage.classList.add('mainCompose');

    if (impact > 0) {
      // Strong brush-pressed dot: irregular edge, compressed bristle footprint,
      // and tiny pressure splatter distinct from the falling droplets.
      ctx.save();
      ctx.globalAlpha = impact;
      ctx.translate(xBase,y0);
      ctx.rotate(-.08);
      this.irregularBlob(ctx,0,0,18+impact*10,11+impact*7,2400,.94);
      ctx.fillStyle='rgba(11,13,10,.72)';
      ctx.beginPath();ctx.ellipse(-4,1,13,5.2,-.15,0,Math.PI*2);ctx.fill();
      for (let i=0;i<14;i+=1) {
        const a=this.hash(2510+i*13)*Math.PI*2;
        const d=18+this.hash(2600+i*17)*29;
        ctx.fillStyle=`rgba(18,20,16,${.12+this.hash(2700+i*19)*.28})`;
        ctx.beginPath();ctx.arc(Math.cos(a)*d,Math.sin(a)*d*.42,.45+this.hash(2800+i*23)*1.45,0,Math.PI*2);ctx.fill();
      }
      ctx.restore();
    }

    if (strokeP <= 0) return;
    const samples = compact ? 210 : 290;
    const target = Math.max(2,Math.floor(samples*strokeP));
    ctx.lineCap='round';ctx.lineJoin='round';
    const point=(i:number)=>{
      const t=i/samples;
      return {
        x:xBase + Math.sin(t*7.4)*2.8 + Math.sin(t*23.2)*1.15 + (this.hash(3100+i)-.5)*1.05,
        y:y0+(y1-y0)*t,
      };
    };
    const pressure=(t:number)=>{
      const attack=Math.min(1,t*12);
      const release=Math.min(1,(1-t)*15);
      return (18+Math.sin(t*Math.PI)*11+Math.sin(t*14.3)*2.3)*(.34+.66*Math.min(attack,release));
    };
    for (let i=1;i<=target;i+=1) {
      const t=i/samples;
      const a=point(i-1),b=point(i),w=pressure(t);
      ctx.strokeStyle=`rgba(17,19,15,${.58+this.hash(3300+i)*.24})`;
      ctx.lineWidth=w*(.78+this.hash(3400+i)*.16);
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      // bristle fibres
      const fibres=2+Math.floor(this.hash(3500+i)*4);
      for(let f=0;f<fibres;f+=1){
        const side=this.hash(3600+i*7+f)>.5?1:-1;
        const off=side*w*(.30+this.hash(3700+i*11+f)*.38);
        ctx.strokeStyle=`rgba(20,21,17,${.045+this.hash(3800+i*13+f)*.13})`;
        ctx.lineWidth=.35+this.hash(3900+i*17+f)*1.05;
        ctx.beginPath();ctx.moveTo(a.x+off*.82,a.y);ctx.lineTo(b.x+off,b.y+1.7+this.hash(4000+i+f)*2.1);ctx.stroke();
      }
      // dry-brush paper channels, strongest after the mid point
      if(t>.32 && this.hash(4100+i)>.71){
        ctx.save();ctx.globalCompositeOperation='destination-out';
        const off=(this.hash(4200+i)-.5)*w*.75;
        ctx.lineWidth=.55+this.hash(4300+i)*1.5;
        ctx.strokeStyle='rgba(0,0,0,.30)';
        ctx.beginPath();ctx.moveTo(a.x+off,a.y);ctx.lineTo(b.x+off+(this.hash(4400+i)-.5)*2,b.y+2.6);ctx.stroke();ctx.restore();
      }
    }
  }

  private draw(progress: number) {
    this.drawDrops(progress);
    this.drawBrushStroke(progress);
  }
}

export function mountHistoryChannelEntry(root: HTMLElement): Cleanup {
  const stage = root.querySelector<HTMLElement>('[data-history-stage]');
  const gate = root.querySelector<HTMLElement>('[data-history-gate]');
  const openButton = root.querySelector<HTMLButtonElement>('[data-history-open]');
  const live = root.querySelector<HTMLElement>('[data-history-live]');
  const brush = root.querySelector<HTMLCanvasElement>('[data-history-brush]');
  const axisNode = root.querySelector<HTMLButtonElement>('[data-history-axis-node]');
  const summary = root.querySelector<HTMLElement>('[data-history-summary]');
  const detailButton = root.querySelector<HTMLButtonElement>('[data-history-detail]');
  const detailHook = root.querySelector<HTMLElement>('[data-history-detail-hook]');
  const detailClose = root.querySelector<HTMLButtonElement>('[data-history-detail-close]');
  const matterCanvas = root.querySelector<HTMLCanvasElement>('[data-history-matter-canvas]');
  const preludeSource = root.querySelector<HTMLElement>('[data-history-prelude-source]');
  const inkDropsCanvas = root.querySelector<HTMLCanvasElement>('[data-history-ink-drops]');
  const mainStrokeCanvas = root.querySelector<HTMLCanvasElement>('[data-history-main-stroke]');
  const hanjaReveal = root.querySelector<HTMLElement>('[data-history-hanja]');
  if (!stage || !gate || !openButton || !matterCanvas || !preludeSource || !inkDropsCanvas || !mainStrokeCanvas || !hanjaReveal) return () => {};

  const stageEl = stage;
  const gateEl = gate;
  const openButtonEl = openButton;
  const timers: number[] = [];
  const listeners: Array<() => void> = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem(HISTORY_SEEN_KEY) === '1';
  const origin = sessionStorage.getItem(HISTORY_ORIGIN_KEY);
  const bridgeAt = Number(sessionStorage.getItem(HISTORY_BRIDGE_KEY) || 0);
  const bridgeFresh = bridgeAt > 0 && Date.now() - bridgeAt < 5000;
  const cameFromAcademia = origin === 'academia' && bridgeFresh;
  const bridgeStyleRaw = sessionStorage.getItem(HISTORY_BRIDGE_STYLE_KEY);
  const bridgeGeometryRaw = sessionStorage.getItem(HISTORY_BRIDGE_GEOMETRY_KEY);
  const nativeSharedTransition = sessionStorage.getItem(HISTORY_NATIVE_VT_KEY) === '1';
  let bridgeStyle: null | { fontSize?: number; fontFamily?: string; fontWeight?: string; letterSpacing?: string } = null;
  let bridgeGeometry: null | { viewportW?:number; viewportH?:number; left?:number; top?:number; width?:number; height?:number; fontSize?:number; lineHeight?:number } = null;
  try { bridgeStyle = bridgeStyleRaw ? JSON.parse(bridgeStyleRaw) : null; } catch { bridgeStyle = null; }
  try { bridgeGeometry = bridgeGeometryRaw ? JSON.parse(bridgeGeometryRaw) : null; } catch { bridgeGeometry = null; }
  sessionStorage.removeItem(HISTORY_ORIGIN_KEY);
  sessionStorage.removeItem(HISTORY_BRIDGE_KEY);
  sessionStorage.removeItem(HISTORY_BRIDGE_STYLE_KEY);
  sessionStorage.removeItem(HISTORY_BRIDGE_GEOMETRY_KEY);
  sessionStorage.removeItem(HISTORY_NATIVE_VT_KEY);
  if (cameFromAcademia && bridgeStyle && !nativeSharedTransition) {
    if (bridgeStyle.fontSize) preludeSource.style.fontSize = `${bridgeStyle.fontSize}px`;
    if (bridgeStyle.fontFamily) preludeSource.style.fontFamily = bridgeStyle.fontFamily;
    if (bridgeStyle.fontWeight) preludeSource.style.fontWeight = bridgeStyle.fontWeight;
    if (bridgeStyle.letterSpacing) preludeSource.style.letterSpacing = bridgeStyle.letterSpacing;
  }

  let phase: ChannelPhase = 'prelude';
  let committed = false;
  let brushFrame = 0;
  let resizeTimer = 0;
  let pointerFrame = 0;
  let latestPointer: PointerState | null = null;
  const seed = entrySeed();
  const rand = mulberry32(seed);
  const preludeDissolver = new HistoryMatterDissolver(matterCanvas, preludeSource, stageEl, seed, reducedMotion);
  const mainInk = new HistoryInkOpening(inkDropsCanvas, mainStrokeCanvas, stageEl, seed, reducedMotion);

  function armHistoryContinuity() {
    stageEl.classList.add('isContinuityReady');
    if (nativeSharedTransition) {
      preludeSource.style.opacity = '1';
      preludeSource.style.viewTransitionName = 'fo-history-shared-title';
      stageEl.classList.add('continuityNative','continuitySettled');
      return;
    }
    if (!cameFromAcademia || !bridgeGeometry || reducedMotion) {
      preludeSource.style.opacity = '1';
      stageEl.classList.add('continuitySettled');
      return;
    }

    preludeSource.style.opacity = '0';
    const run = () => {
      const natural = preludeSource.getBoundingClientRect();
      if (!natural.width || !natural.height) {
        preludeSource.style.opacity = '1';
        stageEl.classList.add('continuitySettled');
        return;
      }
      const sourceLeft = Number(bridgeGeometry?.left ?? natural.left);
      const sourceTop = Number(bridgeGeometry?.top ?? natural.top);
      const sourceWidth = Math.max(1, Number(bridgeGeometry?.width ?? natural.width));
      const sourceHeight = Math.max(1, Number(bridgeGeometry?.height ?? natural.height));
      const sx = sourceWidth / natural.width;
      const sy = sourceHeight / natural.height;
      const dx = sourceLeft - natural.left;
      const dy = sourceTop - natural.top;
      preludeSource.style.opacity = '1';
      const animation = preludeSource.animate([
        { transform:`translate3d(${dx}px,${dy}px,0) scale(${sx},${sy})`, opacity:1, filter:'blur(0px)' },
        { transform:'translate3d(0,0,0) scale(1,1)', opacity:1, filter:'blur(0px)' },
      ], {
        duration: 760,
        easing: 'cubic-bezier(.16,.82,.16,1)',
        fill: 'both',
      });
      animation.finished.then(() => {
        animation.cancel();
        stageEl.classList.add('continuitySettled');
      }).catch(() => stageEl.classList.add('continuitySettled'));
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }

  function applyPointerStyle(point: PointerState | null) {
    if (!point) {
      gateEl.style.removeProperty('--pointer-x');
      gateEl.style.removeProperty('--pointer-y');
      return;
    }
    gateEl.style.setProperty('--pointer-x', point.x.toFixed(3));
    gateEl.style.setProperty('--pointer-y', point.y.toFixed(3));
  }

  function flushPointerStyle() {
    pointerFrame = 0;
    applyPointerStyle(latestPointer);
  }

  function schedulePointerStyle(next: PointerState | null) {
    latestPointer = next;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(flushPointerStyle);
  }

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
    const point = (t: number) => {
      const attack = t < .075 ? -8 * (1 - t / .075) : 0;
      const flick = t > .91 ? 12 * Math.pow((t - .91) / .09, 1.45) : 0;
      return {
        x: width * .5 + attack + flick + Math.sin(t * 7.2) * 3.2 + Math.sin(t * 21.7) * 1.35 + Math.sin(t * 53.1) * .52,
        y: pad + total * t,
      };
    };
    const pressure = (t: number) => {
      const start = Math.min(1, t * 15);
      const end = Math.min(1, (1 - t) * 18);
      const envelope = Math.min(start, end);
      const pulse = 20 + Math.sin(t * Math.PI) * 10.5 + Math.sin(t * 13.4) * 2.7;
      return pulse * (.28 + .72 * envelope);
    };

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let lastIndex = 0;
    const samples = Math.max(340, Math.round(height * .72));

    const paintTo = (progress: number) => {
      const target = Math.min(samples, Math.floor(samples * progress));
      if (lastIndex === 0 && target >= 0) {
        const landing = point(0);
        ctx.fillStyle = 'rgba(17,19,15,.78)';
        ctx.beginPath();
        ctx.ellipse(landing.x + 2, landing.y + 3, 9.5, 5.2, -.18, 0, Math.PI * 2);
        ctx.fill();
        for (let d = 0; d < 9; d += 1) {
          const a = hash(900 + d) * Math.PI * 2;
          const r = 7 + hash(940 + d) * 15;
          ctx.fillStyle = `rgba(18,20,16,${.14 + hash(980+d)*.34})`;
          ctx.beginPath();
          ctx.arc(landing.x + Math.cos(a)*r, landing.y + Math.sin(a)*r*.42, .45 + hash(1020+d)*1.25, 0, Math.PI*2);
          ctx.fill();
        }
      }
      for (let i = lastIndex; i <= target; i += 1) {
        const t = i / samples;
        const p = point(t);
        const p0 = point(Math.max(0, (i - 1) / samples));
        const w = pressure(t);
        const lateral = (hash(i * 17) - .5) * 2.7;

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
      if (target >= samples - 1 && lastIndex <= samples) {
        const tail = point(1);
        ctx.globalCompositeOperation = 'source-over';
        for (let d = 0; d < 7; d += 1) {
          const dx = 4 + hash(1200+d)*20;
          const dy = (hash(1240+d)-.5)*13;
          ctx.fillStyle = `rgba(18,20,16,${.10 + hash(1280+d)*.26})`;
          ctx.beginPath();
          ctx.arc(tail.x + dx, tail.y + dy, .4 + hash(1320+d)*1.05, 0, Math.PI*2);
          ctx.fill();
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
    const duration = window.matchMedia('(max-width: 620px)').matches ? 760 : 980;
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
    if (next === 'axis') {
      stageEl.classList.remove('mainInkActive','mainBrushImpact','mainZooming','mainCompose','mainSettled');
      stageEl.classList.add('mainInkActive');
      mainInk.play();
    }
    if (next === 'ready' && brush && !brush.classList.contains('isPainted')) drawBrushAxis(true);
    if (live) {
      if (next === 'forming') live.textContent = 'HISTORY가 해체되며 KOREA / AXIS의 문이 드러나고 있습니다.';
      if (next === 'gate') live.textContent = 'KOREA / AXIS로 들어가는 문이 준비되었습니다.';
      if (next === 'ready') live.textContent = 'KOREA / AXIS 마스터 축이 준비되었습니다.';
    }
  }

  function beginDissolution() {
    if (phase !== 'prelude') return;
    setPhase('dissolving');
    preludeDissolver.trigger();
  }

  function beginFormation() {
    if (phase !== 'dissolving' && phase !== 'prelude') return;
    if (phase === 'prelude') preludeDissolver.trigger();
    stageEl.classList.remove('gateBaseReady','gateHardwareReady','gateBambooGrowing','gateOrnamentCarving','gatePolished');
    setPhase('forming');
    if (reducedMotion) {
      stageEl.classList.add('gateBaseReady','gateHardwareReady','gateBambooGrowing','gateOrnamentCarving','gatePolished');
      return;
    }
    delay(120, () => stageEl.classList.add('gateBaseReady'), timers);
    delay(620, () => stageEl.classList.add('gateHardwareReady'), timers);
    delay(860, () => stageEl.classList.add('gateBambooGrowing'), timers);
    delay(1540, () => stageEl.classList.add('gateOrnamentCarving'), timers);
    delay(2820, () => stageEl.classList.add('gatePolished'), timers);
  }

  function showGate(immediate = false) {
    if (phase === 'gate' || phase === 'opening' || phase === 'exposure' || phase === 'axis' || phase === 'ready') return;
    setPhase('gate');
    if (immediate) stageEl.classList.add('skipPrelude');
    delay(immediate ? 20 : 180, () => openButtonEl.focus({ preventScroll: true }), timers);
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

    delay(460, () => { setPhase('exposure'); preludeDissolver.fadeOut(620); }, timers);
    delay(820, () => setPhase('axis'), timers);
    delay(6200, finishReady, timers);
  }

  function onPointerEnter() {
    if (phase === 'gate' && !committed) gateEl.classList.add('isPreview');
  }
  function onPointerMove(event: PointerEvent) {
    if (phase !== 'gate' || committed) return;
    const rect = gateEl.getBoundingClientRect();
    schedulePointerStyle({
      x: Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2))),
      y: Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2))),
    });
  }
  function onPointerLeave() {
    if (phase === 'gate' && !committed) gateEl.classList.remove('isPreview', 'isPressing');
    schedulePointerStyle(null);
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
    if ((event.key === 'Enter' || event.key === ' ') && (phase === 'prelude' || phase === 'dissolving' || phase === 'forming')) {
      event.preventDefault();
      timers.splice(0).forEach((id) => window.clearTimeout(id));
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
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      preludeDissolver.layout();
      mainInk.layout();
      if (brush && (phase === 'axis' || phase === 'ready')) drawBrushAxis(true);
    }, 120);
  }

  window.addEventListener('resize', onResize, { passive: true });
  openButtonEl.addEventListener('pointerenter', onPointerEnter);
  openButtonEl.addEventListener('pointermove', onPointerMove, { passive: true });
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

  setPhase('prelude');
  preludeDissolver.layout();
  mainInk.layout();
  armHistoryContinuity();
  document.fonts?.ready.then(() => { preludeDissolver.layout(); mainInk.layout(); }).catch(() => {});

  if (reducedMotion) {
    delay(120, () => beginFormation(), timers);
    delay(360, () => showGate(true), timers);
  } else if (seen && !cameFromAcademia) {
    // Returning visitors keep the same narrative but at an abbreviated rhythm.
    delay(220, () => beginDissolution(), timers);
    delay(920, () => beginFormation(), timers);
    delay(2600, () => showGate(false), timers);
  } else {
    // Full first-entry cinematic. With the ACADEMIA bridge (~0.9s), the gate reaches
    // interaction-ready state after roughly five seconds of continuous visual motion.
    const settle = cameFromAcademia ? 980 : 620;
    delay(settle, () => beginDissolution(), timers);
    delay(settle + 1200, () => beginFormation(), timers);
    delay(settle + 4550, () => showGate(false), timers);
  }

  return () => {
    timers.forEach((id) => window.clearTimeout(id));
    listeners.forEach((dispose) => dispose());
    if (brushFrame) cancelAnimationFrame(brushFrame);
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    if (resizeTimer) window.clearTimeout(resizeTimer);
    preludeDissolver.destroy();
    mainInk.destroy();
  };
}
