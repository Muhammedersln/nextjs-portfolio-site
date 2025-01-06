'use client';

import { motion as m, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

export default function MobileHero({ slides, currentSlide, setCurrentSlide }) {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const time = useRef(0);

  const getParticleConfig = () => ({
    count: 15,
    radius: 500,
    minDistance: 120,
    baseSize: { min: 1, max: 1.5 },
    wobbleMagnitude: { min: 4, max: 8 },
    speed: 0.1
  });

  const initParticles = useCallback((canvas) => {
    particles.current = [];
    const config = getParticleConfig();
    const colors = ['#fff', '#FF6B6B', '#4895EF'];

    // Mobil için parçacık oluşturma
    const createMobileParticle = () => {
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
        brightness: Math.random() * 0.3 + 0.7,
        wobble: {
          speed: Math.random() * 0.015 + 0.005,
          offset: Math.random() * Math.PI * 2,
          magnitude: Math.random() * (config.wobbleMagnitude.max - config.wobbleMagnitude.min) + config.wobbleMagnitude.min
        }
      };
    };

    // Mobil için tüm ekrana yayılmış parçacıklar
    for (let i = 0; i < config.count * 2; i++) {
      particles.current.push(createMobileParticle());
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
        const wobbleX = Math.cos(time.current * particle.wobble.speed + particle.wobble.offset) * particle.wobble.magnitude;
        const wobbleY = Math.sin(time.current * particle.wobble.speed + particle.wobble.offset) * particle.wobble.magnitude;

        // Sadece wobble hareketi
        particle.x = particle.originX + wobbleX;
        particle.y = particle.originY + wobbleY;

        const opacity = particle.brightness * 0.4;
        const color = particle.color.startsWith('#') ? hexToRgba(particle.color, opacity) : particle.color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        const connectionDistance = 80;
        particles.current.forEach(other => {
          const lineDx = other.x - particle.x;
          const lineDy = other.y - particle.y;
          const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDistance < connectionDistance) {
            const lineOpacity = (1 - lineDistance / connectionDistance) * 0.1;
            
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            gradient.addColorStop(0, hexToRgba(particle.color, lineOpacity));
            gradient.addColorStop(1, hexToRgba(other.color, lineOpacity));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.3;
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

  const hexToRgba = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` :
      hex;
  };

  useEffect(() => {
    setIsClient(true);
    initCanvas();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initCanvas]);

  return (
    <div className="relative z-10 h-full md:hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ touchAction: 'none', pointerEvents: 'none' }}
      />
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
                <button
                  className="w-full py-4 bg-accent text-white rounded-2xl font-medium shadow-lg shadow-accent/25 active:shadow-sm transition-all duration-300"
                >
                  Projeye Başla
                </button>
                <button
                  className="w-full py-4 bg-accent/5 backdrop-blur-sm border border-accent/20 text-accent rounded-2xl font-medium active:bg-accent/10 transition-all duration-300 shadow-sm"
                >
                  Daha Fazla
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Bottom Slide Indicators with Gradient Background */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
          <div className="relative pb-8 flex justify-center items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-6 bg-accent shadow-sm shadow-accent/50' 
                    : 'w-1.5 bg-text-heading/20'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 