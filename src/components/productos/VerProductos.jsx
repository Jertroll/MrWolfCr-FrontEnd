import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../VistaCliente/Paginas/productos/proAleactorios/ProductosAleatorios.css"; // Asegúrate de incluir tu archivo CSS

const ProductosAleatorios = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [busqueda, setBusqueda] = useState(""); // Estado para almacenar el término de búsqueda
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos");
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

  // Filtrar productos basados en el término de búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const terminoBusqueda = busqueda.toLowerCase();
    return (
      producto.nombre.toLowerCase().includes(terminoBusqueda) ||
      producto.precio.toString().includes(terminoBusqueda) ||
      producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
      producto.categoria?.toLowerCase().includes(terminoBusqueda)
    );
  });

  // Manejar la navegación al detalle del producto
  const verDetalleProducto = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="productos-wrapper">
      <div className="logo-container">
        <img 
          src="/assets/logoBlancoTitulo.jpg" 
          alt="Logo de la tienda" 
          className="logo-imagen"
        />
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="productos-container">
        {productosFiltrados.map((producto) => (
          <div 
            key={producto.id} 
            className="producto-card"
            onClick={() => verDetalleProducto(producto.id)} // Navegar al detalle del producto
          >
            <div className="producto-imagen">
              <img 
                src={`http://localhost:3000/public/ImgProductos/${producto.imagenes[0]?.nomImagen}`}
                alt={producto.nombre} 
              />
            </div>
            <div className="producto-nombre">{producto.nombre}</div>
            <div className="producto-precio">₡{producto.precio}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosAleatorios;
