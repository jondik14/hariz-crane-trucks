import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Hariz Crane Trucks",
  description:
    "How Hariz Crane Trucks collects, uses and protects your personal information when you use our website or request a quote.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        Hariz Crane Trucks is a locally owned and operated business providing crane truck hire,
        machinery transport, container moves, material deliveries and heavy load transport across
        Sydney and regional NSW. This policy explains how we handle your personal information in line
        with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>We only collect information that helps us quote for and carry out your job:</p>
        <ul>
          <li>
            <strong>Details you give us</strong> – your name, phone number, email address, the service
            you are asking about, and anything you write in the message box (such as lift weight,
            dimensions and site location) when you submit our quote form, call or email us.
          </li>
          <li>
            <strong>Website usage information</strong> – technical data such as your device and browser
            type, pages visited, approximate location and how you move around the site, collected using
            analytics tools.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <ul>
        <li>To respond to your enquiry, provide quotes and arrange and carry out jobs.</li>
        <li>To keep records, issue invoices and meet our legal and insurance obligations.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To measure and improve our advertising, where we run it.</li>
      </ul>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>We do not sell your personal information. We share it only with service providers who help us run the business and website, such as:</p>
        <ul>
          <li>our form processing provider, which delivers your quote request to us by email;</li>
          <li>analytics and advertising providers (for example Microsoft Clarity and Google) that help us understand website use;</li>
          <li>professional advisers, insurers and authorities, where required by law.</li>
        </ul>
        <p>
          Some of these providers store or process data outside Australia, including in the United
          States. We take reasonable steps to choose providers that protect personal information.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <p>
        Our website uses cookies and similar technologies to measure traffic and, with Microsoft
        Clarity, to understand how visitors use pages (for example where they click and scroll). This
        data is used in aggregate. You can block or delete cookies in your browser settings, though
        some parts of the site may work less smoothly.
      </p>
    ),
  },
  {
    heading: "Keeping your information safe",
    body: (
      <p>
        We take reasonable steps to protect your personal information from misuse, loss and
        unauthorised access, and we keep it only as long as we need it for the purposes above or as
        the law requires.
      </p>
    ),
  },
  {
    heading: "Accessing or correcting your information",
    body: (
      <p>
        You can ask to see the personal information we hold about you, or ask us to correct or delete
        it, by contacting us using the details below. We will respond within a reasonable time.
      </p>
    ),
  },
  {
    heading: "Complaints",
    body: (
      <p>
        If you have a concern about how we handled your information, contact us first and we will try
        to resolve it. If you are not satisfied, you can contact the Office of the Australian
        Information Commissioner at{" "}
        <a href="https://www.oaic.gov.au" className="text-amber-700 underline" rel="noopener noreferrer">
          oaic.gov.au
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        Hariz Crane Trucks
        <br />
        Phone: <a href="tel:0469798247" className="text-amber-700 underline">0469 798 247</a>
        <br />
        Email:{" "}
        <a href="mailto:info@harizcranetrucks.com.au" className="text-amber-700 underline">
          info@harizcranetrucks.com.au
        </a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a1c2f] font-sans">
      <header className="border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="/" aria-label="Hariz Crane Trucks home">
            <Image src="/assets/Logo.png" alt="Hariz Crane Trucks" width={160} height={93} className="w-[140px] h-auto object-contain" priority />
          </a>
          <a href="/" className="text-[11px] font-black uppercase tracking-widest text-zinc-600 hover:text-[#2a1c2f] transition-colors">
            Back to home
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4">Privacy Policy</h1>
        <p className="text-zinc-600 mb-12">Last updated: November 2026</p>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{s.heading}</h2>
              <div className="space-y-4 text-zinc-700 text-base leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-10 px-6 bg-[#2a1c2f] text-white text-center text-sm">
        © Hariz Crane Trucks. All rights reserved.
      </footer>
    </div>
  );
}
