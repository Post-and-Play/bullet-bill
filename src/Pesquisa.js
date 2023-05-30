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

import React from 'react'

const Pesquisa = () => {
    return (
        <div>
            <Navbar />
            <div className="pesquisa__jogos-container">
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>League of Legends #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">MOBA</div>
                                <div className="pesquisa__categoria">Multijogador</div>
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