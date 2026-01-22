import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
