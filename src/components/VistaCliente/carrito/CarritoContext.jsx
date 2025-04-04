import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [carrito] = useState([]); 

    const agregarAlCarrito = () => {
        setCantidadCarrito((prev) => prev + 1);
    };

    const eliminarDelCarrito = () => {
        setCantidadCarrito((prev) => (prev > 0 ? prev - 1 : 0)); // Evita que baje de 0
    };
       // Función para obtener la cantidad de un producto en el carrito por ID y talla
    const obtenerCantidadProducto = (productoId, tallaId) => {
        const item = carrito.find(
            (item) => item.productoId === productoId && item.tallaId === tallaId
        );
        return item ? item.cantidad : 0;  // Si no existe el producto con esa talla, devuelve 0
    };


    return (
        <CarritoContext.Provider value={{ cantidadCarrito, agregarAlCarrito, eliminarDelCarrito, obtenerCantidadProducto}}>
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCarrito = () => useContext(CarritoContext);
