import './Admin.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import api from './services/Api';
import { getAuth } from './services/Auth';
import { Modals } from './components/Modals';
import { Icon } from '@iconify/react';

const Admin = () => {
    // Defina um estado para rastrear a opção selecionada

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
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState({});
    // const adminsArray = Object.values(admins);
    const [isFree, setIsFree] = useState(false); // Defina o valor inicial como false
    const [isAdmin, setIsAdmin] = useState(false); // Defina o valor inicial como false
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);



    const navigate = useNavigate();

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
        } else {
            navigate('/admin');
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeclineClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();
                // Fazer uma solicitação DELETE para excluir o jogo indicado com base no ID
                await api.delete(`/api/recommendeds?id=${activeItem}`);

                limparCampos()

                // Atualizar a lista de jogos após a exclusão
                await getIndicatedGames();
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

                // Obtenha o jogo ativo
                const activeGame = jogos.find((jogo) => jogo.id === activeItem);

                console.log("activeGame: ", activeGame)

                // Certifique-se de que o jogo foi encontrado e possui um `user_id`
                if (activeGame && activeGame.user_id) {

                    //const approvedData = {
                    //    id: activeGame.id,
                    //    user_id: activeGame.user_id,
                    //    name: nomeInput,
                    //    genders: categoriaInput,
                    //    description: descricaoInput,
                    //    creator: nomeEmpresaInput,
                    //    is_free: isFree,
                    //    approved: true,
                    //    top_adr: selectedProfileImage,
                    //    cover_adr: selectedBannerImage
                    //};

                    // Passo 2: Criar uma nova linha na tabela 'games'
                    const newGameData = {
                        name: nomeInput,
                        genders: categoriaInput,
                        description: descricaoInput,
                        cover_adr: selectedProfileImage, // Deve ser um valor vazio, como você mencionou
                        top_adr: selectedBannerImage, // Deve ser um valor vazio, como você mencionou
                        rating: 0,
                        reviews: 0,
                    };

                   const response = await api.post('/api/games', newGameData);

                   if (response.status === 200) {


                        // Limpar os campos
                        limparCampos();

                        // Atualizar a lista de jogos após a aprovação
                       await getIndicatedGames();

                       if (root) {
                           modals.htmlDialog(
                               root,
                               'Jogo aprovado!',
                               modals.msgboxButtons.okOnly,
                               modals.msgboxIcons.check,
                               'Mensagem!',
                               {
                                   ok: async (evt) => {
                                       await api.delete(`/api/recommendeds?id=${activeItem}`);
                                   }
                               });
                       }

                    }
                }
                loading.close();
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
                // Fazer uma solicitação DELETE para excluir o jogo indicado com base no ID
                await api.delete(`/api/users?id=${activeItem}`);

                limparCampos()

                // Atualizar a lista de jogos após a exclusão
                await getAllUsers();
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
            await getIndicatedGames();
        }
        if (opcao === 'editar-jogo') {
            await getAllGames();
        }
        if (opcao === 'add-adm') {
            await getAllUsers();
        }
        if (opcao === 'editar-adm') {
            await getAllAdmins();
        }
        if (opcao === 'deletar-user') {
            await getAllUsers();
        }
    };

    const getIndicatedGames = async () => {
        try {
            loading.show();
            const response = await api.get('/api/recommendeds/search');
            // console.log("api getIndicatedGames:", response.data[].approved === false);
            if (response.data) {
                setJogos(response.data);
            } else {
                setJogos([]);
            }
            loading.close();
        } catch (error) {
            console.error('Erro ao buscar jogos indicados:', error);
            setJogos([]);
            loading.close();
        }
    };

    const getAllGames = async () => {
        try {
            loading.show();
            const response = await api.get('/api/games/search');
            if (response.data) {
                console.log("api getAllGames:", response.data)
                setJogos(response.data);
            } else {
                setJogos([]); // Certifique-se de que 'setJogos' seja chamado em caso de resposta vazia
            }
            loading.close();
        } catch (error) {
            console.error('Erro ao buscar todos os jogos:', error);
            setJogos([]); // Trate o erro definindo 'jogos' como um array vazio ou outra ação apropriada.
            loading.close();
        }
    }

    const getAllUsers = async () => {
        try {
            loading.show();
            const response = await api.get('/api/users/list');
            if (response.data) {
                console.log("api getAllUsers:", response.data)
                setUsers(response.data);
            } else {
                setUsers([]); // Certifique-se de que 'setJogos' seja chamado em caso de resposta vazia
            }
            loading.close();
        } catch (error) {
            console.error('Erro ao buscar todos os jogos:', error);
            setUsers([]); // Trate o erro definindo 'jogos' como um array vazio ou outra ação apropriada.
            loading.close();
        }
    }

    const getAllAdmins = async () => {
        try {
            loading.show();
            const response = await api.get('/api/admins');
            if (response.data) {
                setAdmins(response.data);
            } else {
                setAdmins({}); // Certifique-se de que 'setJogos' seja chamado em caso de resposta vazia
            }
            loading.close();
        } catch (error) {
            console.error('Erro ao buscar todos os jogos:', error);
            setAdmins({}); // Trate o erro definindo 'jogos' como um array vazio ou outra ação apropriada.
            loading.close();
        }
    }

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

    const handleUserClick = (user) => {
        setActiveItem(user.id);
        setNomeInput(user.name);
        setNickNameInput(user.user_name);
    };

    const handleAdminClick = (admin) => {
        setActiveItem(admin.id);
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
            // Enviar os dados para a API
            const response = await api.post(`/api/games`, postData);
            if (response.data.id) {
                // Postagem bem-sucedida
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Jogo criado com sucesso!',
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
            <Navbar currentUser={currentUser} />
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
                            // Renderizándo o conteúdo relacionado à opção 'Jogos indicados'
                            // GridView
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                        />
                                        {Object.values(jogos).length > 0 ? (
                                            Object.values(jogos).map((jogo) => (
                                                <li key={jogo.id} className="admin__gridView-cell" onClick={() => handleJogoClick(jogo)}>
                                                    <p className="gridView-id">{jogo.id}</p>
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
                                                            <img src={selectedProfileImage} alt="Imagem de perfil" onClick={() => handleClearImage(setSelectedProfileImage)} />
                                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedProfileImage)}>
                                                                <Icon icon="ph:pencil" />
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
                                                            <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                                <Icon icon="ph:pencil" />
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
                            // Renderizándo o conteúdo relacionado à opção 'Jogos indicados'
                            // GridView
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
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
                                                <input id="checkbox_con" type="checkbox" checked={isFree} onChange={handleCheckboxChange} />
                                                <span className="checkmark"></span> Jogo gratuito
                                            </label>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
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
                                                <input id="checkbox_con" type="checkbox" onChange={handleCheckboxChange} />
                                                <span className="checkmark"></span> Administrador
                                            </label>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {opcaoSelecionada === 'editar-adm' && (
                            // Renderizándo o conteúdo relacionado à opção 'Jogos indicados'
                            // GridView
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__gridView">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                        />

                                        {admins.id ? (
                                            <li className="admin__gridView-cell" onClick={() => handleAdminClick(admins)}>
                                                <p className="gridView-game">{admins.name}</p>
                                            </li>
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem admins cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <div className="admin__row">
                                            <label htmlFor="nickNameInput" className='admin__label'>Nickname(s):</label>
                                            <input type="text" value={nickNameInput} name='nickNameInput' id='nickNameInput' className='admin__input' readOnly />
                                        </div>
                                        <div className="admin__row">
                                            <label className="container-check indicar__label" >
                                                <input id="checkbox_con" type="checkbox" onChange={handleCheckboxChange} />
                                                <span className="checkmark"></span> Administrador
                                            </label>
                                        </div>
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' disabled={!activeItem} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
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
