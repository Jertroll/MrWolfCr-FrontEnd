import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils/auth";

const ImagenesProductoModal = ({
  isOpen,
  onRequestClose,
  selectedProductImages,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Imágenes del Producto"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Imágenes del Producto
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {selectedProductImages.length > 0 ? (
            selectedProductImages.map((imagen, index) => (
              <img
                key={index}
                src={`${BASE_URL}/ImgProductos/${imagen.nomImagen}`}
                alt={`Imagen ${index + 1}`}
                className="h-32 w-32 object-cover"
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay imágenes disponibles.
            </p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            onClick={onRequestClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

ImagenesProductoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  selectedProductImages: PropTypes.arrayOf(
    PropTypes.shape({
      nomImagen: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ImagenesProductoModal;
