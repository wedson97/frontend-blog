import React, { useState, useEffect } from 'react';
import './css/style.css'; // Importe o arquivo CSS para estilização
import { useUser } from '../../../context/UseContext';
import { AiFillEdit, AiFillDelete, AiOutlineClose } from "react-icons/ai";
import api from '../../../api/requisicoes';
import ModalPost from './ModalPost';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa o CSS do tema Quill

function MeusPosts() {
    const { posts, setPosts, setAlertaStatus } = useUser();
    const [editar, setEditar] = useState(false);
    const [novoPost, setNovoPost] = useState({
        titulo: '',
        conteudo: '',
        imagem: '',
        autor_id: ''
    });
    const [preview, setPreview] = useState('');
    const id = localStorage.getItem("user_id");
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/posts/usuario/' + id);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, [setPosts, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleQuillChange = (value) => {
        setNovoPost((prevPost) => ({ ...prevPost, conteudo: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setPreview(base64Image);
                setNovoPost((prevPost) => ({
                    ...prevPost,
                    imagem: base64Image, // Salva a imagem como base64
                    autor_id: id
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e, postId = null) => {
        e.preventDefault();
        const formData = new FormData();
        if (postId) {
            formData.append('id', postId); // Inclua o ID se estiver editando
        }
        formData.append('titulo', novoPost.titulo);
        formData.append('conteudo', novoPost.conteudo);
        if (novoPost.imagem) {
            formData.append('imagem', novoPost.imagem); // Adiciona a imagem
        }
        formData.append('autor_id', novoPost.autor_id);

        try {
            const response = editar
            ? await api.put('/posts/'+postId, formData) // Usando PUT para edição
            : await api.post('/posts', formData); // Usando POST para criação

            if (response.status!=200) {
                throw new Error('Erro ao enviar os dados.');
            }

            const response_get = await api.get('/posts');
            
            setPosts(response_get.data.posts);

            setNovoPost({ titulo: '', conteudo: '', imagem: '' });
            setPreview('');
            setEditar(false);
            if (editar){
                setAlertaStatus({ tipo: 'success', mensagem: 'Post atualizado com sucesso!',  duracao:3000})
            }else{
                setAlertaStatus({ tipo: 'success', mensagem: response.data.message,  duracao:3000})
            }
            
        } catch (error) {
            console.error('Erro ao criar ou atualizar o post:', error);
            if(editar){
                setAlertaStatus({ tipo: 'danger', mensagem: 'Erro ao editar o post',  duracao:3000})
            }else{
                setAlertaStatus({ tipo: 'danger', mensagem: 'Erro ao criar o post',  duracao:3000})
            }
            
        }
    };

    const handleSubmitEditar=(post)=>{
        editPost(post)
    }

    const editPost = (post) => {
        setNovoPost(post);
        setEditar(true);
        
    }

    const handleCloseModalDelete = (post) => {
        setNovoPost(post);
        setModalDeleteShow(!modalDeleteShow);
    }
    
    const handleDelete = async (id) => {
        try {
            const response_delete = await api.delete('/posts/'+id);
            setPosts(posts.filter(post => post.id !== id));
            handleCloseModalDelete(!modalDeleteShow)
            setNovoPost({ titulo: '', conteudo: '', imagem: '' });
            setAlertaStatus({ tipo: 'success', mensagem: 'Post deletado com sucesso!',  duracao:3000})
        } catch (error) {
            console.log('Erro ao deletar post:', error);
            setAlertaStatus({ tipo: 'danger', mensagem: 'Erro ao tentar deletar post',  duracao:3000})
        }
        
    };

    return (
        <>
            <div className="container">
                <div className="postsArea">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="postContainer">
                                <button onClick={() => handleSubmitEditar(post)}><AiFillEdit /></button>
                                <button onClick={() => handleCloseModalDelete(post)}><AiFillDelete /></button>
                                <img
                                    src={`${api.defaults.baseURL}images/${post.imagem_url}`}
                                    alt={`Imagem do ${post.titulo}`}
                                    className="image"
                                />
                                <div className="content">
                                    <h2 className="title">{post.titulo}</h2>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Não há posts para exibir.</p>
                    )}
                </div>
                <div className="createPostArea">
                    {editar ? (
                        <>
                            <button onClick={() => { setEditar(false); setNovoPost({ titulo: '', conteudo: '', imagem: '' }); }}>
                                <AiOutlineClose />
                            </button>
                            <h2>Editar Post</h2>
                        </>
                    ) : (
                        <h2>Criar Novo Post</h2>
                    )}
                    <form onSubmit={(e) => handleSubmit(e, novoPost.id)}>
                        <div className="formGroup">
                            <label htmlFor="title">Título</label>
                            <input
                                type="text"
                                id="title"
                                name="titulo"
                                value={novoPost.titulo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="formGroup">
                            <ReactQuill
                                theme="snow"
                                value={novoPost.conteudo}
                                onChange={handleQuillChange}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="image">Capa do post</label>
                            <input
                                type="file"
                                id="image"
                                name="imagem"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview && <img src={preview} alt="Pré-visualização" className="previewImage" />}
                        </div>
                        <div className="formGroup">
                            <button type="submit">
                                {editar ? "Editar Post" : "Criar Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ModalPost show={modalDeleteShow}
                onHide={handleCloseModalDelete}
                post={novoPost}
                onDelete={handleDelete}
            />
        </>
    );
}

export default MeusPosts;
