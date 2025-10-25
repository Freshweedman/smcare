import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface Notification {
  id: string;
  type: "inquiry" | "purchase" | "review";
  customerName: string;
  message: string;
  product?: string;
}

const customerMessages = [
  {
    type: "inquiry" as const,
    names: ["Maria Silva", "Ana Costa", "Juliana Oliveira", "Fernanda Souza", "Beatriz Lima"],
    messages: [
      "Olá! Tenho interesse no Body Splash. Qual é o melhor para minha pele?",
      "Oi! Vocês têm em estoque o Sérum Vitamina C?",
      "Gostaria de saber mais sobre o Creme Facial Noturno.",
      "Qual é a melhor base para pele oleosa?",
      "Vocês entregam em qual região?",
    ],
    products: ["Body Splash", "Sérum Vitamina C", "Creme Facial Noturno", "Base Líquida", ""],
  },
  {
    type: "purchase" as const,
    names: ["Carla Mendes", "Patricia Gomes", "Lucia Martins", "Roberta Santos", "Vanessa Costa"],
    messages: [
      "Acabei de comprar o Batom Líquido Matte! Adorei! 💕",
      "Comprei o Kit Spa e chegou perfeito!",
      "Já pedi o Rímel Volumizador. Mal posso esperar! 😍",
      "Acabei de fazer meu pedido do Shampoo Nutritivo.",
      "Comprei 3 produtos! Vocês são incríveis!",
    ],
    products: ["Batom Líquido", "Kit Spa", "Rímel Volumizador", "Shampoo Nutritivo", ""],
  },
  {
    type: "review" as const,
    names: ["Daniela Rocha", "Camila Barbosa", "Isabela Ferreira", "Mariana Alves", "Leticia Dias"],
    messages: [
      "O Blush em Pó é perfeito! Recomendo!",
      "Meu cabelo ficou muito melhor com o Óleo Capilar.",
      "A Máscara Facial Detox é sensacional!",
      "Adorei a qualidade dos produtos. Voltarei a comprar!",
      "Melhor compra que já fiz! Muito bom mesmo!",
    ],
    products: ["Blush em Pó", "Óleo Capilar", "Máscara Facial", "Produtos", ""],
  },
];

export default function CustomerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const generateNotification = () => {
      const categoryIndex = Math.floor(Math.random() * customerMessages.length);
      const category = customerMessages[categoryIndex];
      const messageIndex = Math.floor(Math.random() * category.messages.length);

      const notification: Notification = {
        id: `${Date.now()}_${Math.random()}`,
        type: category.type,
        customerName: category.names[messageIndex],
        message: category.messages[messageIndex],
        product: category.products[messageIndex],
      };

      setNotifications((prev) => {
        const updated = [...prev, notification];
        // Keep only last 3 notifications
        return updated.slice(-3);
      });

      // Remove notification after 8 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 8000);
    };

    // First notification after 3 seconds
    const initialTimer = setTimeout(generateNotification, 3000);

    // Then every 5 minutes (300000ms)
    const interval = setInterval(generateNotification, 300000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return "❓";
      case "purchase":
        return "✅";
      case "review":
        return "⭐";
      default:
        return "💬";
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "inquiry":
        return "bg-blue-50 border-blue-200";
      case "purchase":
        return "bg-green-50 border-green-200";
      case "review":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 400, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${getColor(
              notification.type
            )} border rounded-lg p-4 shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getIcon(notification.type)}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">
                  {notification.customerName}
                </p>
                <p className="text-xs text-gray-700 mt-1">{notification.message}</p>
                {notification.product && (
                  <p className="text-xs text-gray-600 mt-2 italic">
                    Produto: {notification.product}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

