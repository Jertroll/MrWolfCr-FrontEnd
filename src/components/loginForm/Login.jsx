import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar al usuario
import { jwtDecode } from 'jwt-decode'; // Corregido: usa { jwtDecode }

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
    <div className="flex h-screen">
      {/* Sección Izquierda */}
      <div
        className="w-1/2 bg-black bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://source.unsplash.com/featured/?interior")',
        }}
      >
        <img src="src/assets/mrwolf.jpg" alt="Logo Mr Wolf Cr" />
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            La exclusividad nos representa
          </h1>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: "#2A4A10" }}
        >
          Mr Wolf Cr
        </h2>
        <h3 className="text-xl font-bold mb-6" style={{ color: "#2A4A10" }}>
          Inicio de Sesión
        </h3>
        <p className="mb-4 text-gray-600">
          Bienvenido, pon tus credenciales aquí
        </p>

        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <label
            className="block mb-2 text-gray-700 font-semibold"
            style={{ color: "#2A4A10" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mrwolfcr@ejemplo.com"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          <label
            className="block mb-2 text-gray-700 font-semibold"
            style={{ color: "#2A4A10" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Pon tu contraseña aquí"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#2A4A10] text-white py-2 rounded-lg font-semibold hover:bg-[#1E3A07] mb-4"
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            onClick={handleRegistro}
            className="w-full bg-gray-100 text-black py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200 mb-4"
          >
            Regístrate
          </button>

          <div className="flex items-center justify-center mt-4">
            <span className="border-b border-gray-300 w-1/4"></span>
            <span className="mx-4 text-gray-500">o</span>
            <span className="border-b border-gray-300 w-1/4"></span>
          </div>
          <br />
          <button
            type="button"
            onClick={handleHome}
            className="w-full bg-red-500 text-white py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200 mb-4"
          >
            Regresar al Inicio
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
