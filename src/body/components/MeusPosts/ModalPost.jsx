import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../../api/requisicoes';

function ModalPost({ show, onHide, post, onDelete }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {post ? post.titulo : "Detalhes do Post"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {post ? (
                    <>
                        {(
                            <img
                                src={`${api.defaults.baseURL}images/${post.imagem_url}`}
                                alt={`Imagem do ${post.titulo}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </>
                ) : (
                    <p>Nenhum post selecionado.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
            
                {onDelete && post && (
                    <Button variant="danger" onClick={() => onDelete(post.id)}>
                        Excluir
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPost;
