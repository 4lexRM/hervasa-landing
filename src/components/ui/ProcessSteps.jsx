import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react'; 

const ProcessSteps = ({ imgSocios, imgHervasa, imgComprador }) => {
  const [activeStep, setActiveStep] = useState(null);

  const toggleStep = (id) => {
    setActiveStep(activeStep === id ? null : id);
  };

  const steps = [
    {
      id: 1,
      title: "Socios Productores",
      role: "El origen de la calidad",
      summary: "Nuestra red de aliados estratégicos que nos brindan la capacidad de abastecer volúmenes pequeños, medianos y grandes con consistencia.",
      image: imgSocios,
      details: (
        <div className="space-y-4">
          <p className="font-medium text-gray-800">
            Supervisión integral para garantizar la excelencia:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle2 size={18} className="text-[#1da44c] mt-0.5 shrink-0" />
              <span>
                <strong>Capacitación en Inocuidad:</strong> Implementación rigurosa de buenas prácticas agrícolas.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle2 size={18} className="text-[#1da44c] mt-0.5 shrink-0" />
              <span>
                <strong>Visitas Técnicas Semanales:</strong> Nuestros ingenieros supervisan el campo personalmente para guiar al productor en cada etapa.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle2 size={18} className="text-[#1da44c] mt-0.5 shrink-0" />
              <span>
                <strong>Control Especializado:</strong> Asesoría puntual en control de plagas, detección temprana de enfermedades y nutrición vegetal balanceada.
              </span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "Nuestra Labor (HVS)",
      role: "Logística y Procesamiento",
      summary: "Hervsa Berries es el filtro de calidad y el motor logístico. Dando seguimiento a la producción, recepción, conservación y envío.",
      image: imgHervasa,
      details: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Una vez que el productor nos entrega su cosecha, entra a nuestro sistema de <strong>trazabilidad y calidad</strong>:
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <h5 className="font-bold text-[#1da44c] text-sm">1. Recepción y Calidad</h5>
              <p className="text-xs text-gray-600">Muestreo riguroso para verificar grados Brix, firmeza y ausencia de daños físicos.</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h5 className="font-bold text-blue-600 text-sm">2. Cadena de Frío</h5>
              <p className="text-xs text-gray-600">La fruta se somete a pre-frío inmediato y se mantiene refrigerada durante todo el almacenamiento y traslado para pausar su maduración.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Comprador",
      role: "Destino Final",
      summary: "Conectamos con mercados nacionales e internacionales que buscan frescura garantizada y trato directo.",
      image: imgComprador,
      details: (
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Facilitamos la adquisición de nuestros productos mediante canales directos.
          </p>
          <p className="font-bold text-gray-800 text-sm">
            ¿Interesado en adquirir nuestras berries?
          </p>
          <a href="#contacto" className="inline-block bg-[#1da44c] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#15803d] transition-colors shadow-lg shadow-green-200">
            Contáctanos Ahora
          </a>
          <p className="text-xs text-gray-400 mt-2">
            También atendemos vía Redes Sociales y WhatsApp.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`relative bg-white rounded-[30px] shadow-xl border transition-all duration-300 overflow-hidden ${
            activeStep === step.id ? 'border-[#1da44c] ring-2 ring-[#1da44c]/20' : 'border-gray-100 hover:shadow-2xl hover:-translate-y-1'
          }`}
        >
          {/* Cabecera de la Tarjeta */}
          <div className="p-8">
            
            {/* CONTENEDOR DEL ICONO */}
            {/* CAMBIO: Usamos fondos claros (gray-50 o green-50) para que tu icono a color se vea bien */}
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 p-4 shadow-sm border transition-colors duration-300 ${
              activeStep === step.id 
                ? 'bg-green-50 border-green-100' // Fondo verde muy clarito si está activo
                : 'bg-gray-50 border-gray-100'   // Fondo gris muy clarito si está inactivo
            }`}>
              {/* IMAGEN DEL ICONO */}
              <img 
                src={step.image.src} 
                alt={step.title} 
                // CAMBIO: Quité 'filter brightness-0 invert'. Ahora se ven los colores originales.
                className="w-full h-full object-contain" 
              />
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-1">{step.title}</h3>
            <p className="text-xs font-bold text-[#1da44c] uppercase tracking-wider mb-4">{step.role}</p>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {step.summary}
            </p>

            {/* Botón Desplegable */}
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span>{activeStep === step.id ? "Menos información" : "Conocer proceso"}</span>
              <motion.div
                animate={{ rotate: activeStep === step.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>

          {/* Contenido Desplegable */}
          <AnimatePresence>
            {activeStep === step.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="px-8 pb-8 pt-0 border-t border-gray-100 bg-gray-50/50">
                  <div className="pt-6">
                    {step.details}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;