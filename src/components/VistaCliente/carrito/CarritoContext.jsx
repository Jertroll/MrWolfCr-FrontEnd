import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../utils/auth";
import PropTypes from "prop-types";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [mostrarContadorTemporal, setMostrarContadorTemporal] = useState(false);

    // Función para obtener el carrito del servidor
    const obtenerCarrito = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/v1/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: "include",
                body: JSON.stringify({ cart: carrito })
            });
            const data = await response.json();
            setCarrito(data.cart);
            actualizarCantidadTotal(data.cart);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    };

    // Función para agregar al carrito
    const agregarAlCarrito = async (productId, tallaId, quantity) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/v1/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: "include",
                body: JSON.stringify({
                    productId,
                    tallaId,
                    quantity,
                    cart: carrito
                })
            });
            const data = await response.json();
            setCarrito(data.cart);
            actualizarCantidadTotal(data.cart);
            mostrarContador();
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            throw error;
        }
    };

    // Función para eliminar del carrito
    const eliminarDelCarrito = async (productId, tallaId) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/v1/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: "include",
                body: JSON.stringify({
                    productId,
                    tallaId,
                    cart: carrito
                })
            });
            const data = await response.json();
            setCarrito(data.cart);
            actualizarCantidadTotal(data.cart);
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            throw error;
        }
    };

    // Función para actualizar cantidad
    const actualizarCantidad = async (productId, tallaId, quantity) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/v1/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: "include",
                body: JSON.stringify({
                    productId,
                    tallaId,
                    quantity,
                    cart: carrito
                })
            });
            const data = await response.json();
            setCarrito(data.cart);
            actualizarCantidadTotal(data.cart);
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
            throw error;
        }
    };

    // Función para vaciar el carrito
    const vaciarCarrito = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const productosAEliminar = carrito.map(p => ({
                id: p.id,
                tallaId: p.tallaId
            }));

            const response = await fetch(`${BASE_URL}/api/v1/cart/remove-multiple`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: "include",
                body: JSON.stringify({
                    productos: productosAEliminar,
                    cart: carrito
                })
            });
            const data = await response.json();
            setCarrito(data.cart);
            actualizarCantidadTotal(data.cart);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            throw error;
        }
    };

    // Función para obtener la cantidad de un producto específico
    const obtenerCantidadProducto = (productId, tallaId) => {
        const producto = carrito.find(p => p.id === productId && p.tallaId === tallaId);
        return producto ? producto.quantity : 0;
    };

    // Función para actualizar la cantidad total
    const actualizarCantidadTotal = (cart) => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCantidadCarrito(total);
    };

    // Función para mostrar el contador temporalmente
    const mostrarContador = () => {
        setMostrarContadorTemporal(true);
        setTimeout(() => {
            setMostrarContadorTemporal(false);
        }, 2000);
    };

    // Cargar el carrito al iniciar
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            obtenerCarrito();
        } else {
            setCarrito([]);
            setCantidadCarrito(0);
        }
    }, []);

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                cantidadCarrito,
                mostrarContadorTemporal,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                vaciarCarrito,
                obtenerCantidadProducto
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
    }
    return context;
};
