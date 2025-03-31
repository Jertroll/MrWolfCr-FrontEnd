import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Obtener carrito al montar el componente
    useEffect(() => {
        fetchCart();
    }, []);

    // Función para agregar al carrito
    const addToCart = async (productId, tallaId, quantity = 1) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, tallaId, quantity }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al agregar el producto");

            setCart(data.cart);
            alert("Producto agregado al carrito");
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo agregar el producto");
        }
    };

    // Función para obtener el carrito
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

    // Función para eliminar un producto del carrito
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al eliminar el producto");

            setCart(data.cart);
            alert("Producto eliminado del carrito");
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo eliminar el producto");
        }
    };

    // Función para vaciar el carrito
    const clearCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/cart/clear", {
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
        <CartContext.Provider value={{ cart, addToCart, fetchCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// **Validación de PropTypes**
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
