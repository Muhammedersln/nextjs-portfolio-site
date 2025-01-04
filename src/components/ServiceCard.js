'use client';

import { motion as m } from 'framer-motion';
import Link from 'next/link';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServiceCard({ industry, isSelected, onSelect, onWhatsApp }) {
  return (
    <m.div
      variants={itemVariants}
      layout
      className={`group relative ${isSelected ? 'lg:col-span-3 md:col-span-2' : ''}`}
      onClick={() => onSelect(isSelected ? null : industry)}
    >
      <m.div
        layout
        className="h-full p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF3366]/20 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon & Title */}
        <div className="relative flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#FF3366]/10 backdrop-blur-sm">
            <span className="text-3xl text-[#FF3366]">
              {industry.icon}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF3366] transition-colors duration-300">
              {industry.title}
            </h3>
            <p className="text-sm text-gray-400">Dijital Çözümler</p>
          </div>
        </div>

        {/* Description */}
        <m.div
          layout
          className="mb-8"
        >
          <p className={`text-gray-400 ${isSelected ? '' : 'line-clamp-3'} min-h-[4.5rem]`}>
            {isSelected ? industry.longDescription : industry.description}
          </p>
        </m.div>

        {/* Features Section */}
        <m.div layout className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#FF3366] rounded-full" />
              <h4 className="text-lg font-semibold text-white/90">
                Özellikler
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {industry.features.slice(0, isSelected ? undefined : 4).map((feature, idx) => (
                <m.div
                  layout
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366]" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                    {feature}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Benefits Section - Only shown when selected */}
          {isSelected && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[#FF3366] rounded-full" />
                <h4 className="text-lg font-semibold text-white/90">
                  Faydalar
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {industry.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors duration-200"
                  >
                    <span className="text-[#FF3366] text-lg">✓</span>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          )}

          {/* Action Buttons */}
          <m.div layout className="pt-6 flex gap-4">
            <Link
              href="/contact"
              className="flex-1 px-6 py-3 rounded-xl bg-[#FF3366] text-white text-sm font-medium hover:bg-[#FF3366]/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                Detaylı Bilgi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWhatsApp(industry);
              }}
              className="px-6 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
              </svg>
              WhatsApp
            </button>
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
} 