import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils/auth";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [mostrarContadorTemporal, setMostrarContadorTemporal] = useState(false);

    // Función para obtener el carrito desde la API o el almacenamiento local
    const obtenerCarrito = async () => {
        const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(storedCarrito);
        actualizarCantidadTotal(storedCarrito);
    };

    // Función para agregar al carrito
    const agregarAlCarrito = async (productId, tallaId, quantity) => {
        const updatedCarrito = [...carrito];
        const existingProductIndex = updatedCarrito.findIndex(p => p.productoId === productId && p.tallaId === tallaId);

        if (existingProductIndex !== -1) {
            updatedCarrito[existingProductIndex].quantity += quantity;
        } else {
            updatedCarrito.push({ productoId, tallaId, quantity });
        }

        setCarrito(updatedCarrito);
        localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
        actualizarCantidadTotal(updatedCarrito);
        mostrarContador();
    };

    // Función para eliminar del carrito
    const eliminarDelCarrito = async (productId, tallaId) => {
        const updatedCarrito = carrito.filter(item => item.productoId !== productId || item.tallaId !== tallaId);
        setCarrito(updatedCarrito);
        localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
        actualizarCantidadTotal(updatedCarrito);
    };

    // Función para actualizar la cantidad del producto
    const actualizarCantidad = async (productId, tallaId, quantity) => {
        const updatedCarrito = carrito.map(item => 
            item.productoId === productId && item.tallaId === tallaId ? { ...item, quantity } : item
        );
        setCarrito(updatedCarrito);
        localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
        actualizarCantidadTotal(updatedCarrito);
    };

    // Función para vaciar el carrito
    const vaciarCarrito = async () => {
        setCarrito([]);
        localStorage.removeItem("carrito");
        actualizarCantidadTotal([]);
    };

    // Función para obtener la cantidad de un producto específico
    const obtenerCantidadProducto = (productId, tallaId) => {
        const producto = carrito.find(p => p.productoId === productId && p.tallaId === tallaId);
        return producto ? producto.quantity : 0;
    };

    // Función para actualizar la cantidad total
    const actualizarCantidadTotal = (updatedCarrito) => {
        const total = updatedCarrito.reduce((sum, item) => sum + item.quantity, 0);
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
        obtenerCarrito();
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
