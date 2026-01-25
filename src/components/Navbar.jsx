import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Inicio');

  const menuItems = [
    { name: 'Inicio', href: '#' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Productos', href: '#productos' },
    { name: 'Procesos', href: '#proceso' },
    { name: 'Certificaciones', href: '#certificaciones' },
    { name: 'Contacto', href: '#contacto' },
  ];

  // --- LÓGICA DE SCROLL SPY (Se queda igual, funciona perfecto) ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; 
      let currentSection = 'Inicio';

      menuItems.forEach((item) => {
        if (item.href === '#') return;
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = item.name;
          }
        }
      });
      setActiveItem(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white border-b-2 border-gray-100 z-50 py-3 font-sans">
      <div className="max-w-[1300px] mx-auto px-5 flex justify-between items-center">
        
        {/* LOGO IZQUIERDA */}
        <div className="flex items-center gap-2">
          {/* Cuadro verde */}
          <div className="bg-[#1da44c] p-2 rounded-lg flex items-center justify-center">
            <Leaf className="text-white" size={24} strokeWidth={3} />
          </div>
          {/* Texto */}
          <span className="text-xl font-black text-gray-900 tracking-tighter">
            HERVASA BERRIES
          </span>
        </div>
        
        {/* MENÚ DESKTOP (Oculto en móvil 'hidden', visible en desktop 'lg:flex') */}
        <div className="hidden lg:flex items-center">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setActiveItem(item.name)} 
              // Lógica condicional de clases mucho más limpia
              className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ml-1 ${
                activeItem === item.name 
                  ? 'bg-[#d4e9db] text-white' 
                  : 'text-gray-700 hover:bg-[#d4e9db] hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* BOTÓN HAMBURGUESA (Visible en móvil, oculto en desktop 'lg:hidden') */}
        <button 
          className="lg:hidden text-gray-900 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {/* Usamos renderizado condicional de React {isOpen && ...} es más limpio que CSS display:none */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-5 shadow-lg border-t border-gray-100 lg:hidden">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => {
                setIsOpen(false);
                setActiveItem(item.name);
              }}
              className={`font-bold p-4 border-b border-gray-50 ${
                activeItem === item.name ? 'text-[#1da44c]' : 'text-gray-900'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;