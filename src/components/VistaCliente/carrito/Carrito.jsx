import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCarrito } from "../../VistaCliente/carrito/CarritoContext";
import "./Carrito.css";
import { BASE_URL } from "../../utils/auth";

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seleccionados, setSeleccionados] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const { eliminarDelCarrito } = useCarrito();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
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
        fetch(`${BASE_URL}/api/v1/cart/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
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
            .catch(() => setError("Error al eliminar el producto."));
    };

    const actualizarCantidad = (productId, tallaId, quantity) => {
        if (quantity < 1 || quantity > 5) {
            alert("La cantidad debe estar entre 1 y 5 unidades.");
            return;
        }

        fetch(`${BASE_URL}/api/v1/cart/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` })
            },
            credentials: "include",
            body: JSON.stringify({ productId, tallaId, quantity })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Cantidad actualizada") {
                    setCarrito(data.cart);
                }
            })
            .catch(() => setError("Error al actualizar la cantidad."));
    };

    const manejarSeleccion = (productId, tallaId) => {
    const key = `${productId}-${tallaId}`;
    setSeleccionados((prev) => {
        const existe = prev.find(p => `${p.productId}-${p.tallaId}` === key);
        if (existe) {
            return prev.filter(p => `${p.productId}-${p.tallaId}` !== key);
        } else {
            return [...prev, { productId, tallaId }];
        }
    });
    };


    const comprarProductos = async () => {
        if (!token) {
            alert("No estás autenticado.");
            return;
        }

        if (seleccionados.length === 0) {
            alert("Selecciona al menos un producto para comprar.");
            return;
        }

        const productosSeleccionados = carrito
            .filter(p => seleccionados.some(s => s.productId === p.id && s.tallaId === p.tallaId)&&
            p.estado !== "No disponible" )
            .map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                quantity: p.quantity,
                tallaId: p.tallaId
            }));

        try {
            const response = await fetch(`${BASE_URL}/api/v1/crear/Factura`, {
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
                setMensajeExito("¡Compra realizada con éxito!");

                await fetch(`${BASE_URL}/api/v1/cart/remove-multiple`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        productos: productosSeleccionados.map(p => ({
                            id: p.id,
                            tallaId: p.tallaId
                        }))
                    })
                });

                window.location.href = `/factura/${data.factura.id}`;
            } else {
                alert(data.message || "Error al procesar la compra");
            }
        } catch (err) {
            console.error("Error al comprar productos:", err);
            alert("Hubo un error al realizar la compra.");
        }
    };

    const vaciarCarrito = async () => {
        if (!token) {
            alert("No estás autenticado.");
            return;
        }

        const productosAEliminar = carrito.map(p => ({
            productId: p.id,
            tallaId: p.tallaId
        }));

        try {
            await fetch(`${BASE_URL}/api/v1/cart/remove-multiple`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ productos: productosAEliminar })
            });

            setCarrito([]);
            setSeleccionados([]);
        } catch (err) {
            alert("Error al vaciar el carrito.");
        }
    };

 const totalAPagar = carrito.reduce((total, p) => {
    const estaSeleccionado = seleccionados.some(s => s.productId === p.id && s.tallaId === p.tallaId);
    return estaSeleccionado ? total + (p.precio * p.quantity) : total;
 }, 0);

    if (loading) return <p>Cargando carrito...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="carrito-container">
            {mensajeExito && (
                <div className="mensaje-modal">
                    <div className="mensaje-contenido">
                        <h3>{mensajeExito}</h3>
                    </div>
                </div>
            )}
           <div className="encabezado-carrito">
           <h2 className="titulo-Carrito">Carrito de Compras</h2>
          <button
            className="seguir-comprando"
            onClick={() => window.location.href = "/productos"}
          >
             Seguir Comprando
          </button>
         </div>
         {carrito.length > 0 && seleccionados.length === 0 && (
  <p className="mensaje-seleccion">Selecciona los productos que deseas comprar.</p>
)}

            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="tabla-responsive">
                    <table className="tabla-carrito">
                        <thead>
                            <tr>
                                <th>Selec.</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Talla</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="no-disponible">
                                        <input
                                       type="checkbox"
                                       checked={seleccionados.some(s => s.productId === p.id && s.tallaId === p.tallaId)}
                                       disabled={p.estado === "No disponible"}
                                       onChange={() => manejarSeleccion(p.id, p.tallaId)}
                                       />
                                       {p.estado === "No disponible" && (
                                       <small className="mensaje-no-disponible">No disponible</small>
                                        )}
                                       </div>
                                    </td>
                                    <td className="producto-info">
                                        <img
                                            src={p.imagen ? `${BASE_URL}/public/ImgProductos/${p.imagen}` : "/placeholder.jpg"}
                                            alt={p.nombre}
                                            className="producto-img"
                                        />
                                        {p.nombre}
                                    </td>
                                    <td>₡ {p.precio.toLocaleString()}</td>
                                     <td>{p.tallaNombre}</td>
                                    <td className="cantidad">
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={p.quantity}
                                            onChange={(e) => actualizarCantidad(p.id, p.tallaId, parseInt(e.target.value, 10))}
                                        />
                                    </td>
                                     <td className="total">₡ {(p.precio * p.quantity).toLocaleString()}</td>

                                    <td>
                                        <button className="eliminar" onClick={() => eliminarProducto(p.id, p.tallaId)}>
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
                <button className="vaciar-carrito" onClick={vaciarCarrito}>Vaciar Carrito</button>
                <button className="comprar" onClick={comprarProductos}>Comprar</button>
            </div>
        </div>
    );
};

export default Carrito;
