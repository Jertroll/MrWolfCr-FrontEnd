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
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ConfirmarAccionModal from "../confirmarAccion/ConfirmarAccionModal"; // Asegúrate de importar el modal
import "./tableCategoria.css";
import { BASE_URL } from "../utils/auth";

const CategoriaTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [categoriaForm, setCategoriaForm] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // Estado del modal de confirmación
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); 
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null); // Guardar ID de la categoría seleccionada para eliminar

  // Función para iniciar la edición de una categoría
  const startEditing = (categoria) => {
    setEditingCategoria(categoria);
    setCategoriaForm(categoria);
    setIsModalOpen(true); // Abre el modal de edición
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/categorias`);
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

  // Función para abrir el modal de confirmación de eliminación
  const confirmDeleteCategoria = (num_categoria) => {
    setSelectedCategoriaId(num_categoria); // Guardar el ID de la categoría seleccionada
    setOpenConfirmDialog(true); // Abrir el modal de confirmación
  };

  // Función para eliminar la categoría
  const deleteCategoria = async () => {
    if (!selectedCategoriaId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/categorias/${selectedCategoriaId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar la categoría");

      setData((prevData) => {
        const newData = prevData.filter(
          (categoria) => categoria.num_categoria !== selectedCategoriaId
        );
        const totalPages = Math.ceil(newData.length / pagination.pageSize);
        if (pagination.pageIndex >= totalPages) {
          setPagination((prev) => ({
            ...prev,
            pageIndex: totalPages - 1 >= 0 ? totalPages - 1 : 0,
          }));
        }
        return newData;
      });
      setOpenConfirmDialog(false); // Cerrar el modal de confirmación después de eliminar
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoriaForm({ ...categoriaForm, [name]: value });
  };

  // Función para manejar la carga de una imagen en el formulario de actualizar
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Guardamos el archivo directamente para enviarlo luego
      setCategoriaForm({
        ...categoriaForm,
        imagenFile: file, // Archivo para enviar al backend
        imagen: URL.createObjectURL(file), // URL para vista previa
      });
    }
  };

  // Función para guardar los cambios de la categoría
  const saveChanges = async (e) => {
    e.preventDefault();

    if (
      !categoriaForm.nombre_categoria ||
      !categoriaForm.descripcion_categoria
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre_categoria", categoriaForm.nombre_categoria);
      formData.append(
        "descripcion_categoria",
        categoriaForm.descripcion_categoria
      );

      // Agregar imagen solo si es un nuevo archivo (evita enviar la URL como imagen)
      if (categoriaForm.imagenFile) {
        formData.append("imagen", categoriaForm.imagenFile); // Archivo binario
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/categorias/${categoriaForm.num_categoria}`,
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
          src={`${BASE_URL}/imagenes/${row.original.imagen}`}
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
            className="edit-btn"
            onClick={() => startEditing(row.original)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => confirmDeleteCategoria(row.original.num_categoria)} // Cambiar a la función que abre el modal
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
      pagination, // <-- tu estado externo de paginación
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Buscar en tabla"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="search-input"
        />
        <button
          className="add-user-btn"
          onClick={() => navigate("/dashboard/agregarCategoria")}
        >
          Agregar Categoría
        </button>
      </div>

      {/* Modal edición categoria */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Categoria"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Editor de Categoria</h2>

          <form onSubmit={saveChanges} className="form-grid">
            <label htmlFor="nombre_categoria">Nombre de Categoria</label>
            <input
              id="nombre_categoria"
              type="text"
              name="nombre_categoria"
              value={categoriaForm.nombre_categoria || ""}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="descripcion_categoria">Descripción</label>
            <input
              id="descripcion_categoria"
              type="text"
              name="descripcion_categoria"
              value={categoriaForm.descripcion_categoria || ""}
              onChange={handleInputChange}
              required
            />

            <label>Imagen</label>
            {categoriaForm.imagen && (
              <img
                src={categoriaForm.imagen}
                alt="Vista previa"
                style={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="modal-buttons">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn"
              >
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </ReactModal>

      <table className="custom-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sortable-header"
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
            <tr
              key={row.id}
              className={idx % 2 === 0 ? "row-even" : "row-odd"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.id === "imagen" ? (
                    row.original.imagen ? (
                      <img
                        src={`${BASE_URL}/imagenes/${row.original.imagen}`}
                        alt="Imagen de categoría"
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/assets/No imagen.jpg";
                        }}
                      />
                    ) : (
                      <div style={{ color: "#6b7280", fontStyle: "italic" }}>
                        Sin imagen
                      </div>
                    )
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
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
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
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

      {/* Modal de confirmación */}
      <ConfirmarAccionModal
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={deleteCategoria} // Confirmación de eliminación
        message="¿Estás seguro de que deseas eliminar esta categoría?"
      />
    </div>
  );
};

export default CategoriaTable;
