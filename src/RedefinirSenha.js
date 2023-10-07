import './RedefinirSenha.css'

import Navbar from './components/navbar';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RedefinirSenha = () => {
    const [senhaInput, setSenhaInput] = useState('');
    const [confirmSenhaInput, setConfirmSenhaInput] = useState('');
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [senhaIgualPopup, setSenhaIgualPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleButtonClick = (e) => {
        if (senhaInput.trim() === '' || confirmSenhaInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else if (senhaInput.trim() !== confirmSenhaInput) {
            e.preventDefault();
            setSenhaIgualPopup(true);
            setTimeout(() => {
                setSenhaIgualPopup(false);
            }, 3000);
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            <Navbar hideSearchbar={true} />
            <form action="" className="redefinirSenha">
                <label className='labelContainer'>
                    <p className='textoInput'>Senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha' type="password" value={senhaInput} onChange={(e) => handleInputChange(e, setSenhaInput)} />
                </label>
                <label className='labelContainer'>
                    <p className='textoInput'>Confirmação de senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha novamente' type="password" value={confirmSenhaInput} onChange={(e) => handleInputChange(e, setConfirmSenhaInput)} />
                </label>

                <div className="btnContainer">
                    <Link to="/recuperar-senha" className='botao btnSecundario btnVoltar' type="button">Voltar</Link>
                    <button className='botao btnPrincipal btnRedefinir' type="button" onClick={handleButtonClick}>Redefinir</button>
                </div>
            </form>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
            {senhaIgualPopup && <div className='cadastro__camposPopup'>As senhas devem ser iguais!</div>}
        </div>
    );
}

export default RedefinirSenha;