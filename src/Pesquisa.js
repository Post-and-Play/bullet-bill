import './Pesquisa.css'

import Navbar from './components/navbar'
import PostButton from './components/postButton'

import LolFoto from './image/lol-perfil.png'
import Valorant from './image/valorant.png'

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
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={Valorant} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="pesquisa__jogo">
                    <a href="" className='pesquisa__jogo-link'>
                        <img src={LolFoto} alt="Foto jogo" className='pesquisa__jogo-foto' />
                        <div className="`pesquisa__jogo-info-container`">
                            <p className='pesquisa__jogo-titulo'>Uno #50</p>
                            <div className="pesquisa__categoria-container">
                                <div className="pesquisa__categoria">Party</div>
                                <div className="pesquisa__categoria">Estratégia</div>
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