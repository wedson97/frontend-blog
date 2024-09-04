import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../../../context/UseContext';
import Sidebar from '../sidebar';
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom'; // Importe o Link

function NavBar() {
  const { showSideBar, handleShowSideBar, login } = useUser(); // Desestruturação correta
  
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Blog</Navbar.Brand>
          <Nav className="justify-content-end">
          {login?.admin === true && (
          <>
            <Nav.Link as={Link} to="/configuracoes">Configurações</Nav.Link>
            <Nav.Link as={Link} to="/meus-posts">Meus Posts</Nav.Link>
          </>
            
            
          )}
            <Nav.Link onClick={handleShowSideBar}>
              <AiOutlineUser size={24} style={{ color: 'white' }} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Sidebar show={showSideBar} handleShow={handleShowSideBar} />
    </>
  );
}

export default NavBar;
