import './RedefinirSenha.css'

import Navbar from './components/navbar';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Modals } from './components/Modals';
import api from './services/Api';

const RedefinirSenha = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const securityKey = params.get('key');

    const [userId, setUserId] = useState();
    const [senhaInput, setSenhaInput] = useState('');
    const [confirmSenhaInput, setConfirmSenhaInput] = useState('');
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [senhaIgualPopup, setSenhaIgualPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleButtonClick = async (e) => {
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
            try
            {
                loading.show();
                const response = await api.post(`/api/recover?id=${userId}`, {
                    password: senhaInput.trim(),
                    security_key: securityKey
                });

                if (response.status === 200) {
                    if (root) {
                        modals.htmlDialog(
                            root,
                            'Senha redefinida com sucesso!',
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
                    if (root) {
                        modals.htmlDialog(
                            root,
                            'Não foi possível redefinir senha!\nSolicite novamente.',
                            modals.msgboxButtons.okOnly,
                            modals.msgboxIcons.warning,
                            'Mensagem!',
                            {
                                ok: (evt) => {
                                    loading.close()
                                    navigate("/");
                                }
                            });
                    }
                }
                loading.close()
            } catch (error) {
                loading.close()
                console.error(error)
            }   
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                loading.show();
                const response = await api.get(`/api/recover?key=${securityKey}`);
                if (response.status === 200) {
                    setUserId(response.data.id);
                } else {
                    if (root) {
                        modals.htmlDialog(
                            root,
                            'Não foi possível obter os dados de recuperação de senha!\nSolicite novamente.',
                            modals.msgboxButtons.okOnly,
                            modals.msgboxIcons.warning,
                            'Mensagem!',
                            {
                                ok: (evt) => {
                                    loading.close()
                                    navigate("/");
                                }
                            });
                    }
                }
                loading.close()
            } catch (error) {
                loading.close()
                console.error(error)
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Não foi possível obter os dados de recuperação de senha!\nSolicite novamente.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                loading.close()
                                navigate("/");
                            }
                        });
                }
            }   
        }
        fetchData();
    }, []);

    return (
        <div className="container-root">
            <Navbar hideSearchbar={true} hideProfileIcon={true} />
            <form action="" className="redefinirSenha">
                <div className="headerForm">
                    <h2>Redefinir a senha da conta</h2>
                </div>
                <label className='labelContainer'>
                    <p className='textoInput'>Senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha' type="password" value={senhaInput} onChange={(e) => handleInputChange(e, setSenhaInput)} />
                </label>
                <label className='labelContainer'>
                    <p className='textoInput'>Confirmação de senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha novamente' type="password" value={confirmSenhaInput} onChange={(e) => handleInputChange(e, setConfirmSenhaInput)} />
                </label>

                <div className="btnContainer">
                    <button className='botao btnPrincipal btnRedefinir' type="button" onClick={handleButtonClick}>Redefinir</button>
                </div>
            </form>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
            {senhaIgualPopup && <div className='cadastro__camposPopup'>As senhas devem ser iguais!</div>}
        </div>
    );
}

export default RedefinirSenha;