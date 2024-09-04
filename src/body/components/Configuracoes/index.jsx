import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/style.css'; // Certifique-se de importar o arquivo CSS

function Configuracoes() {

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end">
        <div className="box p-4">
          <h1 className="mb-4 text-center">Configurações</h1>
          <div className="btn-group-vertical w-100" role="group" aria-label="Configurações">
            <Button variant="secondary" as={Link} to="/cadastro">
              Perfil
            </Button>
            <Button variant="secondary" as={Link} to="/cadastro">
              Cadastrar novo admin
            </Button>
            <Button variant="secondary" as={Link} to="/cadastro">
              Notificações
            </Button>
            <Button variant="secondary" as={Link} to="/cadastro">
              Privacidade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
