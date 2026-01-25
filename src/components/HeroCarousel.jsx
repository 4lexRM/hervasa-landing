import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    // Contenedor principal
    <div className="relative w-full h-full overflow-hidden rounded-[40px]">
      <AnimatePresence mode='popLayout'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt="Hervasa Hero"
          
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}

          // Clases de Tailwind para posicionamiento e imagen
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
      </AnimatePresence>
      
      {/* Overlay oscuro sutil */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-20"></div>
    </div>
  );
};

export default HeroCarousel;