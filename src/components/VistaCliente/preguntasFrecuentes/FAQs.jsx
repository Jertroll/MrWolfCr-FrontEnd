import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Íconos de flecha
import "./FAQs.css";

const FAQs = () => {
  const [faqsData, setFaqsData] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Guarda el ID de la pregunta expandida

  useEffect(() => {
    fetch("/data/faqs.json")
      .then((response) => response.json())
      .then((data) => setFaqsData(data))
      .catch((error) => console.error("Error cargando faqs.json:", error));
  }, []);

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id); // Alterna entre abrir y cerrar
  };

  return (
    <div className="faqs-container">
      <h2 className="text-2xl font-bold text-center mb-4">Preguntas Frecuentes</h2>

      {faqsData.map((faq) => (
        <div key={faq.id} className="faq-item border-b p-4">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFaq(faq.id)}
          >
            <h3 className="font-semibold text-lg">{faq.pregunta}</h3>
            <button className="text-gray-600">
              {expandedId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {expandedId === faq.id && (
            <p className="mt-2 text-gray-700">{faq.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
