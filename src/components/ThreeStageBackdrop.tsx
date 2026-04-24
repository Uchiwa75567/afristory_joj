import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function createGlowTexture(inner: string, outer: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is not available.");
  }

  const gradient = context.createRadialGradient(128, 128, 16, 128, 128, 128);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.48, inner);
  gradient.addColorStop(1, outer);

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createParticleField({
  count,
  spreadX,
  spreadY,
  spreadZ,
  color,
  size,
  opacity,
}: {
  count: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  color: number;
  size: number;
  opacity: number;
}) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * spreadX;
    positions[index * 3 + 1] = (Math.random() - 0.5) * spreadY;
    positions[index * 3 + 2] = (Math.random() - 0.5) * spreadZ;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  return {
    geometry,
    material,
    points: new THREE.Points(geometry, material),
  };
}

export function ThreeStageBackdrop({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    renderer.setClearColor(0x07110c, 1);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07110c);
    scene.fog = new THREE.FogExp2(0x07110c, 0.055);

    const camera = new THREE.PerspectiveCamera(
      28,
      Math.max(host.clientWidth / Math.max(host.clientHeight, 1), 0.001),
      0.1,
      100,
    );
    camera.position.set(0, 0, 12);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambient);

    const emeraldKey = new THREE.DirectionalLight(0x1dbf60, 1.35);
    emeraldKey.position.set(-4, 3, 8);
    scene.add(emeraldKey);

    const amberFill = new THREE.DirectionalLight(0xf6a623, 0.9);
    amberFill.position.set(4, -2, 6);
    scene.add(amberFill);

    const softBack = new THREE.PointLight(0x173d27, 1.25, 40);
    softBack.position.set(0, 0, 10);
    scene.add(softBack);

    const emeraldTexture = createGlowTexture("rgba(29,191,96,0.95)", "rgba(29,191,96,0)");
    const amberTexture = createGlowTexture("rgba(246,166,35,0.9)", "rgba(246,166,35,0)");

    const emeraldGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: emeraldTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    emeraldGlow.scale.set(11, 9, 1);
    emeraldGlow.position.set(-1.2, 0.55, -4.5);
    root.add(emeraldGlow);

    const amberGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: amberTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    amberGlow.scale.set(8.5, 8.5, 1);
    amberGlow.position.set(2.2, -0.9, -4.8);
    root.add(amberGlow);

    const mainField = createParticleField({
      count: 180,
      spreadX: 14,
      spreadY: 11,
      spreadZ: 8,
      color: 0x1dbf60,
      size: 0.055,
      opacity: 0.24,
    });
    root.add(mainField.points);

    const secondaryField = createParticleField({
      count: 96,
      spreadX: 12,
      spreadY: 9,
      spreadZ: 6,
      color: 0xf6a623,
      size: 0.048,
      opacity: 0.16,
    });
    secondaryField.points.position.set(0.5, 0.15, 0);
    root.add(secondaryField.points);

    const frame = new THREE.Mesh(
      new THREE.PlaneGeometry(12.4, 9.2),
      new THREE.MeshBasicMaterial({
        color: 0x09120d,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      }),
    );
    frame.position.z = -3.2;
    root.add(frame);

    const orbit = new THREE.Mesh(
      new THREE.RingGeometry(4.9, 5.5, 96),
      new THREE.MeshBasicMaterial({
        color: 0x1dbf60,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    orbit.position.z = -2.8;
    root.add(orbit);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = Math.max(width / Math.max(height, 1), 0.001);
      camera.updateProjectionMatrix();
    };

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(host);
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let raf = window.requestAnimationFrame(function animate() {
      const elapsed = clock.getElapsedTime();

      emeraldGlow.material.opacity = 0.21 + Math.sin(elapsed * 0.9) * 0.03;
      amberGlow.material.opacity = 0.14 + Math.cos(elapsed * 1.05) * 0.02;
      emeraldGlow.position.y = 0.55 + Math.sin(elapsed * 0.35) * 0.08;
      amberGlow.position.x = 2.2 + Math.cos(elapsed * 0.28) * 0.1;
      orbit.rotation.z = elapsed * 0.09;
      mainField.rotation.z = elapsed * 0.025;
      secondaryField.rotation.z = -elapsed * 0.018;
      softBack.intensity = 1.08 + Math.sin(elapsed * 0.5) * 0.08;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer?.disconnect();

      mainField.geometry.dispose();
      mainField.material.dispose();
      secondaryField.geometry.dispose();
      secondaryField.material.dispose();
      frame.geometry.dispose();
      frame.material.dispose();
      orbit.geometry.dispose();
      orbit.material.dispose();
      emeraldGlow.material.dispose();
      amberGlow.material.dispose();
      emeraldTexture.dispose();
      amberTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
