import '../src/RecuperarSenha.css'

import Navbar from './components/navbar';

import Logo from '../src/image/PAP.png';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RecuperarSenha = () => {
    const [emailInput, setEmailInput] = useState('');
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleButtonClick = (e) => {
        if (emailInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else {
            navigate('/redefinir-senha');
        }
    };

    return (
        <div>
            <Navbar hideSearchbar={true} />

            <form action="" className="formEmail">
                <p>
                    Digite o seu endereço de email. Será enviado um link que te redirecionará para outra página, onde você irá redefinir sua senha
                </p>

                <label className='labelContainer' htmlFor="">
                    <p>Email</p>
                    <input className='emailInput' placeholder='Digite o seu email' type="email" value={emailInput} onChange={(e) => handleInputChange(e, setEmailInput)} />
                </label>

                <div className="btnContainer">
                    <Link to="/" className='botao btnVoltar btnSecundario' type="button">Voltar</Link>
                    <button to="/redefinir-senha" className='botao btnEnviar btnPrincipal' type="button" onClick={handleButtonClick}>Redefinir</button>
                </div>
            </form>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div>
    )
}

export default RecuperarSenha