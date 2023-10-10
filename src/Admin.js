import './Admin.css'

import React, { useState } from 'react';
import Navbar from './components/navbar';

const Admin = () => {
    // Defina um estado para rastrear a opção selecionada
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [nomeInput, setNomeInput] = useState('');
    const [nomeEmpresaInput, setNomeEmpresaInput] = useState('');
    const [descricaoInput, setDescricaoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeItem, setActiveItem] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeclineClick = (e) => {
        window.history.go(-1);
    };

    const handleApproveClick = (e) => {

    };

    const handleItemClick = (index) => {
        setActiveItem(index === activeItem ? null : index);
    };

    return (
        <div>
            <Navbar />
            <div className="admin__container">
                <div className="admin__content-container">
                    <div className="admin__menu-container">
                        <ul className="admin__menu">
                            <li
                                className={`admin__menu-option ${opcaoSelecionada === 'jogos-indicados' ? 'ativo' : ''}`}
                                onClick={() => setOpcaoSelecionada('jogos-indicados')}
                            >
                                <p className='admin__menu-option-text'>Jogos indicados</p>
                            </li>
                            {/* Adicione mais opções de menu aqui */}
                        </ul>
                    </div>

                    <div className="conteudo-relacionado">
                        {opcaoSelecionada === 'jogos-indicados' && (
                            // Renderizándo o conteúdo relacionado à opção 'Jogos indicados'
                            // GridView
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                        />
                                        <ul className="admin__gridView-cells">
                                            <li
                                                className={`admin__gridView-cell ${activeItem === 0 ? 'active' : ''
                                                    }`}
                                                onClick={() => handleItemClick(0)}
                                            >
                                                <p className="gridView-id">1</p>
                                                <p className="gridView-game">Fodase</p>
                                            </li>
                                            <li
                                                className={`admin__gridView-cell ${activeItem === 1 ? 'active' : ''
                                                    }`}
                                                onClick={() => handleItemClick(1)}
                                            >
                                                <p className="gridView-id">2</p>
                                                <p className="gridView-game">Outro jogo</p>
                                            </li>
                                            <li
                                                className={`admin__gridView-cell ${activeItem === 2 ? 'active' : ''
                                                    }`}
                                                onClick={() => handleItemClick(2)}
                                            >
                                                <p className="gridView-id">3</p>
                                                <p className="gridView-game">Mais um jogo</p>
                                            </li>
                                            <li
                                                className={`admin__gridView-cell ${activeItem === 3 ? 'active' : ''
                                                    }`}
                                                onClick={() => handleItemClick(3)}
                                            >
                                                <p className="gridView-id">4</p>
                                                <p className="gridView-game">Outro jogo</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="admin-indicar__card-container">
                                    <div className="admin-indicar__card">
                                        <div className="admin-indicar__row">
                                            <label htmlFor="nome" className='admin-indicar__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin-indicar__input' value={nomeInput} />
                                        </div>
                                        <div className="admin-indicar__row">
                                            <label htmlFor="nomeEmpresa" className='admin-indicar__label'>Empresa desenvolvedora:</label>
                                            <input type="text" name="nome" id="nomeEmpresa" className='admin-indicar__input' value={nomeEmpresaInput} />
                                        </div>
                                        <div className="admin-indicar__row">
                                            <label htmlFor="descricao" className='admin-indicar__label'>Descrição:</label>
                                            <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin-indicar__textarea' rows={4} cols={50} />
                                        </div>
                                        <div className="admin-indicar__row">
                                            <label htmlFor="categoria" className='admin-indicar__label'>Categoria(s):</label>
                                            <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin-indicar__input' />
                                        </div>
                                        <div className="admin-indicar__btn-container">
                                            <button type="submit" className='indicar__btn-aprovar' onClick={handleApproveClick}>Aprovar</button>
                                            <button type="submit" className='indicar__btn-reprovar' onClick={handleDeclineClick}>Reprovar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Adicione mais blocos de conteúdo relacionado para outras opções de menu aqui */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
