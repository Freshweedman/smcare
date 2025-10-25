import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Star, Zap } from "lucide-react";
import type { Product } from "@/shared/types";
import { WHATSAPP_LINK } from "@/shared/const";

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Função para gerar um número aleatório de avaliações entre 150 e 500
const getRandomReviews = () => Math.floor(Math.random() * (500 - 150 + 1)) + 150;

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  // Calcular desconto
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const hasDiscount = discountPercentage > 0;

  const whatsappLink = `${WHATSAPP_LINK}?text=Olá! Quero garantir a oferta do *${encodeURIComponent(product.name)}*`;
  const reviewsCount = getRandomReviews();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(139, 71, 137, 0.3), 0 10px 10px -5px rgba(139, 71, 137, 0.1)" }}
        className="product-card-premium h-full flex flex-col rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative h-64 bg-gray-800 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
          {product.isBestSeller && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star size={14} fill="currentColor" /> MAIS VENDIDO
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Zap size={14} /> PROMOÇÃO
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 flex-1 flex flex-col text-white">
          {/* Product Name */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-purple-300">
            {product.name}
          </h3>

          {/* Volume / Category */}
          <div className="flex justify-between items-center mb-2">
            {product.volume && (
              <p className="text-xs text-gray-400">{product.volume}</p>
            )}
            {product.category && (
              <span className="text-xs bg-purple-700/50 text-purple-200 px-2 py-1 rounded-full">
                {product.category}
              </span>
            )}
          </div>

          {/* Avaliações */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" className="mr-1" />
            ))}
            <span className="text-xs text-gray-400 ml-1">({reviewsCount} avaliações)</span>
          </div>

          {/* Price Section */}
          <div className="mb-4 pt-2 border-t border-gray-700">
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-gray-500 line-through mb-1">
                De R$ {product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-3xl font-extrabold text-white">
              Por R$ {product.price.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-green-400 font-semibold mt-1">
                Economize R$ {(product.originalPrice! - product.price).toFixed(2)} ({discountPercentage}%)
              </p>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-2 mt-auto">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 107, 53, 0.8)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-xl text-lg animate-pulse-slow"
            >
              🔥 GARANTIR OFERTA AGORA
            </motion.a>
            <motion.a
              href={`${WHATSAPP_LINK}?text=Olá! Gostaria de consultar sobre o produto *${encodeURIComponent(product.name)}*`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-700/50 text-gray-300 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm border border-gray-600 hover:bg-gray-600/70"
            >
              📱 Consultar no WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
