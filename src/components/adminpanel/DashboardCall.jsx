import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import RegistroUsuario from '../usuario/RegistroUsuario';
import TableReact from "../tableReact/TableReact";
import { useState } from 'react';
import AgregarCategoria from "../categoria/AgregarCategoria";
import CategoriaTable from "../categoria/CategoriaTable";
function DashboardCall() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar setActiveTab={setActiveTab} />
        <div className="flex-1">
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/usuario" element={<TableReact />} />
              <Route path="/categoria" element={<CategoriaTable/>} />
              
              <Route path="/agregarUsuario" element={<RegistroUsuario />} />
              <Route path="/agregarCategoria" element={<AgregarCategoria />} />
            </Routes>
            
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default DashboardCall;
