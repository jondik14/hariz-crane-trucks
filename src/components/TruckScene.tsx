"use client";

import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function TruckModel({ scale = 18 }: { scale?: number }) {
  const { scene } = useGLTF("/assets/models/crane truck 3d model.glb");
  const truckRef = useRef<THREE.Group>(null);

  const craneParts = useMemo(() => {
    const parts: { [key: string]: THREE.Object3D } = {};
    scene.traverse((obj) => {
      const name = obj.name.toLowerCase();
      if (name.includes("crane") || name.includes("arm") || name.includes("boom") || name.includes("joint") || name.includes("hydraul")) {
        parts[obj.name] = obj;
      }
    });
    return parts;
  }, [scene]);

  useFrame((state) => {
    if (!truckRef.current) return;
    const time = state.clock.elapsedTime;
    truckRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    truckRef.current.rotation.y = time * 0.15;
    Object.values(craneParts).forEach((part) => {
      const name = part.name.toLowerCase();
      if (name.includes("arm") || name.includes("boom")) {
        const lift = Math.sin(time * 0.5) * 0.15;
        part.rotation.x = -Math.abs(lift);
      }
      if (name.includes("joint") || name.includes("pivot") || name.includes("base")) {
        part.rotation.y = Math.sin(time * 0.4) * 0.1;
      }
    });
  });

  return (
    <Center>
      <primitive ref={truckRef} object={scene} scale={scale} rotation={[0.15, -0.5, 0]} />
    </Center>
  );
}

export default function TruckScene() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[380px] relative overflow-visible">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.12) 35%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 50% 55%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)
          `,
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
          shadows
          camera={{
            position: isMobileView ? [0, 7, 28] : [0, 12, 50],
            fov: isMobileView ? 36 : 30,
          }}
          className="!w-full !h-full"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <ambientLight intensity={1.5} />
          <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <directionalLight position={[-15, 15, 10]} intensity={1.5} />
          <TruckModel scale={isMobileView ? 16 : 18} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
