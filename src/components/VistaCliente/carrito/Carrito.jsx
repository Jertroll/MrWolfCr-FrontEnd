import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./Carrito.css"; // Importamos el CSS externo

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/cart", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.cart);
                setCarrito(data.cart);
                setLoading(false);
            })
            .catch(() => setError("No se pudo cargar el carrito."));
    }, []);

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
                    setCarrito(data.cart);
                }
            })
            .catch(() => setError("Error al eliminar el producto"));
    };

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="carrito-container">
            <h2 className="titulo">Carrito de Compras</h2>
            <button className="seguir-comprando" onClick={() => window.location.href = "/productos"}>
              Seguir Comprando
           </button>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="tabla-responsive">
                    <table className="tabla-carrito">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="producto-info">
                                    <img
                                        src={producto.imagen ? `http://localhost:3000/public/ImgProductos/${producto.imagen}` : "/path/to/placeholder-image.jpg"}
                                        alt={producto.nombre}
                                        className="producto-img"
                                    />
                                        {producto.nombre}
                                    </td>
                                    <td>₡ {producto.precio.toLocaleString()}</td>
                                    <td className="cantidad">
                                        <input type="number" min="1" max="5" value={producto.quantity} readOnly />
                                    </td>
                                    <td className="total">₡ {(producto.precio * producto.quantity).toLocaleString()}</td>
                                    <td>
                                        <button className="eliminar" onClick={() => eliminarProducto(producto.id, producto.tallaId)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <button className="vaciar-carrito">Vaciar Carrito</button>
        </div>
    );
};

export default Carrito;
