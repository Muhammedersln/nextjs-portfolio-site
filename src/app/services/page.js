'use client';

import { motion as m, AnimatePresence } from 'framer-motion';
import { industriesData } from '@/data/siteData';
import { ServiceCard } from '@/components/Services/ServiceCard';
import { MobileServiceCard } from '@/components/Services/MobileServiceCard';
import { useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, Fragment } from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 0, 200]);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % industriesData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToService = (index) => {
    const targetId = `service-section-${index}`;
    const element = document.getElementById(targetId);
    if (element) {
      const offset = window.innerWidth >= 1024 ? -80 : -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative bg-bg-primary min-h-screen md:pl-24 max-w-[100vw] overflow-x-hidden">
      {/* Mobile Hero Section */}
      <section className="lg:hidden min-h-screen relative pt-28">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '1rem 1rem',
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/50 to-bg-primary/90" />

          {/* Animated Service Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <m.div 
              className="relative w-[120vw] aspect-square"
              animate={{ rotate: 360 }}
              transition={{
                duration: 150,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <m.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, 
                    ${industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', '')},
                    transparent 60%)`
                }}
              />
            </m.div>
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-[calc(100vh-7rem)] flex flex-col justify-center px-4">
          <div className="space-y-10">
            {/* Badge */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-accent">PROFESYONEL HİZMETLER</span>
            </m.div>

            {/* Title */}
            <div className="space-y-6">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <m.div
                  className="absolute -inset-x-4 -inset-y-8 opacity-25 blur-3xl"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', '')}40, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', '')}40, transparent 50%)`
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <h1 className="text-4xl sm:text-5xl font-bold font-poppins leading-[1.2]">
                  <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-3">
                    Dijital Çözümler
                  </span>
                  <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                    Yazılım Hizmetleri
                  </span>
                </h1>
              </m.div>

              <m.p 
                className="text-base sm:text-lg text-text-body/80 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Modern teknolojiler ile işletmenizi dijital dünyada öne çıkarıyoruz. 
                Web sitelerinden mobil uygulamalara kadar tüm ihtiyaçlarınız için buradayız.
              </m.p>
            </div>

            {/* Services Navigation */}
            <m.div 
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {industriesData.map((service, index) => (
                  <m.button
                    key={index}
                    onClick={() => {
                      setActiveService(index);
                      scrollToService(index);
                    }}
                    className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                      activeService === index 
                        ? 'bg-accent/20 border-accent' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } border`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="text-3xl"
                      style={{
                        color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                      }}
                    >
                      {service.icon}
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      activeService === index ? 'text-accent' : 'text-white/60'
                    }`}>
                      {service.title}
                    </span>
                  </m.button>
                ))}
              </div>
            </m.div>

            {/* Active Service Visual */}
            <m.div 
              className="relative w-full aspect-square mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <AnimatePresence mode="wait">
                {industriesData.map((service, index) => (
                  activeService === index && (
                    <m.div
                      key={index}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative w-48 h-48">
                        <m.div
                          className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            background: `radial-gradient(circle at center, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, transparent 70%)`
                          }}
                        />
                        <div className="relative text-8xl flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>
                    </m.div>
                  )
                ))}
              </AnimatePresence>
            </m.div>
          </div>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:flex min-h-[90vh] relative flex-col justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.015] md:opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '1rem 1rem',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/70 to-bg-primary/90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <m.div
            ref={containerRef}
            style={{ opacity, scale, y }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              {/* Left Content */}
              <div className="space-y-6 md:space-y-8">
                <m.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
                >
                  <span className="text-sm font-medium text-accent">PROFESYONEL HİZMETLER</span>
                </m.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins">
                  <m.span
                    className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2"
                  >
                    Dijital Çözümler
                  </m.span>
                  <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                    Yazılım Hizmetleri
                  </span>
                </h1>

                <m.p className="text-base md:text-xl text-text-body/90 leading-relaxed max-w-2xl">
                  Modern teknolojiler ile işletmenizi dijital dünyada öne çıkarıyoruz. 
                  Web sitelerinden mobil uygulamalara kadar tüm ihtiyaçlarınız için buradayız.
                </m.p>
              </div>

              {/* Right Content - Modern Visual Element */}
              <div className="relative aspect-square hidden lg:block">
                <m.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Modern Gradient Sphere */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-96 h-96">
                      {/* Animated Gradient Background */}
                      <m.div 
                        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: `radial-gradient(circle at center, ${industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, transparent 70%)`
                        }}
                      />
                      
                      {/* Additional Gradient Layers */}
                      <m.div 
                        className="absolute inset-0 rounded-full opacity-10 blur-2xl"
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.1, 0.15, 0.1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          background: `conic-gradient(from 0deg at 50% 50%, ${
                            industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                          }, transparent, ${
                            industriesData[activeService].gradient.split(' ')[2]?.replace('to-[', '').replace(']', '') || 'transparent'
                          })`
                        }}
                      />
                      
                      {/* Service Icons Circle */}
                      <AnimatePresence mode="wait">
                        {industriesData.map((service, index) => (
                          <m.div
                            key={index}
                            className="absolute inset-0"
                            initial={{ opacity: 0, rotate: -20 }}
                            animate={{ 
                              opacity: activeService === index ? 1 : 0,
                              rotate: 0,
                              scale: activeService === index ? 1 : 0.8
                            }}
                            exit={{ opacity: 0, rotate: 20 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <m.div 
                                className="relative text-8xl"
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, 0]
                                }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                {/* Icon Glow Effect */}
                                <div 
                                  className="absolute inset-0 blur-xl opacity-40"
                                  style={{
                                    background: `radial-gradient(circle at center, ${
                                      service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                                    }, transparent 70%)`
                                  }}
                                />
                                {service.icon}
                              </m.div>
                            </div>
                          </m.div>
                        ))}
                      </AnimatePresence>

                      {/* Floating Particles */}
                      {[...Array(20)].map((_, i) => {
                        const positions = [
                          { x: 10, y: 20 }, { x: 80, y: 15 }, { x: 45, y: 85 },
                          { x: 20, y: 70 }, { x: 90, y: 30 }, { x: 15, y: 40 },
                          { x: 75, y: 60 }, { x: 35, y: 25 }, { x: 60, y: 90 },
                          { x: 25, y: 45 }, { x: 85, y: 75 }, { x: 50, y: 10 },
                          { x: 30, y: 80 }, { x: 70, y: 35 }, { x: 40, y: 65 },
                          { x: 95, y: 50 }, { x: 5, y: 95 }, { x: 65, y: 5 },
                          { x: 55, y: 55 }, { x: 45, y: 30 }
                        ];
                        
                        return (
                          <m.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              left: `${positions[i].x}%`,
                              top: `${positions[i].y}%`,
                              background: industriesData[activeService].gradient.split(' ')[0].replace('from-[', '').replace(']', ''),
                              opacity: 0.5
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 0.5, 0],
                              x: [0, (i % 2 === 0 ? 20 : -20)],
                              y: [0, (i % 2 === 0 ? -20 : 20)],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </m.div>
              </div>
            </div>

            {/* Desktop Service Navigation */}
            <div className="hidden lg:block absolute -bottom-20 left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-between md:justify-center gap-2 md:gap-8 pb-8 overflow-x-auto">
                {industriesData.map((service, index) => (
                  <m.button
                    key={index}
                    onClick={() => {
                      setActiveService(index);
                      scrollToService(index);
                    }}
                    className={`group flex flex-col items-center gap-3 transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <m.div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                        activeService === index 
                          ? 'bg-accent/20 border-accent shadow-lg shadow-accent/20' 
                          : 'bg-white/5 border-transparent hover:bg-white/10'
                      } border`}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </m.div>
                    <m.span 
                      className={`text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                        activeService === index 
                          ? 'text-accent' 
                          : 'text-white/60'
                      }`}
                    >
                      {service.title.split(' ')[0]}
                    </m.span>
                  </m.button>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Services List */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary to-bg-primary/50" />
        <div className="relative">
        {industriesData.map((service, index) => (
            <div key={`service-${index}`} id={`service-section-${index}`}>
              <div className="hidden md:block">
          <ServiceCard 
                  service={service} 
                  index={index}
                />
              </div>
              <div className="md:hidden">
                <MobileServiceCard
            service={service} 
            index={index}
          />
              </div>
            </div>
        ))}
        </div>
      </section>
    </main>
  );
} 