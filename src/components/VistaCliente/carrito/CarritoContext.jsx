<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { createContext, useState, useContext } from "react";
>>>>>>> parent of 7a1dfb1 (cambios a carrito)
import PropTypes from "prop-types";
=======
>>>>>>> parent of 695d5a2 (cambios carrito)
import { BASE_URL } from "../../utils/auth";
import PropTypes from "prop-types";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [mostrarContadorTemporal, setMostrarContadorTemporal] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
    // Función para obtener el carrito desde la API o el almacenamiento local
=======
    // Función para obtener el carrito del servidor
>>>>>>> parent of 695d5a2 (cambios carrito)
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
=======
    const agregarAlCarrito = (productoId, tallaId, cantidad) => {
        setCarrito((prevCarrito) => {
            const existeItem = prevCarrito.some(
                (item) => item.productoId === productoId && item.tallaId === tallaId
            );

            if (!existeItem) {
                setCantidadCarrito((prev) => prev + 1);
                activarContadorTemporal();// mostrar el contador
                return [...prevCarrito, { productoId, tallaId, cantidad }];
            } else {
                return prevCarrito.map((item) => {
                    if (item.productoId === productoId && item.tallaId === tallaId) {
                        return { ...item, cantidad: item.cantidad + cantidad };
                    }
                    return item;
                });
            }
        });
    };

    const activarContadorTemporal = () => {
>>>>>>> parent of 7a1dfb1 (cambios a carrito)
        setMostrarContadorTemporal(true);
        setTimeout(() => setMostrarContadorTemporal(false), 5000); // 5 segundos
    };

<<<<<<< HEAD
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
=======
    const eliminarDelCarrito = () => {
        setCantidadCarrito((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const obtenerCantidadProducto = (productoId, tallaId) => {
        const item = carrito.find(
            (item) => item.productoId === productoId && item.tallaId === tallaId
        );
        return item ? item.cantidad : 0;
    };
>>>>>>> parent of 7a1dfb1 (cambios a carrito)

    return (
        <CarritoContext.Provider
            value={{
                cantidadCarrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                obtenerCantidadProducto,
                mostrarContadorTemporal,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCarrito = () => useContext(CarritoContext);
