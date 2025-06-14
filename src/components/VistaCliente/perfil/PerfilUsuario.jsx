import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true); // NUEVO: para manejar el estado de carga
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setOpenDialog(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/v1/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          sessionStorage.removeItem("token");
          setOpenDialog(true);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Error al obtener el perfil");

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setOpenDialog(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Cargando perfil...</Typography>
      </Box>
    );
  }

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
          border: "1px solid #556B2F",
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
          <Box sx={{ textAlign: "left", px: 12, fontFamily: "Baskerville Display PT" }}>
            <Typography sx={{ color: "#000000", mb: 1 }}>
              <strong>Nombre:</strong> {usuario.nombre_usuario}
            </Typography>
            <Typography sx={{ color: "#000000", mb: 1 }}>
              <strong>Correo:</strong> {usuario.email}
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} mt={3}>
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
                  "&:hover": { backgroundColor: "#2E4B0D", color: "#FFFFFF" },
                }}
              >
                Editar perfil
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  sessionStorage.removeItem("token");
                  navigate("/home");
                }}
                sx={{
                  backgroundColor: "#6E8F45",
                  fontFamily: "Baskerville Display PT",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  px: 3,
                  py: 1.5,
                  minWidth: 140,
                  "&:hover": { backgroundColor: "#2E4B0D", color: "#FFFFFF" },
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ color: "#000000", textAlign: "center", px: 2 }}>
            No se pudo cargar el perfil.
          </Typography>
        )}
      </Paper>

      {/* Modal de sesión expirada */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Sesión expirada</DialogTitle>
        <DialogContent>
          <DialogContentText>Tu sesión ha expirado. Debes iniciar sesión nuevamente.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Iniciar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PerfilUsuario;