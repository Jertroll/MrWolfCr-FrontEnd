import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/api/v1/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener el perfil");

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al cerrar sesión");

      sessionStorage.removeItem("token");
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box sx={{ p: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          mx: "auto",
          borderRadius: 4,
          backgroundColor: "#FFFFFF",
          border: "1px solid #556B2F", // verde musgo oscuro
          fontFamily: "'Baskerville Display PT', serif",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#000000",
            mb: 3,
            fontFamily: "Baskerville Display PT",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Perfil de Usuario
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar
            alt={usuario?.nombre}
            src={usuario?.foto_perfil || "/img/default-user.jpg"}
            sx={{ width: 120, height: 120 }}
          />
        </Box>

        {usuario ? (
          <Box
            sx={{
              textAlign: "left",
              px: 12,
              fontFamily: "Baskerville Display PT",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                mb: 1,
                fontFamily: "Baskerville Display PT",
              }}
            >
              <strong>Nombre:</strong> {usuario.nombre_usuario}
            </Typography>
            <Typography
              sx={{
                color: "#000000",
                mb: 1,
                fontFamily: "Baskerville Display PT",
              }}
            >
              <strong>Correo:</strong> {usuario.email}
            </Typography>
             <Typography><strong>Rol:</strong> {usuario.rol}</Typography>
             <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#6E8F45",
                  fontFamily: "Baskerville Display PT",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  px: 3,
                  py: 1.5,
                  minWidth: 140,
                  whiteSpace: "nowrap",       
                  "&:hover": {
                    backgroundColor: "#2E4B0D",
                    color: "#FFFFFF",
                  },
                }}
              >
                Cerrar sesión
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/perfil/editar")}
                sx={{
                  backgroundColor: "#6E8F45",
                  fontFamily: "Baskerville Display PT",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  px: 3,
                  py: 1.5,
                  minWidth: 140,
                  whiteSpace: "nowrap",     
                  "&:hover": {
                    backgroundColor: "#2E4B0D",
                    color: "#FFFFFF",
                  },
                }}
              >
                Editar perfil
              </Button>
            </Box>

          </Box>
        ) : (
          <Typography
            sx={{
              color: "#000000",
              textAlign: "left",
              px: 2,
              fontFamily: "Baskerville Display PT",
            }}
          >
            No se pudo cargar el perfil.
          </Typography>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ color: "#000000", fontFamily: "Baskerville Display PT" }}
        >
          ¿Estás seguro?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "#000000", fontFamily: "Baskerville Display PT" }}
          >
            Esta acción eliminará tu cuenta de forma permanente. ¿Deseás
            continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#000000",
              border: "1px solidrgb(31, 44, 9)",
              "&:hover": {
                backgroundColor: "#556B2F",
                color: "#FFFFFF",
              },
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PerfilUsuario;
