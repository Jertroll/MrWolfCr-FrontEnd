import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
const ImagenP = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white">
      
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center" 
        style={{ backgroundImage: "url('/assets/polos.jpg')" }}
      ></div>

      {/* Capa oscura para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative text-center px-6">
        
        <h1 className="text-4xl font mb-4" style={{ fontFamily: 'Baskerville Display PT, serif' }}>BIENVENIDOS</h1>
        <p className="text-2xl font mb-4" style={{ fontFamily: 'Baskerville Display PT, serif' }}>¡Descubre un mundo de estilo al alcance de un click!</p>
        
        <motion.a 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/productos")}
          className="border border-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-white hover:text-black transition">
          Ver todos los productos
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ImagenP;
