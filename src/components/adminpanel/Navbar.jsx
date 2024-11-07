import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Asegúrate de importar Link

function Navbar() {
  return (
    <nav
      className="px-4 py-3 flex justify-between items-center"
      style={{ backgroundColor: "#203500" }} // Aplica el color de fondo aquí
    >
      <div className="flex items-center gap-x-5">
        {/* Input de búsqueda al inicio, visible solo en pantallas medianas o más grandes */}
        <div className="relative w-64 hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none text-gray-400 hover:text-white">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-1 pl-10 rounded-lg bg-gray-700 text-white focus:bg-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-5">
        {/* Icono de búsqueda para pantallas pequeñas */}
        <button className="md:hidden text-gray-400 hover:text-white">
          <FaSearch />
        </button>

        {/* Icono de notificaciones */}
        <button className="text-gray-400 hover:text-white">
          <FaBell className="w-6 h-6" />
        </button>

        {/* Menú desplegable de usuario */}
        <div className="relative">
          <Link to="/login"> {/* Redirección al Login */}
            <button className="text-gray-400 hover:text-white group">
              <FaUserCircle className="w-6 h-6" />
            </button>
          </Link>
          <div className="hidden absolute bg-white rounded-lg shadow-lg w-32 group-focus:block top-full right-0 mt-1">
            <ul className="py-2 text-sm text-gray-800">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/perfil">Perfil</Link> {/* Puedes agregar la redirección a Perfil si es necesario */}
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/configuracion">Configuración</Link> {/* Redirección a Configuración si es necesario */}
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/cerrar-sesion">Cerrar Sesión</Link> {/* Redirección a Cerrar Sesión si es necesario */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

