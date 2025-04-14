import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductosPorCategoria =() => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/categoria/${id}`);// http://localhost:3000/api/v1/productos/categoria/1
        if (!response.ok) throw new Error("Error al obtener los productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Hubo un error al obtener los productos. Intenta nuevamente.");
      }
    };

    fetchProductos();
  }, [id]); // ✅ Se ejecuta cuando cambia la categoría seleccionada

  const verDetalleProducto = (id) => {
    navigate(`/producto/${id}`);
    window.location.reload(); // Fuerza la recarga de la página
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

export default ProductosPorCategoria;
