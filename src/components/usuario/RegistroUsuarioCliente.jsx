import { useState } from "react";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia"; // Importamos los íconos para mostrar/ocultar la contraseña
import "./RegistroCliente.css"; // Mantendremos el estilo existente y añadiremos las mejoras

function RegistroUsuarioCliente() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre_usuario: "",
    nombre_completo: "",
    email: "",
    contrasena: "",
    telefono: "",
    direccion_envio: "",
    email_facturacion: "",
    imagen: null,
    rol: "Cliente",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "imagen" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const dataToSend = { ...formData, imagen: formData.imagen || "" };
      const response = await fetch("http://localhost:3000/api/v1/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Error al registrar usuario");

      setSuccessMessage("Usuario registrado con éxito");
      setFormData({
        cedula: "",
        nombre_usuario: "",
        nombre_completo: "",
        email: "",
        contrasena: "",
        telefono: "",
        direccion_envio: "",
        email_facturacion: "",
        imagen: null,
        rol: "Cliente",
      });
    } catch (error) {
      setError(error.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Crear cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-white">
            Cédula <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Nombre de usuario <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="input-field"
              required
              minLength="6"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-btn"
            >
              {showPassword ? (
                <LiaEyeSolid size={20} color="white" />
              ) : (
                <LiaEyeSlashSolid size={20} color="white" />
              )}
            </button>
          </div>

          <label className="block mb-2 font-semibold text-white">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Dirección de envío <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="direccion_envio"
            value={formData.direccion_envio}
            onChange={handleChange}
            className="input-field"
            required
          />

          <label className="block mb-2 font-semibold text-white">
            Correo electrónico para facturación <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email_facturacion"
            value={formData.email_facturacion}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`submit-btn ${loading ? "loading" : ""}`}
          >
            {loading ? "PROCESANDO..." : "CREAR CUENTA"}
          </button>

          <p className="text-center text-white mt-4">
            ¿Ya tiene una cuenta?{" "}
            <a href="/login" className="text-red-500">
              Inicie sesión aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarioCliente;
