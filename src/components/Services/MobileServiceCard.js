import { motion as m } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

export const MobileServiceCard = ({ service, index }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-12 w-full"
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-4">
            <m.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex items-center justify-center"
              style={{
                boxShadow: `0 0 30px ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20`
              }}
            >
              <m.div
                className="text-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {service.icon}
              </m.div>
            </m.div>
            
            <h2 className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, white 30%, ${service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')})`
                }}
              >
                {service.title}
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-base text-text-body/80 leading-relaxed">
            {service.longDescription}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div 
                  className="shrink-0 mt-1"
                  style={{
                    color: service.gradient.split(' ')[0].replace('from-[', '').replace(']', '')
                  }}
                >
                  <FaCheckCircle className="text-base" />
                </div>
                <p className="text-sm text-text-body/70">
                  {feature}
                </p>
              </m.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <m.a
              href={`https://wa.me/905439302395?text=Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-medium relative overflow-hidden group bg-[#075E54] hover:bg-[#128C7E] transition-all duration-300"
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center gap-2">
                <FaWhatsapp className="text-xl" />
                <span className="font-semibold">WhatsApp</span>
              </div>
            </m.a>

            <m.button
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-medium border border-white/10 hover:bg-white/5 transition-all relative overflow-hidden group"
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: service.gradient
                }}
              />
              <span>Detaylı Bilgi</span>
              <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
}; 