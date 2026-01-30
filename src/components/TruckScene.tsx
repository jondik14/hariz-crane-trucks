"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useLayoutEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const GLB_PATH = "/assets/models/crane-truck-3d-model.glb";
const FALLBACK_IMAGE = "/assets/IMG_9208.webp";

/** Sets scene background so we don't get a black frame. */
function SceneBackground() {
  const { scene } = useThree();
  useLayoutEffect(() => {
    scene.background = new THREE.Color(0xfafafa);
    return () => {
      scene.background = null;
    };
  }, [scene]);
  return null;
}

function TruckModel() {
  const { scene } = useGLTF(GLB_PATH);
  const truckRef = useRef<THREE.Group>(null);

  const craneParts = useMemo(() => {
    const parts: Record<string, THREE.Object3D> = {};
    scene.traverse((obj) => {
      const n = obj.name.toLowerCase();
      if (n.includes("crane") || n.includes("arm") || n.includes("boom") || n.includes("joint") || n.includes("hydraul")) {
        parts[obj.name] = obj;
      }
    });
    return parts;
  }, [scene]);

  useFrame((state) => {
    if (!truckRef.current) return;
    const t = state.clock.elapsedTime;
    truckRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    truckRef.current.rotation.y = t * 0.15;
    Object.values(craneParts).forEach((part) => {
      const n = part.name.toLowerCase();
      if (n.includes("arm") || n.includes("boom")) part.rotation.x = -Math.abs(Math.sin(t * 0.5) * 0.15);
      if (n.includes("joint") || n.includes("pivot") || n.includes("base")) part.rotation.y = Math.sin(t * 0.4) * 0.1;
    });
  });

  return (
    <Center>
      <primitive ref={truckRef} object={scene} scale={18} rotation={[0.15, -0.5, 0]} />
    </Center>
  );
}

/** Static image fallback when WebGL fails or context is lost. */
function ImageFallback() {
  return (
    <div className="absolute inset-0 w-full h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden bg-[#fafafa]">
      <Image
        src={FALLBACK_IMAGE}
        alt="Hariz crane truck"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 350px, 400px"
      />
    </div>
  );
}

function TruckSceneInner() {
  const [mobile, setMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);
  /** On mobile, delay loading GLB until after requestIdleCallback so initial paint is fast. */
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  /** WebGL context lost or unrecoverable error → show image fallback. */
  const [showFallback, setShowFallback] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setMounted(true);

    // WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Mobile detection (matchMedia + viewport)
    let mediaQuery: MediaQueryList | null = null;
    try {
      mediaQuery = window.matchMedia("(max-width: 1024px)");
      const checkMobile = () => {
        if (typeof window !== "undefined" && mediaQuery) {
          const isMobileView = mediaQuery.matches || window.innerWidth < 1024;
          setMobile(isMobileView);
          if (!isMobileView) setShouldLoadModel(true);
        }
      };
      checkMobile();
      if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", checkMobile);
      else if (mediaQuery.addListener) mediaQuery.addListener(checkMobile);
      window.addEventListener("resize", checkMobile);

      // On mobile, lazy-load GLB after idle (requestIdleCallback is polyfilled in ClientPolyfills).
      if (mediaQuery.matches || window.innerWidth < 1024) {
        const fallback = setTimeout(() => setShouldLoadModel(true), 2000);
        const id = window.requestIdleCallback
          ? window.requestIdleCallback(() => {
              setShouldLoadModel(true);
              clearTimeout(fallback);
            }, { timeout: 1800 })
          : 0;
        return () => {
          clearTimeout(fallback);
          if (id && window.cancelIdleCallback) window.cancelIdleCallback(id);
          if (mediaQuery) {
            if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", checkMobile);
            else if (mediaQuery.removeListener) mediaQuery.removeListener(checkMobile);
          }
          window.removeEventListener("resize", checkMobile);
        };
      }

      return () => {
        if (mediaQuery) {
          if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", checkMobile);
          else if (mediaQuery.removeListener) mediaQuery.removeListener(checkMobile);
        }
        window.removeEventListener("resize", checkMobile);
      };
    } catch {
      setShouldLoadModel(true);
      return () => {};
    }
  }, []);

  // Preload GLB on desktop only; on mobile we load when TruckModel mounts after shouldLoadModel.
  useEffect(() => {
    if (typeof window === "undefined" || mobile || !shouldLoadModel) return;
    try {
      if (typeof useGLTF.preload === "function") {
        useGLTF.preload(GLB_PATH);
      }
    } catch {
      // ignore
    }
  }, [mobile, shouldLoadModel]);

  const bgColor = "#fafafa";

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[320px] md:min-h-[380px] rounded-2xl" style={{ backgroundColor: bgColor }} aria-hidden="true" />
    );
  }

  if (!webglSupported || showFallback) {
    return <ImageFallback />;
  }

  // On mobile, show placeholder until we're allowed to load the model (after requestIdleCallback).
  if (mobile && !shouldLoadModel) {
    return (
      <div className="w-full h-full min-h-[320px] md:min-h-[380px] rounded-2xl flex items-center justify-center" style={{ backgroundColor: bgColor }} aria-hidden="true">
        <Image src={FALLBACK_IMAGE} alt="Hariz crane truck" fill className="object-cover object-center rounded-2xl" sizes="(max-width: 768px) 350px, 400px" />
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="w-full h-full min-h-[320px] md:min-h-[380px] relative overflow-visible rounded-2xl"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.12) 35%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 55%, rgba(251,191,36,0.15) 0%, transparent 60%)",
        }}
      />
      <Suspense
        fallback={
          <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: bgColor }} aria-hidden="true" />
        }
      >
        <Canvas
          shadows={!mobile}
          camera={{ position: mobile ? [0, 8, 22] : [0, 12, 50], fov: mobile ? 40 : 30 }}
          className="w-full h-full"
          style={{ position: "absolute", inset: 0, zIndex: 1, background: "transparent", backgroundColor: "transparent" }}
          dpr={mobile ? 1 : [1, 1.5]}
          performance={{ min: mobile ? 0.25 : 0.5 }}
          gl={{
            alpha: true,
            antialias: !mobile,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0xfafafa, 1);
            if (mobile) {
              gl.setPixelRatio(1);
            }
          }}
          onPointerMissed={() => {}}
          events={{ connected: undefined }}
        >
          <SceneBackground />
          <ambientLight intensity={mobile ? 2 : 1.5} />
          {!mobile && <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />}
          <directionalLight position={[-15, 15, 10]} intensity={1.5} />
          <TruckModel />
          {mobile ? <Environment preset="sunset" /> : <Environment preset="city" />}
          <ContextLostHandler onContextLost={() => setShowFallback(true)} />
        </Canvas>
      </Suspense>
    </div>
  );
}

/** Listens for webglcontextlost on the canvas and calls onContextLost. */
function ContextLostHandler({ onContextLost }: { onContextLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = () => onContextLost();
    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [gl, onContextLost]);
  return null;
}

export default function TruckScene() {
  return (
    <ErrorBoundary fallback={<ImageFallback />}>
      <TruckSceneInner />
    </ErrorBoundary>
  );
}
