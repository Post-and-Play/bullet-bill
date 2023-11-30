import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';
import api from '../services/Api';
import FotoPerfil from '../image/foto.png'
import { logout } from '../services/Auth';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Modals } from './Modals';

const ProfileMenu = ({ currentUser }) => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [menuVisible, setMenuVisible] = useState(false);

    const [profileImage, setProfileImage] = useState(null);
    const [alterarDados, setAlterarDados] = useState(false);
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [nomeAdminInput, setNomeAdminInput] = useState('');
    const [emailAdminInput, setEmailAdminInput] = useState('');

    const [senhaAdminInput, setSenhaAdminInput] = useState('');
    const [senhaAdminInput2, setSenhaAdminInput2] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);


    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleImageError = (event) => {
        event.target.src = FotoPerfil;
    }


    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedProfileImage(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = (setImage) => {
        setImage(null);
    };

    const handleAlterarDadosClick = async (e) => {
        setNomeAdminInput(currentUser.name)
        setEmailAdminInput(currentUser.mail)
        setSelectedProfileImage(currentUser.photo_adr)
        setAlterarDados(true)
    }

    const handleAlterarSenhaClick = async (e) => {
        setAlterarSenha(true)
    }

    const handleCancelClick = async (e) => {
        if (alterarDados) {
            setAlterarDados(!alterarDados);
        }
        if (alterarSenha) {
            setAlterarSenha(!alterarSenha)
        }
    }

    const handleUpdateAdmin = async () => {
        if (currentUser) {
            try {

                if (alterarDados) {

                    const updateData = {
                        name: nomeAdminInput,
                        mail: emailAdminInput,
                        photo_adr: selectedProfileImage,
                    };

                    loading.show();
                    const response = await api.patch(`/api/admins?id=${currentUser.id}`, updateData);

                    if (response.status === 200) {
                        console.log("Dados do administrador alterados com sucesso!");

                        if (root) {
                            modals.htmlDialog(
                                root,
                                'Dados do administrador alterados com sucesso!',
                                modals.msgboxButtons.okOnly,
                                modals.msgboxIcons.check,
                                'Mensagem!',
                                {
                                    ok: () => { }
                                });
                        }

                    } else {
                        console.error('Erro ao alterar administrador:', response.data.error);
                    }
                    loading.close();
                    setAlterarDados(false)

                } else {

                    if (alterarSenha) {

                        if (String(senhaAdminInput).trim() !== String(senhaAdminInput2).trim()) {
                            if (root) {
                                modals.htmlDialog(
                                    root,
                                    'Senhas não conferem!',
                                    modals.msgboxButtons.okOnly,
                                    modals.msgboxIcons.warning,
                                    'Mensagem!',
                                    {
                                        ok: () => { }
                                    });
                            }
                            return;
                        }

                        const updateData = {
                            password: senhaAdminInput
                        };

                        loading.show();
                        const response = window.location.pathname.includes('/admin') ? await api.put(`/api/admins?id=${currentUser.id}`, updateData) : await api.put(`/api/users?id=${currentUser.id}`, updateData)

                        if (response.status === 200) {
                            console.log("Dados alterados com sucesso!");

                            if (root) {
                                modals.htmlDialog(
                                    root,
                                    'Dados alterados com sucesso!',
                                    modals.msgboxButtons.okOnly,
                                    modals.msgboxIcons.check,
                                    'Mensagem!',
                                    {
                                        ok: () => { }
                                    });
                            }

                        } else {
                            console.error('Erro ao alterar dados:', response.data.error);
                        }
                        loading.close();
                        setAlterarSenha(false)
                    }

                }

               
            } catch (error) {
                setAlterarDados(false)
                setAlterarSenha(false)
                console.error('Erro ao atualizar as informações:', error);
                loading.close();
            }
            
        }
    };


    useEffect(() => {
        if (currentUser)
            setProfileImage(currentUser.photo_adr);
    }, [currentUser]);

    //window.addEventListener('click', () => { if (menuVisible === true ) setMenuVisible(false) })
  
    return (
        <div className="navbar-profileicon">
            {!window.location.pathname.includes('/admin') ?
                <a href="favoritos">
                    <Icon icon="ri:heart-line" color="#b0afe6" width="45" height="45" hFlip={true} />
                </a> : <br />
            }
        
          <img
                src={profileImage}
                alt="Foto de Perfil"
                className="profile__picture"
                onClick={toggleMenu}
                onError={handleImageError}
          />
          {/*<Link to="/admin/perfil" className="menu__link">Ver Perfil</Link> : */}
          {menuVisible && (
            <ul className="profile__menu">
                <li>
                    {window.location.pathname.includes('/admin') ?
                    <p onClick={handleAlterarDadosClick}>Meus dados</p> :
                    <Link to="/perfil" className="menu__link">Ver Perfil</Link>
                    }
                </li>
                <li>
                    <p onClick={handleAlterarSenhaClick}>Alterar senha</p>
                </li>
                {!window.location.pathname.includes('/admin') ?
                    <li>
                        <Link to="/indicar-jogo" className="menu__link">Indicar um jogo</Link>
                    </li> : <></>
                }
                
                <li onClick={() => {
                    logout();
                    if (window.location.pathname.includes('/admin')) {
                        window.location.assign('/admin');
                    }
                    else {
                        window.location.assign('/');
                    }
                }}>
                <p >Sair</p>
              </li>
            </ul>
            )}

            {alterarDados && (
                <div className="admin-card__container ">
                    <div className="admin__card">
                        <h1>Dados do administrador</h1>
                        <div className='admin__row-imgs'>
                            <div className="admin__profileImageContainer">
                                <p className="admin__profileImageText">Foto de perfil</p>
                                <div className="admin__profileImageWrap">
                                    {selectedProfileImage && (
                                        <div className="admin__image-preview admin__image-preview__perfil">
                                            <img src={selectedProfileImage} alt="Imagem de perfil" onClick={() => handleClearImage(setSelectedProfileImage)} />
                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedProfileImage)}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </label>
                                        </div>
                                    )}
                                    {!selectedProfileImage && (
                                        <label htmlFor="indicar__perfil" className="admin__file-input-label">
                                            <FontAwesomeIcon icon={faPencil} />
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

                        </div>
                        <div className="admin__row">
                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeAdminInput} onChange={(e) => handleInputChange(e, setNomeAdminInput)}
                            />
                        </div>
                        <div className="admin__row">
                            <label htmlFor="descricao" className='admin__label'>Email:</label>
                            <input type="text" name="email" id="email" className='admin__input' value={emailAdminInput} onChange={(e) => handleInputChange(e, setEmailAdminInput)}
                            />
                        </div>

                        <div className="admin__btn-container">
                            <button className='indicar__btn-aprovar' onClick={handleUpdateAdmin} style={{ cursor: 'pointer'  }}>Confirmar</button>
                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} style={{ cursor:  'pointer' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {alterarSenha && (
                <div className="admin-card__container ">
                    <div className="admin__card">
                        <h1>Alterar senha</h1>
                        <div className="admin__row">
                            <label htmlFor="password" className='admin__label'>Senha:</label>
                            <input type="password" name="password" id="password" className='admin__input' value={senhaAdminInput} onChange={(e) => handleInputChange(e, setSenhaAdminInput)}
                            />
                        </div>
                        <div className="admin__row">
                            <label htmlFor="password" className='admin__label'>Repita a senha:</label>
                            <input type="password" name="password2" id="password2" className='admin__input' value={senhaAdminInput2} onChange={(e) => handleInputChange(e, setSenhaAdminInput2)}
                            />
                        </div>
                        <div className="admin__btn-container">
                            <button className='indicar__btn-aprovar' onClick={handleUpdateAdmin} style={{ cursor: 'pointer' }}>Confirmar</button>
                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} style={{ cursor: 'pointer' }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
  );
};

export default ProfileMenu;