import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** A locally rendered sculpture: no external textures, scripts or model downloads. */
export default function Sculpture({ reduced = false, onReady, small = false }) {
  const host = useRef(null);
  const ready = useRef(onReady);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    ready.current = onReady;
  }, [onReady]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer,
      frame,
      observer,
      resizeObserver,
      pmrem,
      environment,
      room,
      geometry,
      material;
    let visible = true,
      disposed = false,
      lastDraw = 0,
      activeUntil = 0,
      renderNeeded = true,
      previousWidth = 0,
      previousHeight = 0;
    const pointer = new THREE.Vector2();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    const group = new THREE.Group();
    group.rotation.set(-0.2, -0.42, -0.24);
    const requestRender = () => {
      renderNeeded = true;
      if (!frame && !disposed) frame = requestAnimationFrame(draw);
    };
    const move = (event) => {
      if (reduced) return;
      activeUntil = performance.now() + 650;
      requestRender();
      const bounds = container.getBoundingClientRect();
      pointer.set(
        (event.clientX - bounds.left) / bounds.width - 0.5,
        (event.clientY - bounds.top) / bounds.height - 0.5,
      );
    };
    const leave = () => {
      pointer.set(0, 0);
      if (!reduced) {
        activeUntil = performance.now() + 400;
        requestRender();
      }
    };
    const lose = (event) => {
      event.preventDefault();
      setFailed(true);
      ready.current?.();
    };
    const draw = (now = 0) => {
      frame = null;
      if (disposed) return;
      if (
        visible &&
        !document.hidden &&
        (renderNeeded || now < activeUntil) &&
        (renderNeeded || now - lastDraw > 32 || now === 0)
      ) {
        lastDraw = now;
        renderNeeded = false;
        group.rotation.x = THREE.MathUtils.lerp(
          group.rotation.x,
          -0.2 + pointer.y * 0.6,
          0.14,
        );
        group.rotation.y = THREE.MathUtils.lerp(
          group.rotation.y,
          -0.42 + pointer.x * 0.9,
          0.14,
        );
        group.rotation.z = -0.24;
        renderer.render(scene, camera);
      }
      if (!reduced && visible && now < activeUntil)
        frame = requestAnimationFrame(draw);
    };
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, small ? 1 : 1.5),
      );
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);
      pmrem = new THREE.PMREMGenerator(renderer);
      room = new RoomEnvironment();
      environment = pmrem.fromScene(room, 0.04, 0.1, 100, { size: 128 });
      scene.environment = environment.texture;
      geometry = new THREE.TorusKnotGeometry(
        1.22,
        0.47,
        small ? 100 : 160,
        28,
        2,
        3,
      );
      material = new THREE.MeshPhysicalMaterial({
        color: "#338dcc",
        metalness: 1,
        roughness: 0.19,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.65,
      });
      group.add(new THREE.Mesh(geometry, material));
      scene.add(group);
      const key = new THREE.DirectionalLight("#d7edff", 4);
      key.position.set(-3, 5, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight("#1769c2", 3);
      rim.position.set(4, -2, 2);
      scene.add(rim);
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (
          !width ||
          !height ||
          (width === previousWidth && height === previousHeight)
        )
          return;
        previousWidth = width;
        previousHeight = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        requestRender();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) requestRender();
        },
        { rootMargin: "100px" },
      );
      observer.observe(container);
      container.addEventListener("pointermove", move);
      container.addEventListener("pointerleave", leave);
      renderer.domElement.addEventListener("webglcontextlost", lose);
      resize();
      cancelAnimationFrame(frame);
      draw();
      ready.current?.();
    } catch {
      setFailed(true);
      ready.current?.();
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", leave);
      renderer?.domElement.removeEventListener("webglcontextlost", lose);
      geometry?.dispose();
      material?.dispose();
      environment?.dispose();
      room?.dispose();
      pmrem?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [reduced, small]);
  return (
    <div
      ref={host}
      className={`sculpture ${small ? "sculpture-small" : ""}`}
      role="img"
      aria-label="Interactive metallic blue knot sculpture"
    >
      {failed && (
        <img
          className="sculpture-fallback"
          src="/m2-mark.svg"
          alt="M squared"
        />
      )}
    </div>
  );
}
