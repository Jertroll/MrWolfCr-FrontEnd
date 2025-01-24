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
  const [productoForm, setproductoForm] = useState({});

const columns = [
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
            alt="Imagen de categoría"
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

};
