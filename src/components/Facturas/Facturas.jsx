import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEye, FaFilePdf } from "react-icons/fa";
import "./Tablafactura.css";

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

  const eliminarFactura = useCallback(
    async (id) => {
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

          setFacturas((prev) => prev.filter((factura) => factura.id !== id));
        } catch (error) {
          setError(error.message);
        }
      }
    },
    [token]
  );

  const data = useMemo(() => {
    const termino = busqueda.toLowerCase();
    return facturas.filter((factura) => {
      const codigo = factura.codigo_factura?.toLowerCase() || "";
      const cliente = factura.nombre_completo?.toLowerCase() || "";
      const fecha = new Date(factura.fecha_emision)
        .toLocaleDateString()
        .toLowerCase();
      return codigo.includes(termino) || cliente.includes(termino) || fecha.includes(termino);
    });
  }, [facturas, busqueda]);

  const columns = useMemo(
    () => [
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
            <div className="actions-cell">
              <Link
                to={`/factura/${factura.id}`}
                className="edit-btn"
                title="Ver detalle"
              >
                <FaEye />
              </Link>
              <a
                href={`http://localhost:3000/api/v1/pdf/${factura.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="descargar-btn"
                title="Descargar PDF"
              >
                <FaFilePdf />
              </a>
              <button
                onClick={() => eliminarFactura(factura.id)}
                className="delete-btn"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </div>
          );
        },
      },
    ],
    [eliminarFactura]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <p className="text-center">Cargando facturas...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (facturas.length === 0)
    return <p className="text-center">No hay facturas disponibles.</p>;

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            table.setPageIndex(0);
          }}
          className="search-input"
        />
      </div>

      <table className="custom-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="sortable-header">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Inicio
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>

        <span>
          Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
        <button
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
