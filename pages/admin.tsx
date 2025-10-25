import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useLocation } from "wouter";
import { useProducts } from "@/lib/useProducts";
import type { Product } from "@/shared/types";
import { STORE_NAME, ADMIN_PASSWORD } from "@/shared/const";

interface FormData {
  code: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  vegan: boolean;
  volume?: string;
}

const initialFormData: FormData = {
  code: "",
  name: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  image: "",
  category: "",
  vegan: false,
  volume: "",
};

export default function Admin() {
  const [, setLocation] = useLocation();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Senha incorreta!");
    }
    }
  };

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        code: product.code,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        vegan: product.vegan || false,
        volume: product.volume,
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (editingId) {
      const productToUpdate = products.find((p) => p.id === editingId);
      if (productToUpdate) {
        updateProduct(editingId, {
          ...formData,
          price: parseFloat(String(formData.price)),
          originalPrice: formData.originalPrice
            ? parseFloat(String(formData.originalPrice))
            : undefined,
        });
      }
    } else {
      addProduct({
        ...formData,
        price: parseFloat(String(formData.price)),
        originalPrice: formData.originalPrice
          ? parseFloat(String(formData.originalPrice))
          : undefined,
      });
    }

    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      deleteProduct(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-purple flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">
            Painel Admin
          </h1>
          <p className="text-gray-600 text-center mb-8">{STORE_NAME}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Acessar
            </button>
          </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Dica: Use a senha padrão (admin123) para acessar
            </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-soft sticky top-0 z-30"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="text-purple-700 hover:bg-purple-100 p-2 rounded-lg transition-colors"
              title="Voltar para home"
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-purple-700">Painel de Administração</h1>
              <p className="text-xs text-gray-600">Gerenciar produtos da loja</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="text-gray-600 hover:text-red-600 font-semibold transition-colors"
          >
            Sair
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="container py-8">
        {/* Add Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => handleOpenForm()}
          className="mb-8 bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus /> Adicionar Novo Produto
        </motion.button>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-soft overflow-hidden"
        >
          {products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">Nenhum produto cadastrado</p>
              <button
                onClick={() => handleOpenForm()}
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Adicionar Primeiro Produto
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{product.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.category || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleOpenForm(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                          <FaEdit size={14} /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                          <FaTrash size={14} /> Deletar
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? "Editar Produto" : "Novo Produto"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Código do Produto
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      placeholder="Ex: 86369"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Body Splash Desodorante"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preço *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      placeholder="Ex: 99.90"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preço Original (opcional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder="Ex: 129.90"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Ex: Fragrância"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Volume */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Volume
                    </label>
                    <input
                      type="text"
                      value={formData.volume || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, volume: e.target.value })
                      }
                      placeholder="Ex: 200 ml"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descrição do produto..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagem do Produto *
                  </label>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                {/* Vegan Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="vegan"
                    checked={formData.vegan}
                    onChange={(e) =>
                      setFormData({ ...formData, vegan: e.target.checked })
                    }
                    className="w-4 h-4 text-purple-700 rounded"
                  />
                  <label htmlFor="vegan" className="text-sm font-semibold text-gray-700">
                    Produto Vegano
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTimes /> Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FaSave /> {editingId ? "Atualizar" : "Adicionar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

