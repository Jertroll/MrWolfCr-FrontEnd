import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MenuCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/categorias");
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

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <button className="dropdown-button">Productos ▾</button>
      {menuVisible && (
        <div className="dropdown-menu">
          {categorias.map((categoria) => (
            <Link
              key={categoria.num_categoria}
              to={`/categoria/${categoria.num_categoria}`}
              className="dropdown-item"
            >
              {categoria.nombre_categoria}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategorias;
