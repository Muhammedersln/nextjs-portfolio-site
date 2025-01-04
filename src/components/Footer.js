import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/[0.02] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Eraslan Medya</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Dijital dünyada markanızı güçlendirmek için yanınızdayız.
            </p>
            <div className="flex space-x-4">
              <Link href="https://wa.me/905439302395" target="_blank" className="text-gray-400 hover:text-green-500 transition-colors">
                <FaWhatsapp size={20} className="hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram size={20} className="hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaLinkedin size={20} className="hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF3366] transition-colors text-sm md:text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FF3366]/50 rounded-full group-hover:scale-150 transition-transform"></span>
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#FF3366] transition-colors text-sm md:text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FF3366]/50 rounded-full group-hover:scale-150 transition-transform"></span>
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF3366] transition-colors text-sm md:text-base flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FF3366]/50 rounded-full group-hover:scale-150 transition-transform"></span>
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 text-sm md:text-base group">
                <FaPhone className="text-[#FF3366] group-hover:scale-110 transition-transform" />
                <span className="hover:text-white transition-colors">+90 543 930 2395</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm md:text-base group">
                <FaEnvelope className="text-[#FF3366] group-hover:scale-110 transition-transform" />
                <span className="hover:text-white transition-colors">info@eraslanmedya.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm md:text-base group">
                <FaMapMarkerAlt className="text-[#FF3366] group-hover:scale-110 transition-transform" />
                <span className="hover:text-white transition-colors">İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 mt-10 md:mt-16 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} <span className="text-[#FF3366]">Eraslan Medya</span>. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 