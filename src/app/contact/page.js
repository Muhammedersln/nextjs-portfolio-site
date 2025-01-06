'use client';

import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowRight, FaChevronDown } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    info: "+90 543 930 2395",
    action: "Hemen Mesaj Gönder",
    color: "accent",
    link: "https://wa.me/905439302395"
  },
  {
    icon: FaEnvelope,
    title: "E-posta",
    info: "info@eraslanmedya.com",
    action: "Mail Gönder",
    color: "accent",
    link: "mailto:info@eraslanmedya.com"
  },
  {
    icon: FaPhone,
    title: "Telefon",
    info: "+90 543 930 2395",
    action: "Hemen Ara",
    color: "accent",
    link: "tel:+905439302395"
  }
];

const faqData = [
  {
    question: "Web sitesi yaptırmak ne kadar sürer?",
    answer: "Web sitesi projesinin kapsamına bağlı olarak süre değişiklik gösterir. Basit bir web sitesi 1-2 hafta içinde tamamlanabilirken, daha kapsamlı projeler 4-8 hafta sürebilir. Her proje başlangıcında size net bir zaman planı sunuyoruz."
  },
  {
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer: "Fiyatlandırma, projenin özelliklerine ve gereksinimlerine göre değişiklik gösterir. Tasarım karmaşıklığı, sayfa sayısı, özel fonksiyonlar ve entegrasyonlar gibi faktörler fiyatı etkiler. Size özel fiyat teklifi için iletişime geçebilirsiniz."
  },
  {
    question: "SEO hizmetleri dahil mi?",
    answer: "Evet, tüm web sitesi projelerimizde temel SEO optimizasyonları standart olarak sunulmaktadır. Ayrıca, daha kapsamlı SEO hizmetleri için özel paketlerimiz mevcuttur."
  },
  {
    question: "Mobil uyumlu tasarım yapıyor musunuz?",
    answer: "Evet, tüm web sitelerimiz responsive (mobil uyumlu) olarak tasarlanmaktadır. Mobil cihazlarda mükemmel görünüm ve kullanıcı deneyimi sağlıyoruz."
  },
  {
    question: "Hosting ve domain hizmeti veriyor musunuz?",
    answer: "Evet, hosting ve domain hizmetleri sunuyoruz. Size en uygun hosting paketini belirleyip, domain kaydınızı yapıyoruz. Ayrıca teknik destek ve bakım hizmetleri de sağlıyoruz."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-bg-primary pl-0 md:pl-24">
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative pt-32 pb-20"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Hero Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              İletişime <span className="text-accent">Geçin</span>
            </h1>
            <p className="text-lg text-text-body/80 max-w-2xl mx-auto">
              Projeleriniz için en iyi çözümleri sunmak için buradayız. Hemen iletişime geçin, görüşelim.
            </p>
          </m.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactInfo.map((item, index) => (
              <m.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-accent/20 transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="text-2xl text-accent" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-body/80 mb-4">{item.info}</p>
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>{item.action}</span>
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </m.a>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sıkça Sorulan <span className="text-accent">Sorular</span>
              </h2>
              <p className="text-text-body/80">
                Aklınıza takılan soruların cevaplarını burada bulabilirsiniz
              </p>
            </m.div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left text-white hover:text-accent transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <m.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className={`transform transition-colors ${openFaq === index ? 'text-accent' : 'text-white'}`} />
                    </m.div>
                  </button>
                  <m.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-body/80">
                      {faq.answer}
                    </div>
                  </m.div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </m.main>
    </div>
  );
} 