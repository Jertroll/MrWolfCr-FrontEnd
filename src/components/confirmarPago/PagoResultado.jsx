import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PagoResultado = () => {
  const [params] = useSearchParams();
  const [estado, setEstado] = useState('Verificando...');
  const [codigoFactura, setCodigoFactura] = useState('');
  const [estadoFactura, setEstadoFactura] = useState(null);

  useEffect(() => {
    const order = params.get('order');
    if (order) {
      setCodigoFactura(order);

      axios
        .get(`http://localhost:3000/api/v1/factura/estado/${order}`)
        .then((res) => {
          const estado = res.data.estado;
          setEstadoFactura(estado);

          if (estado === 'Pagada') {
            setEstado('✅ Tu pago fue aprobado. Gracias por tu compra.');
          } else if (estado === 'Pendiente') {
            setEstado('⏳ Tu pago está pendiente. Intenta recargar esta página más tarde.');
          } else {
            setEstado(`⚠️ Estado de la factura: ${estado}`);
          }
        })
        .catch(() => {
          setEstado('❌ No se pudo verificar el estado de la factura.');
        });
    } else {
      setEstado('⚠️ No se proporcionó código de factura en la URL.');
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Resultado del Pago</h2>
      <p>{estado}</p>

      {codigoFactura && (
        <p>
          <strong>Código de factura:</strong> {codigoFactura}
        </p>
      )}

      {estadoFactura === 'Pagada' && (
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/mis-facturas`} className="btn btn-success">
            Ver mis facturas
          </Link>
        </div>
      )}
    </div>
  );
};

export default PagoResultado;
