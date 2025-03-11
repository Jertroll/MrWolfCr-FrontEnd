import { useEffect, useState } from "react";
import "./Carrusel.css";

const Carrusel = () => {
  const [data, setData] = useState([]); // Estado para almacenar los productos

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const productos = await response.json();
      setData(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("Hubo un error al obtener los productos. Por favor, intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden bg-gray-100 py-4 relative">
      <div className="flex w-max animate-marquee space-x-2"> 
        {data.map((producto) =>
          producto.imagenes.map((imagen, index) => (
            <div key={`${producto.id}-${index}`} className="flex flex-col items-center">
              <img
                src={`http://localhost:3000/public/ImgProductos/${imagen.nomImagen}`} 
                alt={producto.nombre}
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
              <p className="text-center text-sm text-gray-700 mt-2 font-semibold">{producto.nombre}</p> 
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carrusel;
