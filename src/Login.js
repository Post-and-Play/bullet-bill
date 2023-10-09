import '../src/Login.css'

import Navbar from './components/navbar';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { login } from './services/Auth';

const Login = () => {

    const [emailInput, setEmailInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [conectadoInput, setConectadoInput] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleButtonClick = (e) => {
        if (emailInput.trim() === '' || senhaInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else {
            e.preventDefault();
            login(emailInput, senhaInput, conectadoInput);            
        }
    };

    return (
        <div>
            <Navbar hideSearchbar={true} />
            <div className="login__container">
                <div className="login-page__container">
                    <div className="destaqueContainer">
                        <h1 className='destaque tituloDestaque'>Olá!</h1>
                        <h2 className='destaque subDestaque'>Bem-Vindo ao Post and Playing</h2>
                        <p className='destaque textoDestaque'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet malesuada velit. Mauris tempus lobortis tincidunt.
                            Mauris et lectus vitae tellus posuere vehicula ac id sem. Aenean ligula arcu, semper in fringilla nec, tempus a nibh. Morbi scelerisque
                            venenatis ligula id ullamcorper. Donec nisi nisi, viverra id vehicula malesuada, ornare eu sem. Phasellus tristique purus in dui sagittis rutrum.
                            In ac dictum odio. Mauris feugiat volutpat nisi, at tempus augue mollis eget. Nam bibendum purus sed justo venenatis tempor. Cras maximus, massa nec
                            blandit varius, nulla purus facilisis enim, vel maximus tellus nibh vel est.
                        </p>
                    </div>
                    <form className='login'>
                        <div className="login__container">
                            <label className='labelContainer'>
                                <p className='textoInput'>Email</p>
                                <input className='inputLogin' placeholder='Digite o seu email' type="email" value={emailInput} onChange={(e) => handleInputChange(e, setEmailInput)} />
                            </label>
                            <label className='labelContainer'>
                                <p className='textoInput'>Senha</p>
                                <input className='inputLogin' placeholder='Digite a sua senha' type="password" value={senhaInput} onChange={(e) => handleInputChange(e, setSenhaInput)} />
                            </label>
                            <div className="row">
                                <div>
                                    <input type="checkbox" name="" id="" onChange={(e) => handleInputChange(e, setConectadoInput)} />
                                    <p className='manterConectado'>Mantenha-me conectado</p>
                                </div>
                            </div>
                            <button to="/home" className='botao btnEntrar btnPrincipal' type="button" onClick={handleButtonClick}>Entrar</button>
                            <div className="esqueciSenha_Container">
                                <Link to="/recuperar-senha" className='esqueciSenha'>Esqueci a minha senha</Link>
                            </div>
                            <div className="row naoPossuiLogin">
                                <p>Não possui login?</p>
                            </div>
                            <Link to="/cadastro" className='botao btnCadastro btnSecundario' type="button">Cadastre-se</Link>
                        </div>
                    </form>
                </div>
            </div>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div>
    )
}

export default Login