'use client';

import { motion as m } from "framer-motion";
import { FiInstagram, FiGlobe } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-transparent flex flex-col items-center py-12 z-50">
      <div className="flex-1 flex items-center">
        <div className="space-y-12">
          {/* Instagram */}
          <m.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-body/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <FiInstagram size={20} />
          </m.a>

          {/* Website 1 */}
          <m.a
            href="#"
            className="block text-text-body/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <FiGlobe size={20} />
          </m.a>

          {/* Website 2 */}
          <m.a
            href="#"
            className="block text-text-body/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <FiGlobe size={20} />
          </m.a>

          {/* Vertical Line */}
          <div className="h-24 w-[1px] mx-auto bg-text-body/20"></div>

          {/* Text Links */}
          <m.a
            href="#"
            className="block rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.25em] text-text-body/50 uppercase font-light hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Portfolio
          </m.a>
          <m.a
            href="#"
            className="block rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.25em] text-text-body/50 uppercase font-light hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Blog
          </m.a>
        </div>
      </div>
    </div>
  );
} 