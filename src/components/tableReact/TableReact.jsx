import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../../usuariosArreglos.json";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function TableReact() {
  const columns = [
    { header: "Cedula", accessorKey: "cedula" },
    { header: "Nombre de Usuario", accessorKey: "nombre_usuario" },
    { header: "Nombre Completo", accessorKey: "nombre_completo" },
    { header: "Email", accessorKey: "email" },
    { header: "Contraseña", accessorKey: "contrasena" },
    { header: "Telefono", accessorKey: "telefono" },
    { header: "Direccion de Residencia", accessorKey: "direccion" },
    { header: "Email de Facturacion", accessorKey: "email_facturacion" },
    { header: "Fecha de Registro", accessorKey: "fecha_registro" },
    { header: "Tipo de Rol", accessorKey: "rol" },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => alert(`Editando: ${row.original.cedula}`)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => alert(`Eliminando: ${row.original.cedula}`)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting: sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="p-4">
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm"
        placeholder="Buscar..."
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
        onClick={() => alert('Agregar nuevo usuario')}
      >
        Agregar Usuarios
      </button>
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-3 text-left font-semibold cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ⬆️",
                    desc: " ⬇️",
                  }[header.column.getIsSorted() || null] || ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 border-t">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Primera Página
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Página Anterior
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Página Siguiente
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Última Página
        </button>
      </div>
    </div>
  );
}

export default TableReact;
