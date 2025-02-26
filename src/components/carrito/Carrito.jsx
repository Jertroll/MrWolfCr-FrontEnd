import React, { useState, useEffect } from "react";
import "./Carrito.css"; // Importamos los estilos

const usuarioId = "2"; // Reemplaza con el ID real del usuario

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);

    // Cargar el carrito desde el backend
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/carrito/${usuarioId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Datos recibidos:", data);
                setCarrito(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Error al cargar el carrito", error));
    }, []);

    const actualizarCantidad = async (usuarioId, productoId, cantidad) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/carrito`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuarioId, productoId, cantidad }), // Asegúrate de enviar todos los parámetros necesarios
            });
    
            if (!response.ok) {
                const errorDetails = await response.json(); // O usa response.text() si no es JSON
                throw new Error(`Error ${response.status}: ${errorDetails.message}`);
            }
    
            const updatedProducto = await response.json(); // Maneja la respuesta aquí
            setCarrito((prevCarrito) =>
                prevCarrito.map((producto) =>
                    producto.productoId === updatedProducto.productoId ? updatedProducto : producto
                )
            );
    
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
        }
    };
    
    
// Eliminar producto
function eliminarProducto(usuarioId, productoId) {
    fetch('http://localhost:3000/api/v1/carrito', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuarioId, productoId }), // Enviar ambos IDs en el cuerpo
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      return response.json();
    })
    .then(data => {
      console.log('Producto eliminado:', data);
      // Actualiza la UI según sea necesario
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


    // Vaciar carrito
    const vaciarCarrito = () => {
        fetch(`http://localhost:3000/api/v1/carrito/${usuarioId}`, {
            method: "DELETE",
        })
            .then(() => {
                setCarrito([]); // Vaciar el estado del carrito
            })
            .catch((error) => console.error("Error al vaciar el carrito", error));
    };

    return (
        <div className="carrito-container">
            <h2 className="titulo">Tu carrito</h2>
            <a href="/tienda" className="seguir-comprando">Seguir comprando</a>

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
                                        <button onClick={() => actualizarCantidad(producto.productoId, producto.cantidad + 1)}>+</button>
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
