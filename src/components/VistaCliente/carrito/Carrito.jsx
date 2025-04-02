import { useEffect, useState } from "react";

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seleccionados, setSeleccionados] = useState([]); // Productos seleccionados

    useEffect(() => {
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
            .catch((err) => {
                console.error("Error en la solicitud:", err);
            });
    }, []);

    const eliminarDelCarrito = (productId, tallaId) => {
        fetch("http://localhost:3000/api/v1/cart/remove", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, tallaId }),
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Producto eliminado") {
                    setCarrito(prevCarrito => prevCarrito.filter(p => !(p.id === productId && p.tallaId === tallaId)));
                    setSeleccionados(prev => prev.filter(p => !(p.id === productId && p.tallaId === tallaId)));
                }
            })
            .catch(() => setError("Error al eliminar el producto"));
    };

    const toggleSeleccionado = (producto) => {
        setSeleccionados((prev) =>
            prev.some((p) => p.id === producto.id && p.tallaId === producto.tallaId)
                ? prev.filter((p) => !(p.id === producto.id && p.tallaId === producto.tallaId))
                : [...prev, producto]
        );
    };

    const eliminarSeleccionados = () => {
        seleccionados.forEach((producto) => eliminarDelCarrito(producto.id, producto.tallaId));
    };

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    <button 
                        onClick={eliminarSeleccionados} 
                        disabled={seleccionados.length === 0} 
                        style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: seleccionados.length === 0 ? "not-allowed" : "pointer",
                            borderRadius: "5px",
                            marginBottom: "10px"
                        }}
                    >
                        🗑 Eliminar Seleccionados
                    </button>

                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {carrito.map((producto) => (
                            <li key={producto.id} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "15px",
                                borderBottom: "1px solid #ddd"
                            }}>
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={seleccionados.some((p) => p.id === producto.id && p.tallaId === producto.tallaId)}
                                    onChange={() => toggleSeleccionado(producto)}
                                    style={{ marginRight: "10px" }}
                                />

                                {/* Imagen del producto */}
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
                                    <p style={{ color: "#999" }}>Talla: {producto.tallaNombre}</p>
                                </div>

                                {/* Controles de cantidad */}
                                <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "5px" }}>
                                    <button style={buttonStyle}>-</button>
                                    <span style={{ margin: "0 10px" }}>{producto.quantity}</span>
                                    <button style={buttonStyle}>+</button>
                                </div>

                                {/* Precio total y eliminar */}
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>₡ {(producto.precio * producto.quantity).toLocaleString()}</p>
                                    <button 
                                        onClick={() => eliminarDelCarrito(producto.id, producto.tallaId)} 
                                        style={{
                                            background: "red",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

// Estilo de los botones de cantidad
const buttonStyle = {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
};

export default Carrito;
