import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { obtenerUsuarioDesdeToken } from "../../utils/auth";

const AgregarCarrito = ({ producto, tallaSeleccionada }) => {
    const [cantidad, setCantidad] = useState(1);
    const [usuario, setUsuario] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState("");
    const [mensajeTalla, setMensajeTalla] = useState(""); // Mensaje de advertencia para la talla
    const navigate = useNavigate();

    useEffect(() => {
        const user = obtenerUsuarioDesdeToken();
        setUsuario(user);
    }, []);

    const disponible = producto.estado === "Disponible";
    const usuarioAutenticado = usuario !== null;

    const handleAgregar = async () => {
        if (!usuarioAutenticado) {
            setMensajeModal("Debes iniciar sesión para agregar productos al carrito.");
            setMostrarModal(true);
            return;
        }

        if (!disponible) {
            setMensajeModal("Este producto no está disponible en este momento.");
            setMostrarModal(true);
            return;
        }

        if (!tallaSeleccionada) {
            setMensajeTalla("Por favor selecciona una talla antes de agregar al carrito.");
            return;
        } else {
            setMensajeTalla(""); // Limpiar mensaje si ya seleccionó una talla
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}`
                },
                credentials: "include",
                body: JSON.stringify({ productId: producto.id, tallaId: tallaSeleccionada, quantity: cantidad })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error al agregar el producto");
            }

        } catch (error) {
            console.error("Error al agregar producto:", error);
            setMensajeModal("No se pudo agregar el producto.");
            setMostrarModal(true);
        }
    };

    return (
        <div className="mt-4">
              <div className="mt-2">      
                {/* selector de tallas */}
                {mensajeTalla && <p className="text-red-500 text-sm mt-1">{mensajeTalla}</p>}
            </div>

            <h3 className="text-md font-semibold">Cantidad:</h3>
            <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="border rounded-lg p-2 w-20 text-center"
            />

            <button
                onClick={handleAgregar}
                className={`mt-2 w-full py-2 rounded-lg font-medium text-white transition-opacity duration-300 ${
                    disponible ? "bg-black hover:bg-gray-800" : "bg-gray-400 opacity-50 cursor-not-allowed"
                }`}
            >
                Agregar al Carrito
            </button>

            {/* Modal para otros mensajes */}
            {mostrarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <p className="text-lg font-semibold">{mensajeModal}</p>
                        <button
                            className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
                            onClick={() => {
                                setMostrarModal(false);
                                if (mensajeModal === "Debes iniciar sesión para agregar productos al carrito.") {
                                    navigate("/login");
                                }
                            }}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

AgregarCarrito.propTypes = {
    producto: PropTypes.object.isRequired,
    tallaSeleccionada: PropTypes.string,
};

export default AgregarCarrito;
