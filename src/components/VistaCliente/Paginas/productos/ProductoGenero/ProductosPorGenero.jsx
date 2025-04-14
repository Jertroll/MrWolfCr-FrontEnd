import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductosPorGenero.css"; 

const ProductosPorGenero = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const { genero } = useParams(); // Obtener el género desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductosPorGenero = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/genero/${genero}`);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Hubo un error al obtener los productos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Al finalizar la carga, se cambia el estado de loading
      }
    };

    fetchProductosPorGenero();
  }, [genero]);

  const verDetalleProducto = (id) => {
    navigate(`/producto/${id}`);
  };

  // Muestra un cargando mientras se obtienen los productos
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="productos-wrapper">
      {/* Contenedor del logo */}
      <div className="logo-container">
        <img 
          src="/assets/logoBlanco.jpg" 
          alt="Logo de la tienda" 
          className="logo-imagen"
        />
      </div>
  
      {/* Contenedor de los productos */}
      <div className="productos-container">
        {productos.length === 0 ? (
          <p>No se encontraron productos para este género.</p>
        ) : (
          productos.map((producto) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductosPorGenero;
