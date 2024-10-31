import { useState } from 'react';

function ActualizarPerfil() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre_usuario: '',
    nombre_completo: '',
    email: '',
    telefono: '',
    direccion: '',
    email_facturacion: '',
    imagen: null,
  });

  const [imagenPreview, setImagenPreview] = useState(null);
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensaje de éxito o error

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setImagenPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar los datos al backend
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('url', { // cambiar la url segun el backend
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setMensaje('Perfil actualizado con éxito');
      } else {
        setMensaje('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Actualizar Perfil</h2>
        
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

          <label className="block mb-2 font-semibold">Correo electrónico para facturación</label>
          <input
            type="email"
            name="email_facturacion"
            value={formData.email_facturacion}
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

          {imagenPreview && (
            <div className="mb-4">
              <img src={imagenPreview} alt="Vista previa" className="w-32 h-32 object-cover rounded-full mx-auto" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            ACTUALIZAR PERFIL
          </button>
        </form>
        
        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </div>
  );
}

export default ActualizarPerfil;
