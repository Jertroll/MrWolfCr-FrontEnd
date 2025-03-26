import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductosAleatorios.css"; // Importamos el CSS

const ProductosAleatorios = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);

  const verDetalleProducto = (id) => {
    navigate(`/producto/${id}`);
    window.location.reload();
  };

  return (
    <div className="productos-wrapper">
      {/* Contenedor del logo */}
      <div className="logo-container">
        <img 
          src="src/assets/mrb.jpg" 
          alt="Logo de la tienda" 
          className="logo-imagen"
        />
      </div>
  
      {/* Contenedor de los productos */}
      <div className="productos-container">
        {productos.map((producto) => (
          <div 
            key={producto.id} 
            className="producto-card"
            onClick={() => verDetalleProducto(producto.id)}
          >
            <div className="producto-imagen">
              <img 
                src={`http://localhost:3000/public/ImgProductos/${producto.imagenes[0]?.nomImagen}`}
                alt={producto.nombre} 
              />
            </div>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-precio">₡{producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductosAleatorios;
