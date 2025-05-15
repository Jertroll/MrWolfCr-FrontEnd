import { useEffect, useState, useMemo,useCallback } from "react";
import { Link } from "react-router-dom";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { FaTrash, FaEye, FaFilePdf } from "react-icons/fa";

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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

const eliminarFactura = useCallback(async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("No se pudo eliminar la factura.");

            setFacturas(prev => prev.filter((factura) => factura.id !== id));
        } catch (error) {
            setError(error.message);
        }
    }
}, [token]);

    // Filtrado de búsqueda
    const data = useMemo(() => {
        const termino = busqueda.toLowerCase();
        return facturas.filter((factura) => {
            const codigo = factura.codigo_factura?.toLowerCase() || "";
            const cliente = factura.nombre_completo?.toLowerCase() || "";
            const fecha = new Date(factura.fecha_emision).toLocaleDateString().toLowerCase();
            return (
                codigo.includes(termino) ||
                cliente.includes(termino) ||
                fecha.includes(termino)
            );
        });
    }, [facturas, busqueda]);

    // Columnas para react-table
    const columns = useMemo(() => [
        {
            accessorKey: "codigo_factura",
            header: "Código",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "nombre_completo",
            header: "Cliente",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "fecha_emision",
            header: "Fecha",
            cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: (info) => `₡ ${parseFloat(info.getValue()).toLocaleString()}`,
        },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => {
                const factura = row.original;
                return (
                    <div className="flex justify-center gap-3">
                        <Link to={`/factura/${factura.id}`} className="text-blue-600 hover:text-blue-800" title="Ver detalle">
                            <FaEye />
                        </Link>
                        <a
                            href={`http://localhost:3000/api/v1/pdf/${factura.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800"
                            title="Descargar PDF"
                            color="#2a3a2e"
                        >
                            <FaFilePdf />
                        </a>
                        <button
                            onClick={() => eliminarFactura(factura.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                        >
                            <FaTrash />
                        </button>
                    </div>
                );
            },
        },
    ], [eliminarFactura]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) return <p className="text-center">Cargando facturas...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (facturas.length === 0) return <p className="text-center">No hay facturas disponibles.</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        table.setPageIndex(0);
                    }}
                    className="border p-2 rounded w-full md:w-1/3 shadow-sm"
                />
            </div>

            <div className="overflow-x-auto shadow-md rounded-xl bg-white">
                <table className="min-w-full text-center border-collapse">
                    <thead className="bg-gray-800 text-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="h-12">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b hover:bg-gray-100 h-12">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* paginación */}
           
                 <div className="flex justify-between items-center mt-4">
                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Inicio
                    </button>
                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </button>
                    <span className="text-gray-700">
                    Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
                    <strong>{table.getPageCount()}</strong>
                    </span>
                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </button>
                    <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        Final
                    </button>
                </div>
        </div>
    );
};

export default Facturas;
