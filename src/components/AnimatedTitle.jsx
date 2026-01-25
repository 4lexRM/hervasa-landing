import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTitle = () => {
  return (
    <motion.h1
      style={{
        fontSize: 'clamp(1rem, 5vw, 3.5rem)',
        fontWeight: 900,
        color: '#111827',
        lineHeight: 1.1,
        marginBottom: '25px',
        fontFamily: 'sans-serif'
      }}
      /* Animación infinita: sube, baja y escala ligeramente */
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="hero-title"
    >
      Cosechamos <br /> 
      <span style={{ color: '#1da44c' }}>calidad y frescura</span>  

    </motion.h1>
  );
};

export default AnimatedTitle;