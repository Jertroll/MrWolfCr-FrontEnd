
import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardCall from './components/adminpanel/DashboardCall';
import Login from './components/loginForm/Login';
import RegistroUsuario from './components/usuario/RegistroUsuario';
import RegistroUsuarioCliente from './components/usuario/RegistroUsuarioCliente';
import TableReact from './components/tableUsuario/TableReact';
import AgregarCategoria from './components/categoria/AgregarCategoria';
import CategoriaTable from './components/categoria/CategoriaTable';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardCall />} /> {/* Usa /* para rutas anidadas */}
      </Routes>
    </Router>
  );
}

export default App
