import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [mostrarContadorTemporal, setMostrarContadorTemporal] = useState(false);

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
        setMostrarContadorTemporal(true);
        setTimeout(() => setMostrarContadorTemporal(false), 5000); // 5 segundos
    };

    const eliminarDelCarrito = () => {
        setCantidadCarrito((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const obtenerCantidadProducto = (productoId, tallaId) => {
        const item = carrito.find(
            (item) => item.productoId === productoId && item.tallaId === tallaId
        );
        return item ? item.cantidad : 0;
    };

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
