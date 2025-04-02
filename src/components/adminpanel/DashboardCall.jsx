import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import RegistroUsuario from '../usuario/RegistroUsuario';
import TableReact from  '../usuario/tableUsuario/TableReact'
import { useState } from 'react';
import AgregarCategoria from "../categoria/AgregarCategoria";
import CategoriaTable from "../categoria/CategoriaTable";
import ProductoTable from "../productos/ProductoTable";
import AgregarProductos from "../productos/AgregarProductos";

function DashboardCall() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Área de contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/usuario" element={<TableReact />} />
            <Route path="/categoria" element={<CategoriaTable />} />
            <Route path="/producto" element={<ProductoTable />} />
            <Route path="/agregarUsuario" element={<RegistroUsuario />} />
            <Route path="/agregarCategoria" element={<AgregarCategoria />} />
            <Route path="/agregarProducto" element={<AgregarProductos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardCall;