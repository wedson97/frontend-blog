import React, { useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useEffect } from 'react';
import api from '../../../../../api/requisicoes';
import { useUser } from '../../../../../context/UseContext';

function LikeDeslike({post_id, usuario_id}) {
    const { login, setLogin } = useUser();
    const [corLike, setCorLike] = useState('grey')
    const [corDeslike, setCorDeslike] = useState('grey')
    const [contadorLike, setContadorLike] = useState(0)
    const [contadorDeslike, setContadorDeslike] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Promise.all([
              api.get(`/likes/${post_id}`),
              api.get(`/deslikes/${post_id}`)
            ]);
            
            if (login.id != undefined){
                const likes = response[0].data
                const deslikes = response[1].data
                const likesFiltrados = likes.filter(item=> item.usuario_id===login.id)
                const deslikesFiltrados = deslikes.filter(item=> item.usuario_id===login.id)
                if (likesFiltrados.length>0){
                    setCorLike('red')
                }
                if(deslikesFiltrados.length>0){
                    setCorDeslike('black')
                }
            }
            setContadorLike(response[0].data.length)
            setContadorDeslike(response[1].data.length)
            } catch (error) {
              console.error('Erro ao buscar dados:', error);
            }
        };
        
        fetchData();
      }, []);

      const handleClickLike = async () => {
        const json_body = {
            post_id: post_id,
            usuario_id: parseInt(login.id)
        };
        if (!login.id) {
            console.log('Usuário não está logado.');
            return;
        }
        
        if (corLike === 'red') {
            setCorLike('grey');
            setContadorLike(contadorLike - 1);
            const response = await api.delete('/likes/' + login.id);
            if (response.status !== 200) {
                setCorLike('red');
                setContadorLike(contadorLike + 1);
            }
        } else if (corLike === 'grey' && corDeslike === 'black') {
            setCorLike('red');
            setContadorLike(contadorLike + 1);
            setCorDeslike('grey');
            setContadorDeslike(contadorDeslike - 1);
            try {
                const responseDelete = await api.delete('/deslikes/' + login.id);
                if (responseDelete.status !== 200) {
                    setContadorLike(contadorLike - 1);
                    setCorLike('grey');
                    setContadorDeslike(contadorDeslike + 1);
                    setCorDeslike('black');
                    return null;
                } else {
                    const response_like = await api.post('/likes', json_body);
                    if (response_like.status !== 200) {
                        setCorLike('grey');
                        setContadorLike(contadorLike - 1);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setCorLike('red');
            setContadorLike(contadorLike + 1);
            const response_like = await api.post('/likes', json_body);
            if (response_like.status !== 200) {
                setCorLike('grey');
                setContadorLike(contadorLike - 1);
            }
        }
    };
    
    const handleClickDeslike = async () => {
        const json_body = {
            post_id: post_id,
            usuario_id: parseInt(login.id)
        };
        if (!login.id) {
            console.log('Usuário não está logado.');
            return;
        }
        if (corDeslike === 'black') {
            setCorDeslike('grey');
            setContadorDeslike(contadorDeslike - 1);
            const response = await api.delete('/deslikes/' + login.id);
            if (response.status !== 200) {
                setCorDeslike('black');
                setContadorDeslike(contadorDeslike + 1);
            }
        } else if (corLike === 'red' && corDeslike === 'grey') {
            setCorDeslike('black');
            setContadorDeslike(contadorDeslike + 1);
            setCorLike('grey');
            setContadorLike(contadorLike - 1);
            try {
                const responseDelete = await api.delete('/likes/' + login.id);
                if (responseDelete.status !== 200) {
                    setContadorLike(contadorLike + 1);
                    setCorLike('red');
                    setContadorDeslike(contadorDeslike - 1);
                    setCorDeslike('grey');
                    return null;
                } else {
                    const response_deslike = await api.post('/deslikes', json_body);
                    if (response_deslike.status !== 200) {
                        setCorDeslike('grey');
                        setContadorDeslike(contadorDeslike - 1);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setCorDeslike('black');
            setContadorDeslike(contadorDeslike + 1);
            const response_deslike = await api.post('/deslikes', json_body);
            if (response_deslike.status !== 200) {
                setCorDeslike('grey');
                setContadorDeslike(contadorDeslike - 1);
            }
        }
    };
      return (
        <div style={{
            display: 'flex',
            alignItems: 'center', // Alinha verticalmente os ícones no centro
            gap: '5px', // Espaçamento entre os ícones
            justifyContent: 'flex-end', // Alinha o conteúdo à direita
            width: '90%' // Garante que o contêiner ocupe toda a largura disponível
        }}>
            <FaHeart style={{ color: corLike, fontSize: '24px' }} type='button' onClick={handleClickLike}/>
            {contadorLike}
            <FaHeartBroken style={{ color: corDeslike, fontSize: '24px' }} type='button' onClick={handleClickDeslike}/>
            {contadorDeslike}
        </div>
    );
    
}

export default LikeDeslike;
