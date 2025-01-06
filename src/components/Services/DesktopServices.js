'use client';

import { motion as m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { industriesData } from '@/data/siteData';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const generateParticlePositions = (count) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      left: `${(i * 15) % 100}%`,
      top: `${(i * 20) % 100}%`,
      delay: i * 0.5,
    });
  }
  return positions;
};

const ServiceItem = ({ service, index }) => {
  const itemRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [index % 2 === 0 ? -100 : 100, 0, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.98, 1, 1, 0.98]
  );

  const textContainerOrder = index % 2 === 0 ? 'order-last md:order-first' : 'order-last';
  const visualContainerOrder = index % 2 === 0 ? 'order-first md:order-last' : 'order-first';

  // Orbital elemanların pozisyonlarını hesapla
  const calculateOrbitalPositions = (totalItems) => {
    const radius = 180;
    const positions = [];
    const angleStep = (2 * Math.PI) / totalItems;
    
    for (let i = 0; i < totalItems; i++) {
      const angle = i * angleStep;
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: (angle * 180) / Math.PI,
      });
    }
    
    return positions;
  };

  const orbitalPositions = useRef(calculateOrbitalPositions(service.features.length));
  const particlePositions = useRef(generateParticlePositions(6));

  if (!isMounted) {
    return null;
  }

  return (
    <m.div
      ref={itemRef}
      style={{ opacity }}
      className="relative min-h-[90vh] flex items-center py-16 md:py-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/services">
          <m.div 
            style={{ scale, x }}
            className="relative rounded-[2rem] bg-white/[0.02] backdrop-blur-sm border border-white/10 p-6 sm:p-8 md:p-12 overflow-hidden group/card cursor-pointer"
          >
            {/* Background Gradient */}
            <div 
              className="absolute inset-0 opacity-10 blur-3xl -z-10 transition-opacity duration-1000 ease-out"
              style={{ 
                background: `radial-gradient(circle at ${index % 2 ? '70%' : '30%'} 50%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50 0%, transparent 70%)`,
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className={`space-y-6 md:space-y-8 ${textContainerOrder}`}>
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative"
                >
                  <span 
                    className="text-8xl md:text-9xl lg:text-[10rem] font-bold opacity-[0.07] font-mono block mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {service.icon}
                  </span>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative z-10 bg-clip-text text-transparent"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, white 60%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})` 
                      }}>
                    {service.title}
                  </h3>
                </m.div>

                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-lg sm:text-xl md:text-2xl text-text-body/90 font-light"
                >
                  {service.longDescription}
                </m.p>

                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                >
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: 0.1 * idx,
                        ease: "easeOut"
                      }}
                      className="flex items-center space-x-3 group"
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-2.5"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})` 
                        }}
                      />
                      <span className="text-base sm:text-lg text-text-body/80 group-hover:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </m.div>
                  ))}
                  {service.features.length > 4 && (
                    <m.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-text-body/60 col-span-2 mt-2"
                    >
                      +{service.features.length - 4} daha fazla özellik
                    </m.div>
                  )}
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 text-accent group/btn cursor-pointer"
                >
                  <span className="text-lg font-medium">Detaylı İncele</span>
                  <FiArrowRight className="text-xl transition-transform duration-300 group-hover/card:translate-x-2" />
                </m.div>
              </div>

              <div className={`relative ${visualContainerOrder}`}>
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative aspect-square"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Orbital Rings */}
                    {[...Array(3)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute w-full h-full rounded-full"
                        style={{ 
                          border: `1px solid ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}${20 + i * 10}`,
                          transform: `scale(${1 - i * 0.15})`,
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [1 - i * 0.15, (1 - i * 0.15) * 1.05, 1 - i * 0.15],
                        }}
                        transition={{
                          rotate: {
                            duration: 30 + i * 5,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    ))}

                    {/* Rotating Elements */}
                    {[...Array(6)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20 + i * 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          transformOrigin: "center",
                        }}
                      >
                        <m.div
                          className="absolute top-0 left-1/2 -translate-x-1/2"
                          style={{
                            transform: `rotate(${i * 60}deg)`,
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})`,
                              boxShadow: `0 0 20px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50`,
                            }}
                          />
                        </m.div>
                      </m.div>
                    ))}
                    
                    {/* Center Element */}
                    <div 
                      className="absolute w-40 h-40 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle at center, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}30, transparent 70%)`,
                        boxShadow: `0 0 80px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}40`
                      }}
                    >
                      <m.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full h-full rounded-full flex items-center justify-center text-6xl relative"
                        style={{ 
                          border: `2px solid ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50`
                        }}
                      >
                        {service.icon}
                        <div 
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle at center, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}10, transparent)`,
                          }}
                        />
                      </m.div>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <AnimatePresence mode="wait">
                    {particlePositions.current.map((pos, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [0.5, 1, 0.5],
                          x: [0, 50, 0],
                          y: [0, 50, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: pos.delay,
                        }}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})`,
                          filter: 'blur(1px)',
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </m.div>
              </div>
            </div>
          </m.div>
        </Link>
      </div>
    </m.div>
  );
};

export default function DesktopServices() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary to-bg-primary/50" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-24 md:mb-40"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-8 sm:mb-12 relative"
          >
            <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
            <div className="relative w-full h-full rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/30" />
            </div>
          </m.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-accent/80">
            Sektörel Çözümler
          </h2>
          
          <m.div 
            className="w-24 sm:w-32 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 mx-auto mb-6"
            animate={{
              scaleX: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* View All Services Link */}
          <Link href="/services" className="inline-block">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/20 transition-all duration-300"
            >
              <span className="text-base font-medium text-white/80 group-hover:text-accent">Tüm Hizmetlerimiz</span>
              <FiArrowRight className="text-xl text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </m.div>
          </Link>
        </m.div>

        <div className="space-y-32 md:space-y-40">
          {industriesData.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>

        {/* View All Services Button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-32 flex justify-center"
        >
          <Link href="/services" passHref legacyBehavior>
            <m.a
              className="group relative flex items-center gap-3 overflow-hidden border border-accent/20 text-accent px-8 py-4 rounded-full text-base transition-all duration-300 font-poppins hover:bg-accent hover:text-white hover:border-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Tüm Hizmetlerimizi İncele</span>
              <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </m.a>
          </Link>
        </m.div>
      </div>
    </section>
  );
} 