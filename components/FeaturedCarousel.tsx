import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Product } from "@/shared/types";
import { WHATSAPP_LINK } from "@/shared/const";

interface FeaturedCarouselProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const featuredProducts = products.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + featuredProducts.length) % featuredProducts.length);
  };

  const product = featuredProducts[current];
  const whatsappLink = `${WHATSAPP_LINK}?text=Olá! Tenho interesse no produto *${encodeURIComponent(product.name)}*. Pode me passar mais informações?`;

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden flex items-center justify-center">
      {/* Background blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={current}
            src={product.image}
            alt={product.name}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-between gap-12">
        {/* Left side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-white"
        >
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-purple-300 text-sm font-semibold tracking-widest uppercase mb-4">
              Destaque da Semana
            </p>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              {product.name}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-lg leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-bold">R$ {product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-2xl text-purple-300 line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* CTA Button */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            >
              Comprar Agora
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right side - Product Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 hidden lg:flex items-center justify-center"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="h-96 w-96 object-contain drop-shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-4 rounded-full transition-all"
      >
        <FaChevronLeft size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-4 rounded-full transition-all"
      >
        <FaChevronRight size={24} />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {featuredProducts.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`h-3 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50 w-3"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}

