import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //LOGIN
  const [login, setLogin] = useState({})

  // SIDEBAR
  const [showSideBar, setShowSideBar] = useState(false);
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  // POST
  const [posts,setPosts] = useState([])
  
  // Alerta
  const [alertaStatus, setAlertaStatus] = useState({ tipo: '', mensagem: '', duracao: 3000 });

  // USUARIOS
  const [usuarios, setUsuarios] = useState([])

  return (
    <UserContext.Provider value={{ usuarios, setUsuarios,login, setLogin, showSideBar, handleShowSideBar,posts,setPosts, alertaStatus, setAlertaStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('Não foi possível inicializar o contexto do usuário');
  }
  return ctx;
};
