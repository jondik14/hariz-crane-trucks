import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Hariz Crane Trucks | Sydney-Based Crane Hire",
  description: "Owner-operated crane truck services across Sydney. Safe, reliable lifts for residential and light commercial. Fully insured and licensed.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
