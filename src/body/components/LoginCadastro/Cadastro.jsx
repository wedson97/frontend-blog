import React, { useState } from 'react';
import "./css/styleLogin.css";
import api from '../../../api/requisicoes';
import Alerta from '../Alerta/Alerta';
import { useNavigate } from 'react-router-dom'; // Import do useNavigate
import { Button } from 'react-bootstrap';
import { useUser } from '../../../context/UseContext';

function Cadastro() {
  const { setAlertaStatus, login } = useUser();
  const [credenciais, setCredenciais] = useState({
    nome_usuario: '',
    senha: '',
    email: '',
    admin: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredenciais(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.post("/usuarios", credenciais);
      if ( resposta.status === 200){
        setAlertaStatus({ tipo: 'success', mensagem: 'Cadastrado com sucesso!', duracao: 3000 });
        if(login.admin!=null){
          navigate('/configuracoes');
        }else{
          navigate('/login');
        }
      }
      
    } catch (error) {
      setAlertaStatus({ tipo: 'danger', mensagem: error.response.data.Error, duracao: 3000 });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Cadastro</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="nome_usuario">Nome de Usuário:</label>
            <input
              type="text"
              id="nome_usuario"
              name="nome_usuario"
              value={credenciais.nome_usuario}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          {login.admin && (
            <div className="login-form-group">
              <label htmlFor="admin">Admin</label>
              <input
                type="checkbox"
                id="admin"
                name="admin"
                checked={credenciais.admin}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="login-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type='email'
              id="email"
              name="email"
              value={credenciais.email}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="senha">Senha:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                value={credenciais.senha}
                onChange={handleChange}
                required
                className="login-input"
              />
              <Button variant="primary" className="mb-2" onClick={togglePasswordVisibility}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
          </div>
          <Button variant="primary" className="mb-2" type="submit">
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
