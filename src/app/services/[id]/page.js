'use client';

import { motion as m } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { industriesData } from '@/data/siteData';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ServiceDetail() {
  const params = useParams();
  const service = industriesData.find(s => s.id === params.id);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Hizmet Bulunamadı</h1>
          <Link href="/services" className="text-accent hover:underline">
            Hizmetlere Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative bg-bg-primary min-h-screen md:pl-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '1rem 1rem',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/50 to-bg-primary/90" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-32">
          <m.div
            ref={containerRef}
            style={{ opacity, scale, y }}
            className="max-w-7xl mx-auto"
          >
            {/* Back Button */}
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <span>Tüm Hizmetler</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
                >
                  <span className="text-sm font-medium text-accent">PROFESYONEL HİZMET</span>
                </m.div>

                <div className="space-y-6">
                  <m.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold"
                  >
                    <span className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, white 30%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})`
                      }}
                    >
                      {service.title}
                    </span>
                  </m.h1>

                  <m.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-text-body/80 leading-relaxed"
                  >
                    {service.longDescription}
                  </m.p>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <m.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-semibold"
                  >
                    Avantajlar
                  </m.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <m.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10"
                      >
                        <div 
                          className="shrink-0 mt-1"
                          style={{
                            color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                          }}
                        >
                          <FaCheckCircle className="text-lg" />
                        </div>
                        <p className="text-white/80">{benefit}</p>
                      </m.div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <m.a
                    href={`https://wa.me/905439302395?text=Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium relative overflow-hidden group bg-[#075E54] hover:bg-[#128C7E] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <FaWhatsapp className="text-2xl" />
                      <span>WhatsApp ile İletişime Geç</span>
                    </div>
                  </m.a>
                </m.div>
              </div>

              {/* Right Content - Visual */}
              <div className="relative aspect-square hidden lg:block">
                <m.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative w-full h-full"
                >
                  {/* Service Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-96 h-96">
                      {/* Background Effects */}
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
                      
                      {/* Icon */}
                      <m.div 
                        className="relative text-9xl flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div 
                          className="absolute inset-0 blur-2xl opacity-40"
                          style={{
                            color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                          }}
                        >
                          {service.icon}
                        </div>
                        {service.icon}
                      </m.div>

                      {/* Floating Particles */}
                      {[...Array(20)].map((_, i) => (
                        <m.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: service.gradient.split(' ')[0].replace('from-[', '').replace(']', ''),
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
                      ))}
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary to-bg-primary/50" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Özellikler</h2>
              <p className="text-white/60">Bu hizmet kapsamında sunduğumuz özellikler</p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20, transparent)`
                      }}
                    >
                      <FaCheckCircle 
                        className="text-xl"
                        style={{
                          color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                        }}
                      />
                    </div>
                    <p className="text-lg font-medium group-hover:text-white transition-colors">
                      {feature}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 