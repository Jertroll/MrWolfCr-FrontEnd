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
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [editingProducto, setEditingProducto] = useState(null);
  const [productoForm, setProductoForm] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const fetchData = async () => {
    try {
      const [productosRes, categoriasRes] = await Promise.all([
        fetch("http://localhost:3000/api/v1/productos"),
        fetch("http://localhost:3000/api/v1/categorias"),
      ]);

      if (!productosRes.ok || !categoriasRes.ok) {
        throw new Error("Error al obtener datos");
      }

      const productos = await productosRes.json();
      const categorias = await categoriasRes.json();

      setCategorias(categorias);

      const productosConCategoria = productos.map((producto) => {
        const categoria = categorias.find(
          (cat) => Number(cat.num_categoria) === Number(producto.id_categoria)
        );
        return {
          ...producto,
          nombre_categoria: categoria?.nombre_categoria ?? "Sin categoría",
          tallasTexto: producto.tallas?.length
            ? producto.tallas.map((t) => t.nombre).join(", ")
            : "",
        };
      });

      setData(productosConCategoria);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Hubo un error al obtener los datos.");
    }
  };

  const deleteProducto = async (id) => {
    const confirmDelete = window.confirm("¿Deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar el producto");

      setData((prevData) => {
        const newData = prevData.filter((producto) => producto.id !== id);

        // Calcular el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newData.length / pagination.pageSize);

        if (pagination.pageIndex >= totalPages) {
          setPagination((prev) => ({
            ...prev,
            pageIndex: totalPages - 1 >= 0 ? totalPages - 1 : 0,
          }));
        }

        return newData;
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const startEditing = (producto) => {
    setEditingProducto(producto);
    setProductoForm(producto);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoForm({ ...productoForm, [name]: value });
  };

  const saveChanges = async (e, tallasIds, selectedFiles) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("codigo", productoForm.codigo);
      formData.append("nombre", productoForm.nombre);
      formData.append("precio", productoForm.precio);
      formData.append("descripcion", productoForm.descripcion);
      formData.append("estado", productoForm.estado);
      formData.append("genero_dirigido", productoForm.genero_dirigido);
      formData.append("id_categoria", productoForm.id_categoria);
      formData.append("tallas", tallasIds.join(","));

      if (selectedFiles?.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("imagen", file);
        });
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${productoForm.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el producto");

      const updatedProducto = await response.json();

      setData((prevData) =>
        prevData.map((producto) =>
          producto.id === updatedProducto.producto.id
            ? updatedProducto.producto
            : producto
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const openImageModal = (imagenes) => {
    setSelectedProductImages(imagenes);
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "Id Producto", accessorKey: "id" },
    { header: "Código", accessorKey: "codigo" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Precio", accessorKey: "precio" },
    { header: "Descripción", accessorKey: "descripcion" },
    {
      header: "Talla",
      accessorKey: "tallasTexto",
      cell: ({ row }) => (
        <div>
          {row.original.tallas?.length
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
          {row.original.imagenes?.slice(0, 1).map((imagen, index) => (
            <img
              key={index}
              src={`http://localhost:3000/ImgProductos/${imagen.nomImagen}`}
              alt={`Imagen ${index + 1}`}
              className="h-16 w-16 object-cover"
            />
          ))}
          {row.original.imagenes?.length > 1 && (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => openImageModal(row.original.imagenes)}
            >
              <ZoomOutMapIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      ),
    },
    { header: "Género Dirigido", accessorKey: "genero_dirigido" },
    {
      header: "Categoría",
      accessorKey: "nombre_categoria",
      cell: ({ row }) => <div>{row.original.nombre_categoria}</div>,
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
    state: { sorting, globalFilter: filtering, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar en tabla"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-3"
          onClick={() => navigate("/dashboard/agregarProducto")}
        >
          Agregar Producto
        </button>
      </div>

      <EditarProductoModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        productoForm={productoForm}
        handleInputChange={handleInputChange}
        saveChanges={saveChanges}
      />

      <ImagenesProductoModal
        isOpen={isImageModalOpen}
        onRequestClose={() => setIsImageModalOpen(false)}
        selectedProductImages={selectedProductImages}
      />

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

      <div className="flex justify-between items-center mt-4">
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
        <span className="text-gray-700">
          Página {pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
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
