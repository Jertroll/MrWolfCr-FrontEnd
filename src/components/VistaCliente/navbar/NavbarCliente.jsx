import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
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

  const navigate = useNavigate(); // Hook para redireccionar

  // Verificar si el usuario ha iniciado sesión al cargar el componente
  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.rol); // Guarda el rol en el estado
        setIsLoggedIn(true); // El usuario ha iniciado sesión
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
            href="#app-bar-with-responsive-menu"
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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