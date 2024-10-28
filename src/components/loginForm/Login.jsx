

function Login() {
  return (
    <div className="flex h-screen">
      {/* Sección Izquierda */}
      <div className="w-1/2 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://source.unsplash.com/featured/?interior")' }}>
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">La exclusividad nos representa</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-2">Mr Wolf Cr</h2>
        <h3 className="text-xl font-bold mb-6">Inicio de Sesión</h3>
        <p className="mb-4 text-gray-600">Bienvenido, pon tus credenciales aquí</p>

        <form className="w-full max-w-sm">
          <label className="block mb-2 text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            placeholder="mrwolfcr@ejemplo.com"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          <label className="block mb-2 text-gray-700 font-semibold">Contraseña</label>
          <input
            type="password"
            placeholder="Pon tu contraseña aqui"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-gray-500 text-sm hover:underline">¿Olvidaste tu Contraseña?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 mb-4"
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="w-full bg-gray-100 text-black py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200 mb-4"
          >
            Registrate
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
            Inicia Sesion con Google
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
