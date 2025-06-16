import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuItem, Button, Box } from "@mui/material";

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
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Menú de Productos */}
      <Box
        sx={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
      >
        <Button sx={{ color: "white" }}>Productos ▾</Button>
        {menuVisible && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#203500",
              boxShadow: 3,
              borderRadius: 1,
              zIndex: 10,
              minWidth: "200px",
              p: 1,
            }}
          >
            {categorias.map((categoria) => (
              <MenuItem
                key={categoria.num_categoria}
                component={Link}
                to={`/productos/categoria/${categoria.num_categoria}`}
                sx={{ color: "white", "&:hover": { backgroundColor: "#305500" } }}
              >
                {categoria.nombre_categoria}
              </MenuItem>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MenuCategorias;
