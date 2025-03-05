import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditarProductoModal from "./paginas modal/EditarProductoModal";
import ImagenesProductoModal from "./paginas modal/ImagenesProductoModal";
import "./tableProducto.css";

const ProductoTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [filtering, setFiltering] = useState(""); // Estado para el filtrado
  const [sorting, setSorting] = useState([]); // Estado para el ordenamiento
  const [editingProducto, setEditingProducto] = useState(null); // Estado para el producto en edición
  const [productoForm, setProductoForm] = useState({}); // Estado para el formulario de edición
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de edición
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Estado para el modal de imágenes
  const [selectedProductImages, setSelectedProductImages] = useState([]); // Estado para las imágenes seleccionadas

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const productos = await response.json();
      setData(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("Hubo un error al obtener los productos. Por favor, intenta nuevamente.");
    }
  };

  // Función para eliminar un producto
  const deleteProducto = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el producto");
      setData((prevData) => prevData.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Función para iniciar la edición de un producto
  const startEditing = (producto) => {
    setEditingProducto(producto);
    setProductoForm(producto);
    setIsModalOpen(true);
  };

  // Función para manejar cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoForm({ ...productoForm, [name]: value });
  };

  // Función para guardar los cambios del formulario de edición
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/productos/${productoForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoForm),
      });
      if (!response.ok) throw new Error("Error al actualizar el producto");
      setData((prevData) =>
        prevData.map((producto) => (producto.id === productoForm.id ? productoForm : producto))
      );
      setIsModalOpen(false); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Función para abrir el modal de imágenes
  const openImageModal = (imagenes) => {
    setSelectedProductImages(imagenes);
    setIsImageModalOpen(true);
  };

  // Obtener datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data); // Verifica que los datos se están recibiendo correctamente
  }, [data]);

  // Columnas de la tabla
  const columns = [
    { header: "Id Producto", accessorKey: "id" },
    { header: "Código", accessorKey: "codigo" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Precio", accessorKey: "precio" },
    { header: "Descripción", accessorKey: "descripcion" },
    { header: "Talla", accessorKey: "talla" },
    { header: "Estado", accessorKey: "estado" },
    {
      header: "Imagen",
      accessorKey: "imagen",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {row.original.imagenes && row.original.imagenes.slice(0, 3).map((imagen, index) => (
            <img
              key={index}
              src={`http://localhost:3000/ImgProductos/${imagen.nomImagen}`}
              alt={`Imagen ${index + 1}`}
              className="h-16 w-16 object-cover"
            />
          ))}
          {row.original.imagenes && row.original.imagenes.length > 3 && (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => openImageModal(row.original.imagenes)}
            >
              +{row.original.imagenes.length - 3}
            </button>
          )}
        </div>
      ),
    },
    { header: "Género Dirigido", accessorKey: "genero_dirigido" },
    { header: "Categoría", accessorKey: "id_categoria" },
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

  // Configuración de la tabla
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

        {/* Botón para agregar producto */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
          onClick={() => navigate("/dashboard/agregarProducto")}
        >
          Agregar Producto
        </button>
      </div>

      {/* Modal de edición */}
      <EditarProductoModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        productoForm={productoForm}
        handleInputChange={handleInputChange}
        saveChanges={saveChanges}
      />

      {/* Modal de imágenes */}
      <ImagenesProductoModal
        isOpen={isImageModalOpen}
        onRequestClose={() => setIsImageModalOpen(false)}
        selectedProductImages={selectedProductImages}
      />

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
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
            <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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