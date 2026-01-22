"use client";

import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const GLB_PATH = "/assets/models/crane-truck-3d-model.glb";

// Preload the model for faster loading
if (typeof window !== "undefined") {
  useGLTF.preload(GLB_PATH);
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

function TruckSceneInner() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div className="w-full h-full min-h-[320px] md:min-h-[380px] relative overflow-visible bg-zinc-50 rounded-2xl">
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.12) 35%, transparent 65%), radial-gradient(ellipse 50% 40% at 50% 55%, rgba(251,191,36,0.15) 0%, transparent 60%)",
        }}
      />
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#2a1c2f]/40 font-black uppercase tracking-widest text-[10px]">Loading 3D Fleet...</p>
          </div>
        }
      >
        <Canvas
          shadows={!mobile}
          camera={{ position: mobile ? [0, 8, 22] : [0, 12, 50], fov: mobile ? 40 : 30 }}
          className="w-full h-full"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
          dpr={mobile ? [1, 1.5] : [1, 2]}
          performance={{ min: mobile ? 0.5 : 0.75 }}
        >
          <ambientLight intensity={mobile ? 1.8 : 1.5} />
          {!mobile && <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />}
          <directionalLight position={[-15, 15, 10]} intensity={mobile ? 1.2 : 1.5} />
          <TruckModel />
          <Environment preset={mobile ? "sunset" : "city"} />
        </Canvas>
      </Suspense>
    </div>
  );
}

const Fallback = () => (
  <div className="w-full h-full min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center bg-zinc-50 rounded-2xl">
    <p className="text-[#2a1c2f]/50 font-black uppercase tracking-widest text-[11px]">Fleet view unavailable</p>
  </div>
);

export default function TruckScene() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <TruckSceneInner />
    </ErrorBoundary>
  );
}
