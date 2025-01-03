'use client';

import { motion as m } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 right-0">
      <div className="container mx-auto px-24">
        <div className="flex items-center justify-end h-24">
          <div className="flex items-center space-x-12">
            <div className="hidden md:flex space-x-8">
              {['Hizmetler', 'Projeler', 'İletişim'].map((item) => (
                <m.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-text-body hover:text-text-heading transition-colors text-sm font-mulish"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </m.a>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-text-body text-sm font-mulish">+1 845 631 78 49</span>
              <m.button
                whileHover={{ scale: 1.05 }}
                className="border border-accent/20 text-accent hover:bg-accent/10 px-6 py-2 rounded-full text-sm transition-colors font-poppins"
              >
                Teklif Al
              </m.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 