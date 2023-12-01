

import '../src/Login.css';
import Navbar from './components/navbar';
import Ilustration from './image/ilustration.png';
import { Icon } from '@iconify/react';
import arrowLeft from '@iconify-icons/ic/arrow-back';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login, getAuth, CONECT_KEY, recaptchaSiteKey, verifyRecaptcha } from './services/Auth';
import ReCAPTCHA from "react-google-recaptcha";

const AdminLogin = () => {

    const animationClass = 'animate';

    const [emailInput, setEmailInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [conectadoInput, setConectadoInput] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [desafioRecaptcha, setDesafioRecaptcha] = useState(false);
    const [captcha, setCaptcha] = useState();
    const [ipAddress, setIPAddress] = useState('');

    const navigate = useNavigate();

    //console.log(ipAddress);

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleCheck = (event) => {
        setConectadoInput(!conectadoInput);
        localStorage.setItem(CONECT_KEY, !conectadoInput);
    }

    const handleButtonClick = (e) => {
        if (emailInput.trim() === '' || senhaInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else if (!captcha) {
            e.preventDefault()
            setDesafioRecaptcha(true);
            setTimeout(() => {
                setDesafioRecaptcha(false);
            }, 3000);
        } else {
            e.preventDefault();
            login(emailInput, senhaInput, conectadoInput);            
        }
    };

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

    const handleCaptcha = async (value) => { 
        const verify = await verifyRecaptcha(value, ipAddress);
        if (verify) {
            setCaptcha(value);
        }
        //console.log("Captcha value:", value);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (await getAuth()) {
                navigate('/admin/dashboard');
            }
            else {
                const con = await localStorage.getItem(CONECT_KEY);
                if (con === 'true') {
                    setConectadoInput(true)
                } 
            }
        }
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch(error => console.log(error))
        fetchData();
        animateStickers();
    }, [])

    return (
        <div className="container-root">
            <Navbar hideProfileIcon={true} hideSearchbar={true} />
            <div className="login__container">
                <div className="login-page__container">
                    <div className="destaqueContainer">
                      
                        <h1 className='destaque tituloDestaque'>Olá!</h1>
                        <h2 className='destaque subDestaque'>Bem-Vindo ao Post and Playing</h2>
                        <p className='destaque textoDestaque'>
                            Essa é uma area de acesso administrativo.
                        </p> 
                        <div className="destaque_ilustration" >
                            <div className="destaque_ilustration_image" data-anime="left" data-time="2">
                                <img src={Ilustration} alt="PAP" />
                            </div>
                        </div>
                    </div>
                    <form className='login-admin'>
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
                                    <label className="container-check" >
                                        <input id="checkbox_con" type="checkbox" onClick={handleCheck} checked={conectadoInput} onChange={handleCheck} />
                                        <span className="checkmark"></span>Mantenha-me conectado
                                    </label> 
                                </div>
                            </div>

                            <div className="row container-recaptcha" >
                                <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={handleCaptcha} />
                            </div>

                            <button to="/home" className='botao btnEntrar btnPrincipal' type="button" onClick={handleButtonClick}>Entrar</button>
                            <div className="esqueciSenha_Container">
                                <Link to="/recuperar-senha" className='esqueciSenha'>Esqueci a senha</Link>
                                <Link to="/" className='voltarLogin'><Icon icon={arrowLeft} /> Login de usuário</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
            {desafioRecaptcha && <div className='cadastro__camposPopup'>Por favor, resolva o desafio recaptcha.</div>}
        </div>
    )
}

export default AdminLogin