import { useEffect, useState } from "react";
// Importación directa
import "./FAQs.css"; // Cuando el CSS está en la misma carpeta

const FAQs = () => {
  const [faqsData, setFaqsData] = useState([]);

  useEffect(() => {
    fetch("/data/faqs.json") // Ruta desde `public/`
      .then((response) => response.json())
      .then((data) => setFaqsData(data))
      .catch((error) => console.error("Error cargando faqs.json:", error));
  }, []);

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
