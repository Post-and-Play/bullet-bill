<<<<<<< HEAD


import '../src/Login.css';
import Navbar from './components/navbar';
import Ilustration from './image/ilustration.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login, getAuth, CONECT_KEY } from './services/Auth';

const Login = () => {

    const animationClass = 'animate';

=======
import '../src/Login.css'

import Navbar from './components/navbar';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { login } from './services/Auth';

const Login = () => {

>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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

<<<<<<< HEAD
    const animateStickers = () => {

        setTimeout(() => {
            const target = document.querySelectorAll('[data-anime]');
            if (target) {
                target.forEach(element => {

                    let time = element.getAttribute('data-time');
                    if (time) {
                        switch (time) {
                            case '1':
                                {
                                    element.classList.add(animationClass + '1');
                                    break;
                                }
                            case '2':
                                {
                                    element.classList.add(animationClass + '2');
                                    break;
                                }
                            default:
                                {
                                    element.classList.add(animationClass);
                                    break;
                                }
                        }
                    }
                    else {
                        element.classList.add(animationClass);
                    }

                });

            }
        }, 100);

    }

    useEffect(() => {
        const fetchData = async () => {
            if (await getAuth()) {
                navigate('/home');
            }
            else {
                const con = localStorage.getItem(CONECT_KEY);
                const checkbox_con = document.getElementById('checkbox_con');
                if (checkbox_con) {
                    checkbox_con.checked = con === 'on' ? true : false;
                }
            }
        }
        fetchData();
        animateStickers();
    }, [navigate])

=======
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
    return (
        <div>
            <Navbar hideSearchbar={true} />
            <div className="login__container">
                <div className="login-page__container">
                    <div className="destaqueContainer">
<<<<<<< HEAD
                      
                        <h1 className='destaque tituloDestaque'>Olá!</h1>
                        <h3 className='destaque subDestaque'>Bem-Vindo ao Post and Playing</h3>
                        <p className='destaque textoDestaque'>
                            O PAP é uma rede social que conecta pessoas que gostam de games, promovendo a interação e compartilhamento de informações sobre jogos e recompensando os perfis mais engajados e bem avaliados.
                        </p>
                        <p className='destaque textoDestaque'>
                            Junte-se a nós!
                        </p>    
                        <div className="destaque_ilustration" >
                            <div className="destaque_ilustration_image" data-anime="left" data-time="2">
                                <img src={Ilustration} alt="PAP" />
                            </div>
                        </div>
=======
                        <h1 className='destaque tituloDestaque'>Olá!</h1>
                        <h2 className='destaque subDestaque'>Bem-Vindo ao Post and Playing</h2>
                        <p className='destaque textoDestaque'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet malesuada velit. Mauris tempus lobortis tincidunt.
                            Mauris et lectus vitae tellus posuere vehicula ac id sem. Aenean ligula arcu, semper in fringilla nec, tempus a nibh. Morbi scelerisque
                            venenatis ligula id ullamcorper. Donec nisi nisi, viverra id vehicula malesuada, ornare eu sem. Phasellus tristique purus in dui sagittis rutrum.
                            In ac dictum odio. Mauris feugiat volutpat nisi, at tempus augue mollis eget. Nam bibendum purus sed justo venenatis tempor. Cras maximus, massa nec
                            blandit varius, nulla purus facilisis enim, vel maximus tellus nibh vel est.
                        </p>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
                                    {/*<input type="checkbox" name="" id="checkbox_con" onChange={(e) => handleInputChange(e, setConectadoInput)} />*/}
                                    {/*<p className='manterConectado'>Mantenha-me conectado</p>*/}
                                    <label className="container-check" >
                                        <input id="checkbox_con" type="checkbox" onChange={(e) => handleInputChange(e, setConectadoInput)} />
                                        <span className="checkmark"></span> Mantenha-me conectado
                                    </label> 
=======
                                    <input type="checkbox" name="" id="" onChange={(e) => handleInputChange(e, setConectadoInput)} />
                                    <p className='manterConectado'>Mantenha-me conectado</p>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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