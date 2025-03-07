import { useState } from "react"; // Importa useState
import ReactModal from "react-modal";
import PropTypes from "prop-types";

const EditarProductoModal = ({
  isOpen,
  onRequestClose,
  productoForm,
  handleInputChange,
  saveChanges,
}) => {
  // Estado para almacenar los archivos seleccionados
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Función para manejar la selección de archivos
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // Convierte FileList a un array
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Producto"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Editor de Producto
        </h2>
        <form onSubmit={(e) => saveChanges(e, selectedFiles)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Columna 1 */}
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Código de Producto
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={productoForm.codigo || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={productoForm.precio || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Talla</label>
                <select
                  name="talla"
                  value={productoForm.talla || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Seleccione una talla
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Imagen</label>
                <input
                  type="file"
                  name="imagen"
                  multiple 
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={productoForm.nombre || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={productoForm.descripcion || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Estado</label>
                <select
                  name="estado"
                  value={productoForm.estado || "Disponible"} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible">No disponible</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Género Dirigido
                </label>
                <select
                  name="genero_dirigido"
                  value={productoForm.genero_dirigido || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                >
                  <option value="">No Seleccionado</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Categoría</label>
                <input
                  type="number"
                  name="id_categoria"
                  value={productoForm.id_categoria || ""} // Valor por defecto
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

// Validación de props con PropTypes
EditarProductoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  productoForm: PropTypes.shape({
    codigo: PropTypes.string,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    talla: PropTypes.string,
    imagen: PropTypes.string,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    estado: PropTypes.string,
    genero_dirigido: PropTypes.string,
    id_categoria: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
};

export default EditarProductoModal;
