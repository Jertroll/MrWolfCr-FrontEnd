import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFilePdf,FaArrowDown } from "react-icons/fa";
import moment from 'moment-timezone';
import { BASE_URL } from "../utils/auth";

const FacturasCliente = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const facturasPorPagina = 20;
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/facturas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        })
        .then((res) => {
            if (!res.ok) throw new Error("No se pudieron cargar las facturas.");
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

   const formatearFecha = (fecha) => {
  return moment.tz(fecha, "America/Costa_Rica").format('DD/MM/YYYY');
};

    const facturasFiltradas = facturas.filter((factura) => {
        const codigo = factura.codigo_factura.toLowerCase();
        const fecha = formatearFecha(factura.fecha_emision).toLowerCase();
        const termino = busqueda.toLowerCase();
        return codigo.includes(termino) || fecha.includes(termino);
    });

    const totalPaginas = Math.ceil(facturasFiltradas.length / facturasPorPagina);
    const inicio = (paginaActual - 1) * facturasPorPagina;
    const facturasPaginadas = facturasFiltradas.slice(inicio, inicio + facturasPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

 const styles = {
    container: {
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        color: "#333",
    },
    titulo: {
        textAlign:"left",
        fontSize: "1.5rem",
        marginBottom: "1rem",
        color: "#0a0a0a",
        borderBottom: "1px solid #1b5837",
        paddingBottom: "0.5rem",
        fontFamily: "'Baskerville Display PT', serif",
    },
    inputBusqueda: {
        marginBottom: "1rem",
        padding: "0.5rem",
        width: "500px",
        border: "1px solid #2a3a2e",
        borderRadius: "4px",
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
        backgroundColor: "#2a3a2e",
        color: "#fff",
        textAlign: "left",
        padding: "0.5rem",
    },
    td: {
        padding: "0.5rem",
        borderBottom: "1px solid #ecf0f1",
    },
    link: {
        marginRight: "1rem",
        textDecoration: "none",
        color: "#2a3a2e",
    },
    pdfLink: {
        color: "#2a3a2e",
        textDecoration: "none",
        backgroundColor: "#ffff",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
    },
    paginacion: {
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    },
    botonPagina: {
        padding: "0.5rem 1rem",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        cursor: "pointer",
        color: "#2a3a2e",
    },
    paginaActual: {
        fontWeight: "bold",
        color: "#2a3a2e",
    }
    };

    if (loading) return <p>Cargando facturas...</p>;
    if (error) return <p>{error}</p>;
    if (facturas.length === 0) return <p>No hay facturas disponibles.</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.titulo}>Mis Facturas</h2>

            <input
                type="text"
                placeholder="Buscar por código o fecha (ej. 11/5/2025)"
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1); // Reiniciar a la primera página al buscar
                }}
                style={styles.inputBusqueda}
            />

            <div style={styles.tableWrapper}>
                {facturasFiltradas.length === 0 ? (
                    <p>No se encontraron facturas con la búsqueda.</p>
                ) : (
                    <>
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
                                {facturasPaginadas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td style={styles.td}>{factura.codigo_factura}</td>
                                        <td style={styles.td}>{factura.nombre_completo}</td>
                                        <td style={styles.td}>{formatearFecha(factura.fecha_emision)}</td>
                                        <td style={styles.td}>₡ {factura.total.toLocaleString()}</td>
                                        <td style={styles.td}>
                                            <Link to={`/factura/${factura.id}`} style={styles.link} title="Detalle Factura">
                                                Mas...
                                            </Link>
                                            <a
                                                href={`${BASE_URL}/api/v1/pdf/${factura.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={styles.pdfLink}
                                                title="Descargar PDF"
                                            >
                                                  <FaFilePdf size={18} />
                                                 <FaArrowDown size={14} />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    <div style={styles.paginacion}>
                        <button
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            style={styles.botonPagina}
                            disabled={paginaActual === 1}
                            title="Página anterior"
                        >
                            &lt;
                        </button>

                        <span style={styles.paginaActual}>
                            {paginaActual} de {totalPaginas}
                        </span>

                        <button
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            style={styles.botonPagina}
                            disabled={paginaActual === totalPaginas}
                            title="Página siguiente"
                        >
                            &gt;
                        </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FacturasCliente;
