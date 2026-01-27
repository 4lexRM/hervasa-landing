import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarCheck, BarChart3 } from 'lucide-react';

// Variantes para el contenedor (el Grid) - COD 1
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 
    }
  }
};

// Variantes para cada tarjeta individual - COD 1
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
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
        viewport={{ once: false, amount: 0.1 }}
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

      {/* --- MODAL AGREGADO DEL CODIGO 2 --- */}
      <AnimatePresence>
        {selectedFruit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedFruit(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-3xl w-full max-w-xl relative shadow-2xl"
            >
              {/* Botón cerrar (X) */}
              <button 
                onClick={() => setSelectedFruit(null)} 
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <h3 
                  className="text-3xl font-black mb-2"
                  style={{ color: selectedFruit.color }}
                >
                  {selectedFruit.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                  <CalendarCheck size={18} />
                  <span>Calendario de Cosecha</span>
                </div>
              </div>

              {/* --- GRÁFICA DE DISPONIBILIDAD (BARRAS) --- */}
              <div className="flex justify-between h-40 gap-1">
                {getAvailability(selectedFruit.name).map((isAvailable, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                    
                    {/* Barra Animada */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: isAvailable ? '100%' : '30%' }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`w-full max-w-[30px] rounded mb-2 ${
                        isAvailable ? 'bg-[#1da44c]' : 'bg-red-500/30'
                      }`}
                    />
                    
                    {/* Nombre del mes */}
                    <span className="text-[10px] font-bold text-gray-600 uppercase">
                      {months[i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Leyenda inferior */}
              <div className="flex justify-center gap-6 mt-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1da44c] rounded-full"></div>
                  <span className="text-gray-700">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/30 rounded-full"></div>
                  <span className="text-gray-400">No temporada</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCards;