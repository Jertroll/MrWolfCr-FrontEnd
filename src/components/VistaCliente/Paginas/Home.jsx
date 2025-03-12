import NavbarCliente from "../navbar/NavbarCliente";
import ImagenPrincipal from '../imagenPrincipal/ImagenP';
import FooterCliente from '../footer/FooterCliente'
import Carrusel from '../carruselProducto/Carrusel'
function Home() {
  return (
    <>
      <NavbarCliente />
      <div>
        <ImagenPrincipal />
        <Carrusel/>
      </div>
      <FooterCliente/>
    </>
  );
}

export default Home;
