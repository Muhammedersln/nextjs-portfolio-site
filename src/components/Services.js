'use client';

import { motion } from 'framer-motion';

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
    gradient: "from-[#4F46E5] to-[#9333EA]"
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
    gradient: "from-[#EC4899] to-[#F97316]"
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
    gradient: "from-[#10B981] to-[#0D9488]"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Services() {
  return (
    <section className="py-32 bg-bg-secondary relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl translate-y-1/2 animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center space-x-3 text-sm font-medium text-accent mb-6 tracking-wider font-poppins">
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent/0 to-accent"></div>
            <span>HİZMETLERİMİZ</span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-accent/0 to-accent"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-text-heading mb-8 font-poppins">
            Neler Sunuyoruz<span className="text-accent animate-pulse">?</span>
          </h2>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`relative group overflow-hidden rounded-2xl bg-gradient-to-b ${service.gradient} p-[2px] min-h-[600px] transition-all duration-500`}
            >
              <div className="relative h-full bg-bg-primary/90 backdrop-blur-xl rounded-2xl p-8">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-8">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold font-poppins bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
                      {service.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-white/40 to-transparent rounded-full mb-6"></div>
                    <p className="text-lg text-text-body/80 font-mulish">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center space-x-3 text-text-body/90 font-mulish group-hover:translate-x-2 transition-transform duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mt-8"
                  >
                    <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-medium transition-all duration-300 font-poppins group-hover:bg-white/30">
                      Detaylı Bilgi
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 