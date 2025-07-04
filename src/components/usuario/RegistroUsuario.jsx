import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/auth";

function RegistroUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cedula: "",
    nombre_usuario: "",
    nombre_completo: "",
    email: "",
    contrasena: "",
    telefono: "",
    direccion_envio: "",
    email_facturacion: "",
    imagen: "",
    rol: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/v1/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("Registro exitoso");
      } else {
        const errorData = await response.text();
        setMensaje(`Error al registrar: ${errorData}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Error en la solicitud");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/usuario");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Formulario de Registro de Usuarios
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Cédula</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Nombre de usuario</label>
              <input
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Nombre completo</label>
              <input
                type="text"
                name="nombre_completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Dirección</label>
              <input
                type="text"
                name="direccion_envio"
                value={formData.direccion_envio}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Correo de Facturación
              </label>
              <input
                type="email"
                name="email_facturacion"
                value={formData.email_facturacion}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Imagen de Perfil</label>
              <input
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Rol de Usuario</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none"
                required
              >
                <option>No Seleccionado</option>
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
            >
              CREAR CUENTA
            </button>
            <button
              type="button"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              onClick={handleBack}
            >
              Regresar
            </button>
          </div>
        </form>

        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </div>
  );
}

export default RegistroUsuario;
