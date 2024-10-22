"use client";
import Script from "next/script";
import Navbar from "@/components/navbar";
import SelectInterest from "@/components/avatar-selection-tech-logos";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please Login</div>;
  }
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js"
        strategy="beforeInteractive"
      />
      <Navbar />
      <SelectInterest session={session} />
    </>
  );
}
