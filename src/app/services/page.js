'use client';

import { motion as m } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { industriesData } from '@/data/siteData';
import ServiceCard from '@/components/ServiceCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ServicesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const handleWhatsApp = (industry) => {
    const message = `Merhaba, ${industry.title} hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/905439302395?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-primary pl-0 md:pl-24">
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-4 md:px-8"
      >
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
            Dijital Dönüşümde
            <span className="text-[#FF3366] block mt-2">
              Yanınızdayız
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Her sektöre özel, ihtiyaca yönelik kapsamlı dijital çözümler sunuyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 sm:px-6"
          style={{
            gridAutoRows: 'min-content',
            alignItems: 'start'
          }}
        >
          {industriesData.map((industry) => (
            <ServiceCard
              key={industry.title}
              industry={industry}
              isSelected={selectedIndustry?.title === industry.title}
              onSelect={setSelectedIndustry}
              onWhatsApp={handleWhatsApp}
            />
          ))}
        </m.div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-16 md:mt-32 px-4">
          <div className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Sizin Sektörünüz İçin
              <span className="text-[#FF3366] block mt-1">
                Özel Çözümler
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
              İhtiyaçlarınıza özel dijital çözümler için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-lg bg-[#FF3366] text-white font-medium hover:bg-[#FF3366]/90 transition-colors duration-200 text-sm md:text-base"
              >
                Ücretsiz Danışmanlık Alın
              </Link>
              <button
                onClick={() => handleWhatsApp({ title: 'Genel Hizmetler' })}
                className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200 text-sm md:text-base"
              >
                WhatsApp İletişim
              </button>
            </div>
          </div>
        </div>
      </m.main>
    </div>
  );
} 