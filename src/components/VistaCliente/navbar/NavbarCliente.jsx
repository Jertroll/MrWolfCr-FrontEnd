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
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const pages = ["Mujer", "Hombre"];
const settings = ["Perfil", "Account", "Salir"];

const MenuCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
 //const [cart, setCart] = useState([]);

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
    <Box
      sx={{ position: "relative", display: "inline-block", ml: 2 }}
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
          <MenuItem
            component={Link}
            to="/productos"
            sx={{
              color: "white",
              fontWeight: "bold",
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
              sx={{ color: "white", "&:hover": { backgroundColor: "#305500" } }}
            >
              {categoria.nombre_categoria}
            </MenuItem>
          ))}
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
          <img
            style={{ marginRight: "10px" }}
            width="50"
            height="50"
            src="/img/Logo Circular Mr Wolf-Photoroom.png"
            alt="Logo de Mr Wolf"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mr.Wolf
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {pages.map((page) => (
              <Button key={page} sx={{ color: "white" }}>
                {page}
              </Button>
            ))}
            <MenuCategorias />
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <LocalMallIcon fontSize="medium" sx={{ mr: 1 }} />
            <IconButton onClick={() => navigate("/carrito")} color="inherit">
              <ShoppingCartIcon fontSize="medium" />
            </IconButton>
            <Tooltip title="Opciones">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                <PersonIcon fontSize="medium" sx={{ color: "white" }} />
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Salir"
                          ? handleLogout
                          : () => setAnchorElUser(null)
                      }
                    >
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                  {userRole === "Administrador" && (
                    <MenuItem onClick={() => navigate("/dashboard")}>
                      <Typography>Dashboard</Typography>
                    </MenuItem>
                  )}
                </>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography>Iniciar Sesión</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarCliente;
