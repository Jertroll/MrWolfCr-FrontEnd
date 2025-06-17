import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../utils/auth";

const AgregarProductos = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    tallas: [],
    estado: "",
    imagen: [],
    genero_dirigido: "",
    id_categoria: 0,
  });
  const [categorias, setCategorias] = useState([]); // Estado para
  // almacenar las categorías
  const [tallasOptions, setTallasOptions] = useState([]);

  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error
  const navigate = useNavigate(); // Para redirigir al usuario

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/categorias`);
        const data = await response.json(); //Parsear la respuesta JSON
        const categoriasOptions = data.map((categoria) => ({
          value: categoria.num_categoria,
          label: categoria.nombre_categoria,
        }));
        setCategorias(categoriasOptions);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchTallas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/tallas`);
        const data = await response.json();
        const tallasMapped = data.map((talla) => ({
          value: talla.id.toString(),
          label: talla.nombre,
        }));
        setTallasOptions(tallasMapped);
      } catch (error) {
        console.error("Error al obtener tallas:", error);
      }
    };

    fetchCategorias();
    fetchTallas();
  }, []);

  const handleCategoriaChange = (selectedOption) => {
    setFormData({ ...formData, id_categoria: selectedOption.value });
  };
  // Manejar cambio en las tallas
  const handleTallasChange = (selectedOptions) => {
    const tallasValues = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, tallas: tallasValues });
  };

  // Manejar el cambio de los datos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convertir FileList en un array
    setFormData({ ...formData, imagen: files }); // Guardar todos los archivos
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir el array de tallas a una cadena separada por comas
    const tallasString = formData.tallas.join(",");

    // Crear un FormData y agregar todos los valores del formulario
    const data = new FormData();
    data.append("codigo", formData.codigo);
    data.append("nombre", formData.nombre);
    data.append("precio", formData.precio ? Number(formData.precio) : 0);
    data.append("descripcion", formData.descripcion);
    data.append("tallas", tallasString); // Enviar tallas como cadena
    data.append("estado", formData.estado);
    data.append("genero_dirigido", formData.genero_dirigido);
    data.append(
      "id_categoria",
      formData.id_categoria ? Number(formData.id_categoria) : 0
    );

    // Añadir todas las imágenes al FormData
    if (formData.imagen && formData.imagen.length > 0) {
      formData.imagen.forEach((file) => {
        data.append("imagen", file);
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v1/productos`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setMensaje("Producto registrado exitosamente.");
        setFormData({
          codigo: "",
          nombre: "",
          precio: 0,
          descripcion: "",
          tallas: [],
          estado: "",
          imagen: [],
          genero_dirigido: "",
          id_categoria: 0,
        });
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
    navigate("/dashboard/producto");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registrar Producto
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
            {/* Columna 1 */}
            <div>
              <label htmlFor="codigo" className="block font-semibold">
                Código
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
            <div>
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
            <div>
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
            <div>
              <label htmlFor="tallas" className="block font-semibold">
                Tallas
              </label>
              <Select
                isMulti
                options={tallasOptions}
                value={tallasOptions.filter((option) =>
                  formData.tallas.includes(option.value)
                )}
                onChange={handleTallasChange}
                className="w-full"
                inputId="tallas"
              />
            </div>
            <div>
              <label htmlFor="estado" className="block font-semibold">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">No Seleccionado</option>
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
            </div>
            <div>
              <label htmlFor="genero_dirigido" className="block font-semibold">
                Género Dirigido
              </label>
              <select
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
            <div>
              <label htmlFor="id_categoria" className="block font-semibold">
                Categoría
              </label>
              <Select
                options={categorias}
                value={
                  categorias.find(
                    (categoria) =>
                      categoria.value === Number(formData.id_categoria)
                  ) || null
                }
                onChange={handleCategoriaChange}
                className="w-full"
                placeholder="Selecciona una categoría"
              />
            </div>
            <div>
              <label htmlFor="imagen" className="block font-semibold">
                Imágenes del Producto
              </label>
              <input
                type="file"
                multiple
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-4">
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

          <div className="flex flex-col space-y-4 mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
            >
              Registrar Producto
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
            >
              Regresar
            </button>
          </div>
        </form>
        {mensaje && <p className="text-center mt-4 text-red-500">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarProductos;
