'use client';

import { motion as m } from "framer-motion";
import { FiInstagram, FiGlobe, FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';

export default function Sidebar() {
  const socialLinks = [
    {
      type: 'instagram',
      label: 'Kişisel Instagram',
      description: '@muhammeder.0',
      url: 'https://instagram.com/muhammeder.0',
      icon: FiInstagram,
      gradient: 'from-[#FF1A8C] to-[#FF4D4D]'
    },
    {
      type: 'instagram',
      label: 'İş Instagram',
      description: '@eraslansoftware',
      url: 'https://instagram.com/eraslansoftware',
      icon: FiInstagram,
      gradient: 'from-[#FF1A8C] to-[#FF4D4D]'
    },
    {
      type: 'website',
      label: 'Eraslan Medya',
      description: 'eraslanmedya.com',
      url: 'https://eraslanmedya.com',
      icon: FiGlobe,
      gradient: 'from-accent to-accent/80'
    },
    {
      type: 'contact',
      label: 'E-posta',
      description: 'info@eraslanmedya.com',
      url: 'mailto:info@eraslanmedya.com',
      icon: FiMail,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      type: 'contact',
      label: 'Telefon',
      description: '+90 543 930 23 95',
      url: 'tel:+905439302395',
      icon: FiPhone,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen hidden md:flex flex-col z-50">
      <div className="h-full w-24 bg-bg-primary/50 backdrop-blur-xl border-r border-white/5 flex flex-col justify-center">
        {/* Glass Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        {/* Links Container */}
        <div className="relative px-4 py-8 space-y-8">
          {socialLinks.map((link, index) => (
            <m.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Link Button */}
              <m.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative p-4">
                  {/* Button Background */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r ${link.gradient}`} />
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    <link.icon className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>
              </m.a>

              {/* Hover Card */}
              <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 pointer-events-none">
                <div
                  className={`bg-gradient-to-r ${link.gradient} p-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
                >
                  <m.div
                    initial={false}
                    animate={{
                      x: 0,
                      scale: 1,
                      opacity: 1
                    }}
                    className="bg-bg-primary/95 backdrop-blur-xl rounded-2xl transform origin-left"
                  >
                    <div className="px-5 py-4 w-56">
                      <div className="flex items-center gap-3">
                        {/* Icon Container */}
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${link.gradient}`}>
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {link.label}
                          </div>
                          <div className="text-xs text-white/70 truncate">
                            {link.description}
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <FiArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
} 