"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/navbar";
import { GameDashboardComponent } from "@/components/game-dashboard";
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
      <GameDashboardComponent session={session} />
    </>
  );
}
