import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/auth";

const VerificarYRestablecer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    codigo: "",
    nuevaPassword: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setFormData((prevData) => ({ ...prevData, email: location.state.email }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/recuperar/restablecerContrasena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          codigo: formData.codigo,
          nuevaContrasena: formData.nuevaPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al restablecer la contraseña");

      setMensaje(data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      let mensajeError = "";
      if (err.message.includes("código")) {
        mensajeError = "El código ingresado es inválido o ha expirado.";
      } else if (err.message.includes("correo")) {
        mensajeError = "El correo no es válido o no coincide con el código.";
      } else {
        mensajeError = "Ocurrió un error inesperado. Intente nuevamente.";
      }
      setError(mensajeError);
      setMensaje("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[rgba(34,33,33,0.8)] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Verificar Código</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-white">Correo electrónico</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 mb-4 border border-[#444343] rounded-lg bg-[#444343] text-white"
            required
          />

          <label className="block mb-2 font-semibold text-white">Código de recuperación</label>
          <input
            type="text"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            className="w-full p-3 mb-4 border border-[#444343] rounded-lg bg-[#444343] text-white"
            required
          />

          <p className="text-xs italic text-white mb-4">
            ¿No te llegó el código? Revisa en la carpeta de spam o correo no deseado.
          </p>

          <label className="block mb-2 font-semibold text-white">Nueva contraseña</label>
          <input
            type="password"
            value={formData.nuevaPassword}
            onChange={(e) => setFormData({ ...formData, nuevaPassword: e.target.value })}
            className="w-full p-3 mb-4 border border-[#444343] rounded-lg bg-[#444343] text-white"
            required
          />

          <button type="submit" disabled={loading} className="w-full p-3 bg-[#2A4A10] text-white font-bold rounded-lg hover:bg-[#1E3A07] transition flex items-center justify-center">
            {loading ? (
              <>
                <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin mr-2"></div>
                Procesando...
              </>
            ) : (
              "Restablecer Contraseña"
            )}
          </button>
        </form>

        {mensaje && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4 text-center">{mensaje}</div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default VerificarYRestablecer;
