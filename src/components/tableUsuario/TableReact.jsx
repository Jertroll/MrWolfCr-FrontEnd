import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import ReactModal from "react-modal";
import "./tableUsuario.css"; // css

function TableReact() {
  const navigate = useNavigate(); // Crea la función de navegación
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [filtering, setFiltering] = useState(""); // Estado para la búsqueda
  const [sorting, setSorting] = useState([]); // Estado para la ordenación
  const [editingUser, setEditingUser] = useState(null); // Estado para almacenar el usuario en edición
  const [userForm, setUserForm] = useState({}); // Estado para almacenar los datos del formulario

  // Función para iniciar la edición de un usuario
  const startEditing = (user) => {
    setEditingUser(user); // Guarda el usuario que se está editando
    setUserForm(user); // Carga los datos del usuario en el formulario
    setIsModalOpen(true); // Abre el modal
  };

  const [isModalOpen, setIsModalOpen] = useState(false); //estado para controlar la visibilidad de modal

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/usuarios");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const usuarios = await response.json();
      setData(usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      alert(
        "Hubo un error al obtener los usuarios. Por favor, intenta nuevamente."
      );
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (cedula) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/usuarios/${cedula}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      setData((prevData) => prevData.filter((user) => user.cedula !== cedula));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };
  // Función para guardar los cambios del usuario
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/usuarios/${userForm.cedula}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userForm),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      setData((prevData) =>
        prevData.map((user) =>
          user.cedula === userForm.cedula ? userForm : user
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
    { header: "Cedula", accessorKey: "cedula" },
    { header: "Nombre de Usuario", accessorKey: "nombre_usuario" },
    { header: "Nombre Completo", accessorKey: "nombre_completo" },
    { header: "Email", accessorKey: "email" },
    //{ header: "Contraseña", accessorKey: "contrasena" },
    { header: "Telefono", accessorKey: "telefono" },
    { header: "Direccion de Residencia", accessorKey: "direccion_envio" },
    { header: "Email de Facturacion", accessorKey: "email_facturacion" },
    { header: "Tipo de Rol", accessorKey: "rol" },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => startEditing(row.original)} // Inicia la edición del usuario
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteUser(row.original.cedula)} // Llama a deleteUser al hacer clic
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
      pagination: { pageIndex: 0, pageSize: 10 }, // Limitar a 10 usuarios por página
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="p-4">
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm"
        placeholder="Buscar en tabla"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
        onClick={() => navigate("/dashboard/agregarUsuario")} // Redirige al formulario
      >
        Agregar Usuarios
      </button>

      {/* Formulario para editar usuario con Modal */}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Usuario"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Editor de Usuario
          </h2>

          <form onSubmit={saveChanges}>
            <div className="grid grid-cols-2 gap-4">
              {/* Columna 1 */}
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    name="nombre_usuario"
                    value={userForm.nombre_usuario}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="nombre_completo"
                    value={userForm.nombre_completo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={userForm.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Dirección de Residencia
                  </label>
                  <input
                    type="text"
                    name="direccion_envio"
                    value={userForm.direccion_envio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Correo de Facturación
                  </label>
                  <input
                    type="email"
                    name="email_facturacion"
                    value={userForm.email_facturacion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Imagen de Perfil
                  </label>
                  <input
                    type="text"
                    name="imagen"
                    value={userForm.imagen}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Tipo de Rol
                  </label>
                  <select
                    name="rol"
                    value={userForm.rol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    required
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
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
}

export default TableReact;
