import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarCheck, BarChart3 } from 'lucide-react';

// Variantes para el contenedor (el Grid)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // Esto hace que aparezcan uno tras otro
    }
  }
};

// Variantes para cada tarjeta individual
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 // Aparece desde abajo
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const ProductCards = ({ fruits }) => {
  const [selectedFruit, setSelectedFruit] = useState(null);
  
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const getAvailability = (fruitName) => {
    if (fruitName === 'Fresa') return [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
    return Array(12).fill(1);
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }} // Se activa apenas entra un poco en pantalla
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {fruits.map((fruit, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="h-52 overflow-hidden">
              <img 
                src={fruit.image.src} 
                alt={fruit.name} 
                className="w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: fruit.color }}>
                {fruit.name}
              </h3>
              <button
                onClick={() => setSelectedFruit(fruit)}
                className="w-full flex items-center justify-center gap-2 py-2 px-5 rounded-xl font-semibold text-white bg-[#1da44c] hover:bg-[#15803d] transition-colors"
              >
                <BarChart3 size={18} /> Disponibilidad
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ... (El resto del Modal se mantiene igual) ... */}
    </>
  );
};

export default ProductCards;