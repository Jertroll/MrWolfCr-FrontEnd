
import './App.css'
import ActualizarPerfil from './components/usuario/ActualizarPerfil'
import DashboardCall from './components/adminpanel/DashboardCall'
import Login from './components/loginForm/login'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardCall from './components/adminpanel/DashboardCall';
import Login from './components/loginForm/Login';
import RegistroUsuario from './components/usuario/RegistroUsuario';
import RegistroUsuarioCliente from './components/usuario/RegistroUsuarioCliente';
import TableReact from './components/tableUsuario/TableReact';
import AgregarCategoria from './components/categoria/AgregarCategoria';
import CategoriaTable from './components/categoria/CategoriaTable';
import NavbarCliente from './components/VistaCliente/navbar/NavbarCliente';

function App() {
  return (
    <>
      <DashboardCall
      />

    </>
  )
}

export default App
