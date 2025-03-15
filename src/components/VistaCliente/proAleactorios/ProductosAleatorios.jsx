import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductosAleatorios = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos/Aleatorios");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("Hubo un error al obtener los productos. Por favor, intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const verDetalleProducto = (id) => {
    console.log("Redirigiendo a:", id); // Verifica que el ID es correcto
    navigate(`/producto/${id}`); // Redirige a la página del producto
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
      {productos.map((producto) => (
        <div 
          key={producto.id} 
          className="border rounded-lg p-2 shadow-md hover:shadow-lg cursor-pointer"
          onClick={() => verDetalleProducto(producto.id)}
        >
          <img 
            src={`http://localhost:3000/public/ImgProductos/${producto.imagenes[0]?.nomImagen}`}
            alt={producto.nombre} 
            className="w-full h-32 object-contain rounded-md"
          />
          <h3 className="text-sm font-semibold mt-1">{producto.nombre}</h3>
          <p className="text-gray-700 text-sm">₡{producto.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductosAleatorios;