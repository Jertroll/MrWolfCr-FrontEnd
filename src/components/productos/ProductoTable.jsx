import { useEffect, useState } from "react";
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
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

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
      alert(
        "Hubo un error al obtener los productos. Por favor, intenta nuevamente."
      );
    }
  };

  // Función para eliminar un producto
  const deleteProducto = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${id}`,
        {
          method: "DELETE",
        }
      );
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
  const saveChanges = async (e, tallasIds, selectedFiles) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Agregar campos del formulario
      formData.append("codigo", productoForm.codigo);
      formData.append("nombre", productoForm.nombre);
      formData.append("precio", productoForm.precio);
      formData.append("descripcion", productoForm.descripcion);
      formData.append("estado", productoForm.estado);
      formData.append("genero_dirigido", productoForm.genero_dirigido);
      formData.append("id_categoria", productoForm.id_categoria);
      formData.append("tallas", tallasIds.join(",")); // Enviar tallas como cadena separada por comas

      // Agregar imágenes seleccionadas
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("imagen", file); // "imagen" debe coincidir con el nombre esperado en el backend
        });
      }

      // Depuración: Verificar los datos enviados al backend
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Enviar la solicitud PUT al backend
      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${productoForm.id}`,
        {
          method: "PUT",
          body: formData, // No es necesario agregar el encabezado "Content-Type"
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el producto");

      // Obtener el producto actualizado del backend
      const updatedProducto = await response.json();

      // Verificar la respuesta del backend
      console.log(
        "Producto actualizado recibido en el frontend:",
        updatedProducto
      );

      // Actualizar el estado local con los nuevos datos del producto
      setData((prevData) => {
        const newData = prevData.map((producto) =>
          producto.id === updatedProducto.producto.id
            ? updatedProducto.producto
            : producto
        );
        console.log("Estado actualizado:", newData); // Verificar el estado actualizado
        return newData;
      });

      // Cerrar el modal después de guardar
      setIsModalOpen(false);
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
    {
      header: "Talla",
      accessorKey: "tallas",
      cell: ({ row }) => (
        <div>
          {row.original.tallas && row.original.tallas.length > 0
            ? row.original.tallas.map((talla) => talla.nombre).join(", ")
            : "Sin tallas"}
        </div>
      ),
    },
    { header: "Estado", accessorKey: "estado" },
    {
      header: "Imagen",
      accessorKey: "imagen",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {row.original.imagenes &&
            row.original.imagenes
              .slice(0, 1)
              .map((imagen, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/ImgProductos/${imagen.nomImagen}`}
                  alt={`Imagen ${index + 1}`}
                  className="h-16 w-16 object-cover"
                />
              ))}
          {row.original.imagenes && row.original.imagenes.length > 1 && (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => openImageModal(row.original.imagenes)}
              aria-label="Ver más imágenes"
            >
              <ZoomOutMapIcon className="w-6 h-6" />{" "}
              {/* Mostrar el ícono en lugar del botón */}
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
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
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
      <div className="flex justify-between items-center mt-4">
        {/* Botón para ir a la primera página */}
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Inicio
        </button>

        {/* Botón para ir a la página anterior */}
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>

        {/* Indicador de página actual y total de páginas */}
        <span className="text-gray-700">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        {/* Botón para ir a la página siguiente */}
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>

        {/* Botón para ir a la última página */}
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
