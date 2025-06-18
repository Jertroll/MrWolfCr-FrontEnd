import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "./CarritoContext";
import { BASE_URL } from "../../utils/auth";
import "./Carrito.css";

const Carrito = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    vaciarCarrito 
  } = useCarrito();

  // Función para manejar la selección de productos
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

  // Función para realizar la compra
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
      .filter(p => seleccionados.some(s => s.productId === p.id && s.tallaId === p.tallaId) &&
        p.estado !== "No disponible")
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
          ...(token && { Authorization: `Bearer ${token}` })
        },
        credentials: "include",
        body: JSON.stringify({ productos: productosSeleccionados })
      });

      const data = await response.json();

      if (response.ok) {
        setMensajeExito("¡Compra realizada con éxito!");
        await vaciarCarrito();
        window.location.href = `/factura/${data.factura.id}`;
      } else {
        alert(data.message || "Error al procesar la compra");
      }
    } catch (err) {
      console.error("Error al comprar productos:", err);
      alert("Hubo un error al realizar la compra.");
    }
  };

  // Cálculo total a pagar
  const totalAPagar = carrito.reduce((total, p) => {
    const estaSeleccionado = seleccionados.some(s => s.productId === p.id && s.tallaId === p.tallaId);
    return estaSeleccionado ? total + (p.precio * p.quantity) : total;
  }, 0);

  // Cargar carrito desde localStorage si no se ha cargado desde el servidor
  useEffect(() => {
    if (token) {
      // Obtener carrito del servidor
      setLoading(true);
      // Lógica para obtener carrito desde el backend
    } else {
      // Si no hay token, cargar el carrito de localStorage
      const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(storedCarrito);
      setLoading(false);
    }
  }, [token]);

  // Guardar carrito en localStorage cuando se modifique
  useEffect(() => {
    if (!token) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, token]);

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
          onClick={() => navigate("/productos")}
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
                <th>Seleccionar</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={`${producto.id}-${producto.tallaId}`}>
                  <td>
                    <input
                      type="checkbox"
                      checked={seleccionados.some(
                        s => s.productId === producto.id && s.tallaId === producto.tallaId
                      )}
                      onChange={() => manejarSeleccion(producto.id, producto.tallaId)}
                      disabled={producto.estado === "No disponible"}
                    />
                  </td>
                  <td>
                    <div className="producto-info">
                      <img
                        src={`${BASE_URL}/public/ImgProductos/${producto.imagen}`}
                        alt={producto.nombre}
                        className="producto-imagen"
                      />
                      <div>
                        <p className="producto-nombre">{producto.nombre}</p>
                        <p className="producto-talla">Talla: {producto.tallaNombre}</p>
                        {producto.estado === "No disponible" && (
                          <p className="producto-no-disponible">No disponible</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>${producto.precio}</td>
                  <td>
                    <div className="cantidad-controls">
                      <button
                        onClick={() => actualizarCantidad(producto.id, producto.tallaId, producto.quantity - 1)}
                        disabled={producto.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{producto.quantity}</span>
                      <button
                        onClick={() => actualizarCantidad(producto.id, producto.tallaId, producto.quantity + 1)}
                        disabled={producto.quantity >= 5}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${producto.precio * producto.quantity}</td>
                  <td>
                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarDelCarrito(producto.id, producto.tallaId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {carrito.length > 0 && (
        <div className="carrito-footer">
          <div className="total-section">
            <p>Total a pagar: ${totalAPagar}</p>
            <button
              className="comprar-btn"
              onClick={comprarProductos}
              disabled={seleccionados.length === 0}
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
