
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AgregarCategoria = () => {
    const [formData, setFormData] = useState({
        nombre_categoria: "",
        descripcion_categoria: "",
        imagen: "",
      }); 

      const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error

      const navigate = useNavigate(); // Para redirigir al usuario   

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    try {
      const response = await fetch("http://localhost:3000/api/v1/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("Categoría registrada exitosamente.");
        setFormData({ nombre_categoria: "", descripcion_categoria: "", imagen: "" }); // Limpiar formulario
      } else {
        const errorData = await response.text();
        setMensaje(`Error al registrar categoría: ${errorData}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Error en la solicitud. Intenta de nuevo.");
    }
  };

  // Manejar la navegación al presionar "Regresar"
  const handleBack = () => {
    navigate("/categorias");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Categoría</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo: Nombre de la categoría */}
          <div className="mb-4">
            <label htmlFor="nombre_categoria" className="block font-semibold">
              Nombre de la categoría
            </label>
            <input
              type="text"
              id="nombre_categoria"
              name="nombre_categoria"
              value={formData.nombre_categoria}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo: Descripción de la categoría */}
          <div className="mb-4">
            <label htmlFor="descripcion_categoria" className="block font-semibold">
              Descripción
            </label>
            <textarea
              id="descripcion_categoria"
              name="descripcion_categoria"
              value={formData.descripcion_categoria}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>

          {/* Campo: Imagen */}
          <div className="mb-4">
            <label htmlFor="imagen" className="block font-semibold">
              URL de la imagen
            </label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Regresar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Registrar Categoría
            </button>
          </div>
        </form>

        {/* Mensaje de éxito o error */}
        {mensaje && <p className="text-center mt-4 text-red-500">{mensaje}</p>}
      </div>
    </div>
  );
}

export default AgregarCategoria