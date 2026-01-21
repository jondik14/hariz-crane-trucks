import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hariz Crane Trucks",
  description: "How Hariz Crane Trucks collects, uses and protects your personal information. Privacy policy for our website and services.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
