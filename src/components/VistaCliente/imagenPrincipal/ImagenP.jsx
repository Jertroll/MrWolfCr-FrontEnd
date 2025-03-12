import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ImagenP = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 3000); // Cambia a video después de 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white">
      
      {showVideo ? (
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?fashion')" }}
        ></div>
      )}
      
      {/* Capa oscura para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative text-center px-6">
        
        <h1 className="text-5xl font-bold mb-4">Mr.Wolf</h1>
        <p className="text-lg mb-6">Estilo y comodidad al alcanze de tu mano.</p>
        
        <motion.a 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          href="#coleccion"
          className="bg-green-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 transition">
          Ver colección
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ImagenP;
