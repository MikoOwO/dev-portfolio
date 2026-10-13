/*
 * AHLA : la scène 3D du jeu « Tenez la caisse d'octobre ».
 * Payer déplace des blocs de la colonne de caisse vers le bocal du budget.
 */
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Sprite,
  SpriteMaterial,
  Vector3,
  type Material,
} from 'three';
import { cssVar, reducedMotion as reduced } from './motion';
import { LEGACY_LIGHT, createRenderer, cssColor } from './three-compat';

export interface CashRules {
  seuil: number;
  budget: number;
  unit: number;
  /** étiquettes déjà traduites et formatées */
  labels: { cash: string; jar: string; seuil: string; budget: string };
}

export interface CashScene {
  reset(cash: number): void;
  state(warn: boolean): void;
  income(total: number): void;
  pay(cashAfter: number, spentAfter: number): void;
  defer(): void;
}

interface Tween {
  t0: number;
  dur: number;
  fn: (e: number) => void;
  done?: () => void;
}

export function createCashScene(canvas: HTMLCanvasElement, { seuil, budget, unit, labels: names }: CashRules): CashScene {
  const renderer = createRenderer({ canvas, antialias: true, alpha: true });
  const sc = new Scene();
  const camera = new PerspectiveCamera(38, 1, .1, 100);
  sc.add(new AmbientLight(0xffffff, .62 * LEGACY_LIGHT));
  const key = new DirectionalLight(0xffffff, .85 * LEGACY_LIGHT); key.position.set(6, 12, 9); sc.add(key);
  const rim = new DirectionalLight(0xffffff, .25 * LEGACY_LIGHT); rim.position.set(-8, 4, -6); sc.add(rim);

  const STEP = .25, BH = .21, BW = 1.7, CX = -2.1, JX = 2.1;
  const geo = new BoxGeometry(BW, BH, BW);
  const std = (c: Color) => new MeshStandardMaterial({ color: c, roughness: .45, metalness: .1 });
  const M = {
    cash: std(cssColor('--accent')),
    warn: std(cssColor('--warn')),
    jar: std(new Color('#3E78C2')),
    ghost: new MeshStandardMaterial({ color: cssColor('--ink'), transparent: true, opacity: .45 }),
  };
  const base = std(cssColor('--surface-2'));
  [CX, JX].forEach((x) => { const b = new Mesh(new BoxGeometry(2.4, .12, 2.4), base); b.position.set(x, -.07, 0); sc.add(b); });

  // safety threshold on the cash column
  const sy = seuil / unit * STEP;
  const ring = new LineSegments(new EdgesGeometry(new BoxGeometry(2.5, .001, 2.5)), new LineBasicMaterial({ color: cssColor('--warn') }));
  ring.position.set(CX, sy, 0); sc.add(ring);
  const sheet = new Mesh(new PlaneGeometry(2.5, 2.5), new MeshBasicMaterial({ color: cssColor('--warn'), transparent: true, opacity: .1, side: DoubleSide, depthWrite: false }));
  sheet.rotation.x = -Math.PI / 2; sheet.position.set(CX, sy, 0); sc.add(sheet);

  // the budget jar: a glass column whose top is the monthly budget
  const jh = budget / unit * STEP;
  const glass = new Mesh(new BoxGeometry(2.2, jh, 2.2), new MeshStandardMaterial({ color: cssColor('--ink'), transparent: true, opacity: .05, depthWrite: false }));
  glass.position.set(JX, jh / 2, 0); sc.add(glass);
  const glassEdges = new LineSegments(new EdgesGeometry(new BoxGeometry(2.2, jh, 2.2)), new LineBasicMaterial({ color: cssColor('--ink-faint'), transparent: true, opacity: .6 }));
  glassEdges.position.copy(glass.position); sc.add(glassEdges);
  const lid = new LineSegments(new EdgesGeometry(new BoxGeometry(2.5, .001, 2.5)), new LineBasicMaterial({ color: cssColor('--ink') }));
  lid.position.set(JX, jh, 0); sc.add(lid);

  function label(text: string, color: string, w = 3.2): Sprite {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128;
    const g = c.getContext('2d');
    if (g) {
      g.font = '600 46px "Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif';
      g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 256, 64);
    }
    const sp = new Sprite(new SpriteMaterial({ map: new CanvasTexture(c), transparent: true, depthWrite: false, depthTest: false }));
    sp.scale.set(w, w / 4, 1); sp.renderOrder = 10; return sp;
  }
  function labels(): void {
    const L = [
      label(names.cash, cssVar('--ink'), 4),
      label(names.jar, cssVar('--ink'), 4.4),
      label(names.seuil, cssVar('--warn'), 3.6),
      label(names.budget, cssVar('--ink-soft'), 3.6),
    ];
    L[0].position.set(CX, -.8, 1.5); L[1].position.set(JX, -.8, 1.5);
    L[2].position.set(CX - 3.5, sy, 0); L[3].position.set(JX + 3, jh, 0);
    L.forEach((l) => sc.add(l));
  }
  // les étiquettes attendent la police du site
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(labels);

  const cash: Mesh[] = [], jar: Mesh[] = [], tweens: Tween[] = [];
  let warn = false;
  const at = (x: number, i: number) => new Vector3(x, BH / 2 + i * STEP, 0);
  function tw(dur: number, delay: number, fn: Tween['fn'], done?: Tween['done']): void {
    if (reduced) { fn(1); done?.(); return; }
    tweens.push({ t0: performance.now() + delay, dur, fn, done });
  }
  const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeIO = (x: number) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  function block(mat: Material): Mesh { const m = new Mesh(geo, mat); sc.add(m); return m; }
  function drop(list: Mesh[], x: number, n: number, delay0 = 0): void {
    for (let k = 0; k < n; k++) {
      const m = block(list === cash ? M.cash : M.jar), to = at(x, list.length);
      list.push(m);
      const from = to.clone().add(new Vector3(0, 7, 0));
      m.position.copy(from);
      tw(520, delay0 + k * 45, (e) => m.position.lerpVectors(from, to, easeOut(e)));
    }
  }
  function shrink(m: Mesh, delay: number): void {
    tw(380, delay, (e) => m.scale.setScalar(Math.max(.001, 1 - e)), () => sc.remove(m));
  }
  function paint(): void {
    cash.forEach((m) => { m.material = warn ? M.warn : M.cash; });
    const cap = budget / unit;
    jar.forEach((m, j) => { m.material = j >= cap ? M.warn : M.jar; });
  }

  const api: CashScene = {
    reset(n) {
      tweens.length = 0;
      [...cash, ...jar].forEach((m) => sc.remove(m)); cash.length = 0; jar.length = 0;
      drop(cash, CX, Math.round(n / unit), 200);
    },
    state(w) { warn = w; },
    income(total) {
      const n = Math.max(0, Math.round(total / unit) - cash.length);
      drop(cash, CX, n);
    },
    pay(cashAfter, spentAfter) {
      const r = Math.max(0, cash.length - Math.max(0, Math.round(cashAfter / unit)));
      const k = Math.max(0, Math.round(spentAfter / unit) - jar.length);
      const moves = Math.min(r, k);
      for (let q = 0; q < moves; q++) {
        const m = cash.pop() as Mesh, from = m.position.clone(), to = at(JX, jar.length);
        jar.push(m);
        tw(720, q * 55, (e) => { const t = easeIO(e); m.position.lerpVectors(from, to, t); m.position.y += Math.sin(Math.PI * t) * 2.2; m.rotation.y = t * Math.PI; });
      }
      for (let q = moves; q < r; q++) shrink(cash.pop() as Mesh, q * 40);
      if (k > moves) drop(jar, JX, k - moves, moves * 55);
    },
    defer() {
      const m = new Mesh(geo, M.ghost), from = at(CX, cash.length + 1), to = new Vector3(7, 7, -7);
      m.position.copy(from); sc.add(m);
      tw(900, 0, (e) => { const t = easeIO(e); m.position.lerpVectors(from, to, t); m.scale.setScalar(Math.max(.001, 1 - t * .8)); m.rotation.z = t * 1.2; }, () => sc.remove(m));
    },
  };

  // rotation à la souris ou au doigt, avec inertie
  let yaw = .55, yawV = 0, dragging = false, lastX = 0;
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; yaw += dx * .008; yawV = dx * .008; });
  const stop = () => { dragging = false; };
  canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);

  function resize(): void {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = w / h < .9 ? 50 : 38; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  function frame(now: number): void {
    for (let i = tweens.length - 1; i >= 0; i--) {
      const t = tweens[i]; if (now < t.t0) continue;
      const p = Math.min(1, (now - t.t0) / t.dur); t.fn(p);
      if (p >= 1) { tweens.splice(i, 1); t.done?.(); }
    }
    if (!dragging && !reduced) { yaw += yawV; yawV *= .94; }
    const sway = reduced ? 0 : Math.sin(now / 4000) * .06;
    const R = 17.5;
    camera.position.set(Math.sin(yaw + sway) * R, 8.4, Math.cos(yaw + sway) * R);
    camera.lookAt(0, 4.6, 0);
    paint();
    renderer.render(sc, camera);
  }

  // pause hors écran ou onglet masqué
  let visible = false, raf = 0;
  const loop = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function tick(now) { frame(now); if (visible && !document.hidden) raf = requestAnimationFrame(tick); });
  };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) loop(); });
  return api;
}
