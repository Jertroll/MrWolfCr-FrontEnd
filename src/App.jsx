import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardCall from "./components/adminpanel/DashboardCall";
import Login from "./components/loginForm/Login";
import RegistroUsuarioCliente from "./components/usuario/RegistroUsuarioCliente";
import Carrito from "./components/VistaCliente/carrito/Carrito";
import Home from "./components/VistaCliente/Paginas/Home";
import Productos from "./components/productos/VerProductos";
import ProductosAleatorios from "./components/VistaCliente/proAleactorios/ProductosAleatorios";
import ProductosPorCategorias from "./components/VistaCliente/Paginas/ProductosPorCategoria";
import DetalleProducto from "./components/VistaCliente/Paginas/DetalleProducto";
import NavFooterCliente from "./components/VistaCliente/Paginas/NavFooterCliente";
import AyudaUsuario from "./components/VistaCliente/Paginas/AyudaUsuario";
import ProductosPorGenero from "./components/VistaCliente/ProductoGenero/ProductosPorGenero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas PÚBLICAS sin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegistroUsuarioCliente />} />


        {/* Rutas con layout común */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/aleatorios" element={<ProductosAleatorios />} />
          <Route path="/productos/categoria/:id" element={<ProductosPorCategorias />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/ayudaCliente" element={<AyudaUsuario />} />
          <Route path="/productos/genero/:genero" element={<ProductosPorGenero />} />
        </Route>

        {/* Ruta de admin (sin layout) */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <DashboardCall />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Componente wrapper para el layout
function LayoutWrapper() {
  return (
    <NavFooterCliente>
      <Outlet /> {/* Esto renderiza los hijos de la ruta */}
    </NavFooterCliente>
  );
}

export default App;