import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Hook para redirección
import { obtenerUsuarioDesdeToken } from "../../utils/auth"; // Importamos la función desde utils/auth.js

const AgregarCarrito = ({ producto, tallaSeleccionada }) => {
    const [cantidad, setCantidad] = useState(1);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir al usuario

    useEffect(() => {
        const user = obtenerUsuarioDesdeToken();
        setUsuario(user); // Guardamos el usuario si existe
    }, []);

    const disponible = producto.estado === "Disponible"; // Verificar disponibilidad del producto
    const usuarioAutenticado = usuario !== null; // Verificar si el usuario está autenticado

    const handleAgregar = async () => {
        if (!usuarioAutenticado) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            navigate("/login"); // Redirige a la página de login
            return;
        }

        if (!disponible) {
            alert("Este producto no está disponible en este momento.");
            return;
        }

        if (!tallaSeleccionada) {
            alert("Por favor selecciona una talla antes de agregar al carrito.");
            return;
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

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al agregar el producto");

            alert("Producto agregado al carrito.");
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("No se pudo agregar el producto.");
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-md font-semibold">Cantidad:</h3>
            <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="border rounded-lg p-2 w-20 text-center"
            />
            <button
                onClick={handleAgregar} // Maneja la redirección o el agregado al carrito
                className={`mt-2 w-full py-2 rounded-lg font-medium text-white transition-opacity duration-300 ${
                    disponible ? "bg-black hover:bg-gray-800" : "bg-gray-400 opacity-50 cursor-not-allowed"
                }`}
            >
                Agregar al Carrito
            </button>
        </div>
    );
};

AgregarCarrito.propTypes = {
    producto: PropTypes.object.isRequired,
    tallaSeleccionada: PropTypes.string,
};

export default AgregarCarrito;
