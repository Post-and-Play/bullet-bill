import './Indicar.css';

import { useNavigate } from 'react-router-dom';

import Navbar from './components/navbar';

import React, { useState, useEffect, useRef } from 'react';
import { Modals } from './components/Modals';
import { getAuth } from './services/Auth';
import api from './services/Api';

import { Icon } from '@iconify/react';

const Indicar = () => {

    const [currentUser, setCurrentUser] = useState();
    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const navigate = useNavigate();

    const [nomeInput, setNomeInput] = useState('');
    const [nomeEmpresaInput, setNomeEmpresaInput] = useState('');
    const [descricaoInput, setDescricaoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);

    const indicarPerfilInputRef = useRef(null);
    const [isProfileImageVisible, setProfileImageVisible] = useState(false);

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
        } else {
            navigate('/');
        }
    }

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleBackClick = (e) => {
        window.history.go(-1);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            loading.close();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    const handleSendClick = (e) => {
        if (nomeInput.trim() === '' || nomeEmpresaInput.trim() === '' || descricaoInput.trim() === '' || categoriaInput.trim() === '' || selectedProfileImage === '' || selectedBannerImage === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else {
            e.preventDefault();
            handlePost();
        }
    };

    const handlePost = async () => {
        const postData = {
            name: nomeInput,
            user_id: currentUser.id,
            genders: categoriaInput,
            description: descricaoInput,
            creator: nomeEmpresaInput,
            is_free: isChecked ? true : false,
            approved: false,
            top_adr: selectedProfileImage,
            cover_adr: selectedBannerImage
        }

        try {
            loading.show();
            // Enviar os dados para a API
            const response = await api.post(`/api/recommendeds`, postData);
            if (response.data.id) {
                // Postagem bem-sucedida
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Indicação realizada com sucesso!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                navigate('/home');
                            }
                        });
                }
            } else {
                // Lidar com erros de postagem
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Ocorreu um erro ao indicar. Tente novamente mais tarde.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }
            }
            loading.close();
        } catch (err) {
            console.error('Erro ao indicar:', err);
        }
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0]; // Obtenha o arquivo selecionado

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Quando a leitura estiver concluída, o resultado será armazenado em event.target.result
                const base64String = reader.result;
                setSelectedProfileImage(base64String); // Define a imagem de perfil no estado
            };

            reader.readAsDataURL(file); // Inicie a leitura do arquivo como base64
        }
    };


    const handleBannerImageChange = (e) => {
        const file = e.target.files[0]; // Obtenha o arquivo selecionado

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Quando a leitura estiver concluída, o resultado será armazenado em event.target.result
                const base64String = reader.result;
                setSelectedBannerImage(base64String); // Define a imagem de capa no estado
            };

            reader.readAsDataURL(file); // Inicie a leitura do arquivo como base64
        }
    };

    const handleClearImage = (setImage) => {
        setImage(null);
    };


    return (
        <div>
            <Navbar currentUser={currentUser} />
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
                            <label className="container-check indicar__label" >
                                <input id="checkbox_con" type="checkbox" onChange={handleCheckboxChange} />
                                <span className="checkmark"></span> Marque essa opção se o jogo for gratuito
                            </label>
                        </div>
                        <div className='indicar__row-imgs'>
                            <div className="indicar__profileImageContainer">
                                <p className="indicar__profileImageText">Foto de perfil</p>
                                <div className="indicar__profileImageWrap">
                                    {selectedProfileImage && (
                                        <div className="image-preview image-preview__perfil">
                                            <img src={selectedProfileImage} alt="Imagem de perfil" onClick={() => handleClearImage(setSelectedProfileImage)} />
                                            <label className="overlay" onClick={() => handleClearImage(setSelectedProfileImage)}>
                                                <Icon icon="ph:pencil" />
                                            </label>
                                        </div>
                                    )}
                                    {!selectedProfileImage && (
                                        <label htmlFor="indicar__perfil" className="file-input-label">
                                            <Icon icon="ph:pencil" />
                                            <input
                                                type="file"
                                                name="indicar__perfil"
                                                id="indicar__perfil"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleProfileImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="indicar__bannerImageContainer">
                                <p className="indicar__bannerImageText">Foto de capa</p>
                                <div className="indicar__bannerImageWrap">
                                    {selectedBannerImage && (
                                        <div className="image-preview image-preview__banner">
                                            <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                            <label className="overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                <Icon icon="ph:pencil" />
                                            </label>
                                        </div>
                                    )}
                                    {!selectedBannerImage && (
                                        <label htmlFor="indicar__baner" className="file-input-label">
                                            <Icon icon="ph:pencil" />
                                            <input
                                                type="file"
                                                name="indicar__baner"
                                                id="indicar__baner"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleBannerImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="indicar__btn-container">
                            <button type="submit" className='botao indicar__btn-enviar' onClick={handleSendClick}>Enviar</button>
                            <button type="submit" className='botao indicar__btn-cancelar' onClick={handleBackClick}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </form>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div>
    )
}

export default Indicar
