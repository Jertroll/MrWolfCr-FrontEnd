import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa

export const ProductoTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      nombre: "Camisa RG Legends",
      precio: 20000,
      descripcion: "Camisa para pasear",
      talla: "M",
      imagen: "https://via.placeholder.com/50",
      genero_dirigido: "Masculino",
      id_categoria: 1,
    },
    // Agrega más categorías según sea necesario
  ]);

  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);
  const [productoForm, setProductoForm] = useState({});

  const startEditing = (producto) => {
    setEditingProducto(producto);
    setProductoForm(producto);
  };

  const deleteProducto = (id) => {
    setData((prevData) => prevData.filter((producto) => producto.id !== id));
  };

  const columns = [
    { header: "Id Producto", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Precio", accessorKey: "precio" },
    { header: "Descripción", accessorKey: "descripcion" },
    { header: "Talla", accessorKey: "talla" },
    {
      header: "Imagen",
      accessorKey: "imagen",
      cell: ({ row }) => (
        <img
          src={row.original.imagen}
          alt="Imagen de productos"
          className="h-16 w-16 object-cover"
        />
      ),
    },
    { header: "Genero Dirigido", accessorKey: "genero_dirigido" },
    { header: "Categoria", accessorKey: "id_categoria" },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => startEditing(row.original)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteProducto(row.original.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: (updater) => setSorting(updater),
    onGlobalFilterChange: (updater) => setFiltering(updater),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoForm({ ...productoForm, [name]: value });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((producto) =>
        producto.id === productoForm.id ? productoForm : producto
      )
    );
    setEditingProducto(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar en tabla"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        />

        {/* Botón para agregar categoría */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
          onClick={() => navigate("/agregarProducto")} // Ajusta la ruta según corresponda
        >
          Agregar Producto
        </button>
      </div>

      {/* Formulario para edición (opcional) */}
      {editingProducto && (
        <form
          onSubmit={saveChanges}
          className="mb-4 p-4 border rounded shadow-md"
        >
          <h2 className="text-lg font-semibold">Editar Producto</h2>
          {Object.keys(productoForm).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={productoForm[key] ?? ""}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setEditingProducto(null)}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 ml-2"
          >
            Cancelar
          </button>
        </form>
      )}

      {/* Tabla */}
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left font-semibold"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === "asc"
                      ? " ⬆️"
                      : " ⬇️"
                    : ""}
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

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Inicio
        </button>
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Final
        </button>
      </div>
    </div>
  );
};

export default ProductoTable;
