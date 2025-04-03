import { useState } from "react";
import logo from "../../assets/logoNegro.jpg";
import "../loginForm/Login.css";
import "./registro.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      if (!response.ok) {
        throw new Error(responseData.message || "Error al registrar usuario");
      }

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

  return (
    <div className="registro-container">
      <div className="logo-container">
        <img src={logo} alt="Logo Mr Wolf Cr" className="logo" />
      </div>
      <div className="form-container">
        <h3 className="text-xl font-bold text-center text-white mb-6">Registro</h3>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {successMessage && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { label: "Cédula", name: "cedula", type: "text" },
            { label: "Nombre de usuario", name: "nombre_usuario", type: "text" },
            { label: "Nombre completo", name: "nombre_completo", type: "text" },
            { label: "Correo electrónico", name: "email", type: "email" },
            { label: "Contraseña", name: "contrasena", type: "password", minLength: 6 },
            { label: "Teléfono", name: "telefono", type: "tel" },
            { label: "Dirección de envío", name: "direccion_envio", type: "text" },
            { label: "Correo electrónico para facturación", name: "email_facturacion", type: "email" },
          ].map(({ label, name, type, minLength }) => (
            <div key={name}>
              <label className="block mb-2 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="input"
                required
                minLength={minLength}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className={`submit-btn ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}>
            {loading ? "PROCESANDO..." : "CREAR CUENTA"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            ¿Ya tiene una cuenta? <a href="/login" className="text-red-500">Inicie sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarioCliente;

