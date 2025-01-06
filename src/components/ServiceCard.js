'use client';

import { motion as m } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const isEven = index % 2 === 0;

  return (
    <m.div
      ref={cardRef}
      style={{
        opacity,
        scale,
      }}
      className="relative min-h-screen flex items-center py-32"
    >
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at ${isEven ? 'left' : 'right'} center, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}40 0%, transparent 70%)`
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '3rem 3rem',
              }}
            />
          </div>

          <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
            {/* Content Section */}
            <div className="flex-1 relative">
              <m.div
                style={{ y }}
                className="relative z-10"
              >
                <div className="inline-block">
                  <m.div 
                    className="text-6xl mb-8 relative"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2
                    }}
                  >
                    {service.icon}
                    <div 
                      className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl -z-10"
                      style={{
                        background: service.gradient
                      }}
                    />
                  </m.div>
                </div>

                <m.h2 
                  className="text-5xl font-bold mb-6 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, white, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})`
                  }}
                >
                  {service.title}
                </m.h2>

                <m.p 
                  className="text-xl text-text-body/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.longDescription}
                </m.p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {service.features.map((feature, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-4"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mt-2.5"
                        style={{
                          background: service.gradient
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-lg text-text-body/90">{feature}</p>
                      </div>
                    </m.div>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <m.a
                  href={`https://wa.me/905555555555?text=Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300"
                  style={{
                    background: service.gradient,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="text-2xl" />
                  WhatsApp
                </m.a>
              </m.div>
            </div>

            {/* Visual Section */}
            <div className="flex-1">
              <m.div
                style={{ y: useTransform(y, value => value * -1) }}
                className="relative aspect-square"
              >
                {/* Main Visual Container */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 rounded-[3rem] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})20`,
                    }}
                  >
                    {/* Animated Elements */}
                    {[...Array(3)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute inset-0"
                        animate={{
                          background: [
                            `linear-gradient(${i * 120}deg, transparent 0%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 45%, transparent 100%)`,
                            `linear-gradient(${i * 120}deg, transparent 100%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 145%, transparent 200%)`
                          ]
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    ))}

                    {/* Service Icon */}
                    <m.div
                      className="absolute inset-0 flex items-center justify-center text-[12rem] opacity-20"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {service.icon}
                    </m.div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div 
                  className="absolute -inset-4 rounded-[4rem] opacity-30 blur-3xl -z-10"
                  style={{
                    background: service.gradient
                  }}
                />

                {/* Orbital Elements */}
                {[...Array(3)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute inset-0"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div 
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        background: service.gradient,
                        top: `${20 + i * 20}%`,
                        left: `${80 - i * 20}%`,
                        boxShadow: `0 0 20px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50`
                      }}
                    />
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </m.div>
  );
}; 