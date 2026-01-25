import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarCheck, BarChart3 } from 'lucide-react';

// --- IMPORTACIÓN DE IMÁGENES LOCALES ---
// Asegúrate de que los nombres y extensiones coincidan con tu carpeta assets
import imgFresa from '../../assets/fresa.jpg';
import imgZarza from '../../assets/zarzamora.png';
import imgArandano from '../../assets/arandano.png';
import imgFrambuesa from '../../assets/frambuesa.png';

const fruits = [
  {
    name: 'Fresa',
    color: '#ef4444', 
    image: imgFresa.src // Usamos .src porque Astro importa la imagen como objeto
  },
  {
    name: 'Zarzamora',
    color: '#581c87', 
    image: imgZarza.src
  },
  {
    name: 'Arándano',
    color: '#1d4ed8', 
    image: imgArandano.src
  },
  {
    name: 'Frambuesa',
    color: '#db2777', 
    image: imgFrambuesa.src
  }
];

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const getAvailability = (fruitName) => {
  if (fruitName === 'Fresa') {
    return [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
  }
  return Array(12).fill(1);
};

// Variantes de animación (Framer Motion)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.3 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const ProductCards = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);

  return (
    <>
      {/* --- GRID DE PRODUCTOS --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }} 
        // Tailwind Grid:
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {fruits.map((fruit, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            {/* Imagen del producto */}
            <div className="h-52 overflow-hidden">
              <img 
                src={fruit.image} 
                alt={fruit.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-6 text-center">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: fruit.color }} // Mantenemos style para el color específico de la fruta
              >
                {fruit.name}
              </h3>
              
              <button
                onClick={() => setSelectedFruit(fruit)}
                className="w-full flex items-center justify-center gap-2 py-2 px-5 rounded-xl font-semibold text-white bg-[#1da44c] hover:bg-[#15803d] transition-colors"
              >
                <BarChart3 size={18} /> 
                Disponibilidad
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- MODAL / POPUP --- */}
      <AnimatePresence>
        {selectedFruit && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedFruit(null)}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
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

              {/* --- GRÁFICA DE DISPONIBILIDAD --- */}
              <div className="flex justify-between h-40 gap-1">
                {getAvailability(selectedFruit.name).map((isAvailable, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                    
                    {/* Barra Animada */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: isAvailable ? '100%' : '30%' }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      // Clases condicionales para color verde o rojo transparente
                      className={`w-full max-w-[30px] rounded mb-2 ${
                        isAvailable ? 'bg-green-500' : 'bg-red-500/30'
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
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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