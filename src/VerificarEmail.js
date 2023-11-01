import './RedefinirSenha.css'

import Navbar from './components/navbar';
import api from './services/Api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown } from '@fortawesome/free-solid-svg-icons';
import { Modals } from './components/Modals';

const VerificarEmail = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const securityKey = params.get('key');

    const [verifyOk, setVerifyOk] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                loading.show();
                const response = await api.get(`/api/verify?key=${securityKey}`);
                if (response.status === 200) {
                    setVerifyOk(true);
                } 
                loading.close()
            } catch (error) {
                loading.close()
                console.error(error)
            }   
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar hideSearchbar={true} hideProfileIcon={true} />
            <div className="verifyEmail">
                {
                    verifyOk ?
                        <div className="verifyEmail-inner">
                            <FontAwesomeIcon icon={faSmile} style={{ fontSize: '140px', color: '#cbe57c', margin: '20px 0px' }} />
                            <h1>Parabéns!</h1>
                            <h3>Seu e-mail foi confirmado com sucesso.</h3>
                            <Link to="/" className='botao btnIrLogin btnSecundario' type="button">Ir para login</Link>
                        </div> :
                        <div className="verifyEmail-inner">
                            <FontAwesomeIcon icon={faFrown} style={{ fontSize: '160px', color: '#ffc663', margin: '20px 0px' }} />
                            <h1>Ops!</h1>
                            <h3>Houve algum problema ao tentar confirmar seu e-mail.</h3>
                            <Link to="/" className='botao btnIrLogin btnSecundario' type="button">Ir para login</Link>
                        </div>
                }
              
            </div>
        </div>
    );
}

export default VerificarEmail;