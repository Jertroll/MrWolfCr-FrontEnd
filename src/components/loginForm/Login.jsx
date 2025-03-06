import { useState } from 'react';

function Login() {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMensaje(''); // Limpiar el mensaje anterior

    try {
      const response = await fetch('/api/restablecer-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }

      const data = await response.json();
      setMensaje(data.message || 'Se ha enviado un enlace de restablecimiento a tu correo.');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección Izquierda */}
      <div
        className="w-1/2 bg-black bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://source.unsplash.com/featured/?interior")',
        }}
      >
        <img src="src/assets/mrwolf.jpg" alt="Logo Mr Wolf Cr" />
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">La exclusividad nos representa</h1>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "#2A4A10" }}>Mr Wolf Cr</h2>
        <h3 className="text-xl font-bold mb-6" style={{ color: "#2A4A10" }}>
          {showResetPassword ? 'Restablecer Contraseña' : 'Inicio de Sesión'}
        </h3>

        {!showResetPassword ? (
          // Formulario de Inicio de Sesión
          <form className="w-full max-w-sm">
            <label className="block mb-2 text-gray-700 font-semibold" style={{ color: "#2A4A10" }}>Email</label>
            <input
              type="email"
              placeholder="mrwolfcr@ejemplo.com"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />

            <label className="block mb-2 text-gray-700 font-semibold" style={{ color: "#2A4A10" }}>Contraseña</label>
            <input
              type="password"
              placeholder="Pon tu contraseña aquí"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />

            <div className="flex items-center justify-between mb-6">
              <a
                href="#"
                className="text-gray-500 text-sm hover:underline"
                onClick={() => setShowResetPassword(true)}
              >
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <button type="submit" className="w-full bg-[#2A4A10] text-white py-2 rounded-lg font-semibold hover:bg-[#1E3A07] mb-4">
              Iniciar Sesión
            </button>

            <button type="button" className="w-full bg-gray-100 text-black py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200 mb-4">
              Regístrate
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="border-b border-gray-300 w-1/4"></span>
              <span className="mx-4 text-gray-500">o</span>
              <span className="border-b border-gray-300 w-1/4"></span>
            </div>

            <button type="button" className="w-full flex items-center justify-center bg-white py-2 mt-4 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google icon" className="mr-2" />
              Inicia Sesión con Google
            </button>
          </form>
        ) : (
          // Formulario de Restablecimiento de Contraseña
          <form className="w-full max-w-sm" onSubmit={handleResetPassword}>
            <p className="mb-4 text-gray-600">Ingresa tu correo para recibir un enlace de restablecimiento.</p>
            <label className="block mb-2 text-gray-700 font-semibold" style={{ color: "#2A4A10" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mrwolfcr@ejemplo.com"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />

            <button type="submit" className="w-full bg-[#2A4A10] text-white py-2 rounded-lg font-semibold hover:bg-[#1E3A07] mb-4">
              Enviar Enlace
            </button>

            <button type="button" className="w-full text-gray-500 text-sm hover:underline" onClick={() => setShowResetPassword(false)}>
              Volver al Inicio de Sesión
            </button>
          </form>
        )}

        {mensaje && <p className="text-center mt-4 text-gray-600">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;