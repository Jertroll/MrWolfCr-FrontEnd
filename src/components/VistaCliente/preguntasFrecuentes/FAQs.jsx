import faqsData from '../data/faqs.json'; // Importación directa
import "./FAQs.css";  // Cuando el CSS está en la misma carpeta
const FAQs = () => {
  return (
    <div className="faqs-container">
      <h2>Preguntas Frecuentes</h2>
      
      {faqsData.map((faq) => (
        <div key={faq.id} className="faq-item">
          <h3>{faq.pregunta}</h3>
          <p>{faq.respuesta}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQs;