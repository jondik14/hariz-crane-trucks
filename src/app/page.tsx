"use client";

import Image from "next/image";
import { 
  Phone, 
  CheckCircle2, 
  ChevronDown,
  Check,
  ShieldCheck,
  ArrowRight,
  Zap,
  Truck,
  Box,
  Construction,
  Wrench,
  Weight,
  Star,
  MessageSquare,
  MapPin,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  ChevronRight as ChevronIcon
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Center } from "@react-three/drei";
import * as THREE from "three";

function TruckModel() {
  const { scene } = useGLTF("/assets/models/crane truck 3d model.glb");
  const truckRef = useRef<THREE.Group>(null);
  
  // Find crane parts
  const craneParts = useMemo(() => {
    const parts: { [key: string]: THREE.Object3D } = {};
    scene.traverse((obj) => {
      const name = obj.name.toLowerCase();
      // Target the crane arm and its rotation pivot
      if (name.includes('crane') || name.includes('arm') || name.includes('boom') || name.includes('joint') || name.includes('hydraul')) {
        parts[obj.name] = obj;
      }
    });
    return parts;
  }, [scene]);

  useFrame((state) => {
    if (!truckRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle hover and slow rotation - always centered
    truckRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    truckRef.current.rotation.y = time * 0.15; // Slow continuous rotation
    
    // Subtle crane animation
    Object.values(craneParts).forEach((part) => {
      const name = part.name.toLowerCase();
      
      // Lift the crane arms gently
      if (name.includes('arm') || name.includes('boom')) {
        const lift = Math.sin(time * 0.5) * 0.15;
        part.rotation.x = -Math.abs(lift);
      }
      
      // Subtle base pivot
      if (name.includes('joint') || name.includes('pivot') || name.includes('base')) {
        part.rotation.y = Math.sin(time * 0.4) * 0.1;
      }
    });
  });

  return (
    <Center>
      <primitive 
        ref={truckRef} 
        object={scene} 
        scale={18} 
        rotation={[0.15, -0.5, 0]} 
      />
    </Center>
  );
}

// Main 3D Section for Fleet
function TruckScene() {
  const [isMobileView, setIsMobileView] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-[320px] md:min-h-[380px] relative overflow-visible">
      {/* Yellow radial glow behind the truck - more visible */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.12) 35%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 50% 55%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)
          `
        }}
      />
      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#2a1c2f]/40 font-black uppercase tracking-widest text-[10px]">Loading 3D Fleet...</p>
        </div>
      }>
        <Canvas 
          shadows 
          camera={{ 
            position: isMobileView ? [0, 8, 22] : [0, 12, 50], 
            fov: isMobileView ? 40 : 30 
          }} 
          className="!w-full !h-full"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <ambientLight intensity={1.5} />
          <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <directionalLight position={[-15, 15, 10]} intensity={1.5} />
          <TruckModel />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}

/**
 * MOBILE-FIRST DESIGN SYSTEM (Applied 2026 Polish)
 * THEME COLOR: #2a1c2f (Deep Eggplant)
 * 1. Type Scale: H1 (32px), H2 (24px), H3 (20px), Body (16px), Meta (14px)
 * 2. Vertical Spacing: 48-64px between sections, 16-20px between cards
 */

// Custom SVG Icons from User Reference
const CraneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M0 3.5c0-.931 0-1.4.122-1.77A2.51 2.51 0 0 1 1.732.12c.377-.122.842-.122 1.77-.122h9c.931 0 1.4 0 1.77.122a2.51 2.51 0 0 1 1.61 1.61c.122.377.122.842.122 1.77s0 1.4-.122 1.77a2.51 2.51 0 0 1-1.61 1.61c-.376.122-.842.122-1.77.122h-3.5v1.5c0 .688.466 1.04 1.25 1.63l.049.037c.758.568 1.7 1.33 1.7 2.84c0 1.66-1.34 3-3 3s-3-1.34-3-3v-.5a.5.5 0 0 1 1 0v.5c0 1.1.895 2 2 2c1.1 0 2-.895 2-2c0-.988-.558-1.48-1.3-2.04l-.15-.112c-.674-.498-1.55-1.15-1.55-2.35v-1.5h-4.5c-.931 0-1.4 0-1.77-.122a2.51 2.51 0 0 1-1.61-1.61c-.122-.377-.122-.842-.122-1.77zM4.31 1h4.88l2.5 5H6.81zm8.5 5l-2.5-5h2.19c1.01 0 1.28.012 1.46.073c.457.148.815.506.963.963c.061.188.073.455.073 1.46s-.012 1.28-.073 1.46a1.5 1.5 0 0 1-.963.963c-.167.055-.397.07-1.15.073zM3.19 1c-.758.003-.988.019-1.15.073a1.5 1.5 0 0 0-.963.963c-.061.188-.073.455-.073 1.46s.012 1.28.073 1.46c.148.457.506.815.963.963c.188.061.455.073 1.46.073h2.19l-2.5-5z" clipRule="evenodd"></path></svg>
);

const TransportIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21q-1.25 0-2.125-.875T1 18q0-.65.25-1.237T2 15.75V11h2V5h8l4.7 11.075q.15.35.225.7T17 17.5q0 1.45-1.025 2.475T13.5 21q-1.025 0-1.888-.537T10.326 19h-3.5q-.325.9-1.1 1.45T4 21m14-1V4h2v14h3v2zM4 19q.425 0 .713-.288T5 18t-.288-.712T4 17t-.712.288T3 18t.288.713T4 19m9.5 0q.625 0 1.063-.437T15 17.5t-.437-1.062T13.5 16t-1.062.438T12 17.5t.438 1.063T13.5 19m-4.575-5h4.725l-2.975-7H6v4z"></path></svg>
);

const ContainerIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M236.4 70.65L130.2 40.31a8 8 0 0 0-3.33-.23L21.74 55.1A16.08 16.08 0 0 0 8 70.94v114.12a16.08 16.08 0 0 0 13.74 15.84l105.13 15a8.5 8.5 0 0 0 1.13.1a8 8 0 0 0 2.2-.31l106.2-30.34A16.07 16.07 0 0 0 248 170V86a16.07 16.07 0 0 0-11.6-15.35M64 120H48a8 8 0 0 0 0 16h16v54.78l-40-5.72V70.94l40-5.72Zm56 78.78l-40-5.72V136h16a8 8 0 0 0 0-16H80V62.94l40-5.72Z"></path></svg>
);

const MaterialIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M0 .5A.5.5 0 0 1 .5 0h15a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5H2v-2H.5a.5.5 0 0 1-.5-.5v-3A.5.5 0 0 1 .5 6H2V4H.5a.5.5 0 0 1-.5-.5zM3 4v2h4.5V4zm5.5 0v2H13V4zM3 10v2h4.5v-2zm5.5 0v2H13v-2zM1 1v2h3.5V1zm4.5 0v2h5V1zm6 0v2H15V1zM1 7v2h3.5V7zm4.5 0v2h5V7zm6 0v2H15V7zM1 13v2h3.5v-2zm4.5 0v2h5v-2zm6 0v2H15v-2z"></path></svg>
);

const HeavyIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0L0 1200h1200zm-46.143 416.089h92.284v158.644l-22.559 223.096h-47.168l-22.56-223.096V416.089zm0 469.336h92.284v99.391h-92.284z"></path></svg>
);

const UrgentIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m11.5 20l4.86-9.73H13V4l-5 9.73h3.5zM12 2c2.75 0 5.1 1 7.05 2.95S22 9.25 22 12s-1 5.1-2.95 7.05S14.75 22 12 22s-5.1-1-7.05-2.95S2 14.75 2 12s1-5.1 2.95-7.05S9.25 2 12 2"></path></svg>
);

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingContent />
    </Suspense>
  );
}

function LandingContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Crane Hire",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');
  const [selectedService, setSelectedService] = useState("Crane Hire");
  
  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError("Please fill in all required fields.");
      setFormStatus("error");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      setFormStatus("error");
      return;
    }
    
    setFormStatus("loading");
    setFormError("");
    
    const endpoint = "https://formspree.io/f/xvzzozye";
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          _replyto: formData.email,
          service: formData.service,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setFormStatus("success");
        // Clear form
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "Crane Hire",
          message: ""
        });
        setSelectedService("Crane Hire");
        
        // Fire GA success event
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "quote_submit", {
            service_type: formData.service
          });
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setFormError(data.error || "Something went wrong. Please try again.");
        setFormStatus("error");
        
        // Fire GA error event
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "quote_submit_error", {
            error_type: "submission_failed",
            status_code: response.status
          });
        }
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setFormStatus("error");
      
      // Fire GA error event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "quote_submit_error", {
          error_type: "network_error"
        });
      }
    }
  };

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle video loading and content sequence
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      // Small delay before showing content for smooth sequence
      setTimeout(() => setContentReady(true), 200);
    };

    // If video is already loaded (cached)
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
    }

    // Fallback: show content after 3 seconds even if video hasn't loaded
    const fallbackTimer = setTimeout(() => {
      setVideoLoaded(true);
      setContentReady(true);
    }, 3000);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (preselectedService && hasMounted) {
      const formattedService = preselectedService
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const serviceMap: { [key: string]: string } = {
        "Machinery": "Machinery Transport",
        "Containers": "Container Relocation",
        "Materials": "Material Delivery",
        "Urgent": "Urgent Lift"
      };

      const service = serviceMap[formattedService] || formattedService;
      setSelectedService(service);
      setFormData(prev => ({ ...prev, service }));
      
      // Smooth scroll to quote section after a short delay
      setTimeout(() => {
        quoteRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [preselectedService, hasMounted]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // GA4 call click tracking
  const trackCallClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", {
        phone_number: "0469798247"
      });
    }
  };

  const services = [
    { 
      icon: <CraneIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Crane Hire", 
      desc: "Reliable lifting for construction. Safe, secure, and always on time." 
    },
    { 
      icon: <TransportIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Machinery Transport", 
      desc: "Specialist plant transport. Secured and delivered on schedule." 
    },
    { 
      icon: <ContainerIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Container Moves", 
      desc: "Fast lifting and relocation. Precise placement with skilled operators." 
    },
    { 
      icon: <MaterialIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Material Delivery", 
      desc: "Onsite delivery of steel and timber. Efficient unloading and placement." 
    },
    { 
      icon: <HeavyIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Heavy Loads", 
      desc: "Oversized transport with care. Route checks and insured delivery." 
    },
    { 
      icon: <UrgentIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Urgent Lifts", 
      desc: "Same-day urgent crane hire. Rapid response 24/7 assistance." 
    }
  ];

  const recentProjects = [
    [
      "/assets/gallery/gallery-1.webp",
      "/assets/gallery/gallery-2.webp",
      "/assets/gallery/gallery-3.webp",
      "/assets/gallery/gallery-4.webp",
      "/assets/gallery/gallery-6.webp",
      "/assets/gallery/gallery-7.webp",
      "/assets/gallery/gallery-8.webp",
      "/assets/gallery/gallery-9.webp",
      "/assets/gallery/21767683883.webp",
      "/assets/gallery/3-11767683883.webp",
      "/assets/gallery/81767683885.webp",
      "/assets/gallery/91767683885.webp"
    ],
    [
      "/assets/gallery/51767683885.webp",
      "/assets/gallery/71767683885.webp",
      "/assets/gallery/IMG_1795-scaled1767683885.webp",
      "/assets/gallery/IMG_1837-scaled1767683884.webp",
      "/assets/gallery/IMG_1928-scaled1767683884.webp",
      "/assets/IMG_8903.webp",
      "/assets/IMG_8937.webp",
      "/assets/IMG_9013.webp",
      "/assets/IMG_9190.webp",
      "/assets/IMG_9200.webp",
      "/assets/IMG_9212.webp",
      "/assets/IMG_9430.webp"
    ]
  ];

  // Flatten all gallery images for the lightbox
  const allGalleryImages = [...recentProjects[0], ...recentProjects[1]];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const openLightbox = (rowIndex: number, imageIndex: number) => {
    const flatIndex = rowIndex === 0 ? imageIndex : recentProjects[0].length + imageIndex;
    setLightboxIndex(flatIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allGalleryImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const testimonials = [
    { name: "James Walker", role: "Builder", quote: "Clear communication and safe delivery. dependency you can trust.", initials: "JW", img: "/assets/IMG_9196.webp", jobImg: "/assets/IMG_9190.webp" },
    { name: "Sarah Mitchell", role: "Homeowner", quote: "Handled machinery professionally. On time and safe handling.", initials: "SM", img: "/assets/IMG_9197.webp", jobImg: "/assets/IMG_9200.webp" },
    { name: "David Thompson", role: "Contractor", quote: "Smooth container delivery. Accurate placement without issues.", initials: "DT", img: "/assets/IMG_9206.webp", jobImg: "/assets/IMG_9208.webp" },
    { name: "Olivia Harris", role: "Project Manager", quote: "Honest pricing and zero damage. Trusted support for every job.", initials: "OH", img: "/assets/IMG_9212.webp", jobImg: "/assets/IMG_9251.webp" }
  ];

  const areas = [
    "Sydney CBD", "Western Sydney",
    "North Shore", "Northern Beaches",
    "Eastern Suburbs", "Sutherland Shire",
    "Inner West", "Hills District",
    "Greater Sydney", "Regional NSW"
  ];

  const snappyEntrance = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-48px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-white text-[#2a1c2f] font-sans selection:bg-amber-100 selection:text-[#2a1c2f] overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-24 md:h-28 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="transition-transform hover:scale-[1.02]">
              <Image src="/assets/Logo.png" alt="Hariz Transport" width={200} height={116} className="w-[160px] md:w-[200px] h-auto object-contain" priority />
            </a>
            <nav className="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              <a href="/about" className="hover:text-[#2a1c2f] transition-colors">About</a>
              <a href="/services" className="hover:text-[#2a1c2f] transition-colors">Services</a>
              <a href="#quote" className="hover:text-[#2a1c2f] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="hidden lg:flex items-center gap-4 text-[#2a1c2f] font-black hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-zinc-600" />
              </div>
              <span className="text-lg">0469 798 247</span>
            </a>
            <a href="#quote" className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-[11px] transition-all shadow-md active:scale-95 uppercase tracking-widest">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative min-h-[600px] h-[75vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#2a1c2f]">
        {/* Branded loading background - shown while video loads */}
        <div 
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
              linear-gradient(180deg, #1a1020 0%, #2a1c2f 50%, #1a1020 100%)
            `
          }}
        >
          {/* Animated loading indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-500/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
            </div>
            <p className="mt-6 text-amber-500/60 font-black text-[11px] uppercase tracking-[0.3em]">Loading</p>
          </div>
        </div>
        
        {/* Video with fade-in */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/assets/hariz hero video.mp4" type="video/mp4" />
        </video>
        
        {/* Slightly deeper purple overlay for brand depth and text legibility */}
        <div className={`absolute inset-0 bg-[#2a1c2f]/55 z-10 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Content with sequenced entrance */}
        <div className="relative z-20 w-full max-w-5xl px-6 text-center text-white drop-shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 px-4 py-2 rounded-full mb-6 md:mb-8 text-[13px] font-black tracking-[0.2em] uppercase backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4" /> Fully Licensed & Insured
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-3xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase [text-shadow:_0_4px_24px_rgb(0_0_0_/_40%)]"
          >
            Sydney-Based <br /><span className="text-amber-500">Crane Truck Hire.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-[15px] md:text-xl text-zinc-100 mb-10 md:mb-12 font-medium leading-relaxed max-w-2xl mx-auto [text-shadow:_0_2px_12px_rgb(0_0_0_/_50%)]"
          >
            Residential and light commercial lifts. <br className="hidden md:block" /> Safe, reliable, and locally operated across NSW.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
          >
            <a href="#quote" className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black text-base px-10 py-4.5 md:py-4 rounded-xl transition-all shadow-xl active:scale-95 uppercase flex items-center justify-center gap-4 min-h-[56px]">
              Book Your Lift <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[11px] font-black text-zinc-300 uppercase tracking-widest mb-1.5 md:mb-2">Talk To The Owner</p>
              <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="text-white font-black text-2xl md:text-4xl hover:text-amber-500 transition-colors drop-shadow-md">0469 798 247</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. TRUST / ABOUT SECTION - Redesigned for High-End Conversion */}
      <section className="py-16 md:py-24 bg-white relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <motion.div 
              className="lg:col-span-7 relative"
              {...snappyEntrance}
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(42,28,47,0.2)] bg-zinc-50 group">
                <Image 
                  src="/assets/services moving car.webp" 
                  alt="Hariz Crane Truck moving equipment" 
                  width={1200}
                  height={900}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" 
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Focused Value Prop */}
            <div className="lg:col-span-5">
              <motion.div {...snappyEntrance} className="inline-flex items-center gap-3 bg-zinc-100 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[#2a1c2f] font-black text-[11px] uppercase tracking-[0.2em]">About Hariz Transport</span>
              </motion.div>
              
              <motion.h2 {...snappyEntrance} transition={{ ...snappyEntrance.transition, delay: 0.1 }} className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase leading-[0.95] text-[#2a1c2f]">
                Professional Lifts. <span className="text-amber-500">Grounded in Safety.</span>
              </motion.h2>
              
              <motion.p {...snappyEntrance} transition={{ ...snappyEntrance.transition, delay: 0.2 }} className="text-zinc-500 text-base md:text-lg font-medium mb-8 leading-relaxed">
                We provide a locally owned crane truck service across Sydney. We focus on clear communication and reliable planning for every lift we undertake.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { title: "Skilled Operators", icon: <Users className="w-4 h-4" /> },
                  { title: "Competitive Rates", icon: <Zap className="w-4 h-4" /> },
                  { title: "Upfront Pricing", icon: <ShieldCheck className="w-4 h-4" /> },
                  { title: "Fully Insured", icon: <CheckCircle2 className="w-4 h-4" /> }
                ].map((item, i) => (
                  <motion.div key={i} {...snappyEntrance} transition={{ ...snappyEntrance.transition, delay: 0.3 + (i * 0.05) }} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2a1c2f] flex items-center justify-center text-amber-400">
                      {item.icon}
                    </div>
                    <span className="font-bold text-[12px] uppercase tracking-wide text-[#2a1c2f]">{item.title}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a {...snappyEntrance} transition={{ ...snappyEntrance.transition, delay: 0.5 }} href="#quote" className="inline-flex items-center gap-3 bg-[#2a1c2f] hover:bg-amber-500 hover:text-[#2a1c2f] text-white font-black px-8 py-4 rounded-xl text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES - With Gravel Background */}
      <section className="py-20 md:py-32 relative z-20 overflow-hidden">
        {/* Gravel background image */}
        <div className="absolute inset-0">
          <Image 
            src="/assets/gravel bg.webp" 
            alt="" 
            fill 
            className="object-cover" 
            sizes="100vw"
            priority
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-[#2a1c2f]/60" />
          
          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Inner container with semi-transparent dark background */}
          <div className="bg-[#2a1c2f]/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="mb-10 md:mb-14">
              <span className="text-amber-400 font-black text-[11px] uppercase tracking-[0.3em] mb-3 block">Our Services</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-[0.95]">
                Specialist <span className="text-amber-500">Lifting</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className="group bg-[#35263b]/80 p-4 md:p-6 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2a1c2f] rounded-lg flex items-center justify-center mb-4 text-amber-400 group-hover:bg-amber-500 group-hover:text-[#2a1c2f] transition-all duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-black mb-1.5 tracking-tight uppercase text-white group-hover:text-amber-500 transition-colors">{s.title}</h3>
                  <p className="text-zinc-400 font-medium text-[12px] leading-relaxed hidden md:block">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-14 flex justify-center md:justify-start">
              <a 
                href="/services" 
                className="inline-flex items-center gap-3 border border-white/20 hover:border-amber-500 hover:text-amber-500 text-white font-black px-10 py-5 rounded-xl text-[12px] uppercase tracking-widest transition-all active:scale-95"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLEET */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          <motion.div {...snappyEntrance} className="lg:col-span-6 relative aspect-square w-full max-w-[350px] md:max-w-[400px] mx-auto lg:max-w-none">
            <TruckScene />
          </motion.div>
          <div className="lg:col-span-6">
            <motion.h2 {...snappyEntrance} className="text-2xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight uppercase text-[#2a1c2f] leading-[1.1]">2022 Hino <br />Precision.</motion.h2>
            <motion.p {...snappyEntrance} transition={{ delay: 0.1 }} className="text-zinc-600 text-base md:text-lg font-medium mb-10 md:mb-12 leading-relaxed max-w-xl">
              Modern fleet for maximum safety. <br className="hidden md:block" /> Careful handling for technical jobsite requirements.
            </motion.p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Model", val: "2022 Hino + Ferrari" },
                { label: "Payload", val: "7.7T" }, 
                { label: "Tray Length", val: "8.1m" }, 
                { label: "Tray Width", val: "2.5m" }, 
                { label: "Capacity", val: "1T @ 15m" },
                { label: "Capacity", val: "4.3T @ 4.5m" }
              ].map((spec, i) => (
                <div key={i} className="bg-zinc-50 p-3 md:p-4 rounded-xl border border-zinc-100">
                  <p className="text-[9px] md:text-[10px] font-black text-zinc-400 mb-0.5 md:mb-1 uppercase tracking-widest">{spec.label}</p>
                  <p className="text-base md:text-lg font-black text-[#2a1c2f] uppercase">{spec.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section className="py-16 md:py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
          <motion.span {...snappyEntrance} className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-3 md:mb-4 block">Recent Works</motion.span>
          <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black tracking-tight uppercase text-[#2a1c2f]">
            Technical <span className="text-amber-500">Lifts</span> <br className="md:hidden" /> & Transport
          </motion.h2>
        </div>

        <div 
          className="flex flex-col gap-6 md:gap-8 cursor-pointer"
          onMouseEnter={() => setIsGalleryHovered(true)}
          onMouseLeave={() => setIsGalleryHovered(false)}
        >
          <div className="flex whitespace-nowrap overflow-hidden relative">
            <motion.div 
              className="flex gap-6 md:gap-8 px-4 will-change-transform" 
              animate={{ x: [0, -3000] }} 
              transition={{ repeat: Infinity, duration: isMobile ? 60 : 80, ease: "linear" }}
              style={{ animationPlayState: isGalleryHovered ? "paused" : "running" }}
            >
              {[...recentProjects[0], ...recentProjects[0]].map((src, i) => (
                <div 
                  key={i} 
                  className="relative w-[280px] h-[200px] md:w-[450px] md:h-[320px] rounded-2xl overflow-hidden flex-shrink-0 shadow-lg transform-gpu group cursor-pointer"
                  onClick={() => openLightbox(0, i % recentProjects[0].length)}
                >
                  <Image src={src} alt="Hariz Crane Project" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 280px, 450px" loading="lazy" />
                  <div className="absolute inset-0 bg-[#2a1c2f]/0 group-hover:bg-[#2a1c2f]/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                      <ArrowRight className="w-5 h-5 text-[#2a1c2f] rotate-[-45deg]" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex whitespace-nowrap overflow-hidden relative">
            <motion.div 
              className="flex gap-6 md:gap-8 px-4 will-change-transform" 
              animate={{ x: [-3000, 0] }} 
              transition={{ repeat: Infinity, duration: isMobile ? 70 : 90, ease: "linear" }}
              style={{ animationPlayState: isGalleryHovered ? "paused" : "running" }}
            >
              {[...recentProjects[1], ...recentProjects[1]].map((src, i) => (
                <div 
                  key={i} 
                  className="relative w-[280px] h-[200px] md:w-[450px] md:h-[320px] rounded-2xl overflow-hidden flex-shrink-0 shadow-lg transform-gpu group cursor-pointer"
                  onClick={() => openLightbox(1, i % recentProjects[1].length)}
                >
                  <Image src={src} alt="Hariz Crane Project" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 280px, 450px" loading="lazy" />
                  <div className="absolute inset-0 bg-[#2a1c2f]/0 group-hover:bg-[#2a1c2f]/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                      <ArrowRight className="w-5 h-5 text-[#2a1c2f] rotate-[-45deg]" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      {lightboxOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#2a1c2f]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <motion.div 
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={allGalleryImages[lightboxIndex]} 
              alt={`Project ${lightboxIndex + 1}`} 
              fill 
              className="object-contain bg-black/50" 
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <p className="text-white font-black text-[13px] uppercase tracking-widest">
              {lightboxIndex + 1} / {allGalleryImages.length}
            </p>
          </div>
        </motion.div>
      )}

      {/* AREAS WE SERVICE */}
      <section ref={mapRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHoveringMap(true)} onMouseLeave={() => setIsHoveringMap(false)} className="relative py-12 md:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image src="/assets/Snazzy maps 2.svg" alt="Sydney Map Base" fill className="object-cover opacity-10 grayscale" priority />
          <motion.div className="absolute inset-0 z-10" initial={{ opacity: 0 }} animate={{ opacity: isHoveringMap ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ maskImage, WebkitMaskImage: maskImage, maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}>
            <Image src="/assets/Snazzy maps yellow.svg" alt="Sydney Map Yellow" fill className="object-cover" priority />
          </motion.div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="w-16 md:w-24 h-1 md:h-2 bg-amber-500 mb-4 md:mb-8" />
            <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 tracking-tight uppercase leading-[1.1] text-[#2a1c2f]">
              Sydney-Wide <br />
              <span className="text-amber-500">Crane Support</span>
            </h2>
            <div className="space-y-3 md:space-y-6 mb-6 md:mb-12">
              <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-100 shadow-sm">
                <p className="text-zinc-600 font-bold leading-relaxed text-sm md:text-base">Professional crane hire within hours. Fast response across Sydney & Regional NSW.</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-zinc-100 shadow-sm">
                <p className="text-zinc-600 font-bold leading-relaxed text-[13px] md:text-sm">Optimized for narrow street access. 100% safety compliance on every technical job.</p>
              </div>
            </div>
            <div className="hidden lg:flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
              <a href="#quote" className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-10 py-4.5 rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-xl active:scale-95 text-center min-h-[56px] flex items-center justify-center">Check Availability</a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-black text-[11px] uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Licensed & Insured
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:mt-24">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-zinc-100 max-w-lg mx-auto lg:ml-auto">
              <h3 className="text-base md:text-xl font-black mb-5 md:mb-10 tracking-tight uppercase text-[#2a1c2f]">Areas We Serve</h3>
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6">
                {areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 shrink-0" />
                    <span className="text-[10px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest text-zinc-600">{area}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-12 pt-5 md:pt-8 border-t border-zinc-100 text-center md:text-left">
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-zinc-400">
                  Call <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="text-amber-600">0469 798 247</a> for direct assistance.
                </p>
              </div>
            </div>

            {/* Mobile-only CTA below the card */}
            <div className="lg:hidden flex flex-col items-center gap-3 mt-6">
              <a href="#quote" className="w-full bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-10 py-4 rounded-xl text-[12px] uppercase tracking-widest transition-all shadow-xl active:scale-95 text-center min-h-[52px] flex items-center justify-center">Check Availability</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="relative py-16 md:py-24 bg-[#2a1c2f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
          <motion.span {...snappyEntrance} className="text-amber-400 font-black text-[13px] uppercase tracking-[0.3em] mb-3 md:mb-4 block text-center md:text-left">Our Reviews</motion.span>
          <motion.h2 {...snappyEntrance} className="text-2xl md:text-5xl font-black tracking-tight uppercase leading-[1.1] text-center md:text-left">
            Client <span className="text-amber-500">Feedback</span>
          </motion.h2>
          <motion.p {...snappyEntrance} transition={{ delay: 0.2 }} className="text-zinc-400 font-medium mt-4 text-[15px] md:text-base text-center md:text-left max-w-xl mx-auto md:mx-0">Trusted by Sydney builders and homeowners.</motion.p>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden relative">
          <motion.div className="flex gap-6 md:gap-8 px-4 will-change-transform" animate={{ x: [0, -2000] }} transition={{ repeat: Infinity, duration: isMobile ? 35 : 50, ease: "linear" }}>
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[300px] md:w-[400px] bg-[#35263b] p-5 md:p-6 rounded-2xl border border-white/5 flex flex-col flex-shrink-0 transform-gpu">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-[14px] md:text-base font-medium mb-5 leading-[1.6] italic whitespace-normal text-zinc-300">"{t.quote}"</p>
                
                {/* Job Image */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5">
                  <Image src={t.jobImg} alt="Completed job" fill className="object-cover object-center" sizes="(max-width: 768px) 280px, 380px" loading="lazy" />
                </div>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#45364b]">
                    <Image src={t.img} alt={t.name} fill className="object-cover opacity-50 grayscale" sizes="40px" loading="lazy" />
                  </div>
                  <div>
                    <p className="font-black text-[12px] uppercase tracking-wide">{t.name}</p>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.span {...snappyEntrance} className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-3 md:mb-4 block">FAQ</motion.span>
          <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black tracking-tight uppercase text-[#2a1c2f] mb-12">Question? <span className="text-amber-500">Look here.</span></motion.h2>
          <div className="space-y-4 text-left">
            {[
              { q: "What crane truck services do you provide?", a: "Crane hire, machinery transport, container moves, material deliveries, and urgent same-day services across Sydney and NSW." },
              { q: "Which areas in Sydney do you serve?", a: "Northern Beaches, North Shore, Eastern Suburbs, Inner West, Greater Sydney, Central Coast, Wollongong and Regional NSW." },
              { q: "Do you offer free quotes?", a: "Yes — we provide free quotes within 24 hours for every job request." },
              { q: "How quickly can you start a job?", a: "Often same-day or next-day depending on the job complexity and location." },
              { q: "Are you licensed and insured?", a: "Yes — fully licensed, insured, and compliant with all NSW safety standards." },
              { q: "Do you handle residential and commercial projects?", a: "Absolutely. We assist homeowners, builders, and businesses with projects of all sizes." }
            ].map((faq, i) => (
              <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.05 }} className="border border-zinc-100 rounded-2xl overflow-hidden group hover:border-amber-500/30 transition-colors">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-all">
                  <span className="font-bold text-base md:text-lg text-zinc-800 pr-6">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-100 transition-all ${activeFaq === i ? 'bg-[#2a1c2f] border-[#2a1c2f] rotate-180' : 'bg-white'}`}>
                    <ChevronDown className={`w-5 h-5 ${activeFaq === i ? 'text-white' : 'text-zinc-400'}`} />
                  </div>
                </button>
                {activeFaq === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 md:px-6 pb-6 text-zinc-500 text-[15px] md:text-base font-medium leading-relaxed">{faq.a}</motion.div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CONVERSION */}
      <section id="quote" ref={quoteRef} className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: isMobile ? 0 : -80, y: isMobile ? 80 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#2a1c2f] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-10 tracking-tight uppercase leading-none text-balance">Get Your Quote <br /><span className="text-amber-500">In 15 Mins.</span></h2>
              
              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase">Quote Request Sent!</h3>
                  <p className="text-zinc-400 mb-8">We&apos;ll get back to you within 15 minutes during business hours.</p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-8 py-4 rounded-xl transition-all uppercase tracking-widest"
                  >
                    Send Another Quote
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-4">
                  {formStatus === "error" && formError && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm font-semibold">
                      {formError}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Smith" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" 
                      required 
                      disabled={formStatus === "loading"}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Telephone *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        inputMode="tel" 
                        placeholder="0469 798 247" 
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" 
                        required 
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="email@provider.com" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" 
                        required 
                        disabled={formStatus === "loading"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Select Service</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, service: e.target.value }));
                        setSelectedService(e.target.value);
                      }}
                      className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold appearance-none"
                      disabled={formStatus === "loading"}
                    >
                      <option>Crane Hire</option>
                      <option>Machinery Transport</option>
                      <option>Container Relocation</option>
                      <option>Material Delivery</option>
                      <option>Urgent Lift</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Message</label>
                    <textarea 
                      name="message"
                      placeholder="Lift weight, dimensions, location..." 
                      rows={3} 
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold resize-none"
                      disabled={formStatus === "loading"}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus === "loading"}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-[#2a1c2f] font-black text-lg md:text-xl py-5 md:py-6 rounded-xl transition-all shadow-lg active:scale-95 disabled:active:scale-100 uppercase tracking-widest mt-4 min-h-[56px] flex items-center justify-center gap-3"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Request Free Quote"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          <motion.div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left" initial={{ opacity: 0, x: isMobile ? 0 : 80, y: isMobile ? 80 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            <span className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block">Speak With Us</span>
            <h3 className="text-2xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight uppercase leading-[1.1] text-[#2a1c2f]">Call Us <br className="hidden md:block" /> Directly.</h3>
            <p className="text-zinc-500 text-[15px] md:text-xl font-medium mb-10 md:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">Direct owner contact. <br className="md:hidden" /> Clear timelines, upfront pricing, and reliable service.</p>
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="text-[#2a1c2f] font-black text-3xl md:text-6xl hover:text-amber-500 transition-all tracking-tighter mb-10 md:mb-12 block">0469 798 247</a>
            <div className="space-y-4 text-[#2a1c2f] flex flex-col items-center lg:items-start mb-8">
              {["Free Quotes within 24 Hours", "Fully Licensed & Insured", "Available 24/7 for Emergencies"].map((t, i) => (
                <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-16 md:py-24 bg-[#2a1c2f] text-white border-t border-white/5 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <Image src="/assets/Logo.png" alt="Hariz" width={220} height={120} className="mb-8 brightness-0 invert opacity-90 h-auto w-[200px] md:w-[240px]" />
              <div className="relative w-full max-w-sm mb-8">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-amber-500 transition-colors text-sm"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-white text-[#2a1c2f] px-6 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 transition-colors">
                  Send
                </button>
              </div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61581433108075" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-amber-500 hover:text-[#2a1c2f] border border-white/10 rounded-full flex items-center justify-center transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/harizcranetrucks/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-amber-500 hover:text-[#2a1c2f] border border-white/10 rounded-full flex items-center justify-center transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3 text-center md:text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Our Services</h4>
              <ul className="space-y-4">
                {[
                  { name: "Crane Hire", slug: "crane-hire" },
                  { name: "Machinery Transport", slug: "machinery-transport" },
                  { name: "Container Moves", slug: "container-relocation" },
                  { name: "Material Delivery", slug: "material-delivery" },
                  { name: "Heavy Loads", slug: "heavy-loads" },
                  { name: "Site Lifting", slug: "crane-hire" },
                  { name: "Urgent Lifts", slug: "urgent-lift" }
                ].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={`/?service=${link.slug}#quote`}
                      className="group flex items-center justify-center md:justify-start gap-3 text-zinc-400 hover:text-white transition-colors text-[13px] font-bold"
                    >
                      <ChevronIcon className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Our Company</h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Services", href: "/services" },
                  { name: "Contact Us", href: "#quote" }
                ].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="group flex items-center justify-center md:justify-start gap-3 text-zinc-400 hover:text-white transition-colors text-[13px] font-bold"
                    >
                      <ChevronIcon className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3 text-center md:text-left">
              <a href="#quote" className="inline-block bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-10 py-5 rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-xl active:scale-95 mb-10 w-full md:w-auto">
                Contact Us
              </a>
              <div className="space-y-6">
                <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="flex items-center justify-center md:justify-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-[#2a1c2f] transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-black transition-colors group-hover:text-amber-500">0469 798 247</span>
                </a>
                <a href="mailto:info@harizcranetrucks.com.au" className="flex items-center justify-center md:justify-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-[#2a1c2f] transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-400 hover:text-white transition-colors font-bold text-sm truncate">info@harizcranetrucks.com.au</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/5 mb-10" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
            <p>Since 2022</p>
            <p className="text-center">Copyright © 2026 Hariz Crane Trucks | All Rights Reserved</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BAR */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex gap-2.5">
        <a href="#quote" className="flex-[1.6] bg-amber-500 text-[#2a1c2f] font-black py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-2xl uppercase text-[12px] tracking-widest min-h-[52px]"><ArrowRight className="w-4 h-4" /> Get Quote</a>
        <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="flex-1 bg-[#2a1c2f] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-2xl uppercase text-[11px] tracking-widest min-h-[52px] border border-white/10"><Phone className="w-4 h-4" /> Call</a>
      </div>
    </div>
  );
}
