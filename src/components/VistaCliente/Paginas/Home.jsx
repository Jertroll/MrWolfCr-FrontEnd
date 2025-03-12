import NavbarCliente from "../navbar/NavbarCliente";
import ImagenP from "../imagenPrincipal/ImagenP";
import FooterCliente from "../footer/FooterCliente"
import Carrusel from "../carruselProducto/Carrusel"
function Home() {
  return (
    <>
      <NavbarCliente />
      <div>
      <ImagenP/>
      <Carrusel/>
      </div>
      <FooterCliente />
    </>
  );
}

export default Home;
