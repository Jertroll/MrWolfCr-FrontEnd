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
import { useState } from "react";
import ReactModal from "react-modal";
import "./tableCategoria.css";

const CategoriaTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [categoriaForm, setCategoriaForm] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // Función para iniciar la edición de un categoria
  const startEditing = (categoria) => {
    setEditingCategoria(categoria);
    setCategoriaForm(categoria);
    setIsModalOpen(true); // Abre el modal
  };
  const [isModalOpen, setIsModalOpen] = useState(false); //estado para controlar la visibilidad de modal

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
      alert(
        "Hubo un error al obtener las categorias. Por favor, intenta nuevamente."
      );
    }
  };

  // Función para eliminar una categoria
  const deleteCategoria = async (num_categoria) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;
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

  //Funcion para menjar la carga de una imagen en el formulario de actualizar
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoriaForm((prevForm) => ({
          ...prevForm,
          imagen: reader.result, // Guarda la imagen en base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Función para guardar los cambios de la categoria
  const saveChanges = async (e) => {
    e.preventDefault();
  
    if (!categoriaForm.nombre_categoria || !categoriaForm.descripcion_categoria) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("nombre_categoria", categoriaForm.nombre_categoria);
      formData.append("descripcion_categoria", categoriaForm.descripcion_categoria);
  
      // Agregar imagen solo si es un nuevo archivo (evita enviar la URL como imagen)
      if (categoriaForm.imagen && categoriaForm.imagen instanceof File) {
        formData.append("imagen", categoriaForm.imagen);
      }
  
      const response = await fetch(
        `http://localhost:3000/api/v1/categorias/${categoriaForm.num_categoria}`,
        {
          method: "PUT",
          body: formData, // No agregamos headers, ya que `FormData` los maneja automáticamente.
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
      }
  
      const updatedCategoria = await response.json();
  
      setData((prevData) =>
        prevData.map((categoria) =>
          categoria.num_categoria === categoriaForm.num_categoria
            ? updatedCategoria // Se actualiza con la nueva respuesta del backend
            : categoria
        )
      );
  
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
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
          src={`http://localhost:3000/imagenes/${row.original.imagen}`}
          // Usa la ruta completa devuelta por el backend
          alt="Imagen de categoría"
          className="h-16 w-16 object-cover"
          onError={(e) => {
            e.target.src = "/assets/No imagen.jpg"; // Imagen por defecto
          }}
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
    getPaginationRowModel: getPaginationRowModel(), // Habilitar paginación
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      pagination: { pageIndex: 0, pageSize: 5 }, // Limitar a 5 categorías por página
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: (updater) => {
      // Actualizar el estado de paginación
      if (typeof updater === "function") {
        setPagination(updater);
      }
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

        {/* Botón para agregar categoría */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
          onClick={() => navigate("/dashboard/agregarCategoria")} // Ajusta la ruta según corresponda
        >
          Agregar Categoría
        </button>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Categoria"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Editor de Categoria
          </h2>

          <form onSubmit={saveChanges}>
            <div className="gap-4">
              {/* Columna 1 */}
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Nombre de Categoria
                  </label>
                  <input
                    type="text"
                    name="nombre_categoria"
                    value={categoriaForm.nombre_categoria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="descripcion_categoria"
                    value={categoriaForm.descripcion_categoria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Imagen</label>
                  {/* Vista previa de la imagen */}
                  {categoriaForm.imagen && (
                    <img
                      src={categoriaForm.imagen}
                      alt="Vista previa"
                      className="w-40 h-40 object-cover rounded-lg mb-2"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
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
                  {cell.column.id === "imagen" ? ( // Aquí verificamos si la columna es la de la imagen
                    row.original.imagen ? (
                      <img
                        src={row.original.imagen}
                        alt="Imagen de categoría"
                        className="w-20 h-20 object-cover rounded-full"
                      />
                    ) : (
                      <div>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    )
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext()) // Para las demás columnas
                  )}
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
      {/* Indicador de página */}
      <div className="flex justify-center items-center mt-4">
        <span className="text-gray-700">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};
export default CategoriaTable;
