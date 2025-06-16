import Contacto from "../../centroAyuda/contacto/Contacto"
import FAQs from "../../preguntasFrecuentes/FAQs"
import "../AyudaUsuario/AyudaUsuario.css"
function AyudaUsuario() {
  return (
    <div className="ayuda-container">
      <section className="welcome-message">
        <div className="logo-title-container">
          <img 
            src="assets/logoBlanco.jpg" 
            alt="Logo Mr Wolf Cr" 
            className="brand-logo"
          />
          <h1 className="welcome-title">
            <span className="brand-name">MR.WOLF</span>
            <span className="brand-symbol">®</span>
            <span className="sbrand-name">Centro de Ayuda</span>
          </h1>
        </div>
        
        <p className="welcome-text">
          Aquí podrás visualizar un listado de preguntas frecuentes donde posiblemente
          encontrarás la respuesta a tu duda. En caso de no ser así, podrás comunicarte
          con algún encargado de Mr Wolf mediante los contactos establecidos.
        </p>
        
        <div className="contact-cta">
          <a href="https://linktr.ee/MrWolf.cr?utm_source=linktree_profile_share&ltsid=23e86835-079b-420e-9b70-dfbb8bf2cb5f" target="_blank" className="contact-button">
            Contactar a Soporte
          </a>
        </div>
      </section>

      <FAQs />
      <Contacto/>
    </div>
  );
}

export default AyudaUsuario;