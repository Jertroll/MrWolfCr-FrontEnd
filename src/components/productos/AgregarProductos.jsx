import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgregarProductos = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    talla: "",
    estado: "",
    imagen: "",
    genero_dirigido: "",
    id_categoria: 0,
  });

  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error

  const navigate = useNavigate(); // Para redirigir al usuario

  //Para tomar los datos del cambio del formulario en el momento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMensaje("Producto registrado exitosamente.");
        setFormData({
          codigo: "",
          nombre: "",
          precio: 0,
          descripcion: "",
          talla: "",
          estado: "",
          imagen: "",
          genero_dirigido: "",
          id_categoria: 0,
        }); // Limpiar formulario
      } else {
        const errorData = await response.text();
        setMensaje(`Error al registrar el producto: ${errorData}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("Error en la solicitud. Intenta de nuevo.");
    }
  };

  // Manejar la navegación al presionar "Regresar"
  const handleBack = () => {
    navigate("/productos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registrar Producto
        </h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="codigo" className="block font-semibold">
              Codigo
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nombre" className="block font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block font-semibold">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block font-semibold">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="talla" className="block font-semibold">
              Talla
            </label>
            <select
              type="text"
              id="talla"
              name="talla"
              value={formData.talla}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option>No Seleccionado</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="estado" className="block font-semibold">
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="genero_dirigido" className="block font-semibold">
              Género Dirigido
            </label>
            <select
              type="text"
              id="genero_dirigido"
              name="genero_dirigido"
              value={formData.genero_dirigido}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option>No Seleccionado</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="id_categoria" className="block font-semibold">
              ID Categoría
            </label>
            <input
              type="number"
              id="id_categoria"
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
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
              Registrar Producto
            </button>
          </div>
        </form>
        {mensaje && <p className="text-center mt-4 text-red-500">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarProductos;
