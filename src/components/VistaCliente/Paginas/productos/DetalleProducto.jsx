import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductosAleatorios from "./proAleactorios/ProductosAleatorios";
import AgregarCarrito from "../../carrito/AgregarCarrito"; // Importa el componente

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenIndex, setImagenIndex] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null); // Estado para la talla (ID)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        console.log("Datos del producto:", data); // 🛠 Verificar los datos completos
        console.log("Tallas:", data.tallas); // 🛠 Verificar si hay tallas
  
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

  if (!producto) return <p>Cargando producto...</p>;

  const cambiarImagen = (index) => setImagenIndex(index);
  const siguienteImagen = () => setImagenIndex((prevIndex) => (prevIndex + 1) % producto.imagenes.length);
  const anteriorImagen = () => setImagenIndex((prevIndex) => (prevIndex - 1 + producto.imagenes.length) % producto.imagenes.length);

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex gap-6">
        {/* Miniaturas de imágenes */}
        <div className="w-20 flex flex-col gap-2">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/public/ImgProductos/${img.nomImagen}`}
              alt={`Imagen ${index + 1}`}
              className={`w-full h-20 object-cover rounded-lg cursor-pointer border ${
                index === imagenIndex ? "border-black" : "border-gray-300"
              }`}
              onMouseEnter={() => cambiarImagen(index)}
            />
          ))}
        </div>

        {/* Contenedor de la imagen principal con flechas */}
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

        {/* Información del Producto */}
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <p className="mt-2 text-gray-700">{producto.descripcion}</p>
          <p className="mt-2 text-lg font-semibold">₡{producto.precio}</p>
          <p className="mt-2 text-md font-medium">Estado: {producto.estado}</p>

          {/* Selección de Tallas */}
          {producto.tallas && producto.tallas.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Selecciona tu talla:</h3>
              <div className="flex gap-2 mt-2">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla.id} // Clave única basada en ID
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                      tallaSeleccionada === talla.id
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => setTallaSeleccionada(talla.id)} // Guarda el ID pero muestra el nombre
                  >
                    {talla.nombre} {/* Muestra el nombre de la talla */}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Componente de agregar al carrito */}
          <AgregarCarrito producto={producto} tallaSeleccionada={tallaSeleccionada} />
        </div>
      </div>

      {/* Productos Aleatorios */}
      <div>
        <h1 className="text-2xl font-bold mt-10 mb-4 text-center">Más productos Mr.Wolf</h1>
        <ProductosAleatorios />
      </div>
    </div>
  );
};

export default DetalleProducto;
