"use client";

import Image from "next/image";
import { Phone, Check, CheckCircle2, ShieldCheck, ArrowRight, Zap, Truck, Box, Construction, Wrench, Weight, MapPin, Facebook, Instagram, Mail, X, Menu, ChevronRight as ChevronIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Custom SVG Icons
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

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "Crane Hire", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [selectedService, setSelectedService] = useState("Crane Hire");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (mobileNavOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const onResize = () => { if (window.innerWidth >= 768) setMobileNavOpen(false); };
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = ""; window.removeEventListener("resize", onResize); };
  }, [mobileNavOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError("Please fill in all required fields.");
      setFormStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    setFormError("");
    try {
      const response = await fetch("https://formspree.io/f/xvzzozye", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: formData.name, phone: formData.phone, email: formData.email, _replyto: formData.email, service: formData.service, message: formData.message })
      });
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", phone: "", email: "", service: "Crane Hire", message: "" });
        setSelectedService("Crane Hire");
        if (typeof window !== "undefined" && window.gtag) window.gtag("event", "quote_submit", { service_type: formData.service });
      } else {
        const data = await response.json().catch(() => ({}));
        setFormError(data.error || "Something went wrong. Please try again.");
        setFormStatus("error");
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setFormStatus("error");
    }
  };

  // GA4 call click tracking
  const trackCallClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", {
        phone_number: "0469798247"
      });
    }
  };

  const snappyEntrance = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-48px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const services = [
    { 
      icon: <CraneIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Crane Hire", 
      desc: "Reliable lifting for residential and commercial construction. Safe, secure, and always on time.",
      img: "/assets/IMG_9443.webp",
      tags: ["Sydney CBD", "Construction", "Narrow Access"],
      slug: "crane-hire"
    },
    { 
      icon: <TransportIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Machinery Transport", 
      desc: "Specialist plant and machinery transport. Balanced, secured, and delivered on schedule.",
      img: "/assets/IMG_1795-scaled1767683885.webp",
      tags: ["Machinery", "Plant", "Secure Load"],
      slug: "machinery-transport"
    },
    { 
      icon: <ContainerIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Container Moves", 
      desc: "Fast lifting and relocation support. Precise placement with skilled operator control.",
      img: "/assets/IMG_1837-scaled1767683884.webp",
      tags: ["Containers", "Relocation", "20ft/40ft"],
      slug: "container-relocation"
    },
    { 
      icon: <MaterialIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Material Delivery", 
      desc: "Onsite delivery of steel, timber, frames and trusses. Efficient unloading and placement.",
      img: "/assets/IMG_8938.webp",
      tags: ["Steel", "Timber", "Onsite"],
      slug: "material-delivery"
    },
    { 
      icon: <HeavyIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Heavy Loads", 
      desc: "Oversized and heavy loads transported with care. Route checks and insured delivery.",
      img: "/assets/IMG_9433.webp",
      tags: ["Oversized", "Insured", "Escort Ready"],
      slug: "crane-hire"
    },
    { 
      icon: <UrgentIcon className="w-8 h-8 md:w-10 md:h-10" />, 
      title: "Urgent Lifts", 
      desc: "Same-day urgent crane hire for critical projects. Rapid response 24/7 assistance.",
      img: "/assets/21767683883.webp",
      tags: ["24/7", "Emergency", "Same Day"],
      slug: "urgent-lift"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#2a1c2f] font-sans selection:bg-amber-100 selection:text-[#2a1c2f]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-24 md:h-28 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-12">
            <a href="/" className="transition-transform hover:scale-[1.02]" onClick={() => setMobileNavOpen(false)}>
              <Image src="/assets/Logo.png" alt="Hariz Transport" width={200} height={116} className="w-[160px] md:w-[200px] h-auto object-contain" priority />
            </a>
            <nav className="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              <a href="/about" className="hover:text-[#2a1c2f] transition-colors">About</a>
              <a href="/services" className="text-[#2a1c2f]">Services</a>
              <a href="#quote" className="hover:text-[#2a1c2f] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="hidden lg:flex items-center gap-4 text-[#2a1c2f] font-black hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-zinc-600" />
              </div>
              <span className="text-lg">0469 798 247</span>
            </a>
            <button type="button" aria-label="Open menu" onClick={() => setMobileNavOpen(true)} className="md:hidden w-11 h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-[#2a1c2f] transition-colors shrink-0">
              <Menu className="w-5 h-5" />
            </button>
            <a href="#quote" className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-5 md:px-8 py-3 md:py-4 rounded-xl text-[10px] md:text-[11px] transition-all shadow-md active:scale-95 uppercase tracking-widest shrink-0">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <motion.div initial={false} animate={mobileNavOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] md:hidden">
        <div className="absolute inset-0 bg-[#2a1c2f]/90 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
        <motion.div initial={false} animate={mobileNavOpen ? { x: 0 } : { x: "100%" }} transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="absolute top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-zinc-100">
            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-400">Menu</span>
            <button type="button" aria-label="Close menu" onClick={() => setMobileNavOpen(false)} className="w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-[#2a1c2f] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1">
            <a href="/about" onClick={() => setMobileNavOpen(false)} className="py-4 font-black text-[#2a1c2f] text-base uppercase tracking-wide hover:text-amber-500 transition-colors border-b border-zinc-100">About</a>
            <a href="/services" onClick={() => setMobileNavOpen(false)} className="py-4 font-black text-[#2a1c2f] text-base uppercase tracking-wide hover:text-amber-500 transition-colors border-b border-zinc-100">Services</a>
            <a href="#quote" onClick={() => setMobileNavOpen(false)} className="py-4 font-black text-[#2a1c2f] text-base uppercase tracking-wide hover:text-amber-500 transition-colors border-b border-zinc-100">Contact</a>
          </nav>
          <div className="mt-auto p-6 pt-4 space-y-4 border-t border-zinc-100">
            <a href="tel:0469798247" onClick={() => { trackCallClick(); setMobileNavOpen(false); }} suppressHydrationWarning className="flex items-center gap-3 text-[#2a1c2f] font-black hover:text-amber-500 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center"><Phone className="w-4 h-4 text-zinc-600" /></div>
              <span>0469 798 247</span>
            </a>
            <a href="#quote" onClick={() => setMobileNavOpen(false)} className="block w-full bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black py-4 rounded-xl text-[12px] uppercase tracking-widest text-center transition-all active:scale-[0.98]">Get Quote</a>
          </div>
        </motion.div>
      </motion.div>

      <main>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-14 md:pt-56 md:pb-32 bg-[#2a1c2f] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/IMG_9212.webp" alt="Services Background" fill className="object-cover grayscale" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[#2a1c2f]/85" />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-amber-400 font-black text-[13px] uppercase tracking-[0.3em] mb-3 block">Our Services</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-7xl font-black mb-5 md:mb-10 tracking-tight uppercase leading-none max-w-4xl text-balance">
            Crane Truck Hire <span className="text-amber-500">& Transport.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-zinc-300 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
            Locally operated service for machinery transport, container moves, and residential lifts across Sydney.
          </motion.p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12">
          {services.map((s, i) => (
            <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.1 }} className="group flex flex-col h-full border border-zinc-100 rounded-[2rem] overflow-hidden hover:border-amber-400/50 hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-[#2a1c2f] shadow-xl group-hover:bg-amber-400 transition-colors">
                  {s.icon}
                </div>
              </div>
              <div className="p-5 md:p-10 flex flex-col flex-grow bg-white">
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight uppercase">{s.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed mb-5 md:mb-8 flex-grow">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5 md:mb-8">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-200">{tag}</span>
                  ))}
                </div>
                <a href="#quote" className="inline-flex items-center gap-3 border-2 border-[#2a1c2f] text-[#2a1c2f] hover:bg-[#2a1c2f] hover:text-white font-black uppercase tracking-widest text-[11px] px-5 py-3 rounded-xl transition-all group-hover:gap-5">
                  Book Service <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GET YOUR QUOTE IN 15 MINS */}
      <section id="quote" className="py-12 md:py-24 bg-zinc-50 border-t border-zinc-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: isMobile ? 0 : -80, y: isMobile ? 80 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#2a1c2f] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 tracking-tight uppercase leading-none text-balance">Get Your Quote <br /><span className="text-amber-500">In 15 Mins.</span></h2>

              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase">Quote Request Sent!</h3>
                  <p className="text-zinc-400 mb-8">We&apos;ll get back to you within 15 minutes during business hours.</p>
                  <button type="button" onClick={() => setFormStatus("idle")} className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-8 py-4 rounded-xl transition-all uppercase tracking-widest">Send Another Quote</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-4">
                  {formStatus === "error" && formError && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm font-semibold">{formError}</div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Full Name *</label>
                    <input type="text" name="name" placeholder="John Smith" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" required disabled={formStatus === "loading"} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Telephone *</label>
                      <input type="tel" name="phone" inputMode="tel" placeholder="0469 798 247" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" required disabled={formStatus === "loading"} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Email *</label>
                      <input type="email" name="email" placeholder="email@provider.com" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold" required disabled={formStatus === "loading"} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Select Service</label>
                    <select name="service" value={formData.service} onChange={(e) => { setFormData(prev => ({ ...prev, service: e.target.value })); setSelectedService(e.target.value); }} className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold appearance-none" disabled={formStatus === "loading"}>
                      <option>Crane Hire</option>
                      <option>Machinery Transport</option>
                      <option>Container Relocation</option>
                      <option>Material Delivery</option>
                      <option>Urgent Lift</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-amber-500/80 ml-1">Message</label>
                    <textarea name="message" placeholder="Lift weight, dimensions, location..." rows={3} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} className="w-full px-6 py-4.5 bg-[#35263b] border border-white/5 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all font-semibold resize-none" disabled={formStatus === "loading"} />
                  </div>
                  <button type="submit" disabled={formStatus === "loading"} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-[#2a1c2f] font-black text-lg md:text-xl py-5 md:py-6 rounded-xl transition-all shadow-lg active:scale-95 disabled:active:scale-100 uppercase tracking-widest mt-4 min-h-[56px] flex items-center justify-center gap-3">
                    {formStatus === "loading" ? (<><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> Sending...</>) : "Request Free Quote"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          <motion.div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left" initial={{ opacity: 0, x: isMobile ? 0 : 80, y: isMobile ? 80 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
            <span className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-3 block">Speak With Us</span>
            <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 tracking-tight uppercase leading-[1.1] text-[#2a1c2f]">Call Us <br className="hidden md:block" /> Directly.</h3>
            <p className="text-zinc-500 text-[15px] md:text-xl font-medium mb-6 md:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">Direct owner contact. <br className="md:hidden" /> Clear timelines, upfront pricing, and reliable service.</p>
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="text-[#2a1c2f] font-black text-3xl md:text-6xl hover:text-amber-500 transition-all tracking-tighter mb-6 md:mb-12 block">0469 798 247</a>
            <div className="space-y-3 md:space-y-4 text-[#2a1c2f] flex flex-col items-center lg:items-start mb-6 md:mb-8">
              {["Free Quotes within 24 Hours", "Fully Licensed & Insured", "Available 24/7 for Emergencies"].map((t, i) => (
                <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 md:py-24 bg-[#2a1c2f] text-white border-t border-white/5 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-16 mb-10 md:mb-16">
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
                      href="/services"
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
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BAR */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 flex gap-3">
        <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="flex-[1.5] bg-[#2a1c2f] text-white font-black py-4.5 rounded-xl flex items-center justify-center gap-3 shadow-2xl uppercase text-[11px] tracking-widest min-h-[56px] border border-white/10 backdrop-blur-xl"><Phone className="w-4 h-4" /> Call Now</a>
        <a href="#quote" className="flex-1 bg-amber-400 text-[#2a1c2f] font-black py-4.5 rounded-xl flex items-center justify-center shadow-2xl uppercase text-[11px] tracking-widest min-h-[56px]">Quote</a>
      </div>
    </div>
  );
}
