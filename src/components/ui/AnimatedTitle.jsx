import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTitle = () => {
  return (
    <motion.h1
      /* Eliminamos los estilos en línea y usamos className con Tailwind */
      className="text-[2.8rem] md:text-[3.8rem] font-[900] text-[#111827] leading-[1.1] mb-[25px] font-sans"
      
      /* Animación infinita */
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      Cosechamos <br /> 
      <span className="text-[#1da44c]">calidad y frescura</span>  
    </motion.h1>
  );
};

export default AnimatedTitle;