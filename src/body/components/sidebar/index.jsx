
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image, Button } from 'react-bootstrap';
import "./css/style.css"
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UseContext';
import { useEffect } from 'react';
import api from '../../../api/requisicoes';

const Sidebar = ({show, handleShow}) => {
  const {setShowSideBar, login, setLogin} = useUser()

  const id = localStorage.getItem("user_id")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id!==null){
          const response = await api.get("/usuario/" + id);
          setLogin(response.data.usuarios);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchData();
  }, [id]);  // Adicione `id` como dependência

  const logout=()=>{
    localStorage.clear("user_id")
    setLogin({})
  }
  
  return (
    <>
      <Offcanvas show={show} onHide={handleShow}>
        <Offcanvas.Header closeButton>
        
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Image src="/image/user.jpg" alt="Logo" className="sidebar-logo" />
          <div className="d-flex flex-column align-items-center">
            { login && login.nome_usuario ? (
               <div className="d-flex flex-column align-items-center">
                <p>Bem-vindo, {login.nome_usuario}!</p>
                <Button variant="primary" as={Link} to="/" className="mb-2" onClick={logout}>
                  Logout
                </Button>
               </div>   
            ):(
            <>
              <Button variant="primary" className="mb-2"  as={Link} to="/login" onClick={() => setShowSideBar(false)}>
                Login
              </Button>
              <Button variant="secondary" as={Link} to="/cadastro" onClick={() => setShowSideBar(false)}>
                Cadastro
              </Button>
            </>
          )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}

export default Sidebar;
