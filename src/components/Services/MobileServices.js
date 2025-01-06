'use client';

import { motion as m } from 'framer-motion';
import { industriesData } from '@/data/siteData';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const MobileServiceItem = ({ service, index }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative my-32 first:mt-8 last:mb-16"
    >
      {/* Card Container */}
      <Link href="/services" className="block">
        <m.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative"
        >
          {/* Glass Card */}
          <div className="relative rounded-[2rem] bg-white/[0.02] backdrop-blur-md border border-white/[0.05] shadow-2xl shadow-black/20 overflow-hidden">
            {/* Animated Background Gradient */}
            <m.div 
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  `radial-gradient(circle at 0% 0%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50 0%, transparent 50%)`,
                  `radial-gradient(circle at 100% 100%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50 0%, transparent 50%)`,
                  `radial-gradient(circle at 0% 0%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}50 0%, transparent 50%)`
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                filter: 'blur(40px)',
              }}
            />

            {/* Content Container */}
            <div className="relative p-8">
              {/* Icon & Title Section */}
              <div className="flex items-start gap-6 mb-8">
                {/* Animated Icon Container */}
                <m.div 
                  className="relative shrink-0"
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})20`,
                    }}
                  >
                    {/* Animated Background Effect */}
                    <m.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          `linear-gradient(45deg, transparent 0%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 45%, transparent 100%)`,
                          `linear-gradient(45deg, transparent 100%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 145%, transparent 200%)`
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <m.div
                      className="text-4xl relative z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {service.icon}
                    </m.div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute -inset-1 rounded-3xl opacity-50 blur-xl transition-opacity group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})20`,
                    }}
                  />
                </m.div>
                
                <div className="flex-1 pt-2">
                  <m.h3 
                    className="text-3xl font-bold bg-clip-text text-transparent mb-3"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, white 60%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})`,
                    }}
                  >
                    {service.title}
                  </m.h3>
                  <m.p 
                    className="text-base text-text-body/90 line-clamp-2"
                  >
                    {service.description}
                  </m.p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group/feature relative"
                  >
                    <div className="relative p-4 rounded-xl bg-white/[0.01] border border-white/5 overflow-hidden">
                      {/* Feature Background */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/feature:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', '')).join(', ')})`,
                        }}
                      />
                      
                      {/* Shine Effect */}
                      <m.div
                        className="absolute inset-0 opacity-0 group-hover/feature:opacity-100"
                        animate={{
                          background: [
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                            'linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.05) 150%, transparent 200%)'
                          ]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <div className="relative text-sm font-medium text-text-body/90 group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* More Features Indicator */}
              {service.features.length > 4 && (
                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-sm text-center text-text-body/50"
                >
                  +{service.features.length - 4} daha fazla özellik
                </m.div>
              )}

              {/* View Details Button */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <m.div
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Detaylı İncele</span>
                  <FiArrowRight className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1" />
                </m.div>
              </m.div>
            </div>

            {/* Bottom Gradient */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
              style={{ 
                background: `linear-gradient(to top, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}30, transparent)`,
              }}
            />
          </div>
        </m.div>
      </Link>
    </m.div>
  );
};

export default function MobileServices() {
  return (
    <section className="py-20">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary to-bg-primary/50" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
            backgroundSize: '2.5rem 2.5rem',
          }}
        />
      </div>

      <div className="container mx-auto px-5">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="w-24 h-24 mx-auto mb-10 relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-accent/10 animate-ping" />
            <div className="relative w-full h-full rounded-3xl bg-accent/20 flex items-center justify-center backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-accent/30" />
            </div>
          </m.div>

          <h2 className="text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-accent/80">
            Sektörel Çözümler
          </h2>
          
          <m.div 
            className="w-24 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 mx-auto mb-6"
            animate={{
              scaleX: [1, 1.5, 1],
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
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/20 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white/80 group-hover:text-accent">Tüm Hizmetlerimiz</span>
              <FiArrowRight className="text-lg text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </m.div>
          </Link>
        </m.div>

        {/* Services List */}
        <div>
          {industriesData.map((service, index) => (
            <MobileServiceItem key={index} service={service} index={index} />
          ))}
        </div>

        {/* View All Services Button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/services" passHref legacyBehavior>
            <m.a
              className="group relative flex items-center gap-2 overflow-hidden border border-accent/20 text-accent px-6 py-3 rounded-full text-sm transition-all duration-300 font-poppins hover:bg-accent hover:text-white hover:border-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Tüm Hizmetlerimizi İncele</span>
              <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </m.a>
          </Link>
        </m.div>
      </div>
    </section>
  );
} 