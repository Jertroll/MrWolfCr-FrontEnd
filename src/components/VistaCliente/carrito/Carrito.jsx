import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Importamos el icono de Font Awesome

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productosSeleccionados, setProductosSeleccionados] = useState(new Set());

    useEffect(() => {
        // Cargar productos del carrito
        fetch("http://localhost:3000/api/v1/cart", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setCarrito(data.cart);
                setLoading(false);
            })
            .catch(() => setError("No se pudo cargar el carrito."));
    }, []);

    // Función para actualizar cantidad
    const actualizarCantidad = (productId, tallaId, cantidad) => {
        if (cantidad <= 0) {
            setError("La cantidad debe ser mayor a 0.");
            return;
        }

        fetch("http://localhost:3000/api/v1/cart/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, tallaId, quantity: cantidad })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Cantidad actualizada") {
                    setCarrito(data.cart); // Actualizar el carrito con los nuevos datos
                }
            })
            .catch(() => setError("Error al actualizar el carrito"));
    };

    // Función para eliminar producto del carrito
    const eliminarProducto = (productId, tallaId) => {
        fetch("http://localhost:3000/api/v1/cart/remove", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, tallaId })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Producto eliminado") {
                    setCarrito(data.cart); // Actualizar el carrito después de eliminar el producto
                }
            })
            .catch(() => setError("Error al eliminar el producto"));
    };

    // Función para eliminar productos seleccionados
    const eliminarSeleccionados = () => {
        fetch("http://localhost:3000/api/v1/cart/remove", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productIds: Array.from(productosSeleccionados) })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Productos eliminados") {
                    setCarrito(data.cart);
                    setProductosSeleccionados(new Set()); // Limpiar la selección
                }
            })
            .catch(() => setError("Error al eliminar productos seleccionados"));
    };

    // Función para manejar la selección de productos con el checkbox
    const handleCheckboxChange = (productId) => {
        setProductosSeleccionados((prev) => {
            const newSeleccionados = new Set(prev);
            if (newSeleccionados.has(productId)) {
                newSeleccionados.delete(productId);
            } else {
                newSeleccionados.add(productId);
            }
            return newSeleccionados;
        });
    };

    // Función para manejar el cambio de cantidad desde el input
    const handleCantidadChange = (e, productId, tallaId) => {
        let nuevaCantidad = parseInt(e.target.value, 10);

        // Limitar la cantidad a un máximo de 5
        if (nuevaCantidad > 5) {
            nuevaCantidad = 5;
            alert("La cantidad máxima por producto es 5.");
        }

        // Solo actualizar si la cantidad es válida
        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
            actualizarCantidad(productId, tallaId, nuevaCantidad);
        }
    };

    // Mostrar carga o errores
    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <h2>Carrito de Compras</h2>

            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {/* Botón para eliminar productos seleccionados */}
                    {productosSeleccionados.size > 0 && (
                        <button
                            onClick={eliminarSeleccionados}
                            style={{
                                background: "#ff4d4d",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                marginBottom: "15px",
                            }}
                        >
                            <FaTrash style={{ marginRight: "10px" }} />
                            Eliminar productos seleccionados
                        </button>
                    )}

                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {carrito.map((producto) => (
                            <li key={producto.id} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "15px",
                                borderBottom: "1px solid #ddd"
                            }}>
                                {/* Checkbox para seleccionar el producto */}
                                <input
                                    type="checkbox"
                                    checked={productosSeleccionados.has(producto.id)}
                                    onChange={() => handleCheckboxChange(producto.id)}
                                    style={{ marginRight: "15px" }}
                                />

                                {/* Imagen */}
                                <img
                                    src={`http://localhost:3000/public/ImgProductos/${producto.imagenes?.[0]?.nomImagen}`}
                                    alt={producto.nombre}
                                    width={100} height={100}
                                    style={{ borderRadius: "5px", objectFit: "cover" }}
                                />

                                {/* Información del producto */}
                                <div style={{ flex: 1, marginLeft: "15px" }}>
                                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{producto.nombre}</p>
                                    <p style={{ color: "#666" }}>₡ {producto.precio.toLocaleString()}</p>
                                    <p style={{ fontSize: "14px", color: "#555" }}>Talla: {producto.tallaNombre}</p>

                                    {/* Selector de Cantidad */}
                                    <label style={{ fontSize: "14px", color: "#555", marginLeft: "15px" }}>Cantidad:</label>
                                    <input
                                        type="number"
                                        value={producto.quantity}
                                        onChange={(e) => handleCantidadChange(e, producto.id, producto.tallaId)}
                                        min="1"
                                        max="5" // Aquí añadimos el límite máximo de 5
                                        style={{ width: "50px", marginLeft: "10px", padding: "5px", fontSize: "14px" }}
                                    />
                                </div>

                                {/* Precio total */}
                                <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>
                                    ₡ {(producto.precio * producto.quantity).toLocaleString()}
                                </p>

                                {/* Botón para eliminar individualmente */}
                                <button
                                    onClick={() => eliminarProducto(producto.id, producto.tallaId)}
                                    style={{
                                        background: "#ff4d4d",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                    }}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Botón de Comprar */}
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <button
                            style={{
                                background: "#28a745",
                                color: "white",
                                border: "none",
                                padding: "12px 30px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                fontSize: "16px",
                            }}
                        >
                            Comprar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Carrito;
