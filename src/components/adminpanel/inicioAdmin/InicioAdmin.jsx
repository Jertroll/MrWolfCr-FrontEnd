import "./InicioAdmin.css";

const InicioAdmin = () => {
  return (
    <div className="admin-welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Bienvenido al Panel de Administración</h1>
        
        <div className="welcome-card">
          <h2 className="card-title">Gestión Integral de Mr Wolf CR</h2>
          <p className="card-description">
            Este módulo te proporciona todas las herramientas necesarias para administrar 
            eficientemente tu negocio. Desde aquí podrás:
          </p>
          
          <div className="features-grid">
            <div className="feature-item">
              <h3 className="feature-title">Gestionar usuarios</h3>
              <p className="feature-description">Crea, edita y controla los accesos de tu equipo.</p>
            </div>
            
            <div className="feature-item">
              <h3 className="feature-title">Administrar productos</h3>
              <p className="feature-description">Actualiza tu inventario, precios y categorías.</p>
            </div>
            
            <div className="feature-item">
              <h3 className="feature-title">Supervisar categorías</h3>
              <p className="feature-description">Organiza tu catálogo de productos.</p>
            </div>
            
            <div className="feature-item">
              <h3 className="feature-title">Monitorear operaciones</h3>
              <p className="feature-description">Accede a datos clave de tu negocio.</p>
            </div>
          </div>
          
          <p className="getting-started">
            Selecciona una opción del menú lateral para comenzar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InicioAdmin;