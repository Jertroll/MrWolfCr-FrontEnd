import { useState } from "react";
import PropTypes from "prop-types";
import { obtenerUsuarioDesdeToken } from "../../utils/auth"; // Importamos la función desde utils/auth.js

const AgregarCarrito = ({ producto, tallaSeleccionada }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleAgregar = async () => {
        if (!tallaSeleccionada) {
            alert("Por favor selecciona una talla antes de agregar al carrito");
            return;
        }

        const user = obtenerUsuarioDesdeToken();
        if (!user) {
            alert("Debes iniciar sesión para agregar productos al carrito");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                credentials: "include",
                body: JSON.stringify({ productId: producto.id, tallaId: tallaSeleccionada, quantity: cantidad })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al agregar el producto");

            alert("Producto agregado al carrito");
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("No se pudo agregar el producto");
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
                onClick={handleAgregar}
                className="mt-2 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
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
