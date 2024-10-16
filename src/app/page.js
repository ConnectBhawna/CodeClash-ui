"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/navbar";
import LandingPage from "@/components/landing-page";

const ClientComponent = dynamic(() => import("./ClientComponent"), { ssr: false });

export default function Home() {

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" strategy="beforeInteractive" />
      <Navbar />
      <LandingPage/>
      
    </>
  );
}