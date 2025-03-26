import PropTypes from 'prop-types';
import NavbarCliente from "../navbar/NavbarCliente";
import FooterCliente from "../footer/FooterCliente";

function NavFooterCliente({ children }) {
  return (
    <div className="app-container">
      <NavbarCliente />
      <main className="main-content">
        {children}
      </main>
      <FooterCliente />
    </div>
  );
}

NavFooterCliente.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavFooterCliente;