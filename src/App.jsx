
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './body/components/navbar';
import Body from './body/index';
import MeusPosts from './body/components/MeusPosts';
import PostCompleto from './body/components/posts/post/components/postCompleto.jsx';
import Login from './body/components/LoginCadastro/Login.jsx';
import Cadastro from './body/components/LoginCadastro/Cadastro.jsx';
import { UserProvider } from './context/UseContext.jsx';
import Alerta from './body/components/Alerta/Alerta.jsx';
import Configuracoes from './body/components/Configuracoes/index.jsx';
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Alerta/>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/meus-posts" element={<MeusPosts />} />
          <Route path="/post/:id" element={<PostCompleto />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
