import './Favoritos.css'

import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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
            await setCurrentUser(user);
            await getFavorites(user);
        } else {
            navigate('/');
        }
    }

    const getFavorites = async (user) => {

        try {
            const response = await api.get(`/api/favorite/user?id=${user.id}`);
            if (response.status == 200) {
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

            let gameId = event.target.id;
            if (gameId !== '' && gameId !== null && gameId !== undefined) {
                gameId = event.target.getAttribute('id');
            }

            console.log('clicked...' + event.target.id);

            if (gameId !== '' && gameId !== null && gameId !== undefined) {
                return;
            }

            const response = await api.get('./api/games?id=' + gameId);
            if (response.data.id) {
                navigate('/jogo?id=' + gameId);
            }
            else {
                console.error('Game não encontrado!');
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
        catch (err) {
            console.error(err.message);
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
                            <FontAwesomeIcon icon={faHeart} className={`favorito__jogo-icon filled`} style={{ fontSize: '24px', color: '#ff7373' }} /> 
                            <a href={`/jogo?id=${game.game_id}`} className='favorito__jogo-link'> 
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
                            </a>
                        </div>
                    )) : (<div className='favorito__hasNot'><h3>Nenhum favorito ainda!</h3></div>)
                }
            </div>          
            <PostButton currentUser={currentUser} />
        </div>

    )
}

export default Favoritos