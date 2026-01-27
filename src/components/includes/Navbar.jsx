import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Leaf, Home, Users, ShoppingBag, 
  Settings, Award, Globe, Phone 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Inicio');

  // Mapeamos los items con su icono correspondiente
  const menuItems = [
    { name: 'Inicio', href: '#', icon: <Home size={18} /> },
    { name: 'Nosotros', href: '#nosotros', icon: <Users size={18} /> },
    { name: 'Productos', href: '#productos', icon: <ShoppingBag size={18} /> },
    { name: 'Procesos', href: '#proceso', icon: <Settings size={18} /> },
    { name: 'Certificaciones', href: '#certificaciones', icon: <Award size={18} /> },
    { name: 'Alcance', href: '#alcance', icon: <Globe size={18} /> },
    { name: 'Contacto', href: '#contacto', icon: <Phone size={18} /> },
  ];

  // --- LÓGICA DE SCROLL SPY (Intacta) ---
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

  // Clases comunes para el estado activo/hover (Color más fuerte)
  // Usamos bg-green-100 para hover suave y text-green-700 para contraste
  // O un color custom más fuerte con opacidad: bg-[#1da44c]/10 (10% de opacidad del verde fuerte)
  const activeClass = "bg-[#1da44c]/15 text-[#1da44c]"; // Fondo verde suave, texto verde fuerte
  const inactiveClass = "text-gray-600 hover:bg-[#1da44c]/10 hover:text-[#1da44c]";

  return (
    <nav className="fixed top-0 w-full bg-white border-b-2 border-gray-100 z-50 py-3 font-sans transition-all">
      <div className="max-w-[1300px] mx-auto px-5 flex justify-between items-center">
        
        {/* LOGO IZQUIERDA */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1da44c] p-2 rounded-lg flex items-center justify-center shadow-sm">
            <Leaf className="text-white" size={24} strokeWidth={3} />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tighter">
            HERVASA BERRIES
          </span>
        </div>
        
        {/* MENÚ DESKTOP */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setActiveItem(item.name)} 
                className={`
                  group relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm
                  ${isActive ? activeClass : inactiveClass}
                `}
              >
                {/* ICONO EN DESKTOP: Oculto (w-0 opacity-0) por defecto, visible en Hover/Active */}
                <span className={`
                  transition-all duration-300 overflow-hidden flex items-center
                  ${isActive ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-2 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-0'}
                `}>
                  {item.icon}
                </span>
                
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <button 
          className="lg:hidden text-gray-900 cursor-pointer hover:text-[#1da44c] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-4 shadow-xl border-t border-gray-100 lg:hidden h-screen sm:h-auto">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => {
                setIsOpen(false);
                setActiveItem(item.name);
              }}
              className={`
                flex items-center gap-3 font-bold p-4 rounded-xl mb-2 transition-colors
                ${activeItem === item.name 
                  ? 'bg-[#1da44c]/10 text-[#1da44c]' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {/* ICONO EN MÓVIL: Siempre visible */}
              <span className={activeItem === item.name ? 'text-[#1da44c]' : 'text-gray-400'}>
                {item.icon}
              </span>
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;