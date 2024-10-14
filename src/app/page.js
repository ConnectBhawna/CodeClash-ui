"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Pagecard from "@/components/pagecard";

const ClientComponent = dynamic(() => import("./ClientComponent"), { ssr: false });

export default function Home() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const setVanta = () => {
      if (window.VANTA) {
        window.VANTA.HALO({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
        });
      }
    };

    setVanta();
    window.addEventListener("resize", setVanta);

    return () => {
      if (window.VANTA && window.VANTA.current) {
        window.VANTA.current.destroy();
      }
      window.removeEventListener("resize", setVanta);
    };
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" strategy="beforeInteractive" />
      <Navbar />
      <div ref={vantaRef} id="vanta-bg" className="relative min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">
          <Pagecard/>
          
        </main>
      </div>
    </>
  );
}