import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft,FaFilePdf,FaArrowDown } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import './FacturaDetalle.css'
import moment from 'moment-timezone';
const FacturaDetalle = () => {
    const { id } = useParams();
    const [factura, setFactura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("token");
    //const rol = sessionStorage.getItem("rol");
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/factura/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("No se pudo cargar los detalles de la factura.");
            }
            return res.json();
        })
        .then((data) => {
            setFactura(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [id, token]);
    
      useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.rol);
          } catch (error) {
            console.error("Error al decodificar el token:", error);
          }
        }
      }, []);

    if (loading) return <p>Cargando detalles de la factura...</p>;
    if (error) return <p>{error}</p>;
    if (!factura) return <p>No se encontró la factura.</p>;

    return (
        <div className="factura-container">
            <h2 className="titulo">Detalles de la Factura</h2>
            <div className="acciones-superiores">
             {userRole === "Cliente" && (
                    <button className="volver" onClick={() => window.location.href = "/carrito"}>
                        <FaArrowLeft /> Volver al carrito
                    </button>
                )}
            <a
                href={`http://localhost:3000/api/v1/pdf/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success descargar-pdf"
                title="Descargar PDF"
            >
                <FaFilePdf size={18} />
                <FaArrowDown size={14} />
            </a>
            </div>

            <div className="factura-info">
                <h4>Factura: {factura.codigo_factura}</h4>
                <p><strong>Página:</strong> {factura.nombre_pagina}</p>
           <p><strong>Fecha de emisión:</strong> {moment.tz(factura.fecha_emision, "America/Costa_Rica").format('DD/MM/YYYY')}</p>
                
                <h3 className="mt-4">Información del Cliente</h3>
                <p><strong>Cédula:</strong> {factura.cedula}</p>
                <p><strong>Nombre completo:</strong> {factura.nombre_completo}</p>
                <p><strong>Email:</strong> {factura.email_usuario}</p>
                <p><strong>Dirección de envío:</strong> {factura.direccion_envio}</p>
                <p><strong>Teléfono:</strong> {factura.telefono}</p>
                
                <h3 className="mt-4">Resumen de la Factura</h3>
                <p><strong>Subtotal:</strong> ₡ {factura.sub_total.toLocaleString()}</p>
                <p><strong>Precio de envío:</strong> ₡ {factura.precio_envio.toLocaleString()}</p>
                <p><strong>Total:</strong> ₡ {factura.total.toLocaleString()}</p>
            </div>

            {factura.detalles.length === 0 ? (
                <p>No hay productos en esta factura.</p>
            ) : (
                <div className="tabla-responsive mt-4">
                    <h3>Productos</h3>
                    <table className="tabla-factura">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factura.detalles.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.producto.nombre || producto.nombre_producto}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>₡ {producto.precio_unitario.toLocaleString()}</td>
                                    <td>₡ {producto.subtotal.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FacturaDetalle; 