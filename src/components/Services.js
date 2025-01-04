'use client';

import { motion as m } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const services = [
  {
    icon: "💻",
    title: "Web Geliştirme",
    description: "Modern teknolojiler ve en iyi uygulamalarla özel web uygulamaları geliştiriyoruz.",
    features: [
      "Responsive Tasarım",
      "Modern Framework'ler",
      "SEO Optimizasyonu",
      "Hızlı Yükleme Süreleri"
    ],
    gradient: "from-[#4F46E5] via-[#7C3AED] to-[#9333EA]"
  },
  {
    icon: "🎨",
    title: "UI/UX Tasarım",
    description: "Kullanıcı deneyimini en üst düzeye çıkaran güzel ve sezgisel arayüzler tasarlıyoruz.",
    features: [
      "Kullanıcı Odaklı Tasarım",
      "Modern Arayüzler",
      "Etkileşimli Prototipler",
      "A/B Testleri"
    ],
    gradient: "from-[#EC4899] via-[#F43F5E] to-[#F97316]"
  },
  {
    icon: "🚀",
    title: "Dijital Çözümler",
    description: "İşletmenizin ihtiyaçlarına özel ölçeklenebilir yazılım çözümleri sunuyoruz.",
    features: [
      "Özel Yazılım Geliştirme",
      "API Entegrasyonları",
      "Performans Optimizasyonu",
      "Teknik Danışmanlık"
    ],
    gradient: "from-[#10B981] via-[#059669] to-[#0D9488]"
  }
];

