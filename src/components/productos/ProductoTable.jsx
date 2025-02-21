import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import ReactModal from "react-modal";
import "./tableProducto.css";

export const ProductoTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);
  const [productoForm, setProductoForm] = useState({});

  // Función para iniciar la edición de un producto
  const startEditing = (producto) => {
    setEditingProducto(producto);
    setProductoForm(producto);
    setIsModalOpen(true); // Abre el modal
  };

  const [isModalOpen, setIsModalOpen] = useState(false); //estado para controlar la visibilidad de modal

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/productos");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const productos = await response.json();
      setData(productos); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert(
        "Hubo un error al obtener los usuarios. Por favor, intenta nuevamente."
      );
    }
  };

  // Función para eliminar un usuario
  const deleteProducto = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      // Actualiza el estado eliminando el producto de la lista
      setData((prevData) => prevData.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoForm({ ...productoForm, [name]: value });
  };

  const saveChanges = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${productoForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoForm), // Envía los datos actualizados
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      // Actualiza el estado con los datos modificados
      setData((prevData) =>
        prevData.map((producto) =>
          producto.id === productoForm.id ? productoForm : producto
        )
      );
      setIsModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llama a la función al montar el componente
  }, []);

  const columns = [
    { header: "Id Producto", accessorKey: "id" },
    { header: "Codigo", accessorKey: "codigo" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Precio", accessorKey: "precio" },
    { header: "Descripción", accessorKey: "descripcion" },
    { header: "Talla", accessorKey: "talla" },
    { header: "Estado", accessorKey: "estado" },
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
          onClick={() => navigate("/dashboard/agregarProducto")} // Ajusta la ruta según corresponda
        >
          Agregar Producto
        </button>
      </div>

      {/* Formulario para edición */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Producto"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Editor de Producto
          </h2>

          <form onSubmit={saveChanges}>
            <div className="grid grid-cols-2 gap-4">
              {/* Columna 1 */}
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Codigo de Producto
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={productoForm.codigo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={productoForm.precio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Talla</label>
                  <select
                    name="talla"
                    value={productoForm.talla}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Seleccione una talla
                    </option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Imagen</label>
                  <input
                    type="text"
                    name="imagen"
                    value={productoForm.imagen}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={productoForm.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Descripcion
                  </label>
                  <input
                    type="text"
                    name="descripcion"
                    value={productoForm.descripcion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Estado</label>
                  <select
                    name="estado"
                    value={productoForm.estado}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="No disponible">No disponible</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Genero Dirigido
                  </label>
                  <select
                    name="genero_dirigido"
                    value={productoForm.genero_dirigido}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  >
                    <option>No Seleccionado</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Categoria</label>
                  <input
                    type="number"
                    name="id_categoria"
                    value={productoForm.id_categoria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </ReactModal>

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
