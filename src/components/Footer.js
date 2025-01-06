'use client';

import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-bg-primary to-bg-primary/50" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Main Footer Content */}
          <div className="py-16 md:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
              {/* Company Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-6">
                  Eraslan Medya
                </h3>
                <p className="text-text-body/70 mb-8 text-base leading-relaxed">
                  Dijital dünyada markanızı güçlendirmek için yanınızdayız.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="https://wa.me/905439302395" target="_blank">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500/20 flex items-center justify-center border border-white/10 hover:border-green-500/20 transition-colors group"
                    >
                      <FaWhatsapp className="text-white/50 group-hover:text-green-500 transition-colors" size={18} />
                    </motion.div>
                  </Link>
                  <Link href="https://instagram.com" target="_blank">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 flex items-center justify-center border border-white/10 hover:border-pink-500/20 transition-colors group"
                    >
                      <FaInstagram className="text-white/50 group-hover:text-pink-500 transition-colors" size={18} />
                    </motion.div>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 flex items-center justify-center border border-white/10 hover:border-blue-500/20 transition-colors group"
                    >
                      <FaLinkedin className="text-white/50 group-hover:text-blue-500 transition-colors" size={18} />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white/90 mb-6">Hızlı Bağlantılar</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/" className="group flex items-center gap-2 text-text-body/60 hover:text-accent transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="group flex items-center gap-2 text-text-body/60 hover:text-accent transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                      Hizmetler
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="group flex items-center gap-2 text-text-body/60 hover:text-accent transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                      İletişim
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="sm:col-span-2 lg:col-span-2"
              >
                <h3 className="text-lg font-semibold text-white/90 mb-6">İletişim</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.a 
                    href="tel:+905439302395"
                    whileHover={{ scale: 1.02 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <FaPhone className="text-accent" size={16} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 mb-1">Telefon</div>
                      <div className="text-white/80 group-hover:text-accent transition-colors">+90 543 930 2395</div>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="mailto:info@eraslanmedya.com"
                    whileHover={{ scale: 1.02 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <FaEnvelope className="text-accent" size={16} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 mb-1">E-posta</div>
                      <div className="text-white/80 group-hover:text-accent transition-colors">info@eraslanmedya.com</div>
                    </div>
                  </motion.a>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="sm:col-span-2 flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-accent" size={16} />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 mb-1">Adres</div>
                      <div className="text-white/80">İstanbul, Türkiye</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-6 border-t border-white/5">
            <div className="text-center text-sm text-text-body/40">
              &copy; {currentYear} <span className="text-accent">Eraslan Medya</span>. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 