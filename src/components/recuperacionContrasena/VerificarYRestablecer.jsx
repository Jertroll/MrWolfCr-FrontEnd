import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const VerificarYRestablecer = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Asegúrate de importar useNavigate si lo necesitas
  const [formData, setFormData] = useState({
    email: "",
    codigo: "",
    nuevaPassword: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Si location.state existe, setea el email automáticamente
    if (location.state && location.state.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: location.state.email,
      }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/recuperar/restablecerContrasena",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            codigo: formData.codigo,
            nuevaContrasena: formData.nuevaPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al restablecer la contraseña");
      }

      setMensaje(data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2} textAlign="center">
        Verificar Código
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Correo"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Código de recuperación"
          type="text"
          value={formData.codigo}
          onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
          required
          margin="normal"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            mt: 0,
            mb: 1,
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          ¿No te llegó el código? Revisa en emails no deseados/spam
        </Typography>
        <TextField
          fullWidth
          label="Nueva contraseña"
          type="password"
          value={formData.nuevaPassword}
          onChange={(e) =>
            setFormData({ ...formData, nuevaPassword: e.target.value })
          }
          required
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Restablecer Contraseña
        </Button>
      </form>
      {mensaje && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default VerificarYRestablecer;
