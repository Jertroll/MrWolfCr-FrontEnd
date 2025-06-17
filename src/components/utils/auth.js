export const BASE_URL = "https://backend-mrwolf-fyh3cgdpgucjaebs.eastus-01.azurewebsites.net";

export const obtenerUsuarioDesdeToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { token, ...payload };
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};
