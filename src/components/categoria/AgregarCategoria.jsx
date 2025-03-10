import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
const AgregarCategoria = () => {
  // Estado inicial para el formulario
  const [formData, setFormData] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
    imagen: null,
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error
  const navigate = useNavigate(); // Para redirigir al usuario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del archivo en el formulario
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imagen: file });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
  
    const formDataToSend = new FormData();
    formDataToSend.append("nombre_categoria", formData.nombre_categoria);
    formDataToSend.append("descripcion_categoria", formData.descripcion_categoria);
    formDataToSend.append("imagen", formData.imagen);
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/categorias", {
        method: "POST",
        body: formDataToSend, // Enviar FormData sin 'Content-Type'
      });
  
      if (response.ok) {
        setMensaje("Categoría registrada exitosamente.");
        setFormData({
          nombre_categoria: "",
          descripcion_categoria: "",
          imagen: null,
        });
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
    navigate("/dashboard/categoria");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registrar Categoría
        </h2>

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
            <label
              htmlFor="descripcion_categoria"
              className="block font-semibold"
            >
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

            </label>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="w-full"
            >
              Subir imagen de Categoria
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange} // Maneja la selección del archivo
                accept="image/*" // Acepta solo archivos de imagen
              />
            </Button>
            {formData.imagen && (
              <p className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {formData.imagen.name}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col space-y-4 mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
            >
              Registrar Categoría
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

        {/* Mensaje de éxito o error */}
        {mensaje && <p className="text-center mt-4 text-red-500">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarCategoria;
