import './Pesquisa.css'

import Navbar from './components/navbar'
import PostButton from './components/postButton'

//import LolFoto from './image/lol-perfil.png'
//import Valorant from './image/valorant.png'
//import ForzaHorizon from './icons/Render background/icon - Forza Horizon.png'
//import GOW from './icons/Render background/icon - God of War 2018.png'
//import TLOS from './icons/Render background/icon- TLOS.png'
//import RedDead from './icons/Render background/icon-Red dead.png'
//import TheDivision from './icons/Render background/icon-The division 2.png'
//import GhostWire from './icons/Render background/icon - Ghostwire Tokyo.png'
import api from './services/Api';
import { Modals } from './components/Modals';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Pesquisa = () => {

    const [games, setGames] = useState([]);
    const root = document.getElementById('root');
    const modals = new Modals();
    const navigate = useNavigate();
       
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

    const getGames = async () => {

        try {
            const response = await api.get('./api/games/search');
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

    useEffect(() => {
        const fetchData = async () => {
            await getGames();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);
    
    return (
        <div>
            <Navbar />
            <div id="pesquisa_jogos" className="pesquisa__jogos-container">
                {
                    games.map((game, index) => (
                        <div key={index} className="pesquisa__jogo">
                            <button id={game.id} type="button" className='pesquisa__jogo-link' onClick={(event) => getCurrentGame(event)}>
                                <img src={game.top_adr} alt="Foto jogo" className='pesquisa__jogo-foto' />
                                <div className="`pesquisa__jogo-info-container`">
                                    <p className='pesquisa__jogo-titulo'>{game.name}</p>
                                    <div className="pesquisa__categoria-container">
                                        {
                                            game.genders !== '' && game.genders !== null && game.genders !== undefined ?                          
                                            (game.genders.split(',').map((g, i) => 
                                                <div key={i} className="pesquisa__categoria">
                                                    {g}
                                                </div>
                                            )) : (<br />)
                                        }
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))
                }
            </div>
            <PostButton />
        </div>
    )
}

export default Pesquisa