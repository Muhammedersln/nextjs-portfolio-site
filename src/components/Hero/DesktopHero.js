'use client';

import { motion as m, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

export default function DesktopHero({ slides, currentSlide, setCurrentSlide }) {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const time = useRef(0);

  const getParticleConfig = () => ({
    count: 100,
    radius: 1400,
    minDistance: 300,
    baseSize: { min: 3, max: 5 },
    wobbleMagnitude: { min: 20, max: 30 },
    speed: 0.8
  });

  const initParticles = useCallback((canvas) => {
    particles.current = [];
    const config = getParticleConfig();
    const colors = ['#fff', '#FF6B6B', '#4895EF'];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

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

        const targetX = particle.originX + wobbleX;
        const targetY = particle.originY + wobbleY;
        const homeX = targetX - particle.x;
        const homeY = targetY - particle.y;
        particle.speedX += homeX * 0.03;
        particle.speedY += homeY * 0.03;

        particle.speedX *= 0.95;
        particle.speedY *= 0.95;

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        const opacity = particle.brightness * (0.4 + (particle.force * 0.3));
        const color = particle.color.startsWith('#') ? hexToRgba(particle.color, opacity) : particle.color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        const connectionDistance = 100;
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
  }, [initParticles]);

  const hexToRgba = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` :
      hex;
  };

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
  };

  useEffect(() => {
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

  return (
    <div className="relative z-10 h-full hidden md:flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />
      <div className="container mx-auto px-8 relative flex flex-col min-h-[600px]">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-2xl mx-auto text-center">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -30,
                  transition: {
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }}
                className="w-full"
              >
                <div className="flex items-center justify-center space-x-3 text-sm font-medium text-accent mb-4 tracking-wider font-poppins">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-px bg-accent"
                  />
                  <m.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {slides[currentSlide].subtitle}
                  </m.span>
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-px bg-accent"
                  />
                </div>
                <m.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-7xl font-bold text-text-heading mb-6 leading-tight font-poppins"
                >
                  {slides[currentSlide].title}<span className="text-accent">.</span>
                </m.h1>
                <m.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg mb-12 opacity-80 font-mulish mx-auto max-w-xl"
                >
                  {slides[currentSlide].description}
                </m.p>
                <m.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex items-center justify-center space-x-6"
                >
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25"
                  >
                    Projeye Başla
                  </m.button>
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="px-8 py-4 border border-accent/20 text-accent rounded-full font-medium hover:bg-accent/10 transition-colors"
                  >
                    Daha Fazla
                  </m.button>
                </m.div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="h-32 relative flex items-end justify-center pb-12">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <m.div
                key={index}
                className={`w-8 h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentSlide ? 'bg-accent' : 'bg-text-heading/20'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 