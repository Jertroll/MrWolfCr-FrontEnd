import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types'; // Importa PropTypes

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            // Si no hay token, redirige al login
            navigate('/');
            return;
        }

        try {
            // Decodifica el token para obtener el rol del usuario
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.rol;

            // Verifica si el usuario tiene el rol necesario
            if (requiredRole && userRole !== requiredRole) {
                alert('No tienes permiso para acceder a esta página');
                navigate('/');
            }
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            navigate('/');
        }
    }, [token, navigate, requiredRole]);

    // Si el usuario está autenticado y tiene el rol necesario, renderiza el componente
    return token ? children : null;
};

// Validación de props
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // children debe ser un nodo de React y es obligatorio
    requiredRole: PropTypes.string, // requiredRole es opcional y debe ser un string
};

export default ProtectedRoute;