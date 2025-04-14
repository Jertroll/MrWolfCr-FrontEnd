import ImagenP from "../../imagenPrincipal/ImagenP";
import ProductosAleatorios from "../../Paginas/productos/proAleactorios/ProductosAleatorios";
import AlgunasCategorias from "../../Categorias/AlgunasCategorias";

function Home() {
  return (
    <>
      <ImagenP />
      <AlgunasCategorias />
      <ProductosAleatorios />
    </>
  );
}

export default Home;