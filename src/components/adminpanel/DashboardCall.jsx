// DashboardCall.js
import Navbar from "./Navbar";
import Sidebar from './Sidebar';

import { useState } from 'react';



function DashboardCall() {
  const [activeTab, setActiveTab] = useState(''); // Estado para el tab activo

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} />
      
      <div className="flex-1">
        <Navbar />

      </div>
    </div>
  );
}

export default DashboardCall;
