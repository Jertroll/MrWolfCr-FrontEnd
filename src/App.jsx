import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardCall from "./components/adminpanel/DashboardCall";
import Login from "./components/loginForm/Login";
import RegistroUsuario from "./components/usuario/RegistroUsuario";
import RegistroUsuarioCliente from "./components/usuario/RegistroUsuarioCliente";
import TableReact from "./components/tableUsuario/TableReact";
import AgregarCategoria from "./components/categoria/AgregarCategoria";
import CategoriaTable from "./components/categoria/CategoriaTable";
import NavbarCliente from "./components/VistaCliente/navbar/NavbarCliente";
import Carrito from "./components/VistaCliente/carrito/Carrito";
import Home from "./components/VistaCliente/Paginas/Home";
import ProductosAleatorios  from"./components/VistaCliente/proAleactorios/ProductosAleatorios";
import DetalleProducto from "./components/VistaCliente/Paginas/DetalleProducto";
import ProductosPorCategorias from './components/VistaCliente/Paginas/ProductosPorCategoria';
import Productos from './components/productos/VerProductos';

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <DashboardCall />
            </ProtectedRoute>
          }
        />
        {/* Otras rutas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<RegistroUsuarioCliente />} />

        {/* Nueva ruta para productos aleatorios */}
        <Route path="/productos" element={<Productos/>} />
        <Route path="/productos/aleatorios" element={<ProductosAleatorios />} />

        <Route path="/productos/categoria/:id" element={<ProductosPorCategorias/>} />

        {/* Ruta para el detalle del producto con ID dinámico */}
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
