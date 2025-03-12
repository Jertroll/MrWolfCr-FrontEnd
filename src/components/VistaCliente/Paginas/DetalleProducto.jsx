import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setProducto(data);
        if (data.imagenes.length > 0) {
          setImagenSeleccionada(data.imagenes[0].nomImagen); // Primera imagen como principal
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Imagen Principal */}
      <div className="w-full">
        <img
          src={`http://localhost:3000/public/ImgProductos/${imagenSeleccionada}`}
          alt={producto.nombre}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Miniaturas de Imágenes */}
      {producto.imagenes.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/public/ImgProductos/${img.nomImagen}`}
              alt={`Imagen ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 
                ${imagenSeleccionada === img.nomImagen ? "border-black" : "border-gray-300"}`}
              onClick={() => setImagenSeleccionada(img.nomImagen)}
            />
          ))}
        </div>
      )}

      {/* Información del Producto */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold">{producto.nombre}</h1>
        <p className="mt-2 text-gray-700">{producto.descripcion}</p>
        <p className="mt-2 text-lg font-semibold">₡{producto.precio}</p>
      </div>
    </div>
  );
};

export default DetalleProducto;
