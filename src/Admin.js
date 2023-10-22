import './Admin.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import api from './services/Api';
import { getAuth } from './services/Auth';
import { Modals } from './components/Modals';
import { Icon } from '@iconify/react';

const Admin = () => {
    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [currentUser, setCurrentUser] = useState();
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [nomeInput, setNomeInput] = useState('');
    const [nickNameInput, setNickNameInput] = useState('');
    const [nomeEmpresaInput, setNomeEmpresaInput] = useState('');
    const [descricaoInput, setDescricaoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [jogos, setJogos] = useState([]);
    const [filteredJogos, setFilteredJogos] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState({});
    const [isFree, setIsFree] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const navigate = useNavigate();

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
        } else {
            navigate('/admin');
        }
    }

    const handleSearchAdminChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterAdmins(value);
    };

    const handleSearchUsersChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterAllUsers(value);
    };

    const handleSearchGamesChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterJogos(value);
    };

    const handleSearchRecommendGamesChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterJogosRecomendados(value);
    };

    const handleDeclineClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();
                await api.delete(`/api/recommendeds?id=${activeItem}`);

                limparCampos()

                await filterJogosRecomendados('');
                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }
        }
    };

    const handleApproveClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();

                const activeGame = jogos.find((jogo) => jogo.id === activeItem);

                if (activeGame && activeGame.user_id) {
                    const approvedData = {
                        id: activeGame.id,
                        user_id: activeGame.user_id,
                        name: nomeInput,
                        genders: categoriaInput,
                        description: descricaoInput,
                        creator: nomeEmpresaInput,
                        is_free: isFree,
                        approved: true,
                        top_adr: selectedProfileImage,
                        cover_adr: selectedBannerImage
                    };

                    await api.delete(`/api/recommendeds?id=${activeItem}`);

                    const newGameData = {
                        name: nomeInput,
                        genders: categoriaInput,
                        description: descricaoInput,
                        cover_adr: selectedBannerImage,
                        top_adr: selectedBannerImage,
                        rating: 0,
                        reviews: 0,
                    };

                    await api.post('/api/games', newGameData);

                    limparCampos();

                    await filterJogosRecomendados('');
                    loading.close();
                }
            } catch (error) {
                console.error('Erro ao aprovar o jogo indicado:', error);
                loading.close();
            }
        }
    };

    const handleDeleteClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();
                await api.delete(`/api/users?id=${activeItem}`);

                await filterAllUsers('');

                limparCampos()
                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }
        }
    };

    const handleCancelClick = async (e) => {
        limparCampos();
    }

    const handleOpcaoSelecionada = async (opcao) => {
        setOpcaoSelecionada(opcao);
        limparCampos()
        if (opcao === 'jogos-indicados') {
            await filterJogosRecomendados(searchTerm);
        }
        if (opcao === 'editar-jogo') {
            await filterJogos(searchTerm);
        }
        if (opcao === 'deletar-jogo') {
            await filterJogos(searchTerm);
        }
        if (opcao === 'add-adm') {
            await filterUsers(searchTerm);
        }
        if (opcao === 'editar-adm') {
            await filterAdmins(searchTerm);
        }
        if (opcao === 'deletar-user') {
            await filterAllUsers(searchTerm);
        }
    };

    const filterJogosRecomendados = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get(`/api/recommendeds/search`);

                const filteredData = response.data.filter((jogo) => regex.test(jogo.name));
                setJogos(filteredData);
            } else {
                response = await api.get('/api/recommendeds/search');

                const filteredData = response.data;
                setJogos(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar jogos indicados:', error);
        }
    };

    const filterJogos = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get('/api/games/search');

                const filteredData = response.data.filter((jogo) => regex.test(jogo.name));
                setJogos(filteredData);
            } else {
                response = await api.get('/api/games/search');

                const filteredData = response.data;
                setJogos(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar jogos indicados:', error);
        }
    };

    const filterUsers = async () => {
        try {
            if (searchTerm) {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                const usersResponse = await api.get(`/api/users/list`);
                const adminsResponse = await api.get(`/api/admins/list`);

                if (usersResponse.data && adminsResponse.data) {
                    const adminEmails = new Set(adminsResponse.data.map(admin => admin.mail));

                    const filteredUsers = usersResponse.data.filter(user => {
                        return !adminEmails.has(user.mail) && regex.test(user.name);
                    });

                    setUsers(filteredUsers);
                } else {
                    setUsers([]);
                }
            } else {
                const usersResponse = await api.get(`/api/users/list`);
                const adminsResponse = await api.get(`/api/admins/list`);

                if (usersResponse.data && adminsResponse.data) {
                    const adminEmails = new Set(adminsResponse.data.map(admin => admin.mail));

                    const filteredUsers = usersResponse.data.filter(user => {
                        return !adminEmails.has(user.mail);
                    });

                    setUsers(filteredUsers);
                } else {
                    setUsers([]);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const filterAllUsers = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get(`/api/users/list`);

                const filteredData = response.data.filter((user) => regex.test(user.name));
                setUsers(filteredData);
            } else {
                response = await api.get('/api/users/list');

                const filteredData = response.data;
                setUsers(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar jogos indicados:', error);
        }
    };

    const filterAdmins = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get(`/api/admins/list`);

                const filteredData = response.data.filter((admin) => regex.test(admin.name));
                setAdmins(filteredData);
            } else {
                response = await api.get('/api/admins/list');

                const filteredData = response.data;
                setAdmins(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar admins:', error);
        }
    };

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleJogoClick = (jogo) => {
        setActiveItem(jogo.id);
        setNomeInput(jogo.name);
        setNomeEmpresaInput(jogo.creator);
        setDescricaoInput(jogo.description);
        setCategoriaInput(jogo.genders);
        setIsFree(jogo.is_free);
        setSelectedProfileImage(jogo.top_adr);
        setSelectedBannerImage(jogo.cover_adr);
    };

    const handleUserClick = async (user) => {
        setActiveItem(user.id);
        setNomeInput(user.name);
        setNickNameInput(user.user_name);

        try {
            loading.show();

            const responseUser = await api.get(`/api/users?email=${user.mail}`);

            const responseAdmin = await api.get(`/api/admins?email=${user.mail}`);

            console.log("responseUser: ", responseUser);
            console.log("responseAdmin: ", responseAdmin);

            const isUser = responseUser.data.length > 0;
            const isAdmin = responseAdmin.data.length > 0;

            setIsAdmin(isUser && isAdmin);

            loading.close();
        } catch (error) {
            console.error('Erro ao verificar o email:', error);
            loading.close();
        }
    };

    const handleAdminClick = (admin) => {
        setActiveItem(admin.id);
        setNomeInput(admin.name);
        setNickNameInput(admin.name);
    };

    const limparCampos = () => {
        setActiveItem(null);
        setNomeInput('');
        setNomeEmpresaInput('');
        setDescricaoInput('');
        setCategoriaInput('');
        setNickNameInput('');
        setIsChecked(false);
        setSelectedBannerImage('');
        setSelectedProfileImage('');
        setSearchTerm('');
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


    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedBannerImage(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = (setImage) => {
        setImage(null);
    };

    const handleSendClick = (e) => {
        if (nomeInput.trim() === '' || descricaoInput.trim() === '' || categoriaInput.trim() === '' || selectedProfileImage === '' || selectedBannerImage === '') {
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

    const handleBackClick = (e) => {
        limparCampos()
    };

    const handlePost = async () => {
        const postData = {
            name: nomeInput,
            genders: categoriaInput,
            description: descricaoInput,
            cover_adr: selectedBannerImage,
            top_adr: selectedProfileImage,
            rating: 0,
            reviews: 0
        }

        try {
            loading.show();
            const response = await api.post(`/api/games`, postData);
            if (response.data.id) {
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Jogo criado com sucesso!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                window.location.reload();
                            }
                        });
                }
            } else {
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

    const handleDeleteGameClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();
                await api.delete(`/api/games?id=${activeItem}`);

                limparCampos()

                await filterJogos('');
                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }
        }
    }

    const handleEditGameClick = async () => {
        if (activeItem) {
            try {
                if (!selectedProfileImage || !selectedBannerImage) {
                    console.error('Por favor, selecione tanto uma foto de perfil quanto uma foto de capa.');
                    return;
                }

                loading.show();

                const responseGet = await api.get(`/api/games?id=${activeItem}`);
                if (responseGet.data) {
                    const gameData = responseGet.data;
                    const reviews = gameData.reviews;
                    const rating = gameData.rating;

                    const dadosAtualizados = {
                        name: nomeInput,
                        genders: categoriaInput,
                        description: descricaoInput,
                        // is_free: isFree,
                        cover_adr: selectedBannerImage,
                        top_adr: selectedProfileImage,
                        reviews: reviews,
                        rating: rating,
                    };

                    const response = await api.put(`/api/games?id=${activeItem}`, dadosAtualizados);

                    if (response.data.success) {
                        console.log("Informações atualizadas com sucesso!");
                    } else {
                        console.error('Erro na atualização das informações:', response.data.error);
                    }

                    limparCampos();
                    loading.close();
                    setJogos(filterJogos(''));
                } else {
                    console.error('Erro ao obter os valores atuais de "reviews" e "rating" do banco de dados');
                    loading.close();
                }
            } catch (error) {
                console.error('Erro ao atualizar as informações:', error);
                loading.close();
            }
        }
    };


    const handleAddAdminClick = async (e) => {
        e.preventDefault();

        try {
            loading.show();

            const responseUser = await api.get(`/api/users?id=${activeItem}`);

            console.log(responseUser)

            if (responseUser.data) {
                const userData = responseUser.data;

                const password = userData.password;
                const mail = userData.mail;
                const photo_adr = userData.photo_adr;

                const novoAdmin = {
                    name: nomeInput,
                    password: password,
                    mail: mail,
                    photo_adr: photo_adr,
                };

                const response = await api.post('/api/admins', novoAdmin);

                if (response.data.success) {
                    console.log("Novo admin criado com sucesso!");
                } else {
                    console.error('Erro na criação do admin:', response.data.error);
                }

                await filterUsers('');
                limparCampos();
            } else {
                console.error('Erro ao obter informações do usuário ativo');
            }

            loading.close();
        } catch (error) {
            console.error('Erro na criação do administrador:', error);
            loading.close();
        }
    }


    const handleRemoveAdminClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();

                await api.delete(`/api/admins?id=${activeItem}`);

                await filterAdmins('');

                limparCampos()

                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }
        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isAdmin);
    };


    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            loading.close();
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar hideSearchbar={true} currentUser={currentUser} />
            <div className="admin__container">
                <div className="admin__content-container">
                    <div className="admin__menu-container">
                        <ul className="admin__menu">
                            <li
                                className={`admin__menu-option ${opcaoSelecionada === 'jogos-indicados' ? 'ativo' : ''}`}
                                onClick={() => handleOpcaoSelecionada('jogos-indicados')}
                            >
                                <p className='admin__menu-option-text'>Jogos indicados</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'cadastrar-jogo' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('cadastrar-jogo')}>
                                <p className="admin__menu-option-text">Cadastrar jogo</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'editar-jogo' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('editar-jogo')}>
                                <p className="admin__menu-option-text">Editar jogo</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'deletar-jogo' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('deletar-jogo')}>
                                <p className="admin__menu-option-text">Deletar jogo</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'add-adm' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('add-adm')}>
                                <p className="admin__menu-option-text">Adicionar administrador</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'editar-adm' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('editar-adm')}>
                                <p className="admin__menu-option-text">Editar administrador</p>
                            </li>
                            <li className={`admin__menu-option ${opcaoSelecionada === 'deletar-user' ? 'ativo' : ''}`} onClick={() => handleOpcaoSelecionada('deletar-user')}>
                                <p className="admin__menu-option-text">Deletar usuário</p>
                            </li>
                        </ul>
                    </div>

                    <div className="conteudo-relacionado">
                        {opcaoSelecionada === 'jogos-indicados' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchRecommendGamesChange}
                                        />
                                        {Object.values(jogos).length > 0 ? (
                                            Object.values(jogos).map((jogo) => (
                                                <li key={jogo.id} className="admin__gridView-cell" onClick={() => handleJogoClick(jogo)}>
                                                    <p className="gridView-game">{jogo.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem jogos indicados no momento</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="nomeEmpresa" className='admin__label'>Empresa desenvolvedora:</label>
                                            <input type="text" name="nome" id="nomeEmpresa" className='admin__input' value={nomeEmpresaInput} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="descricao" className='admin__label'>Descrição:</label>
                                            <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin__textarea' rows={4} cols={50} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="categoria" className='admin__label'>Categoria(s):</label>
                                            <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin__input' readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label className="container-check indicar__label" >
                                                <input id="checkbox_con" type="checkbox" checked={isFree} disabled={true} />
                                                <span className="checkmark"></span> Jogo gratuito
                                            </label>
                                        </div>
                                        <div className='admin__row-imgs'>
                                            <div className="admin__profileImageContainer">
                                                <p className="admin__profileImageText">Foto de perfil</p>
                                                <div className="admin__profileImageWrap">
                                                    {selectedProfileImage && (
                                                        <div className="admin__image-preview admin__image-preview__perfil">
                                                            <img src={selectedProfileImage} alt="Imagem de perfil" />
                                                            <label className="admin__overlay" >
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="admin__bannerImageContainer">
                                                <p className="admin__bannerImageText">Foto de capa</p>
                                                <div className="admin__bannerImageWrap">
                                                    {selectedBannerImage && (
                                                        <div className="admin__image-preview image-preview__banner">
                                                            <img src={selectedBannerImage} alt="Imagem de capa" />
                                                            <label className="admin__overlay" >
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleApproveClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Aprovar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleDeclineClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Reprovar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'cadastrar-jogo' && (
                            <div className="admin-card__container ">
                                <div className="admin__card">
                                    <div className="admin__row">
                                        <label htmlFor="nome" className='admin__label'>Nome:</label>
                                        <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} onChange={(e) => handleInputChange(e, setNomeInput)} />
                                    </div>
                                    <div className="admin__row">
                                        <label htmlFor="descricao" className='admin__label'>Descrição:</label>
                                        <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin__textarea' rows={4} cols={50} onChange={(e) => handleInputChange(e, setDescricaoInput)} />
                                    </div>
                                    <div className="admin__row">
                                        <label htmlFor="categoria" className='admin__label'>Categoria(s):</label>
                                        <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin__input' onChange={(e) => handleInputChange(e, setCategoriaInput)} />
                                    </div>
                                    <div className='admin__row-imgs'>
                                        <div className="admin__profileImageContainer">
                                            <p className="admin__profileImageText">Foto de perfil</p>
                                            <div className="admin__profileImageWrap">
                                                {selectedProfileImage && (
                                                    <div className="admin__image-preview admin__image-preview__perfil">
                                                        <img src={selectedProfileImage} alt="Imagem de perfil" onClick={() => handleClearImage(setSelectedProfileImage)} />
                                                        <label className="admin__overlay" onClick={() => handleClearImage(setSelectedProfileImage)}>
                                                            <Icon icon="ph:pencil" />
                                                        </label>
                                                    </div>
                                                )}
                                                {!selectedProfileImage && (
                                                    <label htmlFor="indicar__perfil" className="admin__file-input-label">
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

                                        <div className="admin__bannerImageContainer">
                                            <p className="admin__bannerImageText">Foto de capa</p>
                                            <div className="admin__bannerImageWrap">
                                                {selectedBannerImage && (
                                                    <div className="admin__image-preview image-preview__banner">
                                                        <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                                        <label className="admin__overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                            <Icon icon="ph:pencil" />
                                                        </label>
                                                    </div>
                                                )}
                                                {!selectedBannerImage && (
                                                    <label htmlFor="indicar__baner" className="admin__file-input-label">
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
                                    <div className="admin__btn-container">
                                        <button className='indicar__btn-aprovar' style={{ cursor: 'pointer' }} onClick={handleSendClick}>Confirmar</button>
                                        <button className='indicar__btn-reprovar' style={{ cursor: 'pointer' }} onClick={handleBackClick}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {opcaoSelecionada === 'editar-jogo' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchGamesChange}
                                        />
                                        {jogos.length > 0 ? (
                                            jogos.map((jogo) => (
                                                <li key={jogo.id} className="admin__gridView-cell" onClick={() => handleJogoClick(jogo)}>
                                                    <p className="gridView-game">{jogo.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem jogos cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} onChange={(e) => handleInputChange(e, setNomeInput)}
                                                disabled={!activeItem} />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="descricao" className='admin__label'>Descrição:</label>
                                            <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin__textarea' rows={4} cols={50} onChange={(e) => handleInputChange(e, setDescricaoInput)}
                                                disabled={!activeItem} />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="categoria" className='admin__label'>Categoria(s):</label>
                                            <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin__input' onChange={(e) => handleInputChange(e, setCategoriaInput)}
                                                disabled={!activeItem} />
                                        </div>
                                        {/* <div className="admin__row">
                                            <label className="container-check indicar__label" >
                                                <input id="checkbox_con" type="checkbox" checked={isFree} onChange={handleCheckboxChange} disabled={!activeItem} />
                                                <span className="checkmark"></span> Jogo gratuito
                                            </label>
                                        </div> */}
                                        <div className='admin__row-imgs'>
                                            <div className="admin__profileImageContainer">
                                                <p className="admin__profileImageText">Foto de perfil</p>
                                                <div className="admin__profileImageWrap">
                                                    {selectedProfileImage && (
                                                        <div className="admin__image-preview admin__image-preview__perfil">
                                                            <img src={selectedProfileImage} alt="Imagem de perfil" onClick={() => handleClearImage(setSelectedProfileImage)} />
                                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedProfileImage)}>
                                                                <Icon icon="ph:pencil" />
                                                            </label>
                                                        </div>
                                                    )}
                                                    {!selectedProfileImage && (
                                                        <label htmlFor="indicar__perfil" className="admin__file-input-label">
                                                            <Icon icon="ph:pencil" />
                                                            <input
                                                                type="file"
                                                                name="indicar__perfil"
                                                                id="indicar__perfil"
                                                                accept="image/*"
                                                                style={{ display: 'none' }}
                                                                disabled={!activeItem}
                                                                onChange={handleProfileImageChange}
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="admin__bannerImageContainer">
                                                <p className="admin__bannerImageText">Foto de capa</p>
                                                <div className="admin__bannerImageWrap">
                                                    {selectedBannerImage && (
                                                        <div className="admin__image-preview image-preview__banner">
                                                            <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                                <Icon icon="ph:pencil" />
                                                            </label>
                                                        </div>
                                                    )}
                                                    {!selectedBannerImage && (
                                                        <label htmlFor="indicar__baner" className="admin__file-input-label">
                                                            <Icon icon="ph:pencil" />
                                                            <input
                                                                type="file"
                                                                name="indicar__baner"
                                                                id="indicar__baner"
                                                                accept="image/*"
                                                                style={{ display: 'none' }}
                                                                disabled={!activeItem}
                                                                onChange={handleBannerImageChange}
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleEditGameClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'deletar-jogo' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchGamesChange}
                                        />
                                        {jogos.length > 0 ? (
                                            jogos.map((jogo) => (
                                                <li key={jogo.id} className="admin__gridView-cell" onClick={() => handleJogoClick(jogo)}>
                                                    <p className="gridView-game">{jogo.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem jogos cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="descricao" className='admin__label'>Descrição:</label>
                                            <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin__textarea' rows={4} cols={50} />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="categoria" className='admin__label'>Categoria(s):</label>
                                            <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin__input' />
                                        </div>
                                        <div className="admin__row">
                                            <label className="container-check indicar__label" >
                                                <input id="checkbox_con" type="checkbox" checked={isFree} disabled={true} />
                                                <span className="checkmark"></span> Jogo gratuito
                                            </label>
                                        </div>
                                        <div className='admin__row-imgs'>
                                            <div className="admin__profileImageContainer">
                                                <p className="admin__profileImageText">Foto de perfil</p>
                                                <div className="admin__profileImageWrap">
                                                    {selectedProfileImage && (
                                                        <div className="admin__image-preview admin__image-preview__perfil">
                                                            <img src={selectedProfileImage} alt="Imagem de perfil" />
                                                            <label className="admin__overlay" >
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="admin__bannerImageContainer">
                                                <p className="admin__bannerImageText">Foto de capa</p>
                                                <div className="admin__bannerImageWrap">
                                                    {selectedBannerImage && (
                                                        <div className="admin__image-preview image-preview__banner">
                                                            <img src={selectedBannerImage} alt="Imagem de capa" />
                                                            <label className="admin__overlay" >
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleDeleteGameClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Deletar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'add-adm' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchUsersChange}
                                        />
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <li key={user.id} className="admin__gridView-cell" onClick={() => handleUserClick(user)}>
                                                    <p className="gridView-game">{user.user_name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem usuários cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="nickNameInput" className='admin__label'>Nickname(s):</label>
                                            <input type="text" value={nickNameInput} name='nickNameInput' id='nickNameInput' className='admin__input' readOnly />
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleAddAdminClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Adicionar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'editar-adm' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchAdminChange}
                                        />

                                        {admins.length > 0 ? (
                                            admins.map((admin) => (
                                                <li key={admin.id} className="admin__gridView-cell" onClick={() => handleAdminClick(admin)}>
                                                    <p className="gridView-game">{admin.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem admins cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="nickNameInput" className='admin__label'>Nickname(s):</label>
                                            <input type="text" value={nickNameInput} name='nickNameInput' id='nickNameInput' className='admin__input' readOnly />
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleRemoveAdminClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Remover</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'deletar-user' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchUsersChange}
                                        />
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <li key={user.id} className="admin__gridView-cell" onClick={() => handleUserClick(user)}>
                                                    <p className="gridView-game">{user.user_name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem usuários cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="nickNameInput" className='admin__label'>Nickname(s):</label>
                                            <input type="text" value={nickNameInput} name='nickNameInput' id='nickNameInput' className='admin__input' readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label className="container-check indicar__label" >
                                                <input id="checkbox_con" type="checkbox" onChange={handleCheckboxChange} disabled={true} />
                                                <span className="checkmark"></span> Administrador
                                            </label>
                                        </div>
                                        <div className="admin__btn-container">

                                            <button className='indicar__btn-aprovar' onClick={handleDeleteClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Deletar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
        </div >
    );
}

export default Admin;
