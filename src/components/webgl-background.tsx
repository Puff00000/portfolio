import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cursor-reactive WebGL background:
 * - Two floating icospheres with a soft "bloom" via additive halo sprites.
 * - Subtle parallax on pointer move.
 * - Renders fixed behind all content.
 */
export function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (typeof window === "undefined") return;

    // Respect reduced motion & tiny devices
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070a, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a1a2a, 0.6));
    const key = new THREE.PointLight(0xb5ff3d, 4, 20);
    key.position.set(4, 3, 3);
    scene.add(key);
    const rim = new THREE.PointLight(0x7a5cff, 3, 20);
    rim.position.set(-4, -2, 2);
    scene.add(rim);

    // Wire-icosahedron (main sculpture)
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xf5f4ef,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const iso = new THREE.Mesh(geo, mat);
    iso.position.set(1.6, 0.2, 0);
    scene.add(iso);

    // Soft filled inner shell for bloom-ish glow feeling
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 2),
      new THREE.MeshBasicMaterial({
        color: 0xb5ff3d,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      }),
    );
    inner.position.copy(iso.position);
    scene.add(inner);

    // Torus in violet
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.02, 16, 128),
      new THREE.MeshBasicMaterial({
        color: 0x7a5cff,
        transparent: true,
        opacity: 0.6,
      }),
    );
    torus.position.set(-2.4, -0.6, -1);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // Halo sprite (fake bloom)
    const haloTex = createRadialTexture();
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: haloTex,
        color: 0xb5ff3d,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    halo.scale.set(6, 6, 1);
    halo.position.copy(iso.position);
    scene.add(halo);

    const halo2 = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: haloTex,
        color: 0x7a5cff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    halo2.scale.set(4, 4, 1);
    halo2.position.copy(torus.position);
    scene.add(halo2);

    // Particles
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xf5f4ef,
        size: 0.015,
        transparent: true,
        opacity: 0.7,
      }),
    );
    scene.add(points);

    // Pointer parallax
    const target = new THREE.Vector2(0, 0);
    const pointer = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      pointer.lerp(target, 0.05);

      if (!reduced) {
        iso.rotation.x = t * 0.15;
        iso.rotation.y = t * 0.2;
        inner.rotation.copy(iso.rotation);
        torus.rotation.z = t * 0.25;
        points.rotation.y = t * 0.02;
      }

      camera.position.x = pointer.x * 0.6;
      camera.position.y = pointer.y * 0.4 - scrollY * 0.0008;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      haloTex.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}

function createRadialTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
