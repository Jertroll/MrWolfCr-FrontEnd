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

function TableReact() {
  const navigate = useNavigate(); // Crea la función de navegación
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [filtering, setFiltering] = useState(""); // Estado para la búsqueda
  const [sorting, setSorting] = useState([]); // Estado para la ordenación
  const [editingUser, setEditingUser] = useState(null); // Estado para almacenar el usuario en edición
  const [userForm, setUserForm] = useState({}); // Estado para almacenar los datos del formulario

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/usuarios");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const usuarios = await response.json();
      setData(usuarios); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (cedula) => {
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
      // Actualiza el estado eliminando el usuario de la lista
      setData((prevData) => prevData.filter((user) => user.cedula !== cedula));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Función para iniciar la edición de un usuario
  const startEditing = (user) => {
    setEditingUser(user);
    setUserForm(user); // Carga los datos del usuario en el formulario
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  // Función para guardar los cambios del usuario
  const saveChanges = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/usuarios/${userForm.cedula}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userForm), // Envía los datos actualizados
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      // Actualiza el estado con los datos modificados
      setData((prevData) =>
        prevData.map((user) =>
          user.cedula === userForm.cedula ? userForm : user
        )
      );
      setEditingUser(null); // Cierra el formulario de edición
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
    { header: "Contraseña", accessorKey: "contrasena" },
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
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
        onClick={() => navigate("/agregarUsuario")} // Redirige al formulario
      >
        Agregar Usuarios
      </button>

      {/* Formulario para editar usuario */}
      {editingUser && (
        <form
          onSubmit={saveChanges}
          className="mb-4 p-4 border rounded shadow-md"
        >
          <h2 className="text-lg font-semibold">Editar Usuario</h2>
          {Object.keys(userForm).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={userForm[key]}
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
            onClick={() => setEditingUser(null)} // Cierra el formulario
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 ml-2"
          >
            Cancelar
          </button>
        </form>
      )}

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

      <div className="flex justify-between mt-4">
        <button
          className="bg-[#203500] text-white py-1 px-4 rounded hover:bg-[#162600]"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="bg-[#203500] text-white py-1 px-4 rounded hover:bg-[#162600]"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="bg-[#203500] text-white py-1 px-4 rounded hover:bg-[#162600]"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="bg-[#203500] text-white py-1 px-4 rounded hover:bg-[#162600]"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default TableReact;
