
import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardCall from './components/adminpanel/DashboardCall';
import Login from './components/loginForm/Login';
import RegistroUsuario from './components/usuario/RegistroUsuario';
import RegistroUsuarioCliente from './components/usuario/RegistroUsuarioCliente';
import TableReact from './components/tableUsuario/TableReact';
import Carrito from "./components/carrito/Carrito";
import AgregarCategoria from './components/categoria/AgregarCategoria';
import CategoriaTable from './components/categoria/CategoriaTable';
import NavbarCliente from './components/VistaCliente/navbar/NavbarCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavbarCliente />} />
        <Route path="/dashboard/*" element={<DashboardCall />} /> {/* Usa /* para rutas anidadas */}
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}

export default App
