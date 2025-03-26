import { useState } from "react";
import { FaHome, FaUsers, FaCog, FaChartPie } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Obtén la ruta actual
  const [open, setOpen] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);

  const Menus = [
    { title: "Home", icon: <FaHome />, path: '/dashboard' },
    { title: "Usuarios", icon: <FaUsers />, gap: true, path: '/dashboard/usuario' },
    { title: "Categoria", icon: <FaChartPie />, path: '/dashboard/categoria' },
    { title: "Productos", icon: <FaTshirt />, path: '/dashboard/producto' },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } h-screen p-5 pt-8 relative transition-all duration-300`}
        style={{ backgroundColor: "#203500" }}
      >
        <img
          src="./img/control.png"
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-800 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mb-4">
          <h1
            className={`text-white font-medium text-xl transition-transform duration-200 ${
              !open && "scale-0"
            }`}
          >
            Panel de Administrador
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${
                // Estilo activo basado en la ruta actual
                location.pathname === Menu.path ? "bg-yellow-600 text-white" : ""
              } ${
                // Estilo de hover
                hoverIndex === index ? "bg-yellow-600 text-white" : ""
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span className="text-xl">{Menu.icon}</span>
              <span className={`${!open && "hidden"} transition-opacity duration-200`}>
                <Link to={Menu.path}>{Menu.title}</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;