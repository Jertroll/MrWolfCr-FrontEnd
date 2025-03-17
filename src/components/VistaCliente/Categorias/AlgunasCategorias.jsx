import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AlgunasCategorias.css"

const AlgunasCategorias = () => {
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/categorias/algunas");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        alert("Hubo un error al obtener las categorías. Por favor, intenta nuevamente.");
      }
    };

    fetchData();
  }, []);

  // Función para navegar a la vista de productos por categoría
  const handleCategoriaClick = (id) => {
    navigate(`/productos/categoria/${id}`);
  };

  return (
    <div className="categorias-container">
      <h2>Categorías populares</h2>
      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="categoria-card" onClick={() => handleCategoriaClick(categoria.id)}>
            <img src={categoria.imagen} alt={categoria.nombre} />
            <h3>{categoria.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgunasCategorias;
