
import './App.css'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardCall from './components/adminpanel/DashboardCall';
import Login from './components/loginForm/Login';
import RegistroUsuario from './components/usuario/RegistroUsuario';
import RegistroUsuarioCliente from './components/usuario/RegistroUsuarioCliente';
import TableReact from './components/tableUsuario/TableReact';
import AgregarCategoria from './components/categoria/AgregarCategoria';
import CategoriaTable from './components/categoria/CategoriaTable';
import NavbarCliente from './components/VistaCliente/navbar/NavbarCliente';
import FooterCliente from './components/VistaCliente/footer/FooterCliente';
import CarruselInicio from './components/VistaCliente/carruselProducto/Carrusel';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<CarruselInicio />} />
        <Route path="/dashboard/*" element={<DashboardCall />} /> {/* Usa /* para rutas anidadas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
