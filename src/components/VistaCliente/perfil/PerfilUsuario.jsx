import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
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
  
        if (!res.ok) {
          throw new Error("Error al obtener el perfil");
        }
  
        const data = await res.json();
        setUsuario(data); // acá actualizas el estado con todos los datos
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

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Perfil del Usuario</Typography>

        <Avatar
          alt={usuario?.nombre}
          src={usuario?.foto_perfil || "/img/default-user.jpg"}
          sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
        />

        {usuario ? (
          <>
            <Typography><strong>Nombre:</strong> {usuario.nombre_usuario}</Typography>
            <Typography><strong>Correo:</strong> {usuario.email}</Typography>
            <Typography><strong>Rol:</strong> {usuario.rol}</Typography>

            <Box mt={3} display="flex" justifyContent="space-around">
              <Button variant="outlined" color="primary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Box>
          </>
        ) : (
          <Typography>No se pudo cargar el perfil.</Typography>
        )}
      </Paper>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción eliminará tu cuenta de forma permanente. ¿Deseás continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PerfilUsuario;
