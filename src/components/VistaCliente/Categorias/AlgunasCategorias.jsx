import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AlgunasCategorias.css";

const AlgunasCategorias = () => {
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/categorias/algunas");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setCategorias(data);
        console.log("Datos recibidos:", data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        alert("Hubo un error al obtener las categorías. Por favor, intenta nuevamente.");
      }
    };

    fetchCategorias();
  }, []);

  // Manejar la selección de una categoría
  const handleCategoriaClick = (num_categoria) => {
    navigate(`/productos/categoria/${num_categoria}`);
  };

  return (
    <div className="categorias-container">
      <h1 className="text-5xl font mb-4" style={{ fontFamily: 'Baskerville Display PT, serif' }}>
        Categorias Populares
      </h1>

      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <div key={categoria.num_categoria} className="categoria-card"
           onClick={() => handleCategoriaClick(categoria.num_categoria)}>
            <img src={categoria.imagen} alt={categoria.nombre} />
            <div className="categoria-texto">
              <h3>{categoria.nombre}</h3>
              <span className="flecha">→</span> {/* Flechita */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgunasCategorias;
