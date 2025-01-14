import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import data from "../categoria/categorias.json";

const CategoriaTable = () => {
  // Definición de columnas
  const columns = [
    {
      header: "Num Categoria",
      accessorKey: "num_categoria",
    },
    {
      header: "Nombre",
      accessorKey: "nombre_categoria",
    },
    {
      header: "Descripción",
      accessorKey: "descripcion_categoria",
    },
    {
      header: "Imagen",
      accessorKey: "imagen",
    },
  ];

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // Necesario para calcular filas base
  });

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border border-gray-300 text-left bg-gray-100"
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 border border-gray-300 text-left"
                >
                  {/* Renderizar contenido de celda */}
                  {cell.column.id === "imagen" ? (
                    <img
                      src={cell.getValue()}
                      alt="Imagen de categoría"
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    cell.getValue()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaTable;
