/*
 * HERO : une ville de données. Chaque colonne est un nombre ; le curseur
 * soulève les colonnes sous lui et les éclaire avec l'accent.
 */
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
} from 'three';
import { reducedMotion as reduced } from './motion';
import { LEGACY_LIGHT, createRenderer, cssColor, withLegacyPointFalloff } from './three-compat';

const COLS = 44, ROWS = 30, N = COLS * ROWS;
const GLOW = 2.4 * LEGACY_LIGHT;

export function initCity(canvas: HTMLCanvasElement): void {
  const renderer = createRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, .1, 200);
  const geo = new BoxGeometry(.78, 1, .78); geo.translate(0, .5, 0);
  const mat = withLegacyPointFalloff(new MeshStandardMaterial({ roughness: .55, metalness: .15 }));
  const mesh = new InstancedMesh(geo, mat, N);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  scene.add(mesh);
  scene.add(new AmbientLight(0xffffff, .55 * LEGACY_LIGHT));
  const sun = new DirectionalLight(0xffffff, .85 * LEGACY_LIGHT); sun.position.set(-14, 26, 12); scene.add(sun);
  const glow = new PointLight(0xffffff, 0, 14, 1.6); scene.add(glow);

  const xs = new Float32Array(N), zs = new Float32Array(N), seed = new Float32Array(N), cur = new Float32Array(N), delay = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const cx = i % COLS, cz = (i / COLS) | 0;
    xs[i] = cx - COLS / 2 + .5; zs[i] = cz - ROWS / 2 + .5;
    const r = Math.sin(i * 12.9898 + 78.233) * 43758.5453; seed[i] = r - Math.floor(r);
    delay[i] = Math.hypot(xs[i] - 6, zs[i]) * .045 + seed[i] * .25;
  }
  const low = cssColor('--city-low'), high = cssColor('--city-high'), accent = cssColor('--accent'), bg = cssColor('--bg');
  renderer.setClearColor(bg, 1);
  scene.fog = new Fog(bg, 22, 62);
  glow.color.copy(accent);

  const mouse = new Vector2(9, 9), hit = new Vector3(999, 0, 999), smoothHit = new Vector3(999, 0, 999);
  const ray = new Raycaster(), ground = new Plane(new Vector3(0, 1, 0), 0);
  let hasMouse = false;
  const hero = canvas.parentElement ?? canvas;
  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    if (ray.ray.intersectPlane(ground, hit)) hasMouse = true;
    if (reduced) frame(performance.now());
  });
  hero.addEventListener('pointerleave', () => { hasMouse = false; if (reduced) frame(performance.now()); });

  function resize(): void {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const narrow = w < 760;
    camera.position.set(narrow ? 2 : -3, narrow ? 34 : 23, narrow ? 38 : 31);
    camera.lookAt(narrow ? 0 : -8, 0, 1);
    camera.updateProjectionMatrix();
  }
  resize();
  // sans boucle d'animation (mouvement réduit), redessiner après chaque redimensionnement
  addEventListener('resize', () => { resize(); if (reduced) frame(performance.now()); });

  const m4 = new Matrix4(), c = new Color(), away = new Vector3();
  const start = performance.now();
  function frame(now: number): void {
    const t = reduced ? 4 : (now - start) / 1000;
    if (hasMouse) smoothHit.lerp(hit, reduced ? 1 : .12);
    else smoothHit.lerp(away.set(smoothHit.x, 0, 60), .02);
    glow.position.set(smoothHit.x, 3.2, smoothHit.z);
    glow.intensity += ((hasMouse ? GLOW : 0) - glow.intensity) * .08;
    for (let i = 0; i < N; i++) {
      const x = xs[i], z = zs[i];
      const wave = (Math.sin(x * .32 + t * .45) * Math.cos(z * .28 - t * .35) + 1) * .5;
      const tower = Math.pow(seed[i], 10) * 4.2;
      const edge = Math.max(0, 1 - Math.hypot(x / (COLS * .55), z / (ROWS * .55)));
      let h = (.1 + wave * .95 + tower) * (.3 + edge * .85);
      const d2 = (x - smoothHit.x) ** 2 + (z - smoothHit.z) ** 2;
      const lift = Math.exp(-d2 / 9) * 3.8;
      h += lift;
      const g = reduced ? 1 : Math.min(1, Math.max(0, (t - delay[i]) / 1.1));
      const eased = 1 - Math.pow(1 - g, 3);
      const target = .04 + h * eased;
      cur[i] += (target - cur[i]) * (reduced ? 1 : .14);
      m4.makeScale(1, cur[i], 1); m4.setPosition(x, 0, z);
      mesh.setMatrixAt(i, m4);
      c.copy(low).lerp(high, Math.min(1, cur[i] / 4.2));
      if (lift > .05) c.lerp(accent, Math.min(.9, lift / 3));
      mesh.setColorAt(i, c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    renderer.render(scene, camera);
  }

  // pause hors écran ou onglet masqué
  let visible = true, raf = 0;
  function loop(): void {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function tick(now) { frame(now); if (visible && !document.hidden) raf = requestAnimationFrame(tick); });
  }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduced) loop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !reduced) loop(); });
  if (reduced) frame(performance.now()); else loop();
}
