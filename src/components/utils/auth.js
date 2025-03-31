export const obtenerUsuarioDesdeToken = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { token, ...payload };
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};
