import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaTruck, FaSmile, FaGift, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Zap, Sparkles, Star, Truck, Shield, Clock, ShoppingCart, Gift, Droplet, Users, Tag, Heart, BadgeCheck, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingAdminButton from "@/components/FloatingAdminButton";
import CustomerNotifications from "@/components/CustomerNotifications";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { STORE_NAME, STORE_OWNER, WHATSAPP_LINK, LOGO_URL, WHATSAPP_NUMBER } from "@/shared/const";
import { INITIAL_PRODUCTS } from "@/lib/initialProducts";
import { useProducts } from "@/lib/useProducts";
import { Product } from "@/../../shared/types";

// Definição das categorias e seus ícones (Lucide React)
const categories = [
  { name: "Kits Presente", icon: Gift, color: "text-pink-500" },
  { name: "Perfumes Femininos", icon: Sparkles, color: "text-purple-500" },
  { name: "Perfumes Masculinos", icon: Users, color: "text-blue-500" },
  { name: "Hidratantes Corporais", icon: Droplet, color: "text-green-500" },
  { name: "Promoções", icon: Zap, color: "text-red-500" },
];

// Badges de Confiança
const trustBadges = [
  { icon: BadgeCheck, label: "Revendedora Oficial", color: "text-purple-600" },
  { icon: Shield, label: "Compra Segura", color: "text-green-600" },
  { icon: Truck, label: "Entrega Garantida", color: "text-orange-600" },
  { icon: Heart, label: "Produtos Originais", color: "text-red-600" },
  { icon: MessageCircle, label: "Atendimento Personalizado", color: "text-blue-600" },
];

// Componente para o Card de Categoria
const CategoryCard = ({ category }: { category: typeof categories[0] }) => {
  const Icon = category.icon;
  return (
    <motion.a
      href={`#${category.name.toLowerCase().replace(/\s/g, '-')}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className="p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/10 border border-white/20 text-center cursor-pointer transition-all duration-300"
    >
      <Icon className={`text-4xl mx-auto mb-3 ${category.color}`} />
      <p className="text-sm font-semibold text-white">{category.name}</p>
    </motion.a>
  );
};

export default function Home() {
  const { products } = useProducts(INITIAL_PRODUCTS);

  const bestSellers = products.filter((p: Product) => p.isBestSeller);
  const otherProducts = products.filter((p: Product) => !p.isBestSeller);

  // Função para agrupar produtos por categoria
  const productsByCategory = otherProducts.reduce((acc: { [key: string]: Product[] }, product: Product) => {
    const category = product.category || "Outros";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* HEADER - SEÇÃO DE AUTORIDADE */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/80 shadow-2xl"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <img src={LOGO_URL} alt="Logo" className="h-12 w-12 object-contain rounded-full shadow-lg" />
              <BadgeCheck className="absolute -top-1 -right-1 text-purple-400 fill-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{STORE_OWNER}</h1>
              <p className="text-xs text-purple-300">Perfumes e Cosméticos Originais • Entrega Rápida</p>
            </div>
          </motion.div>

          <motion.a
            href="https://www.instagram.com/seu_instagram" // Placeholder para o Instagram
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FaInstagram size={18} /> Siga no Instagram
          </motion.a>
        </div>
      </motion.header>

      {/* HERO / CAROUSEL */}
      <FeaturedCarousel products={products} />

      {/* TRUST BADGES */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-lg bg-gray-700/50 shadow-inner"
                >
                  <Icon className={`text-3xl ${badge.color} mx-auto mb-2`} />
                  <p className="text-xs font-semibold text-white">{badge.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* BOX DE CATEGORIAS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Explore Nossas Categorias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* MAIS VENDIDOS (Top 5) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-800"
        id="mais-vendidos"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🔥 Mais Vendidos
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Os favoritos dos nossos clientes. Garanta o seu antes que acabe!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CATÁLOGO COMPLETO POR CATEGORIA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-900"
        id="catalogo-completo"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Catálogo Completo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra a seleção completa de produtos.
            </p>
          </motion.div>

          {Object.entries(productsByCategory).map(([category, prods], index) => (
            <div key={index} id={category.toLowerCase().replace(/\s/g, '-')} className="mb-20">
              <h3 className="text-3xl font-bold mb-8 border-l-4 border-purple-500 pl-4 text-white">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {prods.map((product, pIndex) => (
                  <ProductCard key={product.id} product={product} index={pIndex} />
                ))}
              </div>
            </div>
          ))}

          {/* Botão Catálogo Completo WhatsApp */}
          <div className="text-center mt-16">
            <motion.a
              href={`${WHATSAPP_LINK}?text=Olá! Gostaria de ver o catálogo completo`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 animate-pulse"
            >
              <FaWhatsapp size={24} /> VER TODO CATÁLOGO NO WHATSAPP
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-black text-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-400">Sobre</h3>
              <p className="text-gray-400">
                Revendedora oficial do Grupo Boticário, oferecendo os melhores produtos de beleza e cuidados pessoais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-400">Contato</h3>
              <p className="text-gray-400">
                📱 WhatsApp: <a href={WHATSAPP_LINK} className="text-green-400 hover:underline">{WHATSAPP_NUMBER}</a>
              </p>
              <p className="text-gray-400">
                ⏰ Atendimento 24/7
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-400">Horário</h3>
              <p className="text-gray-400">
                Segunda a domingo
              </p>
              <p className="text-gray-400">
                10h às 18h
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 {STORE_OWNER} - Grupo Boticário. Todos os direitos reservados.</p>
          </div>
        </div>
      </motion.footer>

      {/* Floating Buttons */}
      <FloatingWhatsApp />
      <FloatingAdminButton />
      <CustomerNotifications />
    </div>
  );
}
