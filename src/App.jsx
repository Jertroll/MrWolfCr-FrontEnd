import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import DashboardCall from "./components/adminpanel/DashboardCall";
import Login from "./components/loginForm/Login";
import RegistroUsuarioCliente from "./components/usuario/RegistroUsuarioCliente";
import Carrito  from "./components/VistaCliente/carrito/Carrito";
import { CarritoProvider } from '/src/components/VistaCliente/carrito/CarritoContext.jsx'; // ✅ CORRECTO
import Home from "./components/VistaCliente/Paginas/Home/Home";

import FacturaDetalle from "./components/Facturas/FacturaDetalle";
import FacturasCliente from "./components/Facturas/FacturasCliente";

import Productos from "./components/productos/VerProductos";
import ProductosAleatorios from "./components/VistaCliente/Paginas/productos/proAleactorios/ProductosAleatorios";
import ProductosPorCategorias from "./components/VistaCliente/Paginas/productos/ProductosPorCategoria";
import DetalleProducto from "./components/VistaCliente/Paginas/productos/DetalleProducto";
import NavFooterCliente from "./components/VistaCliente/Paginas/NavFooterCliente";
import AyudaUsuario from "./components/VistaCliente/Paginas/AyudaUsuario/AyudaUsuario";
import ProductosPorGenero from "./components/VistaCliente/Paginas/productos/ProductoGenero/ProductosPorGenero";
import PerfilUsuario from "./components/VistaCliente/perfil/PerfilUsuario";
import EnviarCodigo from "./components/recuperacionContrasena/EnviarCodigo";
import VerificarYRestablecer from "./components/recuperacionContrasena/VerificarYRestablecer";
import EditarPerfilUsuario from "./components/VistaCliente/perfil/EditarPerfilUsuario"
function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas PÚBLICAS sin layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<RegistroUsuarioCliente />} />
          <Route path="/enviarCodigo" element={<EnviarCodigo />} />
          <Route path="/verificarCodigo" element={<VerificarYRestablecer />} />

          {/* Rutas con layout común */}
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/factura/:id" element={<FacturaDetalle/>}/>
            <Route path="/facturasCliente" element={<FacturasCliente/>}/>
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/aleatorios" element={<ProductosAleatorios />} />
            <Route path="/productos/categoria/:id" element={<ProductosPorCategorias />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/ayudaCliente" element={<AyudaUsuario />} />
            <Route path="/productos/genero/:genero" element={<ProductosPorGenero />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/perfil/editar" element={<EditarPerfilUsuario />} />


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
    </CarritoProvider>
  );
}

// Componente wrapper para el layout con NavFooterCliente
function LayoutWrapper() {
  return (
    <NavFooterCliente>
      <Outlet /> {/* Renderiza las rutas hijas aquí */}
    </NavFooterCliente>
  );
}

export default App;
