'use client';

import { useEffect, useState } from "react";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

const slides = [
  {
    title: "Tasarım ve Yazılım Çözümleri",
    subtitle: "YARATICI FİKİRLER",
    description: "Profesyonel ekibimizle işletmeniz için yeni teknolojiler ve yaratıcı çözümler üretiyoruz."
  },
  {
    title: "Modern Web Teknolojileri",
    subtitle: "YENİLİKÇİ YAKLAŞIM",
    description: "En son web teknolojileri ile hızlı, güvenli ve ölçeklenebilir uygulamalar geliştiriyoruz."
  },
  {
    title: "Özel Yazılım Geliştirme",
    subtitle: "UZMAN EKİP",
    description: "İşletmenizin ihtiyaçlarına özel, rekabet avantajı sağlayan yazılım çözümleri sunuyoruz."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative h-screen overflow-hidden bg-bg-primary">
      {/* Background Grid - Both Mobile and Desktop */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.015] md:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '1rem 1rem',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '6rem 6rem',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/70 to-bg-primary/90 md:from-bg-primary/50 md:via-transparent md:to-bg-primary/80" />
      </div>

      <MobileHero 
        slides={slides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
      />
      
      <DesktopHero 
        slides={slides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
      />
    </header>
  );
} 