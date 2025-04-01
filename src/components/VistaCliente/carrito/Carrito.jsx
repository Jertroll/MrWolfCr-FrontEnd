import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/cart", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });

                const data = await response.json();
                if (!data.cart || !Array.isArray(data.cart)) throw new Error("Datos inválidos del servidor");
                console.log(data.cart);
                setCart(data.cart); // Ahora accedemos correctamente a `cart`
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []); // Se ejecuta solo una vez al montar el componente

    const removeFromCart = async (productId, tallaId) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, tallaId }),
                credentials: "include", // Necesario para la sesión
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error al eliminar el producto");

            setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.tallaId === tallaId)));
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
                credentials: "include",
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
        <CartContext.Provider value={{ cart, removeFromCart, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartContext;
