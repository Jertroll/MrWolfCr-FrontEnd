import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  LocalMall as LocalMallIcon,
  Person as PersonIcon,
  Bolt,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { MdHelp } from "react-icons/md";
import { useCarrito } from "../../VistaCliente/carrito/CarritoContext";
 // Ajusta la ruta si es distinta


// Menú de categorías
const MenuCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
 
 //const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/categorias/productos");
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
    <Box
      sx={{ position: "relative", display: "inline-block", ml: 2 }}
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <Button sx={{ color: "white", fontFamily: "'Baskerville Display PT', serif" }}>Productos ▾</Button>
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
          <MenuItem
            component={Link}
            to="/productos"
            sx={{
              color: "white", fontFamily: "'Baskerville Display PT', serif",
              "&:hover": { backgroundColor: "#305500" },
            }}
          >
            Ver Todos
          </MenuItem>
          {categorias.map((categoria) => (
            <MenuItem
              key={categoria.num_categoria}
              component={Link}
              to={`/productos/categoria/${categoria.num_categoria}`}
              sx={{ color: "white", fontFamily: "'Baskerville Display PT', serif", "&:hover": { backgroundColor: "#305500" } }}
            >
              {categoria.nombre_categoria}
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Menú de filtro por género
const MenuFiltro = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Box
      sx={{ position: "relative", display: "inline-block", ml: 2 }}
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <Button sx={{ color: "white", fontFamily: "'Baskerville Display PT', serif" }}>Filtrar por ▾</Button>
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
         <MenuItem
            component={Link}
            to="/productos/genero/masculino"  // Usar minúsculas en la ruta
            sx={{ color: "white", fontFamily: "'Baskerville Display PT', serif", "&:hover": { backgroundColor: "#305500" } }}
          >
            Masculino
          </MenuItem>
          <MenuItem
            component={Link}
            to="/productos/genero/femenino"  // Usar minúsculas en la ruta
            sx={{ color: "white",  fontFamily: "'Baskerville Display PT', serif", "&:hover": { backgroundColor: "#305500" } }}
          >
            Femenino
          </MenuItem>
        </Box>
      )}
    </Box>
  );
};



function NavbarCliente() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { cantidadCarrito, mostrarContadorTemporal} = useCarrito();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.rol);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/logout", {
        method: "POST",
        credentials: "include", 
      });
  
      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
  
      // Si la sesión se cierra correctamente, eliminamos el token de la sesión del cliente
      sessionStorage.removeItem("token");
  
      setIsLoggedIn(false);
      navigate("/");
  
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#203500" }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
        <Tooltip title="Home">
            <img
              style={{ marginRight: "10px", cursor: "pointer", borderRadius: "50%" }} 
              width="50"
              height="50"
              src="/img/Favicon.ico"
              alt="Logo de Mr Wolf"
              onClick={() => navigate("/")} 
            />
          </Tooltip>
          <Tooltip title="Home">
          <Typography
            variant="h6"
            noWrap
            component={Link}  
            to="/"  
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: 'Baskerville Display PT',
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer", 
            }}
          >
            Mr.Wolf
          </Typography>
        </Tooltip>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <MenuCategorias />
            <MenuFiltro />
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <LocalMallIcon fontSize="medium" sx={{ mr: 1 }} />
            <IconButton onClick={() => navigate("/carrito")} color="inherit" sx={{ position: "relative" }}>
      <ShoppingCartIcon fontSize="medium" />
      {mostrarContadorTemporal && cantidadCarrito > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: -5,
            right: -5,
            bgcolor: "red",
            color: "white",
            borderRadius: "50%",
            width: 16,
            height: 16,
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s ease-in-out",
            opacity: mostrarContadorTemporal ? 1 : 0,
          }}
        >
          {cantidadCarrito}
        </Box>
      )}
    </IconButton>

            {/* Botón de Ayuda */}
            <Tooltip title="Ayuda">
              <IconButton
                onClick={() => navigate("/ayudaCliente")}
                color="inherit"
              >
                <MdHelp size={24} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Opciones">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                <PersonIcon fontSize="medium" sx={{ color: "white", fontFamily: "'Baskerville Display PT', serif" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {isLoggedIn ? (
                <> 
                  <MenuItem onClick={() => navigate("/facturasCliente")}>
                  <Typography>Ver Facturas</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography>Salir</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/perfil")}>
                    <Typography>Perfil</Typography>
                  </MenuItem>
                  {userRole === "Administrador" && (
                    <MenuItem onClick={() => navigate("/dashboard/home")}>
                      <Typography>Dashboard</Typography>
                    </MenuItem>
                  )}
                </>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography>Iniciar Sesión</Typography>
                </MenuItem>
              )
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarCliente;
