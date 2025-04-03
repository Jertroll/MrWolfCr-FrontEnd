import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    const agregarAlCarrito = () => {
        setCantidadCarrito((prev) => prev + 1);
    };

    return (
        <CarritoContext.Provider value={{ cantidadCarrito, agregarAlCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired, // ✅ Agregar validación de PropTypes
};

export const useCarrito = () => useContext(CarritoContext);
