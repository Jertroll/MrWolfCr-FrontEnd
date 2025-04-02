import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import "./FAQs.css";

const FAQs = () => {
  const [faqsData, setFaqsData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("/data/faqs.json")
      .then((response) => response.json())
      .then((data) => setFaqsData(data))
      .catch((error) => console.error("Error cargando faqs.json:", error));
  }, []);

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faqs-container">
      <div className="faqs-header">
        <FaQuestionCircle className="header-icon" />
        <h2 className="faqs-title">Preguntas Frecuentes</h2>
        <p className="faqs-subtitle">Encuentra respuestas a las dudas más comunes</p>
      </div>

      <div className="faqs-list">
        {faqsData.map((faq) => (
          <div 
            key={faq.id} 
            className={`faq-item ${expandedId === faq.id ? 'active' : ''}`}
            onClick={() => toggleFaq(faq.id)}
          >
            <div className="faq-question">
              <h3>{faq.pregunta}</h3>
              <button className="faq-toggle">
                {expandedId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            
            {expandedId === faq.id && (
              <div className="faq-answer">
                <p>{faq.respuesta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;