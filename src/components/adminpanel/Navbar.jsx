import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="px-4 py-3 flex justify-between items-center"
      style={{ backgroundColor: "#203500" }} // Aplica el color de fondo aquí
    >
      <div className="flex items-center gap-x-5">
        {/* Input de búsqueda al inicio */}
        <div className="relative w-64 hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none text-white md:text-black">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-1 pl-10 rounded shadow outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-5">
        <div className="text-white">
          <FaBell className="w-6 h-6" />
        </div>

        <div className="relative">
          <button className="text-white group">
            <FaUserCircle className="w-6 h-6 mt-1" />
          </button>
          <div className="hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
            <ul className="py-2 text-sm text-gray-900">
              <li>
                <a href="#">Perfil</a>
              </li>
              <li>
                <a href="#">Configuración</a>
              </li>
              <li>
                <a href="#">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
