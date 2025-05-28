import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const EditarPerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/api/v1/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsuario(data);
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/v1/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      navigate("/perfil");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 500, mx: "auto", borderRadius: 4 }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, fontFamily: 'Baskerville Display PT', textAlign: "center" }}
        >
          Editar Perfil
        </Typography>

        {usuario ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre de usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Correo"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono"
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dirección de envío"
              name="direccion_envio"
              value={formData.direccion_envio || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email de facturación"
              name="email_facturacion"
              value={formData.email_facturacion || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nueva contraseña"
              name="contraseña"
              type="password"
              onChange={handleChange}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#556B2F",
                  fontFamily: 'Baskerville Display PT',
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#2E4B0D",
                  },
                }}
              >
                Guardar cambios
              </Button>
              <Button
                onClick={() => navigate("/perfil")}
                sx={{
                  border: "1px solid #556B2F",
                  fontFamily: 'Baskerville Display PT',
                  color: "#556B2F",
                  "&:hover": {
                    backgroundColor: "#F0F0F0",
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        ) : (
          <Typography>Cargando...</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EditarPerfilUsuario;
