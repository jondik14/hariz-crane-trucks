import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorLogger } from "@/components/ErrorLogger";

export const metadata: Metadata = {
  title: "Hariz Transport | Crane Trucks & Heavy Haulage",
  description: "Professional crane truck hire and heavy transport services across Sydney. Fully licensed, insured, and locally operated.",
  keywords: ["crane truck hire", "Sydney", "heavy haulage", "crane hire", "machinery transport", "container moves"],
  icons: {
    icon: "/assets/hariz favicon.svg?v=2",
  },
  verification: {
    google: "enZNLQIQbyFDDFklMLRhcACTjVgC-Dg6hbizvK9ME1s",
  },
  other: {
    "format-detection": "telephone=no",
  },
  openGraph: {
    title: "Hariz Transport | Crane Trucks & Heavy Haulage",
    description: "Professional crane truck hire and heavy transport services across Sydney.",
    url: "https://harizcranetrucks.com.au",
    siteName: "Hariz Crane Trucks",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload LCP image for faster loading */}
        <link
          rel="preload"
          href="/assets/IMG_9208.webp"
          as="image"
          fetchPriority="high"
        />
        {/* Preload 3D model for faster loading - high priority */}
        <link
          rel="preload"
          href="/assets/models/crane-truck-3d-model.glb"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        {/* Preconnect to improve loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body suppressHydrationWarning>
        <ErrorLogger />
        <ErrorBoundary fallback={
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            <h1 className="text-2xl font-black text-[#2a1c2f] mb-4">Something went wrong</h1>
            <p className="text-zinc-600 mb-6 text-center">Please refresh the page to try again.</p>
            <button 
              onClick={() => typeof window !== "undefined" && window.location.reload()} 
              className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-8 py-4 rounded-xl transition-colors"
            >
              Refresh Page
            </button>
          </div>
        }>
          <GoogleAnalytics />
          <MicrosoftClarity />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