const industries = [
  {
    icon: "🛍️",
    title: "E-Ticaret",
    description: "Modern ve kullanıcı dostu e-ticaret siteleri ile satışlarınızı artırın.",
    features: [
      "Kolay Yönetim Paneli",
      "Güvenli Ödeme Sistemleri",
      "Stok Takibi",
      "Mobil Uyumlu Tasarım"
    ],
    gradient: "from-[#F59E0B] via-[#F97316] to-[#EA580C]"
  },
  {
    icon: "👩‍⚕️",
    title: "Sağlık Profesyonelleri",
    description: "Diyetisyen, psikolog ve sağlık çalışanları için özel çözümler.",
    features: [
      "Online Randevu Sistemi",
      "Hasta Takip Sistemi",
      "Video Görüşme",
      "Dijital Dosya Yönetimi"
    ],
    gradient: "from-[#0EA5E9] via-[#0284C7] to-[#0369A1]"
  },
  {
    icon: "💅",
    title: "Güzellik & Bakım",
    description: "Güzellik salonları ve spa merkezleri için profesyonel web çözümleri.",
    features: [
      "Online Rezervasyon",
      "Hizmet Kataloğu",
      "Müşteri Yönetimi",
      "Kampanya Modülü"
    ],
    gradient: "from-[#EC4899] via-[#DB2777] to-[#BE185D]"
  },
  {
    icon: "🎨",
    title: "Portfolyo",
    description: "Sanatçılar ve kreatif profesyoneller için etkileyici portfolyo siteleri.",
    features: [
      "Galeri Yönetimi",
      "Proje Vitrini",
      "Blog Entegrasyonu",
      "Sosyal Medya Bağlantıları"
    ],
    gradient: "from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]"
  },
  {
    icon: "🏢",
    title: "Kurumsal",
    description: "Şirketinizi en iyi şekilde temsil eden profesyonel kurumsal siteler.",
    features: [
      "Kurumsal Kimlik",
      "Haber/Duyuru Sistemi",
      "Çoklu Dil Desteği",
      "İK Portalı"
    ],
    gradient: "from-[#059669] via-[#047857] to-[#065F46]"
  },
  {
    icon: "🍽️",
    title: "Restaurant",
    description: "Restoranlar ve kafeler için modern dijital çözümler.",
    features: [
      "Online Sipariş",
      "Menü Yönetimi",
      "Masa Rezervasyonu",
      "Müşteri Sadakat Sistemi"
    ],
    gradient: "from-[#DC2626] via-[#B91C1C] to-[#991B1B]"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    const playSlider = () => {
      if (!isPaused) {
        setCurrentSlide((prev) => 
          prev === industries.length - 1 ? 0 : prev + 1
        );
      }
    };

    autoPlayRef.current = setInterval(playSlider, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused]);

  const handleSliderHover = (isHovered) => {
    setIsPaused(isHovered);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100; // minimum drag distance for slide change
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (dragOffset < 0 && currentSlide < industries.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    setDragOffset(0);
  };

  const nextSlide = () => {
    if (currentSlide < industries.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section className="py-32 bg-bg-primary relative">
      {/* Background Grid - Similar to Hero */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.015] md:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '1.5rem 1.5rem',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '8rem 8rem',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/50 to-bg-primary/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2"
        />
        <m.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-2xl translate-y-1/2"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <m.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 shadow-sm mb-6 backdrop-blur-sm"
          >
            <span className="text-xs font-medium text-accent tracking-wider">
              HİZMETLERİMİZ
            </span>
          </m.div>
          
          <h2 className="text-[2.5rem] md:text-6xl font-bold text-text-heading mb-6 font-poppins">
            Neler Sunuyoruz<span className="text-accent">?</span>
          </h2>

          <m.div 
            className="w-24 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </m.div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl bg-accent/5 backdrop-blur-sm border border-accent/10 p-8 transition-all duration-300">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                     style={{
                       background: `linear-gradient(120deg, ${service.gradient})`
                     }} />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-8">
                    <m.div 
                      className="text-6xl mb-6"
                      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </m.div>
                    <h3 className="text-2xl font-bold font-poppins text-text-heading mb-4">
                      {service.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent rounded-full mb-6 group-hover:w-20 transition-all duration-300"></div>
                    <p className="text-base text-text-body/80 font-mulish">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <m.div 
                          key={idx}
                          initial={{ x: 0 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center space-x-3 text-text-body/90 font-mulish transition-transform duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:animate-pulse"></span>
                          <span>{feature}</span>
                        </m.div>
                      ))}
                    </div>
                  </div>

                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 w-full py-4 bg-accent/5 backdrop-blur-sm border border-accent/20 text-accent rounded-xl font-medium hover:bg-accent/10 transition-all duration-300 shadow-sm relative overflow-hidden group"
                  >
                    <span className="relative z-10">Detaylı Bilgi</span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </m.button>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Sektörel Çözümler Section */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mt-40 mb-24"
        >
          <m.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 shadow-sm mb-6 backdrop-blur-sm"
          >
            <span className="text-xs font-medium text-accent tracking-wider">
              SEKTÖREL ÇÖZÜMLER
            </span>
          </m.div>
          
          <h2 className="text-[2.5rem] md:text-6xl font-bold text-text-heading mb-6 font-poppins">
            Size Özel Çözümler<span className="text-accent">.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-text-body/80 font-mulish mb-8">
            Her sektörün kendine özgü ihtiyaçlarını anlıyor ve bu doğrultuda özel çözümler sunuyoruz.
          </p>
        </m.div>

        {/* Slider Container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => handleSliderHover(true)}
          onMouseLeave={() => handleSliderHover(false)}
        >
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className={`w-12 h-12 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center pointer-events-auto transition-opacity ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-accent/20'}`}
              disabled={currentSlide === 0}
            >
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </m.button>
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className={`w-12 h-12 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center pointer-events-auto transition-opacity ${currentSlide === industries.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-accent/20'}`}
              disabled={currentSlide === industries.length - 1}
            >
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </m.button>
          </div>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <m.div
              className="flex transition-transform duration-500 ease-out"
              animate={{
                x: `${-currentSlide * 100 + (isDragging ? dragOffset : 0)}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {industries.map((industry, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full rounded-2xl bg-accent/5 backdrop-blur-sm border border-accent/10 p-8 transition-all duration-300 group"
                  >
                    {/* Gradient Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
                      style={{
                        background: `linear-gradient(120deg, ${industry.gradient})`
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <div className="relative mb-6 group">
                          <m.div 
                            className="text-7xl relative z-10 transition-transform duration-300 ease-out"
                            whileHover={{ 
                              scale: 1.1,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {industry.icon}
                          </m.div>
                          <m.div
                            className="absolute inset-0 bg-accent/5 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            initial={false}
                            whileHover={{
                              scale: 1.5,
                              opacity: 0.2
                            }}
                          />
                        </div>
                        <h3 className="text-3xl font-bold font-poppins text-text-heading mb-4">
                          {industry.title}
                        </h3>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent rounded-full mb-6"></div>
                        <p className="text-lg text-text-body/80 font-mulish mb-6">
                          {industry.description}
                        </p>
                      </div>

                      <div className="md:w-1/2 space-y-4">
                        {industry.features.map((feature, idx) => (
                          <m.div 
                            key={idx}
                            initial={{ x: 0 }}
                            whileHover={{ x: 10 }}
                            className="flex items-center space-x-3 text-text-body/90 font-mulish"
                          >
                            <span className="w-2 h-2 rounded-full bg-accent group-hover:animate-pulse"></span>
                            <span>{feature}</span>
                          </m.div>
                        ))}
                        <m.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-8 w-full py-4 bg-accent/5 backdrop-blur-sm border border-accent/20 text-accent rounded-xl font-medium hover:bg-accent/10 transition-all duration-300 shadow-sm relative overflow-hidden group"
                        >
                          <span className="relative z-10">Detaylı İncele</span>
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </m.button>
                      </div>
                    </div>
                  </m.div>
                </div>
              ))}
            </m.div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-accent/10 rounded-full mt-8 overflow-hidden">
            <m.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / industries.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {industries.map((_, index) => (
              <m.button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-accent' 
                    : 'w-1.5 bg-accent/20 hover:bg-accent/40'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 