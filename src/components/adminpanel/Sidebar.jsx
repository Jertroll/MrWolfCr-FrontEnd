import { useState } from "react";
import { FaHome, FaUsers, FaCog, FaChartPie } from "react-icons/fa"; // Usa react-icons para iconos

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", icon: <FaHome /> },
    { title: "Usuarios", icon: <FaUsers />, gap: true },
    { title: "Estadísticas", icon: <FaChartPie /> },
    { title: "Configuración", icon: <FaCog /> },
  ];

  return (
    <div className={`flex`}>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-gray-800 h-screen p-5 pt-8 relative transition-all duration-300`}
      >
        <img
          src="./src/assets/control.png" // Cambia esta línea según tu ruta de imagen
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
            Panel
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-500 text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${index === 0 && "bg-blue-500 text-white"}`}
            >
              <span className="text-xl">{Menu.icon}</span>
              <span className={`${!open && "hidden"} transition-opacity duration-200`}>
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
