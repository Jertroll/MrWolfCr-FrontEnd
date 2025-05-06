import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logoNegro.jpg";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
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
          />

          <label className="block mb-2 text-white">Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Pon tu contraseña aquí"
            className="input"
            required
          />

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
