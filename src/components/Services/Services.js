'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MobileServices from './MobileServices';

// Mevcut Services componentini DesktopServices olarak yeniden adlandır
const DesktopServices = dynamic(() => import('./DesktopServices'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Services() {
  const [isMobile, setIsMobile] = useState(true); // Başlangıçta mobile göster

  useEffect(() => {
    // Ekran genişliğini kontrol et
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // İlk yüklemede kontrol et
    checkMobile();

    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile ? <MobileServices /> : <DesktopServices />;
} 