import NavbarCliente from "../navbar/NavbarCliente";
import Footer from "../footer/FooterCliente";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <NavbarCliente />
      <div className="content">Home</div>
      <Footer />
    </div>
  );
}

export default Home;
