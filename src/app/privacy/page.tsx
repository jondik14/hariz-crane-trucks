"use client";

import Image from "next/image";
import { Phone, Mail, Facebook, Instagram, X, Menu, ChevronRight as ChevronIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (mobileNavOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const onResize = () => { if (window.innerWidth >= 768) setMobileNavOpen(false); };
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = ""; window.removeEventListener("resize", onResize); };
  }, [mobileNavOpen]);

  const trackCallClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", { phone_number: "0469798247" });
    }
  };

  const sectionTitle = "text-xl md:text-2xl font-black text-[#2a1c2f] mb-4 pb-2 border-b-2 border-amber-500/30";
  const subsectionTitle = "text-base md:text-lg font-black text-[#2a1c2f] mt-8 mb-2";
  const body = "text-zinc-600 leading-relaxed mb-5";
  const list = "list-disc pl-6 space-y-2 text-zinc-600 mb-5";

  return (
    <div className="min-h-screen bg-white text-[#2a1c2f] font-sans selection:bg-amber-100 selection:text-[#2a1c2f]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-24 md:h-28 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-12">
            <a href="/" className="transition-transform hover:scale-[1.02]" onClick={() => setMobileNavOpen(false)}>
              <Image src="/assets/Logo.png" alt="Hariz Crane Trucks" width={200} height={116} className="w-[160px] md:w-[200px] h-auto object-contain" priority />
            </a>
            <nav className="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              <a href="/about" className="hover:text-[#2a1c2f] transition-colors">About</a>
              <a href="/services" className="hover:text-[#2a1c2f] transition-colors">Services</a>
              <a href="/#quote" className="hover:text-[#2a1c2f] transition-colors">Contact</a>
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
            <a href="/#quote" className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-5 md:px-8 py-3 md:py-4 rounded-xl text-[10px] md:text-[11px] transition-all shadow-md active:scale-95 uppercase tracking-widest shrink-0">
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
            <a href="/#quote" onClick={() => setMobileNavOpen(false)} className="py-4 font-black text-[#2a1c2f] text-base uppercase tracking-wide hover:text-amber-500 transition-colors border-b border-zinc-100">Contact</a>
          </nav>
          <div className="mt-auto p-6 pt-4 space-y-4 border-t border-zinc-100">
            <a href="tel:0469798247" onClick={() => { trackCallClick(); setMobileNavOpen(false); }} suppressHydrationWarning className="flex items-center gap-3 text-[#2a1c2f] font-black hover:text-amber-500 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center"><Phone className="w-4 h-4 text-zinc-600" /></div>
              <span>0469 798 247</span>
            </a>
            <a href="/#quote" onClick={() => setMobileNavOpen(false)} className="block w-full bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black py-4 rounded-xl text-[12px] uppercase tracking-widest text-center transition-all active:scale-[0.98]">Get Quote</a>
          </div>
        </motion.div>
      </motion.div>

      {/* HERO */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-[#2a1c2f] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-amber-400 font-black text-[11px] uppercase tracking-widest">Last updated: July 2025</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className={body}>
            At Hariz Crane Trucks, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with us through our website, enquiry forms, or advertising platforms such as Facebook and Instagram. We are committed to transparency, security, and respect for your rights.
          </p>

          <h2 className={sectionTitle}>1. Introduction</h2>
          <p className={body}>
            Hariz Crane Trucks is a locally owned and operated business providing crane truck hire, machinery transport, container moves, material deliveries, heavy load lifting, and urgent same-day services across Northern Sydney, Greater Sydney, and regional NSW. In the course of providing our services, we may collect personal information from clients, prospects, and website visitors. This Privacy Policy outlines our commitment to safeguarding that information.
          </p>

          <h2 className={sectionTitle}>2. Information We Collect</h2>

          <h3 className={subsectionTitle}>2.1 Personal Details</h3>
          <ul className={list}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Job location (suburb or site address)</li>
            <li>Preferred contact method</li>
          </ul>

          <h3 className={subsectionTitle}>2.2 Service Information</h3>
          <ul className={list}>
            <li>Type of lifting or transport service required</li>
            <li>Container size or load type</li>
            <li>Urgency of job or preferred timeline</li>
            <li>Additional notes submitted through our forms</li>
          </ul>

          <h3 className={subsectionTitle}>2.3 Technical & Usage Data</h3>
          <ul className={list}>
            <li>IP address</li>
            <li>Device type and browser</li>
            <li>Pages visited on our website</li>
            <li>Referral source (e.g. Google search or Facebook ad)</li>
          </ul>

          <h3 className={subsectionTitle}>2.4 Meta Lead Ads Submissions</h3>
          <p className={body}>
            When you submit a form through Facebook or Instagram, we collect the pre-filled and user-submitted details, including your name, contact information, and job requirements.
          </p>

          <h2 className={sectionTitle}>3. How We Use Your Information</h2>
          <p className="text-zinc-600 mb-2">We use your data to:</p>
          <ul className={list}>
            <li>Respond to enquiries and provide free quotes</li>
            <li>Schedule jobs, lifts, and deliveries</li>
            <li>Send service updates, offers, or follow-ups (only if you&apos;ve opted in)</li>
            <li>Improve our services, website, and ad performance</li>
            <li>Meet legal or compliance requirements</li>
          </ul>
          <p className={`${body} font-semibold text-[#2a1c2f]`}>We do not sell or rent your personal data to third parties.</p>

          <h2 className={sectionTitle}>4. Legal Basis for Processing</h2>
          <p className="text-zinc-600 mb-2">We process your data under the following legal bases:</p>
          <ul className={list}>
            <li><strong>Consent</strong> — when you voluntarily submit your information</li>
            <li><strong>Contract</strong> — when details are needed to complete booked services</li>
            <li><strong>Legitimate Interest</strong> — to improve customer service and marketing</li>
            <li><strong>Legal Obligation</strong> — where we must retain data for compliance</li>
          </ul>

          <h2 className={sectionTitle}>5. Data Sharing & Disclosure</h2>
          <p className="text-zinc-600 mb-2">Your information may be shared only with:</p>
          <ul className={list}>
            <li>Hariz Crane Trucks staff involved in quoting or service delivery</li>
            <li>Trusted third-party services (e.g. Google, Meta, CRM platforms)</li>
            <li>Website, analytics, and marketing providers acting on our behalf</li>
          </ul>
          <p className={`${body} font-semibold text-[#2a1c2f]`}>We do not share your data with unrelated third parties for external marketing.</p>

          <h2 className={sectionTitle}>6. Data Security</h2>
          <p className="text-zinc-600 mb-2">We protect your data through:</p>
          <ul className={list}>
            <li>Encrypted website (HTTPS)</li>
            <li>Secure form submissions</li>
            <li>Password-protected internal systems</li>
            <li>Limited access to authorised personnel only</li>
          </ul>
          <p className={body}>If a data breach occurs, we will notify affected users and authorities as required.</p>

          <h2 className={sectionTitle}>7. Your Rights & Choices</h2>
          <p className="text-zinc-600 mb-2">You have the right to:</p>
          <ul className={list}>
            <li>Access the personal data we hold about you</li>
            <li>Correct or update inaccurate information</li>
            <li>Request deletion of your data (where legally permitted)</li>
            <li>Withdraw consent to communications at any time</li>
            <li>File a complaint with the OAIC or other regulator if necessary</li>
          </ul>
          <p className={body}>To exercise your rights, please contact us using the information below.</p>

          <h2 className={sectionTitle}>8. Cookies & Tracking Technologies</h2>
          <p className="text-zinc-600 mb-2">We use cookies and tools like Facebook Pixel and Google Analytics to:</p>
          <ul className={list}>
            <li>Analyse visitor behaviour</li>
            <li>Improve website performance</li>
            <li>Measure and enhance advertising effectiveness</li>
          </ul>
          <p className={`${body} font-semibold text-[#2a1c2f]`}>You can disable cookies through your browser settings at any time.</p>

          <h2 className={sectionTitle}>9. Third-Party Services</h2>
          <p className={body}>
            When you interact with Hariz Crane Trucks through third-party platforms, their privacy policies also apply. We recommend reviewing the <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:text-amber-500 underline">Meta Privacy Policy</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:text-amber-500 underline">Google Privacy Policy</a>.
          </p>

          <h2 className={sectionTitle}>10. Changes to This Policy</h2>
          <p className={body}>
            This Privacy Policy may be updated from time to time. The latest version will always be available at <a href="/privacy" className="text-amber-600 font-bold hover:text-amber-500 underline">harizcranetrucks.com.au/privacy</a>. Use of our services after updates indicates your acceptance of the new policy.
          </p>

          <h2 className={sectionTitle}>11. Contact Us</h2>
          <p className="body mb-4">For any questions, concerns, or privacy requests, please contact:</p>
          <ul className="space-y-2 text-zinc-600">
            <li><strong className="text-[#2a1c2f]">Email:</strong> <a href="mailto:info@harizcranetrucks.com.au" className="text-amber-600 font-bold hover:text-amber-500">info@harizcranetrucks.com.au</a></li>
            <li><strong className="text-[#2a1c2f]">Phone:</strong> <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="text-amber-600 font-bold hover:text-amber-500">0469 798 247</a></li>
            <li><strong className="text-[#2a1c2f]">Website:</strong> <a href="https://harizcranetrucks.com.au" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:text-amber-500">harizcranetrucks.com.au</a></li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 md:py-24 bg-[#2a1c2f] text-white border-t border-white/5 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-16 mb-10 md:mb-16">
            <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <Image src="/assets/Logo.png" alt="Hariz" width={220} height={120} className="mb-8 brightness-0 invert opacity-90 h-auto w-[200px] md:w-[240px]" />
              <div className="relative w-full max-w-sm mb-8">
                <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-amber-500 transition-colors text-sm" />
                <button type="button" className="absolute right-2 top-2 bottom-2 bg-white text-[#2a1c2f] px-6 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 transition-colors">Send</button>
              </div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61581433108075" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-amber-500 hover:text-[#2a1c2f] border border-white/10 rounded-full flex items-center justify-center transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.instagram.com/harizcranetrucks/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-amber-500 hover:text-[#2a1c2f] border border-white/10 rounded-full flex items-center justify-center transition-all"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="lg:col-span-3 text-center md:text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Our Services</h4>
              <ul className="space-y-4">
                {[{ name: "Crane Hire", slug: "crane-hire" }, { name: "Machinery Transport", slug: "machinery-transport" }, { name: "Container Moves", slug: "container-relocation" }, { name: "Material Delivery", slug: "material-delivery" }, { name: "Heavy Loads", slug: "heavy-loads" }, { name: "Site Lifting", slug: "crane-hire" }, { name: "Urgent Lifts", slug: "urgent-lift" }].map((link, i) => (
                  <li key={i}><a href="/services" className="group flex items-center justify-center md:justify-start gap-3 text-zinc-400 hover:text-white transition-colors text-[13px] font-bold"><ChevronIcon className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />{link.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Our Company</h4>
              <ul className="space-y-4">
                {[{ name: "About Us", href: "/about" }, { name: "Our Services", href: "/services" }, { name: "Contact Us", href: "/#quote" }].map((link, i) => (
                  <li key={i}><a href={link.href} className="group flex items-center justify-center md:justify-start gap-3 text-zinc-400 hover:text-white transition-colors text-[13px] font-bold"><ChevronIcon className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />{link.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3 text-center md:text-left">
              <a href="/#quote" className="inline-block bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-10 py-5 rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-xl active:scale-95 mb-10 w-full md:w-auto">Contact Us</a>
              <div className="space-y-6">
                <a href="tel:0469798247" onClick={trackCallClick} suppressHydrationWarning className="flex items-center justify-center md:justify-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-[#2a1c2f] transition-all"><Phone className="w-4 h-4" /></div>
                  <span className="text-xl font-black transition-colors group-hover:text-amber-500">0469 798 247</span>
                </a>
                <a href="mailto:info@harizcranetrucks.com.au" className="flex items-center justify-center md:justify-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-[#2a1c2f] transition-all"><Mail className="w-4 h-4" /></div>
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
        <a href="/#quote" className="flex-1 bg-amber-400 text-[#2a1c2f] font-black py-4.5 rounded-xl flex items-center justify-center shadow-2xl uppercase text-[11px] tracking-widest min-h-[56px]">Quote</a>
      </div>
    </div>
  );
}
