'use client';

import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';

const faqData = [
  {
    question: "Hizmetlerinizin fiyatları nedir?",
    answer: "Her proje özeldir ve ihtiyaçlarınıza göre özel fiyatlandırma yapılmaktadır. Detaylı bilgi için bizimle iletişime geçebilirsiniz."
  },
  {
    question: "Proje süreçleri ne kadar sürer?",
    answer: "Projenin kapsamına ve karmaşıklığına bağlı olarak süre değişiklik gösterebilir. Ortalama projelerimiz 4-8 hafta arasında tamamlanmaktadır."
  },
  {
    question: "Hangi ödeme seçenekleri mevcut?",
    answer: "Nakit, havale/EFT ve kredi kartı ile ödeme seçeneklerimiz mevcuttur. Ayrıca büyük projeler için taksit imkanı sunuyoruz."
  },
  {
    question: "Proje sonrası destek sağlıyor musunuz?",
    answer: "Evet, tüm projelerimizde 1 yıl boyunca ücretsiz teknik destek ve bakım hizmeti sunuyoruz."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleWhatsApp = () => {
    const message = "Merhaba, bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/905439302395?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const contactCards = [
    { 
      icon: FaWhatsapp, 
      title: "WhatsApp", 
      info: "7/24 hızlı iletişim", 
      color: "green",
      onClick: handleWhatsApp,
      className: "bg-green-500/10 hover:bg-green-500/20 group-hover:border-green-500/30"
    },
    { icon: FaEnvelope, title: "E-posta", info: "info@eraslanmedya.com", color: "blue" },
    { icon: FaPhone, title: "Telefon", info: "+90 543 930 2395", color: "purple" },
    { icon: FaMapMarkerAlt, title: "Adres", info: "İstanbul, Türkiye", color: "pink" }
  ];

  return (
    <div className="min-h-screen bg-bg-primary pl-0 md:pl-24">
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-4 md:px-8"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <m.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#FF3366]/10 to-transparent rounded-full blur-3xl"
          />
          <m.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        {/* Hero Section */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto text-center mb-12 md:mb-20 relative"
        >
          <m.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bizimle
            <m.span 
              className="text-[#FF3366] block mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              İletişime Geçin
            </m.span>
          </m.h1>
          <m.p 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Projeleriniz için yanınızdayız. Hemen iletişime geçin, çözümlerimizi konuşalım.
          </m.p>
        </m.div>

        {/* Contact Info Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-12 md:mb-20 px-4"
        >
          {contactCards.map((card, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={card.onClick}
              className={`relative p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center group cursor-pointer overflow-hidden transition-all duration-300 ${card.onClick ? 'hover:border-green-500/20' : ''}`}
            >
              <m.div
                animate={{
                  scale: hoveredCard === index ? 1.05 : 1,
                  y: hoveredCard === index ? -5 : 0
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${card.className || 'bg-[#FF3366]/10 group-hover:bg-[#FF3366]/20'}`}>
                  <card.icon className={`text-2xl ${card.onClick ? 'text-green-500' : 'text-[#FF3366]'}`} />
                </div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{card.info}</p>
              </m.div>
              <m.div
                className={`absolute inset-0 bg-gradient-to-r ${card.onClick ? 'from-green-500/0 via-green-500/5 to-green-500/0' : 'from-[#FF3366]/0 via-[#FF3366]/5 to-[#FF3366]/0'}`}
                initial={{ x: '-100%' }}
                animate={{
                  x: hoveredCard === index ? '100%' : '-100%'
                }}
                transition={{ duration: 0.6 }}
              />
            </m.div>
          ))}
        </m.div>

        {/* Contact Form Section */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto mb-20 md:mb-32 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white">
            Mesaj
            <span className="text-[#FF3366] block mt-1">Gönderin</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <input
                type="text"
                placeholder="Adınız"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 md:p-4 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF3366] transition-colors duration-200 text-sm md:text-base"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 md:p-4 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF3366] transition-colors duration-200 text-sm md:text-base"
              />
            </div>
            <div>
              <textarea
                placeholder="Mesajınız"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="4"
                className="w-full p-3 md:p-4 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF3366] transition-colors duration-200 resize-none text-sm md:text-base"
              />
            </div>
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 md:p-4 rounded-lg bg-[#FF3366] text-white font-medium hover:bg-[#FF3366]/90 transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Gönder
              <FaArrowRight className="text-sm" />
            </m.button>
          </form>
        </m.div>

        {/* FAQ Section */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible" 
          className="max-w-3xl mx-auto mt-16 md:mt-32 px-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-white">
            Sıkça Sorulan
            <span className="text-[#FF3366] block mt-2">
              Sorular
            </span>
          </h2>
          
          <div className="space-y-3 md:space-y-4">
            {faqData.map((faq, index) => (
              <m.div
                key={index}
                initial={false}
                animate={{ backgroundColor: openFaq === index ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.01)" }}
                className="border border-white/5 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full p-4 text-left text-white hover:bg-white/[0.05] transition-colors duration-200 flex justify-between items-center text-sm md:text-base"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <m.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#FF3366] text-lg"
                  >
                    {openFaq === index ? '−' : '+'}
                  </m.span>
                </button>
                <m.div
                  initial="collapsed"
                  animate={openFaq === index ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/[0.01] text-gray-400 text-sm md:text-base">
                    {faq.answer}
                  </div>
                </m.div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* CTA Section */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center mt-16 md:mt-32 px-4"
        >
          <div className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <m.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/0 via-[#FF3366]/5 to-[#FF3366]/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white relative">
              Hemen Şimdi
              <span className="text-[#FF3366] block mt-1">
                İletişime Geçin
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Projeleriniz için en iyi çözümleri birlikte üretelim.
            </p>
          </div>
        </m.div>
      </m.main>
    </div>
  );
} 