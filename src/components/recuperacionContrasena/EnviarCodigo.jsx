import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EnviarCodigo = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/recuperar/solicitarCodigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar el código");
      }

      setMensaje(data.message);
      setError("");

      // Redirige al siguiente paso después de un pequeño delay
      setTimeout(() => {
        navigate("/verificarCodigo", { state: { email } });
      }, 2000); // redirige en 2 segundos (puedes ajustar el tiempo)
    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2} textAlign="center">
        Recuperar Contraseña
      </Typography>
      <Typography variant="h7" mb={2} textAlign="center">
        En este apartado debes colocar el email de tu cuenta asociada a Mr Wolf Store
      </Typography>
      <form onSubmit={handleEnviarCodigo}>
        <TextField
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Enviar Código
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

export default EnviarCodigo;
