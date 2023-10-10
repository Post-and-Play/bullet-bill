import './Indicar.css'

import { useNavigate } from 'react-router-dom';

import Navbar from './components/navbar';

import React, { useState } from 'react';

const Indicar = () => {

    const navigate = useNavigate();

    const [nomeInput, setNomeInput] = useState('');
    const [nomeEmpresaInput, setNomeEmpresaInput] = useState('');
    const [descricaoInput, setDescricaoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleBackClick = (e) => {
        window.history.go(-1);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSendClick = (e) => {
        if (nomeInput.trim() === '' || nomeEmpresaInput.trim() === '' || descricaoInput.trim() === '' || categoriaInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else if (!isChecked) {
            //dsadsa
        } else {
            e.preventDefault();
            navigate('/jogo');
        }
    };

    return (
        <div>
            <Navbar />
            <form action='/jogo'>
                <div className="indicar__card-container">
                    <div className="indicar__card">
                        <div className="indicar__row">
                            <label htmlFor="nome" className='indicar__label'>Nome:</label>
                            <input type="text" name="nome" id="nome" className='indicar__input' placeholder='Minecraft' value={nomeInput} required onChange={(e) => handleInputChange(e, setNomeInput)} />
                        </div>
                        <div className="indicar__row">
                            <label htmlFor="nomeEmpresa" className='indicar__label'>Empresa desenvolvedora:</label>
                            <input type="text" name="nome" id="nomeEmpresa" className='indicar__input' placeholder='Microsoft' value={nomeEmpresaInput} required onChange={(e) => handleInputChange(e, setNomeEmpresaInput)} />
                        </div>
                        <div className="indicar__row">
                            <label htmlFor="descricao" className='indicar__label'>Descrição:</label>
                            <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='indicar__textarea' placeholder='Descrição breve' rows={4} cols={50} required onChange={(e) => handleInputChange(e, setDescricaoInput)} />
                        </div>
                        <div className="indicar__row">
                            <label htmlFor="categoria" className='indicar__label'>Categoria(s):</label>
                            <input type="text" value={categoriaInput} name='categoria' id='descricao' className='indicar__input' placeholder='RPG, Terror, Ação' required onChange={(e) => handleInputChange(e, setCategoriaInput)} />
                        </div>
                        <div className="indicar__row">
                            <label htmlFor="categoria" className='indicar__label'>Marque essa opção se o jogo for gratuito</label>
                            <input type="checkbox" name='categoria' id='descricao' className='indicar__checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                        </div>
                        <div className="indicar__btn-container">
                            <button type="submit" className='indicar__btn-enviar' onClick={handleSendClick}>Enviar</button>
                            <button type="submit" className='indicar__btn-cancelar' onClick={handleBackClick}>Cancelar</button>
                        </div>
                    </div>

                </div>
            </form>

            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div>
    )
}

export default Indicar