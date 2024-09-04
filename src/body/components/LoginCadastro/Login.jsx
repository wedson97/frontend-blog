import React, { useState } from 'react';
import "./css/styleLogin.css";
import api from '../../../api/requisicoes';
import { useUser } from '../../../context/UseContext';
import { useNavigate } from 'react-router-dom'; // Import do useNavigate
import { Button } from 'react-bootstrap';

function Login() {
  const { login, setLogin, setAlertaStatus } = useUser();
  const [credenciais, setCredenciais] = useState({
    nome_usuario: '',
    senha: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciais({ ...credenciais, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.post("/usuario/login", credenciais);
      localStorage.setItem("user_id", JSON.stringify(resposta.data.usuarios.id));
      setLogin(resposta.data.usuarios);
      navigate('/');

    } catch (error) {
      console.error("Erro no login:", error);
      setAlertaStatus({ tipo: 'danger', mensagem: error.response.data.message,  duracao:3000})
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
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
          <div className="login-form-group">
            <label htmlFor="senha">Senha:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"} // Alterna o tipo entre "text" e "password"
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
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
