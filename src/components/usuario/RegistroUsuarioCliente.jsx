import { useState } from "react";

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div style={{ backgroundColor: "rgba(34, 33, 33, 0.8)" }} className="p-8 rounded-lg shadow-md w-full max-w-md h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Crear cuenta</h2>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {successMessage && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-white">Cédula</label>
          <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Nombre de usuario</label>
          <input type="text" name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Nombre completo</label>
          <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Correo electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Contraseña</label>
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required minLength="6" />

          <label className="block mb-2 font-semibold text-white">Teléfono</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Dirección de envío</label>
          <input type="text" name="direccion_envio" value={formData.direccion_envio} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <label className="block mb-2 font-semibold text-white">Correo electrónico para facturación</label>
          <input type="email" name="email_facturacion" value={formData.email_facturacion} onChange={handleChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" required />

          <button type="submit" disabled={loading} className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1E3A07] text-white hover:bg-gray-800"}`}>
            {loading ? "PROCESANDO..." : "CREAR CUENTA"}
          </button>

          <p className="text-center text-white mt-4">¿Ya tiene una cuenta? <a href="/login" className="text-red-500">Inicie sesión aquí</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarioCliente;
