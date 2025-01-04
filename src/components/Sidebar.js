'use client';

import { motion as m } from "framer-motion";
import { FiInstagram, FiGlobe, FiArrowRight } from 'react-icons/fi';

export default function Sidebar() {
  const socialLinks = [
    {
      type: 'instagram',
      label: 'Kişisel Instagram',
      description: '@muhammeder.0',
      url: 'https://instagram.com/muhammeder.0',
      icon: FiInstagram,
      color: 'hover:text-[#E1306C]',
      bgColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'
    },
    {
      type: 'instagram',
      label: 'İş Instagram',
      description: '@eraslansoftware',
      url: 'https://instagram.com/eraslansoftware',
      icon: FiInstagram,
      color: 'hover:text-[#E1306C]',
      bgColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'
    },
    {
      type: 'website',
      label: 'Eraslan Medya Web Sitesi',
      description: 'eraslanmedya.com',
      url: 'https://eraslanmedya.com',
      icon: FiGlobe,
      color: 'hover:text-accent',
      bgColor: 'bg-gradient-to-br from-accent via-accent/80 to-accent/50'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen hidden md:flex flex-col z-50">
      {/* Main Sidebar */}
      <div className="h-full w-24 bg-bg-primary/50 backdrop-blur-sm border-r border-text-body/5 flex flex-col items-center justify-center gap-12 relative">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent/5 to-transparent" />

        {/* Links Container */}
        <div className="flex flex-col gap-12 relative">
          {/* Instagram Section */}
          <div className="relative">
            <div className="absolute -left-1 h-full w-[2px] bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"></div>
            <div className="flex flex-col gap-6">
              {socialLinks.slice(0, 2).map((link, index) => (
                <div key={index} className="group relative">
                  <m.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block p-4 rounded-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    {/* Icon Background with Instagram Gradient */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300
                                bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]" />
                    
                    {/* Icon Container */}
                    <div className="relative z-10 transform group-hover:rotate-6 transition-all duration-300">
                      <link.icon size={32} className="text-white transition-all duration-300" />
                    </div>
                  </m.a>

                  {/* Info Card */}
                  <m.div
                    className="absolute left-24 top-1/2 -translate-y-1/2 pointer-events-none"
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] p-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-bg-primary rounded-[14px] overflow-hidden backdrop-blur-md">
                        <div className="px-5 py-3 w-52">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                              <link.icon size={20} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-text-heading">{link.label}</div>
                              <div className="text-xs text-text-body/70">{link.description}</div>
                            </div>
                            <FiArrowRight className="text-[#FD1D1D] group-hover:translate-x-1 transition-transform duration-300" size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </div>
              ))}
            </div>
          </div>

          {/* Website Section with Different Style */}
          <div className="relative">
            <div className="absolute -left-1 h-full w-[2px] bg-gradient-to-b from-accent to-accent/50"></div>
            <div key="website" className="group relative">
              <m.a
                href={socialLinks[2].url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-4 rounded-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                {/* Icon Background with Website Gradient */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300
                            bg-gradient-to-br from-accent via-accent/80 to-accent/50" />
                
                {/* Icon Container */}
                <div className="relative z-10 transform group-hover:rotate-6 transition-all duration-300">
                  <FiGlobe size={32} className="text-white transition-all duration-300" />
                </div>
              </m.a>

              {/* Info Card */}
              <m.div
                className="absolute left-24 top-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-accent via-accent/80 to-accent/50 p-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-bg-primary rounded-[14px] overflow-hidden backdrop-blur-md">
                    <div className="px-5 py-3 w-52">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-accent via-accent/80 to-accent/50">
                          <FiGlobe size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-text-heading">Web Sitesi</div>
                          <div className="text-xs text-text-body/70">website.com</div>
                        </div>
                        <FiArrowRight className="text-accent group-hover:translate-x-1 transition-transform duration-300" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/5 to-transparent" />
      </div>
    </div>
  );
} 