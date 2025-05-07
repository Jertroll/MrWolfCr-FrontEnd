import { useState } from "react";
import { FaHome, FaUsers, FaChartPie } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Sidebar = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);

  const Menus = [
    { title: "Home", icon: <FaHome />, path: '/dashboard' },
    { title: "Usuarios", icon: <FaUsers />, gap: true, path: '/dashboard/usuario' },
    { title: "Categoria", icon: <FaChartPie />, path: '/dashboard/categoria' },
    { title: "Productos", icon: <FaTshirt />, path: '/dashboard/producto' },
    { title: "Facturas", icon: <FaFileInvoiceDollar />, path: '/dashboard/facturas' },

  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } h-screen p-5 pt-8 relative transition-all duration-300`}
        style={{ backgroundColor: "#203500" }}
      >
        {/* Botón de toggle */}
        <img
          src="/img/control.png"
          alt="Toggle Sidebar"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-800 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        {/* Logo y título */}
        <div className="flex gap-x-4 items-center mb-4">
          <h1
            className={`text-white font-medium text-xl ${!open && "scale-0"}`}
          >
            Panel de Administrador
          </h1>
        </div>
        <div className={`flex justify-center mb-4 ${!open && "hidden"}`}>
          <img
            src="/img/Favicon.ico"
            alt="Logo Mr Wolf"
            className="rounded-full border-2 border-black p-1"
            style={{ width: "80px", height: "80px", cursor: "pointer",borderRadius: "50%" }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Logo cuando el sidebar está COLAPSADO (versión mini) */}
        <div className={`absolute top-5 left-4 ${open && "hidden"}`}>
          <img
            src="/img/Favicon.ico"
            alt="Logo Mr Wolf"
            className="rounded-full border-2 border-yellow-500 p-1"
            style={{
              width: "40px", // Tamaño reducido
              height: "40px",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Menú único (adaptable) */}
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${
                location.pathname === Menu.path
                  ? "bg-yellow-600 text-white"
                  : ""
              } ${hoverIndex === index ? "bg-yellow-600 text-white" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => navigate(Menu.path)}
            >
              <span className="text-xl flex justify-center">{Menu.icon}</span>
              <span className={`${!open ? "hidden" : "ml-4"}`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
