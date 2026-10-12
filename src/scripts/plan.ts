/*
 * ARCHITECH : un plan 2D qui s'élève en volume 3D.
 * Le rendu se fait à la demande (transition, rotation) : rien ne tourne hors interaction.
 */
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  type LineBasicMaterial,
} from 'three';
import { reducedMotion as reduced } from './motion';
import { LEGACY_LIGHT, createRenderer, cssColor } from './three-compat';

// plan in metres, origin at centre (12 x 8)
const W = 12, D = 8, H = 2.7, T = .18;
const SEGS: [number, number, number, number][] = [
  [0,0, 12,0], [12,0, 12,8], [12,8, 0,8], [0,8, 0,0],
  [5,0, 5,3.4], [5,4.4, 5,8],
  [0,5, 3.6,5], [4.6,5, 5,5],
  [5,4, 7.6,4], [8.6,4, 12,4],
  [8.5,0, 8.5,2.8],
  [8.5,4, 8.5,5.2], [8.5,6.2, 8.5,8],
];
const WINDOWS: [number, number][] = [[2.5,0],[10.2,0],[2.5,8],[9.4,8]];

export function initPlan(canvas: HTMLCanvasElement, btn: HTMLButtonElement, note: HTMLElement): void {
  const renderer = createRenderer({ canvas, antialias: true, alpha: true });
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, .1, 100);
  const group = new Group(); scene.add(group);
  scene.add(new AmbientLight(0xffffff, .6 * LEGACY_LIGHT));
  const key = new DirectionalLight(0xffffff, .8 * LEGACY_LIGHT); key.position.set(8, 14, 6); scene.add(key);

  const wallMat = new MeshStandardMaterial({ roughness: .7, color: cssColor('--ink-soft') });
  const capMat = new MeshBasicMaterial({ color: cssColor('--accent') });
  const walls: { m: Mesh; cap: Mesh; d: number }[] = [];
  SEGS.forEach(([x1, z1, x2, z2], i) => {
    const len = Math.hypot(x2 - x1, z2 - z1) + T;
    const g = new BoxGeometry(len, 1, T); g.translate(0, .5, 0);
    const m = new Mesh(g, wallMat);
    m.position.set((x1 + x2) / 2 - W / 2, 0, (z1 + z2) / 2 - D / 2);
    m.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    const capG = new PlaneGeometry(len, T); capG.rotateX(-Math.PI / 2);
    const capM = new Mesh(capG, capMat); capM.position.y = 1.001; m.add(capM);
    group.add(m); walls.push({ m, cap: capM, d: i * .05 });
  });
  // floor + slab outline
  const floor = new Mesh(new PlaneGeometry(W + .6, D + .6), new MeshStandardMaterial({ roughness: 1, color: cssColor('--surface') }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.01; group.add(floor);
  const grid = new GridHelper(28, 28); grid.position.y = -.02; group.add(grid);
  const gridMat = grid.material as LineBasicMaterial;
  gridMat.color = cssColor('--line'); gridMat.opacity = .5; gridMat.transparent = true;
  // glazing: thin accent panes on the façade, visible once raised
  const glassMat = new MeshBasicMaterial({ transparent: true, opacity: 0, color: cssColor('--accent') });
  WINDOWS.forEach(([x, z]) => {
    const p = new Mesh(new PlaneGeometry(1.6, 1.3), glassMat);
    p.position.set(x - W / 2, 1.45, z - D / 2 + (z === 0 ? -.1 : .1)); group.add(p);
  });

  function resize(): void {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', () => { resize(); draw(); });

  let target = 0, k = 0, yaw = 0, yawV = 0, dragging = false, lastX = 0, running = false;
  btn.addEventListener('click', () => {
    target = target ? 0 : 1;
    btn.setAttribute('aria-pressed', String(!!target));
    btn.textContent = target ? 'Revenir au plan 2D' : 'Passer en 3D';
    note.textContent = target ? 'Volume généré depuis le plan' : 'Faites glisser pour tourner';
    kick();
  });
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; yaw += dx * .008; yawV = dx * .008; kick(); });
  canvas.addEventListener('pointerup', () => { dragging = false; kick(); });
  canvas.addEventListener('pointercancel', () => { dragging = false; });

  const ease = (x: number) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  function draw(): void {
    const e = ease(k);
    walls.forEach((w) => {
      const local = Math.min(1, Math.max(0, (k * 1.5 - w.d)));
      w.m.scale.y = .03 + ease(local) * H;
      w.cap.scale.y = 1;
    });
    glassMat.opacity = Math.max(0, e - .6) * 1.6;
    group.rotation.y = yaw;
    // camera: top-down plan -> three-quarter view
    const r = 21 + e * 4;
    const elev = (88 - e * 54) * Math.PI / 180;
    const az = -.6 * e;
    camera.position.set(Math.sin(az) * Math.cos(elev) * r, Math.sin(elev) * r, Math.cos(az) * Math.cos(elev) * r + .001);
    camera.lookAt(0, e * .8, 0);
    renderer.render(scene, camera);
  }
  function kick(): void {
    if (reduced) { k = target; draw(); return; }
    if (running) return; running = true;
    requestAnimationFrame(function tick() {
      k += (target - k) * .055;
      if (!dragging) { yaw += yawV; yawV *= .93; }
      draw();
      if (Math.abs(target - k) > .001 || Math.abs(yawV) > .0005 || dragging) requestAnimationFrame(tick);
      else { k = target; draw(); running = false; }
    });
  }
  draw();
  // auto-raise once when the plan scrolls into view, so the 2D -> 3D moment is seen
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { obs.disconnect(); setTimeout(() => { if (!target) btn.click(); }, 700); }
  }, { threshold: .6 }).observe(canvas);
}
