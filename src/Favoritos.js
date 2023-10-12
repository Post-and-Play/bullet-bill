import './Favoritos.css'

import { Icon } from '@iconify/react';
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

<<<<<<< HEAD
import api from './services/Api';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Modals } from './components/Modals';
import { getAuth } from './services/Auth';

const Favoritos = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [currentUser, setCurrentUser] = useState();
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
        } else {
            navigate('/');
        }
    }

    const getGames = async () => {

        try {
            const response = await api.get('./api/likes/user');
            if (response.data) {
                //console.log('setGames: \n' + JSON.stringify(response.data));
                setGames(response.data);
            }
            else {
                //console.log('setGames: []');
                setGames([]);
            }
        } catch (err) {
            //console.log('setGames: []');
            setGames([]);
        }

    }

    const getCurrentGame = async (event) => {
        event.preventDefault();
        try {

            //console.log('element...html: ' + event.target);

            const gameId = event.target.id;
            /* console.log('clicked...' + gameId);*/

            if (gameId !== '' && gameId !== null && gameId !== undefined) {
                const response = await api.get('./api/games?id=' + gameId);
                if (response.data.id) {
                    navigate('/jogo?id=' + gameId);
                }
                else {
                    if (root) {
                        modals.htmlDialog(
                            root,
                            'Game não encontrado!',
                            modals.msgboxButtons.okOnly,
                            modals.msgboxIcons.warning,
                            'Mensagem!',
                            {
                                ok: (evt) => {

                                }
                            });
                    }
                }
            }

        }
        catch (err) {
            if (root) {
                modals.htmlDialog(
                    root,
                    'Game não encontrado!\n' + err.message,
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.warning,
                    'Mensagem!',
                    {
                        ok: (evt) => {

                        }
                    });
            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            await getGames();
            loading.close();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    return (
        <div>
            <Navbar currentUser={currentUser} />
            <div className="favorito__jogos-container">
                {games.length > 0 ?
                    games.map((game, index) => (
                         <div key={index} className="favorito__jogo">
                            <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                            <button id={game.id} className='favorito__jogo-link' onClick={(event) => getCurrentGame(event)}>
                                <img src={game.top_adr} alt="Foto jogo" className='favorito__jogo-foto' />
                                <div className="`favorito__jogo-info-container`">
                                    <p className='favorito__jogo-titulo'>{game.name}</p>
                                    <div className="favorito__categoria-container">
                                         {
                                            game.genders !== '' && game.genders !== null && game.genders !== undefined ?
                                                (game.genders.split(',').map((g, i) =>
                                                    <div key={i} className="favorito__categoria">
                                                        {g}
                                                    </div>
                                                )) : (<br />)
                                        }
                                    </div>
                                </div>
                            </button>
                        </div>
                    )) : (<div className='favorito__hasNot'><h3>Nenhum favorito ainda!</h3></div>)
                }
            </div>          
            <PostButton currentUser={currentUser} />
=======
import React from 'react'

const Favoritos = () => {
    return (
        <div>
            <Navbar />
            <div className="favorito__jogos-container">
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>League of Legends #50</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">MOBA</div>
                                <div className="favorito__categoria">Multijogador</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={Valorant} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>Valorant #138</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Tiro</div>
                                <div className="favorito__categoria">Tático</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={ForzaHorizon} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>Forza Horizon #84</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Corrida</div>
                                <div className="favorito__categoria">Simulação</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={GOW} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>God of War #124</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Ação-aventura</div>
                                <div className="favorito__categoria">Jogador Solo</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={TLOS} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>The Last of Us #22</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Aventura</div>
                                <div className="favorito__categoria">Tiro</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={RedDead} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>Red Dead Redemption 2 #10</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Aventura</div>
                                <div className="favorito__categoria">Tiro</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={TheDivision} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>Tom Clancy's - The Division 2 #33</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Aventura</div>
                                <div className="favorito__categoria">Tática</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="favorito__jogo">
                    <Icon className='favorito__jogo-icon' icon="ri:heart-fill" color="#633F9A" width="45" height="45" hFlip={true} />
                    <a href="" className='favorito__jogo-link'>
                        <img src={GhostWire} alt="Foto jogo" className='favorito__jogo-foto' />
                        <div className="`favorito__jogo-info-container`">
                            <p className='favorito__jogo-titulo'>Ghostwire Tokyo #97</p>
                            <div className="favorito__categoria-container">
                                <div className="favorito__categoria">Ação-aventura</div>
                                <div className="favorito__categoria">Jogador Solo</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <PostButton />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
        </div>

    )
}

export default Favoritos