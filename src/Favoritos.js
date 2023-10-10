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
        </div>

    )
}

export default Favoritos