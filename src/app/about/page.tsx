"use client";

import Image from "next/image";
import { 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Users, 
  Truck, 
  HardHat, 
  ClipboardCheck,
  Building2,
  Home,
  Hammer,
  Facebook,
  Instagram,
  Mail,
  ChevronRight as ChevronIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const galleryImages = [
    "/assets/gallery/gallery-1.webp",
    "/assets/gallery/gallery-2.webp",
    "/assets/gallery/gallery-3.webp",
    "/assets/gallery/gallery-4.webp",
    "/assets/gallery/gallery-6.webp",
    "/assets/gallery/gallery-7.webp"
  ];

  return (
    <div className="min-h-screen bg-white text-[#2a1c2f] font-sans selection:bg-amber-100 selection:text-[#2a1c2f]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-24 md:h-28 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="transition-transform hover:scale-[1.02]">
              <Image src="/assets/Logo.png" alt="Hariz Transport" width={200} height={116} className="w-[160px] md:w-[200px] h-auto object-contain" priority />
            </a>
            <nav className="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              <a href="/about" className="text-[#2a1c2f]">About</a>
              <a href="/services" className="hover:text-[#2a1c2f] transition-colors">Services</a>
              <a href="/#quote" className="hover:text-[#2a1c2f] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="hidden lg:flex items-center gap-4 text-[#2a1c2f] font-black hover:text-amber-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-zinc-600" />
              </div>
              <span className="text-lg">0469 798 247</span>
            </a>
            <a href="/#quote" className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-[11px] transition-all shadow-md active:scale-95 uppercase tracking-widest">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 bg-[#2a1c2f] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/contsurciton gravel 2.webp" alt="Background" fill className="object-cover" priority />
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
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-amber-400 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block">About Hariz Crane Trucks</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-7xl font-black mb-8 md:mb-10 tracking-tight uppercase leading-none max-w-4xl text-balance">
            Sydney-Based Crane Truck Hire. <span className="text-amber-500 text-nowrap">Locally Operated.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-zinc-300 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
            We provide owner-operated crane truck services across Sydney, focusing on safe, reliable lifts for residential and light commercial projects.
          </motion.p>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="py-12 md:py-16 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, label: "Protection", value: "Fully Insured" },
            { icon: <ClipboardCheck className="w-6 h-6" />, label: "Compliance", value: "Licensed Operators" },
            { icon: <MapPin className="w-6 h-6" />, label: "Service Area", value: "Sydney & Regional NSW" }
          ].map((stat, i) => (
            <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-zinc-50 border border-zinc-100">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex-shrink-0 flex items-center justify-center text-amber-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-lg md:text-xl font-black text-[#2a1c2f] leading-tight">{stat.value}</p>
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="lg:col-span-6">
            <motion.span {...snappyEntrance} className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block">Our Process</motion.span>
            <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black mb-8 md:mb-10 tracking-tight uppercase text-[#2a1c2f] leading-none text-balance">Grounded in Safety and Clear Communication.</motion.h2>
            <motion.div {...snappyEntrance} transition={{ delay: 0.2 }} className="space-y-6 text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
              <p>We approach every job with a practical mindset. As a small team, we take the time to understand the requirements of your lift before we arrive on site.</p>
              <div className="space-y-4 pt-4">
                {[
                  { title: "Site Checks", desc: "We review access and ground conditions to ensure a safe setup." },
                  { title: "Job Planning", desc: "Clear coordination with you regarding timelines and placement." },
                  { title: "Property Respect", desc: "We treat your jobsite and materials with professional care." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-amber-500" />
                    <div>
                      <span className="font-black text-[#2a1c2f] uppercase text-[13px] tracking-wide block mb-1">{item.title}</span>
                      <p className="text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div {...snappyEntrance} transition={{ delay: 0.3 }} className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <Image src="/assets/services moving car.webp" alt="Planning a lift" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
        </div>
      </section>

      {/* SAFETY & COMPLIANCE */}
      <section className="py-20 md:py-32 bg-[#2a1c2f] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.span {...snappyEntrance} className="text-amber-400 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block">Compliance</motion.span>
            <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black mb-8 tracking-tight uppercase leading-none">Safety Without Compromise.</motion.h2>
            <motion.p {...snappyEntrance} transition={{ delay: 0.2 }} className="text-zinc-400 text-base md:text-lg font-medium mb-12 leading-relaxed">
              Safety isn't just a checkbox for us; it's how we operate. We follow all NSW safety standards to ensure every lift is completed without incident.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fully Insured", desc: "Public liability and goods in transit insurance for your peace of mind." },
              { title: "Certified Gear", desc: "Our crane and truck undergo regular maintenance and inspections." },
              { title: "Licensed Team", desc: "All operators are fully licensed and trained for technical lifts." }
            ].map((item, i) => (
              <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-black mb-3 uppercase text-amber-500">{item.title}</h3>
                <p className="text-sm md:text-base text-zinc-400 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span {...snappyEntrance} className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block">Our Clients</motion.span>
            <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black tracking-tight uppercase text-[#2a1c2f]">Supporting Local Trades</motion.h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Building2 className="w-6 h-6" />, name: "Builders" },
              { icon: <Hammer className="w-6 h-6" />, name: "Roofers" },
              { icon: <Home className="w-6 h-6" />, name: "Homeowners" },
              { icon: <Truck className="w-6 h-6" />, name: "Logistics" }
            ].map((client, i) => (
              <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 text-center flex flex-col items-center gap-4">
                <div className="text-amber-600">{client.icon}</div>
                <span className="font-black text-[13px] uppercase tracking-widest text-[#2a1c2f]">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-20 md:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.span {...snappyEntrance} className="text-amber-600 font-black text-[13px] uppercase tracking-[0.3em] mb-4 block text-center md:text-left">Gallery</motion.span>
          <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-black tracking-tight uppercase text-[#2a1c2f] text-center md:text-left">Real Jobs. <span className="text-amber-500">Real Results.</span></motion.h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((src, i) => (
            <motion.div key={i} {...snappyEntrance} transition={{ delay: i * 0.05 }} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image src={src} alt="Crane Truck Job" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...snappyEntrance} className="inline-flex items-center gap-3 bg-zinc-100 px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[#2a1c2f] font-black text-[11px] uppercase tracking-[0.2em]">Contact Us</span>
          </motion.div>
          <motion.h2 {...snappyEntrance} transition={{ delay: 0.1 }} className="text-3xl md:text-6xl font-black mb-8 tracking-tight uppercase text-[#2a1c2f] leading-tight text-balance">
            Talk Through Your Next Job With Us.
          </motion.h2>
          <motion.p {...snappyEntrance} transition={{ delay: 0.2 }} className="text-zinc-500 text-base md:text-xl font-medium mb-12 leading-relaxed">
            We provide fast responses and clear communication for every project. Call us directly to discuss your requirements.
          </motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="w-full md:w-auto bg-[#2a1c2f] hover:bg-amber-500 hover:text-[#2a1c2f] text-white font-black px-10 py-5 rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4">
              <Phone className="w-4 h-4" /> 0469 798 247
            </a>
            <a href="/#quote" className="w-full md:w-auto border-2 border-[#2a1c2f] hover:bg-zinc-50 text-[#2a1c2f] font-black px-10 py-5 rounded-xl text-[13px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-4">
              Online Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                  { name: "Contact Us", href: "/#quote" }
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
              <a href="/#quote" className="inline-block bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-10 py-5 rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-xl active:scale-95 mb-10 w-full md:w-auto">
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
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 flex gap-3">
        <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="flex-[1.5] bg-[#2a1c2f] text-white font-black py-4.5 rounded-xl flex items-center justify-center gap-3 shadow-2xl uppercase text-[11px] tracking-widest min-h-[56px] border border-white/10 backdrop-blur-xl"><Phone className="w-4 h-4" /> Call Now</a>
        <a href="/#quote" className="flex-1 bg-amber-400 text-[#2a1c2f] font-black py-4.5 rounded-xl flex items-center justify-center shadow-2xl uppercase text-[11px] tracking-widest min-h-[56px]">Quote</a>
      </div>
    </div>
  );
}
