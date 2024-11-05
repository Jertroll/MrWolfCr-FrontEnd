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
import { useNavigate } from "react-router-dom";

function TableReact() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/usuarios");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const usuarios = await response.json();
      setData(usuarios);
      alert("Datos de usuarios cargados exitosamente.");
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      alert("Hubo un problema al cargar los datos de usuarios.");
    }
  };

  const deleteUser = async (cedula) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/usuarios/${cedula}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      setData((prevData) => prevData.filter((user) => user.cedula !== cedula));
      alert("Usuario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un problema al eliminar el usuario.");
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setUserForm(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/usuarios/${userForm.cedula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForm),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      setData((prevData) =>
        prevData.map((user) => (user.cedula === userForm.cedula ? userForm : user))
      );
      setEditingUser(null);
      alert("Usuario actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "Cedula", accessorKey: "cedula" },
    { header: "Nombre de Usuario", accessorKey: "nombre_usuario" },
    { header: "Nombre Completo", accessorKey: "nombre_completo" },
    { header: "Email", accessorKey: "email" },
    { header: "Contraseña", accessorKey: "contrasena" },
    { header: "Telefono", accessorKey: "telefono" },
    { header: "Direccion de Residencia", accessorKey: "direccion" },
    { header: "Email de Facturacion", accessorKey: "email_facturacion" },
    { header: "Fecha de Registro", accessorKey: "fecha_registro" },
    { header: "Tipo de Rol", accessorKey: "rol" },
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
            onClick={() => deleteUser(row.original.cedula)}
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
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/2"
        placeholder="Buscar..."
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
        onClick={() => navigate('/agregarUsuario')}
      >
        Agregar Usuarios
      </button>

      {editingUser && (
        <form onSubmit={saveChanges} className="mb-4 p-4 border rounded shadow-md max-w-md mx-auto">
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 ml-2"
          >
            Cancelar
          </button>
        </form>
      )}

      <div className="overflow-auto">
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
      </div>

      <div className="flex justify-between mt-4 flex-wrap">
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mb-2"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mb-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mb-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mb-2"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          Página{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>{" "}
        </span>
      </div>
    </div>
  );
}

export default TableReact;
