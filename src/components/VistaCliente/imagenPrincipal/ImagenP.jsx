import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const ImagenP = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 3000); // Cambia a video después de 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-auto h-screen flex items-center justify-center text-white">
      
      {showVideo ? (
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="src/assets/video.mp4" type="video/mp4" />
        </video>
       
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('src/assets/imgP.jpg')" }}
        ></div>
      )}
      
      {/* Capa oscura para mejorar la legibilidad del texto */}
    
    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative text-center px-6">
        
        <h1 className="text-5xl font-bold mb-4">Nueva colección</h1>
        <p className="text-lg mb-6">Descubre un mundo de estilo al alcance de un click.</p>
        
        <motion.a 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          href="#coleccion"
          className="bg-black px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-800 transition">
          Ver colección
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ImagenP;
