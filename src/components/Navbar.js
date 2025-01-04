'use client';

import { motion as m } from "framer-motion";
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaTools, FaProjectDiagram, FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 right-0">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex items-center justify-end h-24">
          <div className="flex items-center space-x-12">
            <div className="hidden md:flex space-x-8">
              <Link href="/" passHref legacyBehavior>
                <m.a
                  className="text-text-body hover:text-text-heading transition-colors text-sm font-mulish"
                  whileHover={{ scale: 1.05 }}
                >
                  Ana Sayfa
                </m.a>
              </Link>
              <Link href="/services" passHref legacyBehavior>
                <m.a
                  className="text-text-body hover:text-text-heading transition-colors text-sm font-mulish"
                  whileHover={{ scale: 1.05 }}
                >
                  Hizmetler
                </m.a>
              </Link>
              <Link href="/projects" passHref legacyBehavior>
                <m.a
                  className="text-text-body hover:text-text-heading transition-colors text-sm font-mulish"
                  whileHover={{ scale: 1.05 }}
                >
                  Projeler
                </m.a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <m.a
                  className="text-text-body hover:text-text-heading transition-colors text-sm font-mulish"
                  whileHover={{ scale: 1.05 }}
                >
                  İletişim
                </m.a>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <m.a
                href="https://wa.me/905439302395"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="border border-accent/20 text-accent hover:bg-accent/10 px-6 py-2 rounded-full text-sm transition-colors font-poppins"
              >
                Teklif Al
              </m.a>
            </div>

            {/* Modern Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <m.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-bg-primary to-bg-primary/95 backdrop-blur-lg md:hidden overflow-hidden"
      >
        {/* Close Button */}
        <m.button
          onClick={() => setIsOpen(false)}
          className="absolute top-7 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTimes className="text-white text-xl" />
        </m.button>

        <div className="flex flex-col items-center justify-center h-full pb-20 space-y-8">
          <m.div variants={itemVariants} className="overflow-hidden">
            <Link 
              href="/"
              className="flex items-center gap-3 text-text-body hover:text-white transition-colors text-xl font-mulish group"
              onClick={() => setIsOpen(false)}
            >
              <span className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <FaHome className="text-[#FF3366] text-xl" />
              </span>
              Ana Sayfa
            </Link>
          </m.div>
          <m.div variants={itemVariants} className="overflow-hidden">
            <Link 
              href="/services"
              className="flex items-center gap-3 text-text-body hover:text-white transition-colors text-xl font-mulish group"
              onClick={() => setIsOpen(false)}
            >
              <span className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <FaTools className="text-[#FF3366] text-xl" />
              </span>
              Hizmetler
            </Link>
          </m.div>
          <m.div variants={itemVariants} className="overflow-hidden">
            <Link 
              href="/projects"
              className="flex items-center gap-3 text-text-body hover:text-white transition-colors text-xl font-mulish group"
              onClick={() => setIsOpen(false)}
            >
              <span className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <FaProjectDiagram className="text-[#FF3366] text-xl" />
              </span>
              Projeler
            </Link>
          </m.div>
          <m.div variants={itemVariants} className="overflow-hidden">
            <Link 
              href="/contact"
              className="flex items-center gap-3 text-text-body hover:text-white transition-colors text-xl font-mulish group"
              onClick={() => setIsOpen(false)}
            >
              <span className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <FaEnvelope className="text-[#FF3366] text-xl" />
              </span>
              İletişim
            </Link>
          </m.div>
          <m.div variants={itemVariants} className="overflow-hidden pt-4">
            <m.a
              href="https://wa.me/905439302395"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 border border-accent/20 text-accent hover:bg-accent/10 px-8 py-4 rounded-full text-lg transition-colors font-poppins"
              onClick={() => setIsOpen(false)}
            >
              <FaWhatsapp className="text-xl" />
              Teklif Al
            </m.a>
          </m.div>
        </div>
      </m.div>
    </nav>
  );
} 