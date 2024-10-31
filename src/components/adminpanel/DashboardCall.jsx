// DashboardCall.js
import { Outlet, BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';

import { useState } from 'react';
import TableReact from "../tableReact/TableReact";



function DashboardCall() {
  const [activeTab, setActiveTab] = useState(''); // Estado para el tab activo

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar setActiveTab={setActiveTab} />

        <div className="flex-1">
          <Navbar />
          <div className="content" >
            <Routes>

              <Route  path="/" element={<></>}/>
              <Route  path="/usuario" element={<TableReact/>}/>
              <Route  path="/estadistica" element={<h1>Holamundo</h1>}/>
              <Route  path="/config" element={<TableReact/>}/>
            </Routes>
          </div>
        </div>
      </div>

    </BrowserRouter>

  );
}

export default DashboardCall;
