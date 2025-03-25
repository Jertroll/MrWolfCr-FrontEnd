import NavbarCliente from "../navbar/NavbarCliente";
import ImagenP from "../imagenPrincipal/ImagenP";
import FooterCliente from "../footer/FooterCliente";
//import Carrusel from "../carruselProducto/Carrusel";
import Aleaorio from "../proAleactorios/ProductosAleatorios";
import AlgunasCategorias from "../Categorias/AlgunasCategorias";

function Home() {
  return (
    <div className="home-container">
      <NavbarCliente />
      <div>
        <ImagenP />
        <AlgunasCategorias/>
        <Aleaorio/>
      </div>
      <FooterCliente />
    </div>
  );
}

export default Home;
