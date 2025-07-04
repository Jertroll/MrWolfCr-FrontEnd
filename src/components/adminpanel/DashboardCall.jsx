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
import InicioAdmin from "./inicioAdmin/InicioAdmin";
import Facturas from "../Facturas/Facturas";
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
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 ">
          <Routes>
            <Route path="/home" element={<InicioAdmin/>} />
            <Route path="/usuario" element={<TableReact />} />
            <Route path="/categoria" element={<CategoriaTable />} />
            <Route path="/producto" element={<ProductoTable />} />
            <Route path="/agregarUsuario" element={<RegistroUsuario />} />
            <Route path="/agregarCategoria" element={<AgregarCategoria />} />
            <Route path="/agregarProducto" element={<AgregarProductos />} />
            <Route path="/facturas" element={<Facturas />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DashboardCall;