import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
//import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const pages = ["Mujer", "Hombre"];
const settings = ["Perfil", "Account", "Salir"]; // Opciones del menú cuando el usuario ha iniciado sesión

function NavbarCliente() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null); // Estado para almacenar el rol del usuario
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Estado para verificar si el usuario ha iniciado sesión



// ✅ Nuevo componente: Menú de Categorías
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

  // Verificar si el usuario ha iniciado sesión al cargar el componente
  React.useEffect(() => {
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
        {/*Opción "Ver Todos" */}
        <MenuItem
          component={Link}
          to="/productos"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "#305500" },
            fontWeight: "bold",
          }}
        >
          Ver Todos
        </MenuItem>
  
        {/* Lista de categorías con el mismo color */}
        {categorias.map((categoria) => (
          <MenuItem
            key={categoria.num_categoria}
            component={Link}
            to={`/productos/categoria/${categoria.num_categoria}`}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#305500" },
            }}
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
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.rol); // Guarda el rol en el estado
        setIsLoggedIn(true); // El usuario ha iniciado sesión
        setUserRole(decodedToken.rol);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      setIsLoggedIn(false); // El usuario no ha iniciado sesión
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Elimina el token
    setIsLoggedIn(false); // Actualiza el estado de inicio de sesión
    navigate("/"); // Redirige al login
  };

  const handleDashboardClick = () => {
    handleCloseUserMenu(); // Cierra el menú
    navigate("/dashboard"); // Redirige a /dashboard
  };

  const handleLoginClick = () => {
    handleCloseUserMenu(); // Cierra el menú
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#203500" }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <img
            style={{ marginRight: "10px" }}
            width="50"
            height="50"
            src="src/assets/Logo Circular Mr Wolf-Photoroom.png"
            alt="Logo de Mr Wolf Sin fondo"
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

          {/* ✅ Nueva sección: Contenedor de los botones y el menú de categorías */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {pages.map((page) => (
              <Button key={page} sx={{ color: "white" }}>
                {page}
              </Button>
            ))}

            {/* ✅ Aquí se agregó el menú de categorías dentro del navbar */}
            <MenuCategorias />
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <LocalMallIcon fontSize="medium" sx={{ mr: 1 }} />
            <IconButton onClick={() => navigate("/carrito")} color="inherit">
              <ShoppingCartIcon fontSize="medium" />
            </IconButton>

            <Tooltip title="Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon fontSize="medium" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                // Opciones cuando el usuario ha iniciado sesión
                <>
                  {settings.map((setting) =>
                    setting === "Salir" ? (
                      <MenuItem key={setting} onClick={handleLogout}>
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    )
                  )}
                  {/* Mostrar 'Dashboard' solo si el usuario es Administrador */}
                  {userRole === "Administrador" && (
                    <MenuItem onClick={handleDashboardClick}>
                      <Typography sx={{ textAlign: "center" }}>
                        Dashboard
                      </Typography>
                    </MenuItem>
                  )}
                </>
              ) : (
                // Opción para iniciar sesión cuando el usuario no ha iniciado sesión
                <MenuItem onClick={handleLoginClick}>
                  <Typography sx={{ textAlign: "center" }}>
                    Iniciar Sesión
                  </Typography>
              {settings.map((setting) =>
                setting === "Salir" ? (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                )
              )}
              {userRole === "Administrador" && (
                <MenuItem onClick={() => navigate("/dashboard")}>
                  <Typography>Dashboard</Typography>
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