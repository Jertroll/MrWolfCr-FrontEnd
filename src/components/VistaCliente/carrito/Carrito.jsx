import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCarrito } from "../../VistaCliente/carrito/CarritoContext";
import "./Carrito.css";

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seleccionados, setSeleccionados] = useState([]);
    const { eliminarDelCarrito } = useCarrito();

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
                    setSeleccionados(seleccionados.filter(id => id !== productId));
                    eliminarDelCarrito();
                }
            })
            .catch(() => setError("Error al eliminar el producto"));
    };

    const actualizarCantidad = (productId, tallaId, quantity) => {
        if (quantity < 1 || quantity > 5) {
            alert("La cantidad debe estar entre 1 y 5 unidades.");
            return;
        }

        fetch("http://localhost:3000/api/v1/cart/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, tallaId, quantity })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Cantidad actualizada") {
                    setCarrito(data.cart);
                }
            })
            .catch(() => setError("Error al actualizar la cantidad"));
    };

    const manejarSeleccion = (productId) => {
        setSeleccionados(prev => prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
    };

    const comprarProductos = async () => {
        const token = sessionStorage.getItem("token");
        if (seleccionados.length === 0) {
            alert("Selecciona al menos un producto para comprar.");
            return;
        }

        const productosSeleccionados = carrito
            .filter(producto => seleccionados.includes(producto.id))
            .map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                quantity: producto.quantity,
                tallaId: producto.tallaId
            }));

        try {
            const response = await fetch("http://localhost:3000/api/v1/crear/Factura", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ productos: productosSeleccionados })
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Compra realizada con éxito!");
                console.log("Factura generada:", data.factura);
            
                // ✅ Redirigir a una vista de factura
                window.location.href = `/factura/${data.factura.id}`;
            
            } else {
                alert(data.message || "Error al procesar la compra");
            }
        } catch (error) {
            console.error("Error al comprar productos:", error);
            alert("Hubo un error al realizar la compra.");
        }
    };

    const totalAPagar = carrito.reduce((total, producto) => {
        return seleccionados.includes(producto.id) ? total + (producto.precio * producto.quantity) : total;
    }, 0);

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
                                <th>Seleccionar</th>
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
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={seleccionados.includes(producto.id)}
                                            onChange={() => manejarSeleccion(producto.id)}
                                        />
                                    </td>
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
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max="5" 
                                            value={producto.quantity} 
                                            onChange={(e) => actualizarCantidad(producto.id, producto.tallaId, parseInt(e.target.value, 10))} 
                                        />
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
            <div className="Total">
                <h3 className="total-pagar">Total a pagar: ₡ {totalAPagar.toLocaleString()}</h3>
            </div>
            <div className="acciones-carrito">
                <button className="vaciar-carrito">Vaciar Carrito</button>
                <button className="comprar" onClick={comprarProductos}>Comprar</button>
            </div>
        </div>
    );
};

export default Carrito;
