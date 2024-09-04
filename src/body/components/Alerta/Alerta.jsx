import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import './css/index.css';
import { useUser } from '../../../context/UseContext';

function Alerta() {
  const { alertaStatus } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alertaStatus.duracao > 0 && alertaStatus.mensagem) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, alertaStatus.duracao);

      return () => clearTimeout(timer);
    }
  }, [alertaStatus]);

  if (!show) {
    return null;
  }

  return (
    <Alert variant={alertaStatus.tipo} className="alerta">
      {alertaStatus.mensagem}
    </Alert>
  );
}

export default Alerta;
