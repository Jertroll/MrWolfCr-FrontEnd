import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("No se pudieron cargar las facturas.");
            }
            return res.json();
        })
        .then((data) => {
            setFacturas(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [token]);

    const styles = {
        container: {
            padding: "2rem",
            fontFamily: "Arial, sans-serif",
        },
        titulo: {
            fontSize: "1.5rem",
            marginBottom: "1rem",
        },
        tableWrapper: {
            overflowX: "auto",
            marginTop: "1rem",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            backgroundColor: "#f4f4f4",
            textAlign: "left",
            padding: "0.5rem",
            borderBottom: "1px solid #ddd",
        },
        td: {
            padding: "0.5rem",
            borderBottom: "1px solid #ddd",
        },
        link: {
            marginRight: "1rem",
            textDecoration: "none",
            color: "#007bff",
        },
        pdfLink: {
            color: "#28a745",
            textDecoration: "none",
        }
    };

    if (loading) return <p>Cargando facturas...</p>;
    if (error) return <p>{error}</p>;
    if (facturas.length === 0) return <p>No hay facturas disponibles.</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.titulo}>Listado de Facturas (Administrador)</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Código</th>
                            <th style={styles.th}>Cliente</th>
                            <th style={styles.th}>Fecha</th>
                            <th style={styles.th}>Total</th>
                            <th style={styles.th}>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map((factura) => (
                            <tr key={factura.id}>
                                <td style={styles.td}>{factura.codigo_factura}</td>
                                <td style={styles.td}>{factura.nombre_completo}</td>
                                <td style={styles.td}>{new Date(factura.fecha_emision).toLocaleDateString()}</td>
                                <td style={styles.td}>₡ {factura.total.toLocaleString()}</td>
                                <td style={styles.td}>
                                    <Link to={`/factura/${factura.id}`} style={styles.link}>Ver detalle</Link>
                                    <a
                                        href={`http://localhost:3000/api/v1/pdf/${factura.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.pdfLink}
                                    >
                                        Descargar PDF
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Facturas;
