import PropTypes from 'prop-types';
import NavbarCliente from "../navbar/NavbarCliente";
import FooterCliente from "../footer/FooterCliente";
import { Box } from '@mui/material';

function NavFooterCliente({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <NavbarCliente />
      
      <Box component="main" flexGrow={1}>
        {children}
      </Box>

      <FooterCliente />
    </Box>
  );
}

NavFooterCliente.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavFooterCliente;
