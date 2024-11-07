function Login() {
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
        {/* Imagen en la Sección Izquierda */}
        <img
          src="src/assets/mrwolf.jpg" // Asegúrate de que esta ruta sea correcta
          alt="Logo Mr Wolf Cr"

        />

        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            La exclusividad nos representa
          </h1>
          <p className="text-lg">

          </p>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: "#2A4A10" }}
        >
          Mr Wolf Cr
        </h2>
        <h3 className="text-xl font-bold mb-6" style={{ color: "#2A4A10" }}>
          Inicio de Sesión
        </h3>
        <p className="mb-4 text-gray-600">
          Bienvenido, pon tus credenciales aquí
        </p>

        <form className="w-full max-w-sm">
          <label
            className="block mb-2 text-gray-700 font-semibold"
            style={{ color: "#2A4A10" }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="mrwolfcr@ejemplo.com"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          <label
            className="block mb-2 text-gray-700 font-semibold"
            style={{ color: "#2A4A10" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Pon tu contraseña aquí"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-gray-500 text-sm hover:underline">
              ¿Olvidaste tu Contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2A4A10] text-white py-2 rounded-lg font-semibold hover:bg-[#1E3A07] mb-4" // Cambié el color de fondo
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="w-full bg-gray-100 text-black py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200 mb-4"
          >
            Regístrate
          </button>

          <div className="flex items-center justify-center mt-4">
            <span className="border-b border-gray-300 w-1/4"></span>
            <span className="mx-4 text-gray-500">o</span>
            <span className="border-b border-gray-300 w-1/4"></span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-white py-2 mt-4 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google icon"
              className="mr-2"
            />
            Inicia Sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
