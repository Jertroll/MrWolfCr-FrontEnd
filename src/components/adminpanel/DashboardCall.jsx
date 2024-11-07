import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import RegistroUsuario from '../usuario/RegistroUsuario';
import TableReact from "../tableReact/TableReact";
import { useState } from 'react';

function DashboardCall() {
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar para pantallas grandes y botón de menú para pantallas pequeñas */}
        <Sidebar
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          className="hidden lg:block"
        />
        {/* Botón de menú para abrir el sidebar en pantallas pequeñas */}
        <button
          className="lg:hidden p-4 text-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Contenido principal */}
          <div className="content p-4 md:p-7 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/usuario" element={<TableReact />} />
              <Route path="/estadistica" element={<h1>Hola mundo</h1>} />
              <Route path="/agregarUsuario" element={<RegistroUsuario />} />
            </Routes>
          </div>
        </div>

        {/* Sidebar responsivo */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
            <Sidebar setActiveTab={setActiveTab} className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-50" />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default DashboardCall;
