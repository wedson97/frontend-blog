// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useUser } from '../../../../../context/UseContext';
// import './css/stylePostCompleto.css'
// import LikeDeslike from './likeDeslike';
// import Comentarios from './comentarios';
// import api from '../../../../../api/requisicoes';


// function PostCompleto() {

//   const { id } = useParams();
//   const { posts } = useUser();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     localStorage.setItem('post_id', id);
//     const procurarPost = posts.find(post => post.id === parseInt(id));

//     if (procurarPost) {
//       setPost(procurarPost);
//       setLoading(false);
//     } else {
//       api.get('/posts/'+id)
//         .then(response => {
//           setPost(response.data.posts);
//           setLoading(false);
//         })
//         .catch(err => {
//           setError(err);
//           setLoading(false);
//         });
//     }
//   }, [id, posts]);

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   if (error) {
//     return <p>Erro ao carregar o post.</p>;
//   }

//   if (!post) {
//     return <p>Post não encontrado.</p>;
//   }

  
//   return (
//     <div className='containerBodyPostCompleto'>
//       <div className="postContainerPostCompleto">
//       <img 
//         src={`${api.defaults.baseURL}images/${post.imagem_url}`} 
//         alt={`Imagem do ${post.titulo}`} 
//         className="imagePostCompleto"
//       />
//       <div className="contentPostCompleto">
//         <h1 className="titlePostCompleto">{post.titulo}</h1>
//         <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: post.conteudo }} />
//       </div>
//       <LikeDeslike usuario_id={id} post_id={post.id}/>
//       <Comentarios usuario_id={id} post_id={post.id}/>
//     </div>
//     </div>
    
//   );
// }

// export default PostCompleto;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useUser } from '../../../../../context/UseContext';
import './css/stylePostCompleto.css'
import LikeDeslike from './likeDeslike';
import Comentarios from './comentarios';
import api from '../../../../../api/requisicoes';

function PostCompleto() {
  const { id } = useParams();
  const { posts } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('post_id', id);
    const procurarPost = posts.find(post => post.id === parseInt(id));

    if (procurarPost) {
      setPost(procurarPost);
      setLoading(false);
    } else {
      api.get('/posts/'+id)
        .then(response => {
          setPost(response.data.posts);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [id, posts]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar o post.</p>;
  }

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  const postUrl = `${api.defaults.baseURL}/post/${post.id}`;
  const postImageUrl = `${api.defaults.baseURL}images/${post.imagem_url}`;

  return (
    <div className='containerBodyPostCompleto'>
      <Helmet>
        <title>{post.titulo}</title>
        <meta property="og:title" content={post.titulo} />
        <meta property="og:description" content={post.conteudo.substring(0, 150)} />
        <meta property="og:image" content={postImageUrl} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="postContainerPostCompleto">
        <img 
          src={postImageUrl} 
          alt={`Imagem do ${post.titulo}`} 
          className="imagePostCompleto"
        />
        <div className="contentPostCompleto">
          <h1 className="titlePostCompleto">{post.titulo}</h1>
          <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: post.conteudo }} />
        </div>
        <LikeDeslike usuario_id={id} post_id={post.id}/>
        <Comentarios usuario_id={id} post_id={post.id}/>
      </div>
    </div>
  );
}

export default PostCompleto;
