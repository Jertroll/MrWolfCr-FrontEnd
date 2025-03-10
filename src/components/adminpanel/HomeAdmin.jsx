import { useState } from "react";
import logo from "../../assets/Logo cuadrado Mr Wolf.jpg"; 

export default function HomeAdmin() {
  const [adminName] = useState("Administrador");

  return (
    <div className="p-6 flex flex-col items-center text-center min-h-screen bg-gray-100">
      <img 
        src={logo} 
        alt="Logo" 
        className="absolute top-4 right-4 w-40 h-auto"/>
        
      
      {/* Mensaje de bienvenida */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-600">¡Bienvenido, {adminName}!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Este es tu panel de administración, donde puedes gestionar tu tienda de manera eficiente.
        </p>
      </div>
      
    </div>
  );
}
