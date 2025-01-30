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
import { useEffect } from "react";

const CategoriaTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [categoriaForm, setCategoriaForm] = useState({});

  // Función para iniciar la edición de un categoria
  const startEditing = (categoria) => {
    setEditingCategoria(categoria);
    setCategoriaForm(categoria);
  };
  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/categorias");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const categorias = await response.json();
      setData(categorias); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  // Función para eliminar una categoria
  const deleteCategoria = async (num_categoria) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/categorias/${num_categoria}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar la categoria");
      }
      // Actualiza el estado eliminando la categoria de la lista
      setData((prevData) =>
        prevData.filter(
          (categoria) => categoria.num_categoria !== num_categoria
        )
      );
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
    }
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoriaForm({ ...categoriaForm, [name]: value });
  };
  //Campos actualizados de actualizar categoria
  const fieldNames = {
    num_categoria: "Numero de Categoria",
    nombre_categoria: "Nombre de Categoria",
    descripcion: "Descripcion",
    imagen: "Imagen",
  };

  // Función para guardar los cambios de la categoria
  const saveChanges = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/categorias/${categoriaForm.num_categoria}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoriaForm), // Envía los datos actualizados
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar la categoria");
      }
      // Actualiza el estado con los datos modificados
      setData((prevData) =>
        prevData.map((categoria) =>
          categoria.num_categoria === categoriaForm.num_categoria
            ? categoriaForm
            : categoria
        )
      );
      setEditingCategoria(null); // Cierra el formulario de edición
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llama a la función al montar el componente
  }, []);

  const columns = [
    { header: "Num Categoria", accessorKey: "num_categoria" },
    { header: "Nombre", accessorKey: "nombre_categoria" },
    { header: "Descripción", accessorKey: "descripcion_categoria" },
    {
      header: "Imagen",
      accessorKey: "imagen",
      cell: ({ row }) => (
        <img
          src={row.original.imagen}
          alt="Imagen de categoría"
          className="h-16 w-16 object-cover"
        />
      ),
    },
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
            onClick={() => deleteCategoria(row.original.num_categoria)}
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

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
          onClick={() => navigate("/agregarCategoria")} // Ajusta la ruta según corresponda
        >
          Agregar Categoría
        </button>
      </div>

      {/* Formulario para edición (opcional) */}
      {editingCategoria && (
        <form
          onSubmit={saveChanges}
          className="mb-4 p-4 border rounded shadow-md"
        >
          <h2 className="text-lg font-semibold">Editar Categoría</h2>
          {Object.keys(categoriaForm).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">
                {fieldNames[key] || key}
              </label>
              <input
                type="text"
                name={key}
                value={categoriaForm[key] ?? ""}
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
            onClick={() => setEditingCategoria(null)}
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

export default CategoriaTable;
