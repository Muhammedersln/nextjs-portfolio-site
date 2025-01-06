'use client';

import { motion as m, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

const slides = [
  {
    title: "Tasarım ve Yazılım Çözümleri",
    subtitle: "YARATICI FİKİRLER",
    description: "Profesyonel ekibimizle işletmeniz için yeni teknolojiler ve yaratıcı çözümler üretiyoruz."
  },
  {
    title: "Modern Web Teknolojileri",
    subtitle: "YENİLİKÇİ YAKLAŞIM",
    description: "En son web teknolojileri ile hızlı, güvenli ve ölçeklenebilir uygulamalar geliştiriyoruz."
  },
  {
    title: "Özel Yazılım Geliştirme",
    subtitle: "UZMAN EKİP",
    description: "İşletmenizin ihtiyaçlarına özel, rekabet avantajı sağlayan yazılım çözümleri sunuyoruz."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const time = useRef(0);

  const getParticleConfig = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      count: isMobile ? 15 : 100,
      radius: isMobile ? 500 : 1400,
      minDistance: isMobile ? 120 : 300,
      baseSize: isMobile ? { min: 1, max: 1.5 } : { min: 3, max: 5 },
      wobbleMagnitude: isMobile ? { min: 4, max: 8 } : { min: 20, max: 30 },
      speed: isMobile ? 0.1 : 0.8
    };
  };

  const initParticles = useCallback((canvas) => {
    particles.current = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const config = getParticleConfig();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const colors = ['#fff', '#FF6B6B', '#4895EF'];

    // Mobil için parçacık oluşturma fonksiyonu
    const createMobileParticle = () => {
      // Tüm ekrana yayılmış rastgele pozisyon
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      return {
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
        baseSize: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: 0,
        speedY: 0,
        velocity: Math.random() * config.speed + 0.2,
        angle: Math.random() * Math.PI * 2,
        force: 0,
        distance: 0,
        brightness: Math.random() * 0.3 + 0.7,
        wobble: {
          speed: Math.random() * 0.015 + 0.005,
          offset: Math.random() * Math.PI * 2,
          magnitude: Math.random() * (config.wobbleMagnitude.max - config.wobbleMagnitude.min) + config.wobbleMagnitude.min
        },
        // Mobil için otomatik hareket parametreleri
        autoMove: {
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.2 + 0.1, // Çok yavaş hareket
          changeTime: Math.random() * 5000 + 3000, // 3-8 saniye arası yön değişimi
          lastChange: Date.now()
        }
      };
    };

    if (isMobile) {
      // Mobil için tüm ekrana yayılmış parçacıklar
      for (let i = 0; i < config.count * 2; i++) {
        particles.current.push(createMobileParticle());
      }
    } else {
      // Desktop için mevcut sağ-sol dağılımlı parçacıklar
      // Sol taraf parçacıkları
      for (let i = 0; i < config.count; i++) {
        const angle = (Math.PI * Math.random()) - Math.PI/2;
        const radius = Math.random() * config.radius + 300;
        const x = Math.max(20, Math.min(centerX - 200, centerX - canvas.width/1.8 + Math.cos(angle) * radius));
        const y = centerY + Math.sin(angle) * radius;
        
        particles.current.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
          baseSize: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: 0,
          speedY: 0,
          velocity: Math.random() * config.speed + 0.3,
          angle: Math.random() * Math.PI * 2,
          force: 0,
          distance: 0,
          brightness: Math.random() * 0.3 + 0.7,
          wobble: {
            speed: Math.random() * 0.015 + 0.005,
            offset: Math.random() * Math.PI * 2,
            magnitude: Math.random() * (config.wobbleMagnitude.max - config.wobbleMagnitude.min) + config.wobbleMagnitude.min
          }
        });
      }

      // Sağ taraf parçacıkları
      for (let i = 0; i < config.count; i++) {
        const angle = Math.PI * Math.random() + Math.PI/2;
        const radius = Math.random() * config.radius + 300;
        const x = Math.min(canvas.width - 20, Math.max(centerX + 200, centerX + canvas.width/1.8 + Math.cos(angle) * radius));
        const y = centerY + Math.sin(angle) * radius;
        
        particles.current.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
          baseSize: Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: 0,
          speedY: 0,
          velocity: Math.random() * config.speed + 0.3,
          angle: Math.random() * Math.PI * 2,
          force: 0,
          distance: 0,
          brightness: Math.random() * 0.3 + 0.7,
          wobble: {
            speed: Math.random() * 0.015 + 0.005,
            offset: Math.random() * Math.PI * 2,
            magnitude: Math.random() * (config.wobbleMagnitude.max - config.wobbleMagnitude.min) + config.wobbleMagnitude.min
          }
        });
      }
    }
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = true;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      time.current += 0.016;
      ctx.fillStyle = 'rgba(17, 19, 25, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(particle => {
        // Doğal hareket
        const wobbleX = Math.cos(time.current * particle.wobble.speed + particle.wobble.offset) * particle.wobble.magnitude;
        const wobbleY = Math.sin(time.current * particle.wobble.speed + particle.wobble.offset) * particle.wobble.magnitude;
        
        // Mobilde otomatik hareket
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          const now = Date.now();
          
          // Yön değişimi zamanı geldiyse
          if (now - particle.autoMove.lastChange > particle.autoMove.changeTime) {
            particle.autoMove.angle = Math.random() * Math.PI * 2;
            particle.autoMove.speed = Math.random() * 0.2 + 0.1;
            particle.autoMove.changeTime = Math.random() * 5000 + 3000;
            particle.autoMove.lastChange = now;
          }

          // Otomatik hareket uygula
          particle.speedX += Math.cos(particle.autoMove.angle) * particle.autoMove.speed * 0.01;
          particle.speedY += Math.sin(particle.autoMove.angle) * particle.autoMove.speed * 0.01;

          // Ekran sınırlarını kontrol et
          const margin = 50;
          if (particle.x < margin) particle.speedX += 0.02;
          if (particle.x > canvas.width - margin) particle.speedX -= 0.02;
          if (particle.y < margin) particle.speedY += 0.02;
          if (particle.y > canvas.height - margin) particle.speedY -= 0.02;

          // Çok yavaş hareket için ekstra sürtünme
          particle.speedX *= 0.98;
          particle.speedY *= 0.98;
        } else {
          // Desktop için mevcut mouse etkileşimi kodu
          const dx = mousePos.current.x - (particle.originX + wobbleX);
          const dy = mousePos.current.y - (particle.originY + wobbleY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 5;
            particle.force = force;
            particle.distance = distance;
            
            const angle = Math.atan2(dy, dx);
            const dampening = Math.min(1, distance / 50);
            particle.speedX = -Math.cos(angle) * force * particle.velocity * dampening;
            particle.speedY = -Math.sin(angle) * force * particle.velocity * dampening;
            
            particle.size = particle.baseSize * (1 + force * 0.2);
          } else {
            particle.force = 0;
            particle.distance = 0;
            particle.size = particle.baseSize;
          }
        }

        // Wobble pozisyonuna dön
        const targetX = particle.originX + wobbleX;
        const targetY = particle.originY + wobbleY;
        const homeX = targetX - particle.x;
        const homeY = targetY - particle.y;
        particle.speedX += homeX * 0.03;
        particle.speedY += homeY * 0.03;

        // Sürtünme uygula
        particle.speedX *= 0.95;
        particle.speedY *= 0.95;

        // Pozisyonu güncelle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Parçacığı çiz
        const opacity = particle.brightness * (0.4 + (particle.force * 0.3));
        const color = particle.color.startsWith('#') ? hexToRgba(particle.color, opacity) : particle.color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Bağlantı çizgileri - mobilde daha az bağlantı
        const connectionDistance = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 100;
        particles.current.forEach(other => {
          const lineDx = other.x - particle.x;
          const lineDy = other.y - particle.y;
          const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDistance < connectionDistance) {
            const lineOpacity = (1 - lineDistance / connectionDistance) * 0.1 * 
              (1 + Math.max(particle.force, other.force));
            
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            gradient.addColorStop(0, hexToRgba(particle.color, lineOpacity));
            gradient.addColorStop(1, hexToRgba(other.color, lineOpacity));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [initParticles]);

  // Hex rengi RGBA'ya çevir
  const hexToRgba = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` :
      hex;
  };

  useEffect(() => {
    setIsClient(true);
    
    // Sadece desktop için mouse ve touch event'lerini ekle
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    initCanvas();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [initCanvas]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!canvasRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleTouchMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    
    if (!canvasRef.current || !e.touches[0]) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  };

  return (
    <header className="relative h-screen overflow-hidden bg-bg-primary">
      {/* Background Grid - Both Mobile and Desktop */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.015] md:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '1rem 1rem',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '6rem 6rem',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/70 to-bg-primary/90 md:from-bg-primary/50 md:via-transparent md:to-bg-primary/80" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 md:opacity-100"
        style={{ touchAction: 'none', pointerEvents: isClient && typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'auto' }}
      />

      {/* Mobile Hero Content */}
      <div className="relative z-10 h-full md:hidden">
        <div className="h-full flex flex-col">
          {/* Top Design Element */}
          <div className="relative h-1">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-accent/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-accent/10 to-transparent" />
          </div>
          
          <div className="flex-1 flex flex-col justify-center px-6">
            <AnimatePresence mode="wait">
              <m.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8 relative"
              >
                <div className="space-y-3">
                  <m.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 shadow-sm"
                  >
                    <span className="text-xs font-medium text-accent tracking-wider">
                      {slides[currentSlide].subtitle}
                    </span>
                  </m.div>
                  
                  <h1 className="text-[2.5rem] font-bold text-text-heading leading-[1.15] font-poppins drop-shadow-sm">
                    {slides[currentSlide].title}
                    <span className="text-accent">.</span>
                  </h1>
                </div>

                <p className="text-base text-text-body/90 font-mulish leading-relaxed drop-shadow-sm">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-col space-y-3 pt-4">
                  <m.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-accent text-white rounded-2xl font-medium shadow-lg shadow-accent/25 active:shadow-sm transition-all duration-300"
                  >
                    Projeye Başla
                  </m.button>
                  <m.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-accent/5 backdrop-blur-sm border border-accent/20 text-accent rounded-2xl font-medium active:bg-accent/10 transition-all duration-300 shadow-sm"
                  >
                    Daha Fazla
                  </m.button>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Bottom Slide Indicators with Gradient Background */}
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
            <div className="relative pb-8 flex justify-center items-center space-x-2">
              {slides.map((_, index) => (
                <m.button
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-6 bg-accent shadow-sm shadow-accent/50' 
                      : 'w-1.5 bg-text-heading/20'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Hero Content */}
      <div className="relative z-10 h-full hidden md:flex items-center justify-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <m.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center space-x-3 text-sm font-medium text-accent mb-4 tracking-wider font-poppins">
                  <div className="w-8 h-px bg-accent"></div>
                  <span>{slides[currentSlide].subtitle}</span>
                  <div className="w-8 h-px bg-accent"></div>
                </div>
                <h1 className="text-7xl font-bold text-text-heading mb-6 leading-tight font-poppins">
                  {slides[currentSlide].title}<span className="text-accent">.</span>
                </h1>
                <p className="text-lg mb-12 opacity-80 font-mulish mx-auto">
                  {slides[currentSlide].description}
                </p>
                <div className="flex items-center justify-center space-x-6">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25"
                  >
                    Projeye Başla
                  </m.button>
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-accent/20 text-accent rounded-full font-medium hover:bg-accent/10 transition-colors"
                  >
                    Daha Fazla
                  </m.button>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <m.div
              key={index}
              className={`w-8 h-1 rounded-full transition-colors duration-300 cursor-pointer ${
                index === currentSlide ? 'bg-accent' : 'bg-text-heading/20'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </header>
  );
} 