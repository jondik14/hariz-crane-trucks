import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorFallback } from "@/components/ErrorFallback";
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
        {/* requestIdleCallback + cancelIdleCallback polyfill — runs before any client JS to prevent iPhone Safari crash. */}
        <Script
          id="requestidlecallback-polyfill"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;if(!('requestIdleCallback'in window)){window.requestIdleCallback=function(cb){var start=Date.now();return setTimeout(function(){cb({didTimeout:false,timeRemaining:function(){return Math.max(0,50-(Date.now()-start));}});},1);};}if(!('cancelIdleCallback'in window)){window.cancelIdleCallback=function(id){clearTimeout(id);};}})();`,
          }}
        />
        {/* Preload LCP hero image only; no GLB preload (3D removed — fleet uses static truck image). */}
        <link
          rel="preload"
          href="/assets/IMG_9208.webp"
          as="image"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body suppressHydrationWarning>
        <ErrorLogger />
        <ErrorBoundary fallback={null}>
          <GoogleAnalytics />
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <MicrosoftClarity />
        </ErrorBoundary>
        <ErrorBoundary fallback={<ErrorFallback />}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
