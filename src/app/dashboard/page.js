"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Pagecard from "@/components/pagecard";
import Dashboard from "@/components/game-dashboard";


export default function Home() {
    
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" strategy="beforeInteractive" />
      <Navbar />
      <Dashboard/>
    </>
  );
}