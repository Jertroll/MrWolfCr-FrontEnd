import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "/assets/logoNegro.jpg";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";  // Importación de los íconos
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);  // Estado para controlar la visibilidad
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        const decodedToken = jwtDecode(data.token);
        console.log("Token decodificado:", decodedToken);
        navigate("/home");
      } else {
        setError(data.message || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Error en la autenticación. Intenta de nuevo.");
    }
  };

  const handleRegistro = () => navigate("/registro");
  const handleHome = () => navigate("/");
  const handleRecuperarContrasena = () => navigate("/enviarCodigo");

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo Mr Wolf Cr" className="logo" />
      </div>

      <div className="form-container">
        <h3 className="text-xl font-bold text-center text-white mb-6">
          Inicio de Sesión
        </h3>

        <form onSubmit={handleLogin} className="login-form">
          <label className="block mb-2 text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mrwolfcr@ejemplo.com"
            className="input"
            required
            autoComplete="email"
          />

          <label className="block mb-2 text-white">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}  // Mostrar/ocultar contraseña
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Pon tu contraseña aquí"
              className="input"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-btn"
            >
              {showPassword ? (
                <LiaEyeSolid size={20} color="white" />  // Ícono de ojo abierto
              ) : (
                <LiaEyeSlashSolid size={20} color="white" />  // Ícono de ojo cerrado
              )}
            </button>
          </div>

          {/* Botón para recuperar contraseña */}
          <button
            type="button"
            onClick={handleRecuperarContrasena}
            className="text-sm text-blue-300 hover:underline mb-4"
          >
            ¿Olvidaste tu contraseña?
          </button>

          {error && <p className="error">{error}</p>}

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Iniciar Sesión
            </button>

            <div className="button-group-secondary">
              <button
                type="button"
                onClick={handleRegistro}
                className="register-btn"
              >
                Regístrate
              </button>

              <button type="button" onClick={handleHome} className="back-btn">
                Regresar al Inicio
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
