'use client';

import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-body overflow-hidden">
      <Navbar />
      <Sidebar />
      
      <main className="pl-24">
        <Hero />
        <Services />

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-bg-primary to-bg-secondary relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-24 text-center relative z-10">
            <h2 className="text-4xl font-bold text-text-heading mb-8 font-poppins">
              Projenizi Başlatmaya Hazır mısınız<span className="text-accent">?</span>
            </h2>
            <p className="text-text-body mb-12 max-w-2xl mx-auto font-mulish">
              En yeni teknolojiler ve yaratıcı çözümlerle fikirlerinizi hayata geçirmek için bizimle iletişime geçin.
            </p>
            {isClient ? (
              <m.button 
                whileHover={{ scale: 1.05 }}
                className="bg-accent/10 backdrop-blur-sm hover:bg-accent text-accent hover:text-text-heading px-8 py-4 rounded-lg text-sm font-medium transition-colors font-poppins"
              >
                İletişime Geç
              </m.button>
            ) : (
              <button 
                className="bg-accent/10 backdrop-blur-sm hover:bg-accent text-accent hover:text-text-heading px-8 py-4 rounded-lg text-sm font-medium transition-colors font-poppins"
              >
                İletişime Geç
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

