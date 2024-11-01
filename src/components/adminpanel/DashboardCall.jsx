import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import RegistroUsuario from '../usuario/RegistroUsuario';
import TableReact from "../tableReact/TableReact";
import { useState } from 'react';

function DashboardCall() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar setActiveTab={setActiveTab} />
        <div className="flex-1">
          <Navbar />
          <div className="content p-7">
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/usuario" element={<TableReact />} />
              <Route path="/estadistica" element={<h1>Hola mundo</h1>} />
              <Route path="/agregarUsuario" element={<RegistroUsuario />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default DashboardCall;
