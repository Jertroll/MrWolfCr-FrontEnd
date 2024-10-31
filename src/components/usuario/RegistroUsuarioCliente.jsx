import { useState } from 'react';

function RegistroUsuarioCliente() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre_usuario: '',
    nombre_completo: '',
    email: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    email_facturacion: 'noAplica@.com',
    imagen: null,
    rol: 'usuario',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Crear un objeto FormData para enviar la imagen junto con los demás datos
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('https://tu-backend.com/api/registro', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (response.ok) {
        console.log("Registro exitoso");
      
      } else {
        console.log("Error al registrar");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Formulario de Registro de Usuarios</h2>
        <img src="" alt="" className="rounded-full mb-4" /> {/* Imagen circular */}
        
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Cédula</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Nombre de usuario</label>
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Nombre completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
            required
          />

          <label className="block mb-2 font-semibold">Imagen de perfil</label>
          <input
            type="file"
            name="imagen"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
          />

          <label className="block mb-2 font-semibold">Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none"
            required
          >
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            CREAR CUENTA
          </button>

        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarioCliente
