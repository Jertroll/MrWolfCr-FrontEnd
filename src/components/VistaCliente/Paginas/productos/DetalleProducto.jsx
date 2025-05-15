import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductosAleatorios from "./proAleactorios/ProductosAleatorios";
import AgregarCarrito from "../../carrito/AgregarCarrito";
import { jwtDecode } from "jwt-decode";
import { EyeIcon, EyeSlashIcon, TrashIcon  } from "@heroicons/react/24/solid";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenIndex, setImagenIndex] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setProducto(data);
        setImagenIndex(0);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    fetchProducto();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/resenas/producto/${id}`);
        if (!res.ok) throw new Error("Error al obtener reseñas");
        const data = await res.json();
        setResenas(data);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      }
    };
    fetchResenas();
  }, [id]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario({ ...decoded, token }); // Guardas el token y los datos del usuario
      } catch (err) {
        console.error("Token inválido:", err);
      }
    }
  }, []); 

  const cambiarImagen = (index) => setImagenIndex(index);
  const siguienteImagen = () => setImagenIndex((prevIndex) => (prevIndex + 1) % producto.imagenes.length);
  const anteriorImagen = () => setImagenIndex((prevIndex) => (prevIndex - 1 + producto.imagenes.length) % producto.imagenes.length);

  const enviarResena = async (e) => {
    e.preventDefault();
    if (!comentario || calificacion === 0) return alert("Completa el comentario y la calificación");
    if (!usuario || !usuario.token) return alert("Debes iniciar sesión para dejar una reseña");
  
    try {
      const res = await fetch("http://localhost:3000/api/v1/resenas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_producto: producto.id,
          comentario,
          calificacion,
        }),
      });
  
      if (!res.ok) throw new Error("Error al enviar reseña");
  
      const data = await res.json();
      setResenas((prev) => [...prev, { ...data.resena, usuario }]);
      setComentario("");
      setCalificacion(0);
    } catch (err) {
      console.error("Error al enviar reseña:", err);
    }
  };
  
  const renderEstrellas = (valor) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= valor ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
  
  const eliminarResena = async (idResena) => {
  try {
const res = await fetch(`http://localhost:3000/api/v1/resenas/${idResena}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${usuario.token}`,
      },
    });
    if (!res.ok) throw new Error("Error al eliminar reseña");
    setResenas((prev) => prev.filter((r) => r.id !== idResena));
  } catch (err) {
    console.error("Error al eliminar reseña:", err);
  }
};

const toggleVisibilidadResena = async (idResena, estadoActual) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/resenas/${idResena}/visibilidad`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${usuario.token}`,
      },
    });
    if (!res.ok) throw new Error("Error al cambiar visibilidad");

    setResenas((prev) =>
      prev.map((r) =>
        r.id === idResena ? { ...r, oculta: !estadoActual } : r
      )
    );
  } catch (err) {
    console.error("Error al cambiar visibilidad:", err);
  }
};

const calcularPromedio = () => {
  const visibles = resenas.filter((r) => !r.oculta);
  const total = visibles.reduce((sum, r) => sum + r.calificacion, 0);
  return visibles.length ? (total / visibles.length).toFixed(1) : null;
};

const renderEstrellasPromedio = (promedio) => {
  const totalEstrellas = 5;
  const estrellasLlenas = Math.floor(promedio);
  const estrellasVacias = totalEstrellas - estrellasLlenas;

  return (
    <div className="flex items-center gap-1 ml-2 text-2xl text-yellow-400">
      {Array(estrellasLlenas).fill().map((_, i) => <span key={`llena-${i}`}>★</span>)}
      {Array(estrellasVacias).fill().map((_, i) => <span key={`vacia-${i}`} className="text-gray-300">★</span>)}
    </div>
  );
};


  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex gap-6">
        {/* Miniaturas */}
        <div className="w-20 flex flex-col gap-2">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/public/ImgProductos/${img.nomImagen}`}
              alt={`Imagen ${index + 1}`}
              className={`w-full h-20 object-cover rounded-lg cursor-pointer border ${index === imagenIndex ? "border-black" : "border-gray-300"}`}
              onMouseEnter={() => cambiarImagen(index)}
            />
          ))}
        </div>
  
        {/* Imagen principal */}
        <div className="relative w-full flex-1">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100"
            onClick={anteriorImagen}
          >
            &#9664;
          </button>
          <img
            src={`http://localhost:3000/public/ImgProductos/${producto.imagenes[imagenIndex].nomImagen}`}
            alt="Imagen principal"
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-80 hover:opacity-100"
            onClick={siguienteImagen}
          >
            &#9654;
          </button>
        </div>
  
        {/* Información del producto */}
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <p className="mt-2 text-gray-700">{producto.descripcion}</p>
          <p className="mt-2 text-lg font-semibold">₡{producto.precio}</p>
          <p className="mt-2 text-md font-medium">Estado: {producto.estado}</p>
  
          {/* Tallas */}
          {producto.tallas && producto.tallas.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Selecciona tu talla:</h3>
              <div className="flex gap-2 mt-2">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla.id}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${tallaSeleccionada === talla.id ? "bg-black text-white border-black" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}`}
                    onClick={() => setTallaSeleccionada(talla.id)}
                  >
                    {talla.nombre}
                  </button>
                ))}
              </div>
            </div>
          )}
  
          {/* Agregar al carrito */}
          <AgregarCarrito producto={producto} tallaSeleccionada={tallaSeleccionada} />
        </div>
      </div>
  
      {/* Reseñas del producto */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reseñas del producto</h2>
       {resenas.length > 0 ? (
      <div className="space-y-4">
     <div className="text-lg font-medium mb-2 flex items-center">
         Calificación:
        {calcularPromedio() !== null ? (
          <>
            {renderEstrellasPromedio(parseFloat(calcularPromedio()))}
            <span className="ml-2 text-gray-600 text-sm">({calcularPromedio()})</span>
          </>
        ) : (
          <span className="ml-2 text-gray-500 Arial">Sin calificación</span>
        )}
      </div>
      {resenas
      .filter((resena) => !resena.oculta || usuario?.rol === "Administrador")
      .map((resena, index) => (
        <div
            key={index}
            className={`p-4 rounded-lg shadow relative ${
              resena.oculta ? "bg-gray-200 opacity-60" : "bg-gray-100"
            }`}
          >
          <p className="font-semibold">{resena.usuario?.nombre_usuario}</p>
          {renderEstrellas(resena.calificacion)}
          <p className="text-gray-700 mt-1">{resena.comentario}</p>

          {/* Botones de acción */}
          {usuario && (
            <div className="absolute top-2 right-2 flex gap-2">
              {(usuario.id === resena.usuario?.id || usuario.rol === "Administrador") && (
                <button
                  onClick={() => eliminarResena(resena.id)}
                  className="text-red-500 text-sm hover:underline"
                  title="Eliminar Reseña"
                >
                 <TrashIcon className="h-5 w-5" />
                </button>
              )}
             {usuario.rol === "Administrador" && (
              <button
                onClick={() => toggleVisibilidadResena(resena.id, resena.oculta)}
                className="text-sm hover:underline flex items-center gap-1"
                title={resena.oculta ? "Mostrar reseña" : "Ocultar reseña"}
              >
                {resena.oculta ? (
                  <>
                    <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                  </>
                ) : (
                  <>
                    <EyeIcon className="w-4 h-4 text-yellow-500" />
                  </>
                )}
              </button>
            )}
            </div>
          )}
        </div>
      ))}
  </div>
) : (
  <p className="text-gray-500">Este producto aún no tiene reseñas.</p>
)}

      </div>
      {usuario ? (
  <form
    onSubmit={enviarResena}
    className="mt-6 bg-gray-50 p-4 rounded-lg shadow space-y-4"
  >
    <h3 className="text-lg font-semibold">Deja tu Comentario</h3>

    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className={`text-2xl ${i <= calificacion ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => setCalificacion(i)}
        >
          ★
        </button>
      ))}
    </div>

    <textarea
      className="w-full p-2 border border-gray-300 rounded"
      rows="3"
      placeholder="Escribe tu comentario..."
      value={comentario}
      onChange={(e) => setComentario(e.target.value)}
      required
    />

    <button
      type="submit"
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Enviar reseña
    </button>
  </form>
) : (
  <p className="mt-6 text-gray-600 italic">
    Debes iniciar sesión para dejar una reseña.
  </p>
)}

  
      {/* Productos Aleatorios */}
      <div>
        <h1 className="text-2xl font-bold mt-10 mb-4 text-center">Más productos Mr.Wolf</h1>
        <ProductosAleatorios />
      </div>
    </div>
  );  
};

export default DetalleProducto;
