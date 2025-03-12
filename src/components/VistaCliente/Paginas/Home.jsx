import NavbarCliente from "../navbar/NavbarCliente";
import ImagenP from "../imagenPrincipal/ImagenP";
import FooterCliente from "../footer/FooterCliente";
import Carrusel from "../carruselProducto/Carrusel";
import Aleaorio from "../proAleactorios/ProductosAleatorios"

function Home() {
  return (
    <div className="home-container">
      <NavbarCliente />
      <div>
        <ImagenP />
        <Carrusel />
        <Aleaorio/>
      </div>
      <FooterCliente />
    </div>
  );
}

export default Home;
