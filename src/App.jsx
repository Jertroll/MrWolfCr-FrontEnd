
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
import HomeAdmin from './components/adminpanel/HomeAdmin';
import Home from './components/VistaCliente/Paginas/Home';

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard/*" element={<DashboardCall />} /> {/* Usa /* para rutas anidadas */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
