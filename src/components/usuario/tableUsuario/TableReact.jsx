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
import ReactModal from "react-modal";
import ConfirmarAccionModal from "../../confirmarAccion/ConfirmarAccionModal";
import { BASE_URL } from "../../utils/auth";
import "./tableUsuario.css";

function TableReact() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Controlar el modal de confirmación
  const [selectedUserId, setSelectedUserId] = useState(null); // Guardar ID del usuario seleccionado para eliminar

  // Cargar datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/usuarios`);
      if (!response.ok) throw new Error("Error al obtener los datos");
      const usuarios = await response.json();
      setData(usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      alert("Hubo un error al obtener los usuarios. Por favor, intenta nuevamente.");
    }
  };

  // Función para abrir el modal de confirmación de eliminación
  const confirmDeleteUser = (cedula) => {
    setSelectedUserId(cedula); // Guardar el ID del usuario seleccionado
    setOpenConfirmDialog(true); // Abrir el modal de confirmación
  };

  // Eliminar usuario con confirmación
  const deleteUser = async () => {
    if (!selectedUserId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/usuarios/${selectedUserId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar el usuario");

      setData((prevData) => {
        const newData = prevData.filter((user) => user.cedula !== selectedUserId);
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
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Iniciar edición
  const startEditing = (user) => {
    setEditingUser(user);
    setUserForm(user);
    setIsModalOpen(true);
  };

  // Cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios usuario
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/usuarios/${userForm.cedula}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm),
        }
      );
      if (!response.ok) throw new Error("Error al actualizar el usuario");
      setData((prevData) =>
        prevData.map((user) =>
          user.cedula === userForm.cedula ? userForm : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Columnas para react-table
  const columns = [
    { header: "Cedula", accessorKey: "cedula" },
    { header: "Nombre de Usuario", accessorKey: "nombre_usuario" },
    { header: "Nombre Completo", accessorKey: "nombre_completo" },
    { header: "Email", accessorKey: "email" },
    { header: "Telefono", accessorKey: "telefono" },
    { header: "Direccion de Residencia", accessorKey: "direccion_envio" },
    { header: "Email de Facturacion", accessorKey: "email_facturacion" },
    { header: "Tipo de Rol", accessorKey: "rol" },
    {
      header: "Acciones",
      accessorKey: "acciones",
      cell: ({ row }) => (
        <div className="actions-cell">
          <button
            aria-label="Editar usuario"
            onClick={() => startEditing(row.original)}
            className="edit-btn"
          >
            <FaEdit />
          </button>
          <button
            aria-label="Eliminar usuario"
            onClick={() => confirmDeleteUser(row.original.cedula)} // Cambiar a la función que abre el modal
            className="delete-btn"
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
    state: { sorting, globalFilter: filtering, pagination },
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
          onClick={() => navigate("/dashboard/agregarUsuario")}
        >
          Agregar Usuarios
        </button>
      </div>

      {/* Modal edición usuario */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Usuario"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Editor de Usuario</h2>
          <form onSubmit={saveChanges}>
            <div className="form-grid">
              <div>
                <label>Nombre de Usuario</label>
                <input
                  type="text"
                  name="nombre_usuario"
                  value={userForm.nombre_usuario || ""}
                  onChange={handleInputChange}
                  required
                />
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="nombre_completo"
                  value={userForm.nombre_completo || ""}
                  onChange={handleInputChange}
                  required
                />
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email || ""}
                  onChange={handleInputChange}
                  required
                />
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={userForm.telefono || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Dirección de Residencia</label>
                <input
                  type="text"
                  name="direccion_envio"
                  value={userForm.direccion_envio || ""}
                  onChange={handleInputChange}
                  required
                />
                <label>Correo de Facturación</label>
                <input
                  type="email"
                  name="email_facturacion"
                  value={userForm.email_facturacion || ""}
                  onChange={handleInputChange}
                  required
                />
                <label>Imagen de Perfil</label>
                <input
                  type="text"
                  name="imagen"
                  value={userForm.imagen || ""}
                  onChange={handleInputChange}
                />
                <label>Tipo de Rol</label>
                <select
                  name="rol"
                  value={userForm.rol || "Cliente"}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>
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

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="sortable-header"
                    role="button"
                    tabIndex={0}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() && {
                      asc: " ⬆️",
                      desc: " ⬇️",
                    }[header.column.getIsSorted()] || ""}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        onConfirm={deleteUser}
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </div>
  );
}

export default TableReact;
