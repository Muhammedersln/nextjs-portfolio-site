'use client';

import { motion as m, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { 
    damping: 40, 
    stiffness: 200,
    mass: 0.8
  });
  
  const mouseYSpring = useSpring(mouseY, { 
    damping: 40, 
    stiffness: 200,
    mass: 0.8
  });
  
  const mouseTrailTemplate = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(56, 189, 248, 0.12) 0%,
      rgba(0, 0, 0, 0) 70%
    ),
    radial-gradient(
      400px circle at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(124, 58, 237, 0.06) 0%,
      rgba(0, 0, 0, 0) 60%
    )
  `;

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <header className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-95" />
        
        <m.div
          className="pointer-events-none absolute -inset-px"
          style={{
            background: mouseTrailTemplate,
            filter: 'blur(30px)',
            backdropFilter: 'brightness(1.1)'
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
        />
      </div>

      <div className="relative z-10 h-full">
        <div className="container mx-auto px-24 pt-32 h-full flex flex-col justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 text-sm font-medium text-accent mb-4 tracking-wider font-poppins">
              <div className="w-8 h-px bg-accent"></div>
              <span>YARATICI FİKİRLER</span>
            </div>
            <h1 className="text-7xl font-bold text-text-heading mb-6 leading-tight font-poppins">
              Tasarım ve Yazılım Çözümleri<span className="text-accent">.</span>
            </h1>
            <p className="text-lg mb-12 max-w-xl font-mulish opacity-80">
              Profesyonel ekibimizle işletmeniz için yeni teknolojiler ve yaratıcı çözümler üretiyoruz.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-accent/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors">
                  <span className="text-accent group-hover:text-text-heading text-2xl pl-1">▶</span>
                </div>
                <div>
                  <div className="text-accent text-sm mb-1 tracking-wider font-poppins">HAKKIMIZDA</div>
                  <span className="text-text-body group-hover:text-text-heading transition-colors text-sm font-mulish">
                    Tanıtım videosu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end pb-12">
            <div className="flex space-x-2">
              <div className="w-8 h-1 bg-accent rounded-full"></div>
              <div className="w-8 h-1 bg-text-heading/20 rounded-full"></div>
              <div className="w-8 h-1 bg-text-heading/20 rounded-full"></div>
            </div>
            <button 
              onClick={scrollToNext}
              className="text-text-heading hover:text-accent transition-colors flex items-center space-x-2 group"
            >
              <span className="font-mulish text-sm">NEXT</span>
              <div className="w-10 h-px bg-text-heading group-hover:bg-accent transition-colors"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 