'use client';

import { motion } from 'framer-motion';
import { industriesData } from '@/data/siteData';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useMemo } from 'react';

const MobileServiceItem = ({ service, index }) => {
  const gradientColors = useMemo(() => {
    const colors = service.gradient.split(' ').map(g => g.replace('from-[', '').replace('via-[', '').replace('to-[', '').replace(']', ''));
    return {
      primary: colors[0],
      gradient: colors.join(', ')
    };
  }, [service.gradient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
      }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className="relative my-16 first:mt-8 last:mb-16"
    >
      <Link href="/services" className="block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative"
        >
          <div className="relative rounded-[2rem] bg-white/[0.02] backdrop-blur-md border border-white/[0.05] shadow-2xl shadow-black/20 overflow-hidden">
            {/* Animated Background */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  `linear-gradient(120deg, ${gradientColors.primary}40 0%, transparent 70%)`,
                  `linear-gradient(240deg, ${gradientColors.primary}40 0%, transparent 70%)`,
                  `linear-gradient(360deg, ${gradientColors.primary}40 0%, transparent 70%)`,
                  `linear-gradient(120deg, ${gradientColors.primary}40 0%, transparent 70%)`
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                filter: 'blur(30px)',
              }}
            />

            {/* Content Container */}
            <div className="relative p-8">
              {/* Icon & Title Section */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative shrink-0">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${gradientColors.gradient})20`,
                    }}
                  >
                    {/* Animated Background for Icon */}
                    <motion.div
                      className="absolute inset-0 opacity-50"
                      animate={{
                        background: [
                          `linear-gradient(45deg, transparent 0%, ${gradientColors.primary}30 45%, transparent 100%)`,
                          `linear-gradient(45deg, transparent 100%, ${gradientColors.primary}30 145%, transparent 200%)`
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Static Icon */}
                    <div className="text-4xl relative z-10">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <motion.div 
                    className="absolute -inset-1 rounded-3xl opacity-30 blur-xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${gradientColors.gradient})20`,
                    }}
                  />
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 
                    className="text-3xl font-bold bg-clip-text text-transparent mb-3"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, white 60%, ${gradientColors.primary})`,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-base text-text-body/90 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group/feature relative"
                  >
                    <div className="relative p-4 rounded-xl bg-white/[0.01] border border-white/5 overflow-hidden">
                      {/* Feature Background Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/feature:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${gradientColors.gradient})`,
                        }}
                      />
                      
                      <div className="relative text-sm font-medium text-text-body/90 group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* More Features Indicator */}
              {service.features.length > 4 && (
                <div className="mt-4 text-sm text-center text-text-body/50">
                  +{service.features.length - 4} daha fazla özellik
                </div>
              )}

              {/* View Details Button */}
              <div className="mt-8 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300"
                >
                  <span>Detaylı İncele</span>
                  <FiArrowRight className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Gradient */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
              style={{ 
                background: `linear-gradient(to top, ${gradientColors.primary}30, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="w-24 h-24 mx-auto mb-10 relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-accent/10" />
            <div className="relative w-full h-full rounded-3xl bg-accent/20 flex items-center justify-center backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-accent/30" />
            </div>
          </motion.div>

          <h2 className="text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-accent/80">
            Sektörel Çözümler
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 mx-auto mb-6" />

          {/* View All Services Link */}
          <Link href="/services" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/20 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white/80 group-hover:text-accent">Tüm Hizmetlerimiz</span>
              <FiArrowRight className="text-lg text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Services List */}
        <div>
          {industriesData.map((service, index) => (
            <MobileServiceItem key={index} service={service} index={index} />
          ))}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/services" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 overflow-hidden border border-accent/20 text-accent px-6 py-3 rounded-full text-sm transition-all duration-300 font-poppins hover:bg-accent hover:text-white hover:border-accent"
            >
              <span className="relative z-10">Tüm Hizmetlerimizi İncele</span>
              <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 