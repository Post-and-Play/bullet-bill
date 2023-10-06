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

import api from './services/Api';
import { getStorage, getUser } from './services/Auth';
import { Modals } from './components/Modals';


import React, { useState } from 'react'

const Pesquisa = () => {
    const [name ,setName]= useState ('');
    const [description, setDescription] = useState('');
    const [cover_adr, setCover] = useState(null);
    const [top_adr, setTop] = useState(null);
    const [genders, setGenders] = useState('');
    const [reviews, setReviews] = useState('');
    const [rating, setRating] = useState('');

    const getCurrentGames = async() => {

        let games = await getUser();
        if (games) {
                const response = await api.get('./api/games?id=' + games.id);
                if (response.data.id){
                    
                    setName(response.data.name);
                    setGenders(response.data.genders);
                    setDescription(response.data.description);
                    setRating(response.data.rating);
                    setReviews(response.data.reviews);
                    setCover(response.data.cover_adr);
                    setTop(response.data.top_adr);
                    
                }
        }
    }
        getCurrentGames();
    
      const genreArray = genders.split(',').map((genders) => genders.trim());

    return (
        <div>
            <Navbar />
            <div className="pesquisa__jogos-container">
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={top_adr} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>{name}</p>
                            
                            <div className="pesquisa__categoria-container">
                            {genreArray.map((genders, index) => (
                            <div key={index} className="pesquisa__categoria">
                                {genders}
                        </div>
                        ))}
                    </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={Valorant} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Valorant #138</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Tiro</div>
                                <div className="pesquisa__categoria">Tático</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={ForzaHorizon} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Forza Horizon #84</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Corrida</div>
                                <div className="pesquisa__categoria">Simulação</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={GOW} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>God of War #124</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Ação-aventura</div>
                                <div className="pesquisa__categoria">Jogador Solo</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={TLOS} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>The Last of Us #22</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Aventura</div>
                                <div className="pesquisa__categoria">Tiro</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={RedDead} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Red Dead Redemption 2 #10</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Aventura</div>
                                <div className="pesquisa__categoria">Tiro</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={TheDivision} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Tom Clancy's - The Division 2 #33</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Aventura</div>
                                <div className="pesquisa__categoria">Tática</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={GhostWire} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Ghostwire Tokyo #97</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Ação-aventura</div>
                                <div className="pesquisa__categoria">Jogador Solo</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <PostButton />
        </div>
    )
}

export default Pesquisa