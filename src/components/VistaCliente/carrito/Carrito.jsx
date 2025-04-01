import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const Carrito = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading,/* setLoading*/] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart", {
                method: "GET",
                credentials: "include", // 👈 Esto es clave para mantener la sesión
            });
    
            const data = await response.json();
            console.log("Carrito cargado desde la API:", data);
    
            if (!Array.isArray(data)) throw new Error("Datos inválidos del servidor");
    
            setCart(data);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    };
    

    const removeFromCart = async (productId, tallaId) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, tallaId }),
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
        <CartContext.Provider value={{ cart, fetchCart, removeFromCart, clearCart, loading }}>
            {children}

            {/* 🔹 AQUÍ SE MUESTRA EL CARRITO EN EL MISMO COMPONENTE */}
            <div style={{ padding: "20px", border: "1px solid #ddd", marginTop: "20px" }}>
                <h2>Carrito de Compras</h2>

                {loading && <p>Cargando carrito...</p>}

                {cart.length === 0 ? (
                    <p>Tu carrito está vacío.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={`${item.id}-${item.tallaId}`} style={{ marginBottom: "10px" }}>
                                <img src={item.imagen} alt={item.nombre} width="50" />
                                <p>{item.nombre} - Talla: {item.tallaNombre}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Precio: ${item.precio}</p>
                                <button onClick={() => removeFromCart(item.id, item.tallaId)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                )}

                {cart.length > 0 && <button onClick={clearCart}>Vaciar Carrito</button>}
            </div>
        </CartContext.Provider>
    );
};

Carrito.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export default Carrito;
