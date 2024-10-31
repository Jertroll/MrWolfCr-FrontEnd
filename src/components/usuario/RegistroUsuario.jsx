import { useState } from 'react';

function UserRegistrationForm() {
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

  const [mensaje, setMensaje] = useState(''); // Estado para mensajes de éxito o error

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

    // Crear un FormData para enviar al backend
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/registro-usuario,ejemplo', { // Cambiar la url segun el backend
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setMensaje('Usuario registrado con éxito');
      } else {
        setMensaje('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Formulario de Registro de Usuarios</h2>
        
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

        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </div>
  );
}

export default UserRegistrationForm;
