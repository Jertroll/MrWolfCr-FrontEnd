import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const Carrito = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart");
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Datos inválidos del servidor");
            setCart(data);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al eliminar el producto");

            await fetchCart(); // Refrescar el carrito
            alert("Producto eliminado del carrito");
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo eliminar el producto");
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/clear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al vaciar el carrito");

            setCart([]);
            alert("Carrito vaciado");
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo vaciar el carrito");
        }
    };

    return (
        <CartContext.Provider value={{ cart, fetchCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

Carrito.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export default Carrito;
