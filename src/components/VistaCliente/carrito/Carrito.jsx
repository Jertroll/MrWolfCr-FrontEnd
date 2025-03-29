import { useEffect, useState } from "react";
import "./Carrito.css"; // Importamos los estilos


const obtenerUsuarioIdDesdeToken = () => {
    const token = sessionStorage.getItem("token"); // O sessionStorage.getItem("token");
    if (!token) return null; // Si no hay token, devuelve null

    try {
        const base64Url = token.split(".")[1]; // Extrae la parte útil del JWT
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        const { usuarioId } = JSON.parse(jsonPayload); // Extrae el usuarioId
        return usuarioId;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

const usuarioId = obtenerUsuarioIdDesdeToken();
const Carrito = () => {
    const [carrito, setCarrito] = useState([]);

    // Cargar el carrito desde el backend
    useEffect(() => {
        if (!usuarioId) return; // Evita errores si no hay usuario logueado
    
        fetch(`http://localhost:3000/api/v1/carrito/${usuarioId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Envía el token en la cabecera
            },
        })
        .then((res) => res.json())
        .then((data) => setCarrito(Array.isArray(data) ? data : []))
        .catch((error) => console.error("Error al cargar el carrito", error));
    }, [usuarioId]);

    const actualizarCantidad = async (productoId, nuevaCantidad) => {
        // Verificar que el producto exista en el carrito
        const productoExistente = carrito.find(item => item.productoId === productoId);
        if (!productoExistente) {
            console.error("Producto no encontrado en el carrito.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/carrito", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId: Number(usuarioId),
                    productoId: Number(productoId),
                    cantidad: Number(nuevaCantidad),
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            // Actualizar el carrito en el estado
            setCarrito(prevCarrito => 
                prevCarrito.map(item => 
                    item.productoId === productoId ? { ...item, cantidad: nuevaCantidad } : item
                )
            );

            console.log("Cantidad actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
        }
    };

    const eliminarProducto = async (productoId) => {
        // Verificar que el producto exista en el carrito
        const productoExistente = carrito.find(item => item.productoId === productoId);
        if (!productoExistente) {
            console.error("Producto no encontrado en el carrito.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/carrito", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    usuarioId: Number(usuarioId),
                    productoId: Number(productoId),
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            // Eliminar el producto del carrito en el estado
            setCarrito(prevCarrito => prevCarrito.filter(item => item.productoId !== productoId));

            console.log("Producto eliminado:", productoId);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    // Vaciar carrito
    const vaciarCarrito = () => {
        fetch(`http://localhost:3000/api/v1/carrito/${usuarioId}`, { method: "DELETE" })
            .then(() => {
                setCarrito([]); // Vaciar el estado del carrito
            })
            .catch((error) => console.error("Error al vaciar el carrito", error));
    };

    return (
        <div className="carrito-container">
            <h2 className="titulo">Tu carrito</h2>
            <a href="/home" className="seguir-comprando">Seguir comprando</a>

            {carrito.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
                <>
                    <table className="tabla-carrito">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(carrito) ? carrito.map((producto) => (
                                <tr key={producto.productoId}>
                                    <td className="producto-info">
                                        <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
                                        <div>
                                            <h3>{producto.nombre}</h3>
                                            <p>₡ {producto?.precio?.toLocaleString() || "Precio no disponible"}</p>
                                            <p>Talla: {producto.talla}</p>
                                        </div>
                                    </td>
                                    <td className="total">₡ {producto.total.toLocaleString("es-CR")}</td>
                                    <td className="cantidad">
                                        <button onClick={() => actualizarCantidad(producto.productoId, producto.cantidad - 1)}>-</button>
                                        <input
                                            type="number"
                                            value={producto.cantidad}
                                            min="1"
                                            readOnly
                                        />
                                        <button onClick={() => actualizarCantidad(producto.productoId, (producto.cantidad ?? 0) + 1)}>+</button>
                                        <button onClick={() => eliminarProducto(producto.productoId)} className="eliminar">&#128465;</button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="3">Error cargando el carrito</td></tr>}
                        </tbody>
                    </table>
                    <button onClick={vaciarCarrito} className="vaciar-carrito">Vaciar Carrito</button>
                </>
            )}
        </div>
    );
};

export default Carrito;
