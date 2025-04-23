import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./Contacto.css";

const Contacto = () => {
  return (
    <div className="contacto-container">
      <div className="content-wrapper">
        <h2 className="section-title">
          ¿No encontraste lo que buscabas? <span className="highlight">Contáctanos</span>
        </h2>
        
        <div className="contact-grid">
          {/* Teléfono */}
          <div className="contact-card">
            <div className="contact-icon">
              <FaPhone className="icon" />
            </div>
            <h3>Teléfono</h3>
            <p>+506 2101-9480 (Solo llamadas)</p>
            <p>+506 8557-4555</p>

          </div>

          {/* Correo */}
          <div className="contact-card">
            <div className="contact-icon">
              <FaEnvelope className="icon" />
            </div>
            <h3>Correo Electrónico</h3>
            <p>mrcaddiewolf@gmail.com</p>
            <p>Respuesta en menos de 24h</p>
          </div>

          {/* Ubicación */}
          <div className="contact-card">
            <div className="contact-icon">
              <FaMapMarkerAlt className="icon" />
            </div>
            <h3>Tienda Fisica</h3>
            <p>Guanacaste, Costa Rica</p>
            <p>Costado oeste del Banco Popular</p>
          </div>

          {/* Horario */}
          <div className="contact-card">
            <div className="contact-icon">
              <FaClock className="icon" />
            </div>
            <h3>Horario de Atención</h3>
            <p>Lunes a Sabados</p>
            <p>7:00 AM - 10:00 PM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contacto;