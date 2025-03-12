import NavbarCliente from "../navbar/NavbarCliente";
import ImagenP from "../imagenPrincipal/ImagenP";
import FooterCliente from "../footer/FooterCliente";
import Carrusel from "../carruselProducto/Carrusel";

function Home() {
  return (
    <div className="home-container">
      <NavbarCliente />
      <div>
        <ImagenP />
        <Carrusel />
      </div>
      <FooterCliente />
    </div>
  );
}

export default Home;
