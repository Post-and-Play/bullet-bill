import '../src/RecuperarSenha.css'

import Navbar from './components/navbar';

import Logo from '../src/image/PAP.png';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Modals } from './components/Modals';
import api from './services/Api';

const RecuperarSenha = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [emailInput, setEmailInput] = useState('');
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleButtonClick = async (e) => {

        if (emailInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else {

            loading.show()
            const response = await api.get(`/api/forgot?mail=${emailInput.trim()}`);
            if (response.status === 200) {
                console.log(response.data);

                if (root) {
                    modals.htmlDialog(
                        root,
                        'Siga as instruções que foram enviadas ao seu email!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                loading.close()
                                navigate("/");
                            }
                        });
                }

            } else {
                console.error(response);
            }
            loading.close()
        }
    };

    const handleVoltarClick = (e) => {
        navigate("/");
    }

    return (
        <div className="container-root">
            <Navbar hideSearchbar={true} />

            <form action="" className="formEmail">
                <div className="headerForm">
                    <h2>Recuperação da conta</h2>
                </div>
                
                <p>
                    Digite o seu endereço de email. Será enviado um link que te redirecionará para outra página, onde você irá redefinir sua senha
                </p>

                <label className='labelContainer' htmlFor="">
                    <p>Email</p>
                    <input className='emailInput' placeholder='Digite o seu email' type="email" value={emailInput} onChange={(e) => handleInputChange(e, setEmailInput)} />
                </label>

                <div className="btnContainer">
                    <button className='botao btnEnviar btnPrincipal' type="button" onClick={handleButtonClick}>Redefinir</button>
                    <button className='botao btnVoltar btnSecundario' type="button" onClick={handleVoltarClick}>Voltar</button>
                </div>
            </form>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div>
    )
}

export default RecuperarSenha