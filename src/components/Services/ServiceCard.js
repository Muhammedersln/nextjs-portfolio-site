'use client';

import { motion as m } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export const ServiceCard = ({ service, index, id }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const isEven = index % 2 === 0;

  return (
    <m.div
      id={id}
      ref={cardRef}
      style={{
        opacity,
        scale,
      }}
      className="relative py-32 w-full overflow-x-hidden"
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${isEven ? '25%' : '75%'} 50%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
            <div className="flex-1 relative">
              <m.div
                style={{ y }}
                className="relative z-10 space-y-8"
              >
                <div className="space-y-6">
                  <m.h2 
                    className="text-6xl font-bold"
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, white 30%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})`
                      }}
                    >
                      {service.title}
                    </span>
                  </m.h2>
                </div>

                <m.p 
                  className="text-xl text-text-body/80 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.longDescription}
                </m.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  <div 
                    className="absolute inset-0 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/10 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}05, transparent)`
                    }}
                  />
                  
                  {service.features.map((feature, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <m.div 
                        className="shrink-0 mt-1"
                        style={{
                          color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaCheckCircle className="text-lg" />
                      </m.div>
                      <p className="text-base text-text-body/70 group-hover:text-white transition-colors duration-300">
                        {feature}
                      </p>
                    </m.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-8">
                  <m.a
                    href={`https://wa.me/905439302395?text=Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium relative overflow-hidden group bg-[#075E54] hover:bg-[#128C7E] transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center gap-2">
                      <FaWhatsapp className="text-2xl" />
                      <span className="font-semibold tracking-wide">WhatsApp</span>
                    </div>
                    <m.div
                      className="absolute inset-0 opacity-20"
                      animate={{
                        background: [
                          "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </m.a>

                  <m.button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border border-white/10 hover:bg-white/5 transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={`/services/${service.id}`} className="flex items-center gap-2">
                      <span>Detaylı Bilgi</span>
                      <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </m.button>
                </div>
              </m.div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <m.div
                style={{ y: useTransform(y, value => value * -1) }}
                className="relative w-[75%] aspect-square"
              >
                <m.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 rounded-[2.5rem] backdrop-blur-md bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] shadow-2xl shadow-black/20 overflow-hidden">
                    <m.div
                      className="absolute -inset-[100%] opacity-10"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `conic-gradient(from 0deg at 50% 50%, 
                          transparent,
                          ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20,
                          ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}10,
                          transparent)`
                      }}
                    />

                    <div className="absolute inset-0">
                      {[...Array(3)].map((_, i) => (
                        <m.div
                          key={i}
                          className="absolute inset-0 rounded-[2.5rem] border border-white/[0.02]"
                          style={{
                            scale: 1 - (i * 0.1),
                          }}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 30 + (i * 10),
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <m.div
                          className="absolute -inset-8 rounded-full opacity-20"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            background: `radial-gradient(circle at center, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, transparent 70%)`
                          }}
                        />

                        <m.div
                          className="relative z-10 w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]"
                          animate={{
                            boxShadow: [
                              `0 0 30px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}10`,
                              `0 0 50px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}30`,
                              `0 0 30px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}10`,
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <m.div
                            className="text-7xl relative"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <div className="absolute inset-0 blur-md opacity-50"
                              style={{
                                color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                              }}
                            >
                              {service.icon}
                            </div>
                            <div className="relative">
                              {service.icon}
                            </div>
                          </m.div>
                        </m.div>
                      </div>
                    </div>

                    {[...Array(12)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          left: `${10 + (i * 7)}%`,
                          top: `${15 + ((i * 12) % 60)}%`,
                          background: service.gradient.split(' ')[0].replace('from-[', '').replace(']', ''),
                          opacity: 0.2
                        }}
                        animate={{
                          y: [-30, 30],
                          x: [-20, 20],
                          opacity: [0.1, 0.3, 0.1],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{
                          duration: 5 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3
                        }}
                      />
                    ))}

                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-8 h-8 border-2 border-white/[0.03]"
                        style={{
                          top: i < 2 ? '10%' : '90%',
                          left: i % 2 === 0 ? '10%' : '90%',
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        }}
                      />
                    ))}
                  </div>
                </m.div>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </m.div>
  );
}; 