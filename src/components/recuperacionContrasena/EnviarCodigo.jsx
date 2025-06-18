import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/auth";

const EnviarCodigo = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/recuperar/solicitarCodigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar el código");

      setMensaje(data.message);
      setError("");
      setTimeout(() => {
        navigate("/verificarCodigo", { state: { email } });
      }, 2000);
    } catch (err) {
      let mensajeError = "";
      if (err.message.includes("email")) {
        mensajeError = "El correo ingresado no está registrado en el sistema.";
      } else if (err.message.includes("código")) {
        mensajeError = "Hubo un problema al enviar el código de recuperación.";
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
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Recuperar Contraseña
        </h2>
        <p className="text-sm text-white text-center mb-6">
          Coloca el correo de tu cuenta asociada a Mr Wolf Store
        </p>

        <form onSubmit={handleEnviarCodigo}>
          <label className="block mb-2 font-semibold text-white">
            Correo electrónico 
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-[#444343] rounded-lg bg-[#444343] text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-[#2A4A10] text-white font-bold rounded-lg hover:bg-[#1E3A07] transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin mr-2"></div>
                Procesando...
              </>
            ) : (
              "Enviar Código"
            )}
          </button>
        </form>

        {mensaje && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4 text-center">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnviarCodigo;
