import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:3000/api/v1/usuarios", {
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

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar al backend
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:3000/api/v1/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  };*/

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-11/12 h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Formulario de Registro de Usuarios</h2>
  
        <form onSubmit={handleSubmit} className="space-y-6 px-8">
          <div>
            <label className="block text-gray-600 font-medium">Cédula</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Nombre de usuario</label>
            <input
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Nombre completo</label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          {/* Agrupación de Correo y Contraseña */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
            </div>
  
            <div className="w-1/2">
              <label className="block text-gray-600 font-medium">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
            </div>
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Dirección</label>
            <input
              type="text"
              name="direccion_envio"
              value={formData.direccion_envio}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Correo electrónico de Facturación</label>
            <input
              type="email"
              name="email_facturacion"
              value={formData.email_facturacion}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Imagen de Perfil</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
  
          <div>
            <label className="block text-gray-600 font-medium">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            CREAR CUENTA
          </button>
          
          {/* Botón de regreso */}
          <button
            type="button"
            onClick={() => navigate(-1)} // Esto llevará al usuario a la página anterior
            className="w-full mt-4 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
          >
            REGRESAR
          </button>
          
        </form>
  
        {mensaje && <p className="text-center mt-4 text-gray-600">{mensaje}</p>}
      </div>
    </div>
  );
  
}

export default RegistroUsuario;
