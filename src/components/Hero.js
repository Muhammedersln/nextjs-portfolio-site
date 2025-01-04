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

  const initParticles = (canvas) => {
    particles.current = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const colors = ['#fff', '#FF6B6B', '#4895EF'];  // Beyaz ve accent rengi

    // Sol taraf parçacıkları
    for (let i = 0; i < 100; i++) {
      const angle = (Math.PI * Math.random()) - Math.PI/2;
      const radius = Math.random() * 1400 + 400;
      const x = Math.max(20, Math.min(centerX - 300, centerX - canvas.width/1.5 + Math.cos(angle) * radius));
      const y = centerY + Math.sin(angle) * radius;
      
      particles.current.push({
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * 3 + 2,
        baseSize: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: 0,
        speedY: 0,
        velocity: Math.random() * 0.8 + 0.5, // Daha da yavaş hareket
        angle: Math.random() * Math.PI * 2,
        force: 0,
        distance: 0,
        brightness: Math.random() * 0.3 + 0.7,
        wobble: {
          speed: Math.random() * 0.02 + 0.01,
          offset: Math.random() * Math.PI * 2,
          magnitude: Math.random() * 30 + 20
        }
      });
    }

    // Sağ taraf parçacıkları
    for (let i = 0; i < 100; i++) {
      const angle = Math.PI * Math.random() + Math.PI/2;
      const radius = Math.random() * 1400 + 400;
      const x = Math.min(canvas.width - 20, Math.max(centerX + 300, centerX + canvas.width/1.5 + Math.cos(angle) * radius));
      const y = centerY + Math.sin(angle) * radius;
      
      particles.current.push({
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * 3 + 2,
        baseSize: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: 0,
        speedY: 0,
        velocity: Math.random() * 0.8 + 0.5, // Daha da yavaş hareket
        angle: Math.random() * Math.PI * 2,
        force: 0,
        distance: 0,
        brightness: Math.random() * 0.3 + 0.7,
        wobble: {
          speed: Math.random() * 0.02 + 0.01,
          offset: Math.random() * Math.PI * 2,
          magnitude: Math.random() * 30 + 20
        }
      });
    }
  };

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
        
        // Mouse etkileşimi
        const dx = mousePos.current.x - (particle.originX + wobbleX);
        const dy = mousePos.current.y - (particle.originY + wobbleY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300; // Daha kısa etki mesafesi

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 5; // Daha yumuşak itme (8'den 5'e)
          particle.force = force;
          particle.distance = distance;
          
          // Parçacıkları mouse'dan uzaklaştır
          const angle = Math.atan2(dy, dx);
          const dampening = Math.min(1, distance / 50); // Çok yakında daha kontrollü hareket
          particle.speedX = -Math.cos(angle) * force * particle.velocity * dampening;
          particle.speedY = -Math.sin(angle) * force * particle.velocity * dampening;
          
          // Parçacık boyutunu büyüt
          particle.size = particle.baseSize * (1 + force * 0.2); // Daha az büyüme (0.3'ten 0.2'ye)
        } else {
          particle.force = 0;
          particle.distance = 0;
          particle.size = particle.baseSize;
          
          // Wobble pozisyonuna dön
          const targetX = particle.originX + wobbleX;
          const targetY = particle.originY + wobbleY;
          const homeX = targetX - particle.x;
          const homeY = targetY - particle.y;
          particle.speedX += homeX * 0.03;
          particle.speedY += homeY * 0.03;
        }

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

        // Bağlantı çizgileri
        particles.current.forEach(other => {
          const lineDx = other.x - particle.x;
          const lineDy = other.y - particle.y;
          const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDistance < 100) {
            const lineOpacity = (1 - lineDistance / 100) * 0.1 * 
              (1 + Math.max(particle.force, other.force));
            
            // Renk karışımı
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            gradient.addColorStop(0, hexToRgba(particle.color, lineOpacity));
            gradient.addColorStop(1, hexToRgba(other.color, lineOpacity));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
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
  }, []);

  // Hex rengi RGBA'ya çevir
  const hexToRgba = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` :
      hex;
  };

  useEffect(() => {
    setIsClient(true);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    initCanvas();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [initCanvas]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleTouchMove = (e) => {
    if (!canvasRef.current || !e.touches[0]) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
    e.preventDefault();
  };

  return (
    <header className="relative h-screen overflow-hidden bg-bg-primary">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '10rem 10rem',
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        style={{ touchAction: 'none' }}
      />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
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
    </header>
  );
} 