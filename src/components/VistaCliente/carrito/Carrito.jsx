import { useEffect, useState } from "react";

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener el carrito");
                return res.json();
            })
            .then((data) => {
                console.log("Datos del carrito:", data);
                setCarrito(data.cart);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const eliminarDelCarrito = (productId, tallaId) => {
        fetch("http://localhost:3000/api/v1/cart/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, tallaId }),
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Producto eliminado") {
                    setCarrito(prevCarrito => prevCarrito.filter(p => !(p.id === productId && p.tallaId === tallaId)));
                }
            })
            .catch(() => setError("Error al eliminar el producto"));
    };

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {carrito.map((producto) => (
                        <li key={`${producto.id}-${producto.tallaId}`}>
                            <img 
                                src={`http://localhost:3000/public/ImgProductos/${producto.imagenes?.[0]?.nomImagen}`} 
                                alt={producto.nombre} 
                                width={50} height={50}
                            />
                            <p>{producto.nombre} - Talla: {producto.tallaNombre}</p>
                            <p>Precio: ${producto.precio}</p>
                            <p>Cantidad: {producto.quantity}</p>
                            <button onClick={() => eliminarDelCarrito(producto.id, producto.tallaId)}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Carrito;