import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { useLocation } from "wouter";

export default function FloatingAdminButton() {
  const [, setLocation] = useLocation();
  const isAdminPage = window.location.pathname === "/admin";

  if (isAdminPage) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLocation("/admin")}
      className="fixed bottom-24 right-6 z-40 bg-purple-700 hover:bg-purple-800 text-white rounded-full p-4 shadow-lg cursor-pointer transition-colors"
      title="Painel de Administração"
    >
      <FaCog size={24} />
    </motion.button>
  );
}

