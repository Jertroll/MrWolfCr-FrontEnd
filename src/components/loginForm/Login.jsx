import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar al usuario
import { jwtDecode } from 'jwt-decode'; // Corregido: usa { jwtDecode }
import logo from "../../assets/logoNegro.jpg";
import './Login.css'
function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redireccionar al usuario

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Hacer la solicitud al backend
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacena el token en sessionStorage
        sessionStorage.setItem("token", data.token);

        // Decodificar el token para verificar su contenido
        const decodedToken = jwtDecode(data.token);
        console.log("Token decodificado:", decodedToken);

        alert("Inicio de sesión exitoso");
        navigate("/home"); // Redirige al usuario a /dashboard
      } else {
        setError(data.message || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Error en la autenticación. Intenta de nuevo.");
    }
  };

    // Función para redirigir al usuario a la página de registro
    const handleRegistro = () => {
      navigate("/registro"); // Redirige al usuario a /registro
    };

    const handleHome = () => {
      navigate("/"); // Redirige al usuario a /registro
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

      {error && <p className="error">{error}</p>}
      <div className="button-group">
      <button type="submit" className="submit-btn">
        Iniciar Sesión
      </button>
      <div className="button-group-secondary">
      <button type="button" onClick={handleRegistro} className="register-btn">
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
