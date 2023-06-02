import './Pesquisa.css'

import Navbar from './components/navbar'
import PostButton from './components/postButton'

import LolFoto from './image/lol-perfil.png'
import Valorant from './image/valorant.png'
import ForzaHorizon from './icons/Render background/icon - Forza Horizon.png'
import GOW from './icons/Render background/icon - God of War 2018.png'
import TLOS from './icons/Render background/icon- TLOS.png'
import RedDead from './icons/Render background/icon-Red dead.png'
import TheDivision from './icons/Render background/icon-The division 2.png'
import GhostWire from './icons/Render background/icon - Ghostwire Tokyo.png'

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Pesquisa = () => {
    const navigate = useNavigate();

    const handleGameProfileClick = (e) => {
        navigate('/jogo');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dados'); // Endpoint para obter dados do banco de dados
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados do banco de dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pesquisa__jogos-container">
                {dados.map((item) => (
                    <div className="pesquisa__jogo">
                        <a href="" onClick={handleGameProfileClick} className='pesquisa__jogo-link'>
                            <img src={item.foto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                            <div className="`pesquisa__jogo-info-container`">
                                <p className='pesquisa__jogo-titulo'>{item.game} {item.ranking}</p>
                                <div className="pesquisa__categoria-container">
                                    <div className="pesquisa__categoria">{item.categoria}</div>
                                    {/* <div className="pesquisa__categoria">Multijogador</div> */}
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <PostButton />
        </div>
    )
}

export default Pesquisa