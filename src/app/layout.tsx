import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const siteUrl = "https://harizcranetrucks.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hariz Transport | Crane Trucks & Heavy Haulage Sydney",
  description: "Professional crane truck hire and heavy transport services across Sydney. Fully licensed, insured, and locally operated. Free quotes within 24 hours.",
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
    title: "Hariz Transport | Crane Trucks & Heavy Haulage Sydney",
    description: "Professional crane truck hire and heavy transport services across Sydney. Fully licensed and insured.",
    url: siteUrl,
    siteName: "Hariz Crane Trucks",
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hariz Crane Trucks",
  description: "Professional crane truck hire and heavy transport across Sydney and NSW.",
  telephone: "+61469798247",
  email: "info@harizcranetrucks.com.au",
  areaServed: { "@type": "GeoCircle", geo: { "@type": "GeoCoordinates", latitude: -33.8688, longitude: 151.2093 } },
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
