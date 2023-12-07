import './Admin.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import api from './services/Api';
import Steam from './icons/steam.png';
import Discord from './icons/discord.png';
import EpicGames from './icons/epic-games.png';
import Twitch from './icons/twitch.png';
import Github from './icons/github.png';
import FotoPerfil from './image/foto.png'
import Lightbox from './components/LightBox';

import { getAuth, MENU_KEY } from './services/Auth';
import { Modals } from './components/Modals';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faRankingStar, faHandPointUp, faTrash, faPencil, faPlus, faUsers, faUserGear, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [lightboxImage, setLightboxImage] = useState(null);

    const [currentUser, setCurrentUser] = useState();
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [mostrarDados, setMostrarDados] = useState(false);
    const [adicionar, setAdicionar] = useState(false);

    const [nomeInput, setNomeInput] = useState('');
    const [nomeEmpresaInput, setNomeEmpresaInput] = useState('');
    const [descricaoInput, setDescricaoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeItem, setActiveItem] = useState(null);

    const [nomeUserInput, setNomeUserInput] = useState('');
    const [nickNameInput, setNickNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [dateInput, setDatenput] = useState('');
    const [epicUser, setEpicUser] = useState('');
    const [steamUser, setSteamUser] = useState('');
    const [discordUser, setDiscordUser] = useState('');
    const [githubUser, setGithubUser] = useState('');
    const [twitchUser, setTwitchUser] = useState('');

    const [jogos, setJogos] = useState([]);
    const [recommendeds, setRecommendeds] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState({});

    const [nomeAdminInput, setNomeAdminInput] = useState('');
    const [emailAdminInput, setEmailAdminInput] = useState('');
    const [senhaAdminInput, setSenhaAdminInput] = useState('');
    const [senhaAdminInput2, setSenhaAdminInput2] = useState('');

    const [reviewUserId, setReviewUserId] = useState('');
    const [reviewUserName, setReviewUserName] = useState('');
    const [reviewPhotoAdr, setReviewPhotoAdr] = useState('');
    const [reviewGameId, setReviewGameId] = useState('');
    const [reviewGameName, setReviewGameName] = useState('');
    const [reviewGrade, setReviewGrade] = useState('');
    const [reviewOpinion, setReviewOpinion] = useState('');
    const [reviewImageAdr, setReviewImageAdr] = useState('');
    const [reviewLikes, setReviewLikes] = useState('');


    const [filteredJogos, setFilteredJogos] = useState([]);
    const [isFree, setIsFree] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);

    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const navigate = useNavigate();

    const handleImageError = (event) => {
        event.target.src = FotoPerfil;
    }

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

    const handleSearchReviewsChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterReviews(value);
    };

    const handleCancelClick = async (e) => {
        limparCampos();
        setMostrarDados(false);
    }

    const handleOpcaoSelecionada = async (opcao) => {
        setOpcaoSelecionada(opcao);
        limparCampos()
        
        if (opcao === 'games') {
            await filterJogos(searchTerm);
        }
        if (opcao === 'recommended') {
            await filterJogosRecomendados(searchTerm);
        }
        if (opcao === 'reviews') {
            await filterReviews(searchTerm);
        }
        if (opcao === 'users') {
            await filterUsers(searchTerm);
        }
        if (opcao === 'admins') {
            await filterAdmins(searchTerm);
        }
      
    };

    const filterJogosRecomendados = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get(`/api/recommendeds/search`);

                const filteredData = response.data.filter((jogo) => regex.test(jogo.name));
                setRecommendeds(filteredData);
            } else {
                response = await api.get('/api/recommendeds/search');

                const filteredData = response.data;
                setRecommendeds(filteredData);
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

    const filterReviews = async (searchTerm) => {
        try {
            let response;

            if (searchTerm !== '') {
                const regex = new RegExp(`^${searchTerm}`, 'i');

                response = await api.get('/api/reviews');

                const filteredData = response.data.filter((review) => regex.test(review.game_id));
                setReviews(filteredData);
            } else {
                response = await api.get('/api/reviews');

                const filteredData = response.data;
                setReviews(filteredData);
            }
        } catch (error) {
            console.error('Erro ao buscar reviews:', error);
        }

        //if (searchTerm.trim() !== '') {

        //    try {
        //        const userSearchResponse = await api.get(`/api/users/search?name=${term}`);
        //        if (userSearchResponse.status === 200) {
        //            await setUserResults(Array.isArray(userSearchResponse.data)
        //                ? userSearchResponse.data.map((user) => ({
        //                    ...user,
        //                    name: user.name,
        //                    photo_adr: user.photo_adr,
        //                    type: 'user'
        //                }))
        //                : []);
        //        } else {
        //            await setUserResults([]);
        //        }
        //    } catch (error) {
        //        console.error('Erro ao buscar resultados de users:', error);
        //        await setUserResults([]);
        //    }

        //    try {
        //        const gameSearchResponse = await api.get(`/api/games/search?name=${term}`);
        //        if (gameSearchResponse.status === 200) {
        //            await setGameResults(Array.isArray(gameSearchResponse.data)
        //                ? gameSearchResponse.data.map((game) => ({
        //                    ...game,
        //                    name: game.name,
        //                    top_adr: game.top_adr,
        //                    type: 'game'
        //                }))
        //                : []);
        //        } else {
        //            await setGameResults([]);

        //        }
        //    } catch (error) {
        //        console.error('Erro ao buscar resultados de games:', error);
        //        await setGameResults([]);
        //    }
        //} else if (searchTerm === '') {
        //    handleSearchNull();

        //} else {
        //    await setSearchResults([]);

        //}

        //const combinedResults = [...userResults, ...gameResults];
        //await setSearchResults(combinedResults);

        //console.log(combinedResults);

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

    const handleJogoEditClick = (jogo) => {
        setActiveItem(jogo.id);
        setNomeInput(jogo.name);
        setNomeEmpresaInput(jogo.creator);
        setDescricaoInput(jogo.description);
        setCategoriaInput(jogo.genders);
        setIsFree(jogo.is_free);
        setSelectedProfileImage(jogo.top_adr);
        setSelectedBannerImage(jogo.cover_adr);
        setMostrarDados(true);
    };

    const handleJogoDeleteClick = (jogo) => {
        if (root) {
            modals.htmlDialog(
                root,
                'Remover esse jogo?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt, j = jogo) => {
                        handleDeleteGame(j);
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

    }

    const handleJogoAddClick = () => {
        limparCampos();
        setAdicionar(true);
        setMostrarDados(true);
    }


    const handleRecommendedViewClick = (jogo) => {
        setActiveItem(jogo.id);
        setNomeInput(jogo.name);
        setNomeEmpresaInput(jogo.creator);
        setDescricaoInput(jogo.description);
        setCategoriaInput(jogo.genders);
        setIsFree(jogo.is_free);
        setSelectedProfileImage(jogo.top_adr);
        setSelectedBannerImage(jogo.cover_adr);
        setMostrarDados(true);
    };

    const handleRecommendedReproveClick = (jogo) => {
        if (root) {
            modals.htmlDialog(
                root,
                'Reprovar essa indicação de jogo?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt, j = jogo) => {
                        handleReproveGame(j);
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

    }


    const handleReviewViewClick = (review) => {
        setActiveItem(review.id);

        setReviewUserId(review.user_id);
        setReviewUserName(review.name);
        setReviewPhotoAdr(review.photo_adr);
        setReviewGameId(review.game_id);
        setReviewGameName(review.game_name);
        setReviewGrade(review.grade);
        setReviewOpinion(review.opinion);
        setReviewImageAdr(review.image_adr);
        setReviewLikes(review.likes);

        setMostrarDados(true);
    };

    const handleReviewDeleteClick = (review) => {
        if (root) {
            modals.htmlDialog(
                root,
                'Remover essa review?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt, j = review) => {
                        handleDeleteReview(j);
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

    }


    const handleUserEditClick = async (user) => {
        setActiveItem(user.id);

        setNomeUserInput(user.name);
        setNickNameInput(user.user_name);
        setEmailInput(user.mail);
        setDatenput(user.birth_date)
        setSelectedProfileImage(user.photo_adr);
        setSelectedBannerImage(user.top_adr);
        setEpicUser(user.epic_user);
        setSteamUser(user.steam_user);
        setDiscordUser(user.discord_user);
        setGithubUser(user.github_user);
        setTwitchUser(user.twitch_user);

        setMostrarDados(true);

        //try {
        //    loading.show();

        //    const responseUser = await api.get(`/api/users?id=${user.id}`);

        //    //const responseAdmin = await api.get(`/api/admins?email=${user.mail}`);

        //    console.log("responseUser: ", responseUser);
        //    //console.log("responseAdmin: ", responseAdmin);

        //    const isUser = responseUser.data.length > 0;
        //    //const isAdmin = responseAdmin.data.length > 0;

        //    //setIsAdmin(isUser);

        //    loading.close();
        //} catch (error) {
        //    console.error('Erro ao verificar o email:', error);
        //    loading.close();
        //}
    };

    const handleUserDeleteClick = (user) => {
        if (root) {
            modals.htmlDialog(
                root,
                'Remover esse usuário?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt, j = user) => {
                        handleDeleteUser(j);
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

    }


    const handleAdminEditClick = (admin) => {

        setActiveItem(admin.id);
        setNomeAdminInput(admin.name);
        setEmailAdminInput(admin.mail);
        setSelectedProfileImage(admin.photo_adr);
        setMostrarDados(true);

    };

    const handleAdminDeleteClick = (admin) => {
        if (root) {
            modals.htmlDialog(
                root,
                'Remover esse adminstrador?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt, j = admin) => {
                        handleDeleteAdmin(j);
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

    }

    const handleAdminAddClick = () => {
        limparCampos();
        setAdicionar(true);
        setMostrarDados(true);
    }


    const limparCampos = () => {
        setActiveItem(null);
        setNomeInput('');
        setNomeAdminInput('');
        setEmailInput('');
        setEmailAdminInput('');
        setNomeEmpresaInput('');
        setDescricaoInput('');
        setCategoriaInput('');
        setNickNameInput('');
        setSteamUser('');
        setTwitchUser('');
        setEpicUser('');
        setGithubUser('');
        setDiscordUser('');
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


    const handleDeleteGame = async (jogo) => {
        if (jogo) {
            try {
                loading.show();
                await api.delete(`/api/games?id=${jogo.id}`);

                limparCampos()

                await filterJogos('');
                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }
        }
    }

    const handleDeleteUser = async (user) => {
        if (user) {
            try {
                loading.show();
                await api.delete(`/api/users?id=${user.id}`);

                limparCampos()

                await filterUsers();
                loading.close();
            } catch (error) {
                console.error('Erro ao deletar usuario:', error);
                loading.close();
            }
        }
    }

    const handleDeleteAdmin = async (admin) => {
        if (admin) {
            try {
                loading.show();

                await api.delete(`/api/admins?id=${admin.id}`);

                await filterAdmins('');

                limparCampos()

                loading.close();
            } catch (error) {
                console.error('Erro ao remover adminstrador', error);
                loading.close();
            }
        }
    }

    const handleDeleteReview = async (review) => {
        if (review) {
            try {
                loading.show();
                await api.delete(`/api/review?id=${review.id}`);
                loading.close();
            } catch (error) {
                console.error('Erro ao remover review:', error);
                loading.close();
            }
        } else {
            if (activeItem) {
                try {
                    loading.show();
                    await api.delete(`/api/review?id=${activeItem}`);
                    loading.close();
                } catch (error) {
                    console.error('Erro ao remover review:', error);
                    loading.close();
                }
            }
        }

        limparCampos();
        setMostrarDados(false);
        await filterReviews('');
    }

    const handleReproveGame = async (jogo) => {
        if (jogo) {
            try {
                loading.show();
                await api.delete(`/api/recommendeds?id=${jogo.id}`);
                loading.close();
            } catch (error) {
                console.error('Erro ao reprovar o jogo indicado:', error);
                loading.close();
            }

            limparCampos();
            setMostrarDados(false)
            await filterJogosRecomendados('');

        } else {
            if (activeItem) {
                try {
                    loading.show();
                    await api.delete(`/api/recommendeds?id=${activeItem}`);
                    loading.close();
                } catch (error) {
                    console.error('Erro ao reprovar o jogo indicado:', error);
                    loading.close();
                }

                limparCampos();
                setMostrarDados(false)
                await filterJogosRecomendados('');
            }
        }
    }


    const handleUpdateGame = async () => {
        if (activeItem || adicionar) {
            try {
                if (!selectedProfileImage || !selectedBannerImage) {
                    console.error('Por favor, selecione tanto uma foto de perfil quanto uma foto de capa.');
                    return;
                }

                loading.show();

                if (adicionar) {

                    const novoJogo = {
                        name: nomeInput,
                        genders: categoriaInput,
                        description: descricaoInput,
                        cover_adr: selectedBannerImage,
                        top_adr: selectedProfileImage,
                        reviews: 0,
                        rating: 0,
                    };

                    const response = await api.post(`/api/games`, novoJogo);

                    if (response.data.success) {
                        console.log("Jogo adicionado com sucesso!");

                        if (root) {
                            modals.htmlDialog(
                                root,
                                'Jogo adicionado com sucesso!',
                                modals.msgboxButtons.okOnly,
                                modals.msgboxIcons.check,
                                'Mensagem!',
                                {
                                    ok: () => {}
                                });
                        }

                    } else {

                        console.error('Erro ao adicionar jogo:', response.data.error);

                    }

                    setAdicionar(false);
                    limparCampos();
                    loading.close();
                    setJogos(filterJogos(''));

                }
                else {
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

                            if (root) {
                                modals.htmlDialog(
                                    root,
                                    'Informações atualizadas com sucesso!',
                                    modals.msgboxButtons.okOnly,
                                    modals.msgboxIcons.check,
                                    'Mensagem!',
                                    {
                                        ok: () => { }
                                    });
                            }

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
                }
               
            } catch (error) {
                console.error('Erro ao atualizar as informações:', error);
                loading.close();
            }
            setMostrarDados(false);
        }
    };

    const handleUpdateUser = async () => {
        if (activeItem || adicionar) {
            try {
                if (!selectedProfileImage && !selectedBannerImage) {
                    console.error('Por favor, selecione uma foto de perfil ou uma foto de capa.');
                    return;
                }

                loading.show();
                const updateData = {
                    name: nomeUserInput,
                    mail: emailInput,
                    user_name: nickNameInput,
                    photo_adr: selectedProfileImage,
                    top_adr: selectedBannerImage,
                    birth_date: dateInput,
                    epic_user: epicUser,
                    steam_user: steamUser,
                    discord_user: discordUser,
                    github_user: githubUser,
                    twitch_user: twitchUser
                };

                const response = await api.patch(`/api/users?id=${activeItem}`, updateData);

                if (response.data.success) {
                    console.log("JDados do usuários alterados com sucesso!");

                    if (root) {
                        modals.htmlDialog(
                            root,
                            'Dados do usuários alterados com sucesso!',
                            modals.msgboxButtons.okOnly,
                            modals.msgboxIcons.check,
                            'Mensagem!',
                            {
                                ok: () => { }
                            });
                    }

                } else {

                    console.error('Erro ao alterar usuario:', response.data.error);

                }

                limparCampos();
                loading.close();
                setUsers(filterUsers(''));

            } catch (error) {
                console.error('Erro ao atualizar as informações:', error);
                loading.close();
            }
            setMostrarDados(false);
        }
    };

    const handleUpdateAdmin = async () => {
        if (activeItem || adicionar) {
            try {
                //if (!selectedProfileImage) {
                //    console.error('Por favor, selecione uma foto de perfil.');
                //    return;
                //}

                const updateData = {
                    name: nomeAdminInput,
                    mail: emailAdminInput,
                    photo_adr: selectedProfileImage,
                };

                if (adicionar) {

                    loading.show();

                    updateData.password = senhaAdminInput;

                    const response = await api.post(`/api/admins`, updateData);

                    if (response.data.success) {
                        console.log("Adminstrador adicionado com sucesso!");

                        if (root) {
                            modals.htmlDialog(
                                root,
                                'Adminstrador adicionado com sucesso!',
                                modals.msgboxButtons.okOnly,
                                modals.msgboxIcons.check,
                                'Mensagem!',
                                {
                                    ok: () => { }
                                });
                        }

                    } else {

                        console.error('Erro ao adicionar Adminstrador:', response.data.error);

                    }

                    setAdicionar(false);
                    limparCampos();
                    loading.close();
                    setAdmins(filterAdmins(''));

                } else {

                    loading.show();
                    const response = await api.patch(`/api/admins?id=${activeItem}`, updateData);

                    if (response.data.success) {
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

                    limparCampos();
                    loading.close();
                    setAdmins(filterAdmins(''));

                }
                               
            } catch (error) {
                console.error('Erro ao atualizar as informações:', error);
                loading.close();
            }
            setMostrarDados(false);
        }
    };

    const handleApproveClick = async (e) => {
        if (activeItem) {
            try {
                loading.show();

                const activeGame = recommendeds.find((jogo) => jogo.id === activeItem);

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

                    const response = await api.post('/api/games', newGameData);
                    if (response.status == 409) {
                        console.log('Conflito de nomes')
                    }
                 
                    loading.close();
                }
            } catch (error) {
                console.error('Erro ao aprovar o jogo indicado:', error);
                loading.close();
            }

            limparCampos();
            setMostrarDados(false)
            await filterJogosRecomendados('');
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isAdmin);
    };

    const coresDasNotas = [
        "#A70000",
        "#AF1C00",
        "#B83500",
        "#C04D00",
        "#C86500",
        "#D07C00",
        "#D89400",
        "#E0AB00",
        "#E8C300",
        "#F0DA00",
        "#F9F200",
        "#FFFC00",
        "#FFFC00",
        "#C4FA00",
        "#C4FA00",
        "#88F800",
        "#6AE700",
        "#4CE600",
        "#2EE500",
        "#10D400",
        "#0094DC"
    ];

    const getCoresDasNotas = (nota) => {
        // Calcula o índice arredondado com base na nota
        const indice = Math.round(nota * 2);

        // Retorna a cor correspondente no array de cores
        return coresDasNotas[indice];
    };      

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            await setOpcaoSelecionada("games");
            await filterJogos(searchTerm);
            loading.close();
            const m = await localStorage.getItem(MENU_KEY);
            if (m) {
                handleOpcaoSelecionada(m)
            } else {
                handleOpcaoSelecionada('games')
            }
        }
        fetchData();
    }, []);

    return (
        <div className="root-admin-container">
            <Navbar hideSearchbar={true} currentUser={currentUser} />
            <div className="admin__container">
            {/*<div className="admin__content-container">*/}
                    <div className="admin__menu-container">
                        <ul className="admin__menu">
                        <li className={`admin__menu-option ${opcaoSelecionada === 'games' ? 'ativo' : ''}`} onClick={() => {
                            handleOpcaoSelecionada('games')  
                            localStorage.setItem(MENU_KEY, 'games');
                        }}>
                                <FontAwesomeIcon icon={faGamepad} className="icon-option" /><p className='admin__menu-option-text'>Jogos</p >
                            </li>
                        <li className={`admin__menu-option ${opcaoSelecionada === 'recommended' ? 'ativo' : ''}`} onClick={() => {
                            handleOpcaoSelecionada('recommended')
                            localStorage.setItem(MENU_KEY, 'recommended');
                        }}>
                                <FontAwesomeIcon icon={faHandPointUp} className="icon-option" /><p className="admin__menu-option-text">Jogos indicados</p>
                            </li>
                        <li className={`admin__menu-option ${opcaoSelecionada === 'reviews' ? 'ativo' : ''}`} onClick={() => {
                            handleOpcaoSelecionada('reviews')
                            localStorage.setItem(MENU_KEY, 'reviews');
                        }}>
                                <FontAwesomeIcon icon={faRankingStar} className="icon-option" /><p className="admin__menu-option-text">Reviews</p>
                            </li>
                        <li className={`admin__menu-option ${opcaoSelecionada === 'users' ? 'ativo' : ''}`} onClick={() => {
                            handleOpcaoSelecionada('users')
                            localStorage.setItem(MENU_KEY, 'users');
                        }}>
                                <FontAwesomeIcon icon={faUsers} className="icon-option" /><p className="admin__menu-option-text">Usuários</p>
                            </li>
                        <li className={`admin__menu-option ${opcaoSelecionada === 'admins' ? 'ativo' : ''}`} onClick={() => {
                            handleOpcaoSelecionada('admins')
                            localStorage.setItem(MENU_KEY, 'admins');
                        }}>
                                <FontAwesomeIcon icon={faUserGear} className="icon-option" /><p className="admin__menu-option-text">Administradores</p>
                            </li>
                        </ul>
                    </div>

                    <div className="conteudo-relacionado">
                        {opcaoSelecionada === 'games' && (
                            <>
                                <div className="admin__gridView-container">
                                    <div className="admin__toolbar-top">
                                        <button className="botao btnSecundario toolbar-button" onClick={handleJogoAddClick}>
                                            <FontAwesomeIcon icon={faPlus} className="icon-option" />
                                            Adicionar jogo
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            className="admin__search-input"
                                            value={searchTerm}
                                            onChange={handleSearchGamesChange}
                                        />
                                    </div>
                                    <div className="admin__gridView">
                                        {jogos.length > 0 ? (
                                            jogos.map((jogo) => (
                                                <li key={jogo.id} className="admin__gridView-cell" >
                                                    <div className="admin__gridView-cell-button-container">
                                                        <FontAwesomeIcon icon={faPencil} onClick={() => handleJogoEditClick(jogo)} />
                                                    </div>
                                                    <div className="admin__gridView-cell-button-container">
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleJogoDeleteClick(jogo)} />
                                                    </div>
                                                    <div className="admin__gridView-cell-image-container">
                                                        <img src={jogo.top_adr} alt="Banner jogo" />
                                                    </div>
                                                    <div className="admin__gridView-cell-text-container">
                                                        <p className="gridView-game">{jogo.name}</p>
                                                        <p className="gridView-game">{jogo.reviews} reviews</p>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem jogos cadastrados</p>
                                        )}
                                    </div>
                                </div>

                                {mostrarDados && ( 

                                    <div className="admin-card__container ">
                                        <div className="admin__card">
                                            <h1>Dados do jogo</h1>
                                            <div className="admin__row">
                                                <label htmlFor="nome" className='admin__label'>Nome:</label>
                                                <input type="text" name="nome" id="nome" className='admin__input' value={nomeInput} onChange={(e) => handleInputChange(e, setNomeInput)}
                                                     />
                                            </div>
                                            <div className="admin__row">
                                                <label htmlFor="descricao" className='admin__label'>Descrição:</label>
                                                <textarea type="text" value={descricaoInput} name="descricao" id="descricao" className='admin__textarea' rows={4} cols={50} onChange={(e) => handleInputChange(e, setDescricaoInput)}
                                                     />
                                            </div>
                                            <div className="admin__row">
                                                <label htmlFor="categoria" className='admin__label'>Categoria(s):</label>
                                                <input type="text" value={categoriaInput} name='categoria' id='descricao' className='admin__input' onChange={(e) => handleInputChange(e, setCategoriaInput)}
                                                     />
                                            </div>
                                            {/* <div className="admin__row">
                                                <label className="container-check indicar__label" >
                                                    <input id="checkbox_con" type="checkbox" checked={isFree} onChange={handleCheckboxChange}  />
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

                                                <div className="admin__bannerImageContainer">
                                                    <p className="admin__bannerImageText">Foto de capa</p>
                                                    <div className="admin__bannerImageWrap">
                                                        {selectedBannerImage && (
                                                            <div className="admin__image-preview image-preview__banner">
                                                                <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                                                <label className="admin__overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                                    <FontAwesomeIcon icon={faPencil} />
                                                                </label>
                                                            </div>
                                                        )}
                                                        {!selectedBannerImage && (
                                                            <label htmlFor="indicar__baner" className="admin__file-input-label">
                                                                <FontAwesomeIcon icon={faPencil} />
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
                                                <button className='indicar__btn-aprovar' onClick={handleUpdateGame}  style={{ cursor: 'pointer'  }}>Confirmar</button>
                                                <button className='indicar__btn-reprovar' onClick={handleCancelClick}  style={{ cursor: 'pointer'  }}>Cancelar</button>
                                            </div>
                                        </div>
                                    </div>

                                )}

                            </>
                        )}
                        {opcaoSelecionada === 'recommended' && (
                        <>
                            <div className="admin__gridView-container">
                                <div className="admin__toolbar-top">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar..."
                                        className="admin__search-input"
                                        value={searchTerm}
                                        onChange={handleSearchRecommendGamesChange}
                                    />
                                </div>
                                    <div className="admin__gridView">
                                        {recommendeds.length > 0 ? (
                                            recommendeds.map((jogo) => (
                                                    <li key={jogo.id} className="admin__gridView-cell" >
                                                        <div className="admin__gridView-cell-button-container">
                                                        <FontAwesomeIcon icon={faEye} onClick={() => handleRecommendedViewClick(jogo)} />
                                                        </div>
                                                        <div className="admin__gridView-cell-button-container">
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleRecommendedReproveClick(jogo)} />
                                                        </div>
                                                        <div className="admin__gridView-cell-image-container">
                                                            <img src={jogo.top_adr} alt="Banner jogo" />
                                                        </div>
                                                        <div className="admin__gridView-cell-text-container">
                                                            <p className="gridView-game">{jogo.name}</p>
                                                            <p className="gridView-game">{jogo.is_free ? 'Gratuito' : 'Pago'}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className='gridView-nonResult'>Não existem jogos recomendados no momentos</p>
                                            )}
                                    </div>
                                </div>

                                {mostrarDados && ( 

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
                                                <button className='indicar__btn-aprovar' onClick={handleApproveClick}  style={{ cursor: activeItem ? 'pointer' : 'default' }}>Aprovar</button>
                                                <button className='indicar__btn-reprovar' onClick={handleRecommendedReproveClick} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Reprovar</button>
                                                <button className='indicar__btn-cancelar' onClick={handleCancelClick} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Fechar</button>
                                            </div>
                                        </div>
                                    </div>

                                )}

                            </>
                        )}
                    {/*    {opcaoSelecionada === 'reviews' && (*/}
                    {/*        <>*/}
                    {/*            <div className="admin__gridView-container">*/}
                    {/*                <div className="admin__toolbar-top">*/}
                    {/*                    <input*/}
                    {/*                        type="text"*/}
                    {/*                        placeholder="Pesquisar..."*/}
                    {/*                        className="admin__search-input"*/}
                    {/*                        value={searchTerm}*/}
                    {/*                        onChange={handleSearchReviewsChange}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className="admin__gridView">*/}
                    {/*                    {reviews.length > 0 ? (*/}
                    {/*                        reviews.map((review) => (*/}
                    {/*                            <li key={review.id} className="admin__gridView-cell">*/}
                    {/*                                    <div className="admin__gridView-cell-button-container">*/}
                    {/*                                    <FontAwesomeIcon icon={faEye} onClick={() => handleReviewViewClick(review)} />*/}
                    {/*                                    </div>*/}
                    {/*                                    <div className="admin__gridView-cell-button-container">*/}
                    {/*                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleReviewDeleteClick(review)} />*/}
                    {/*                                    </div>*/}
                    {/*                                    <div className="admin__gridView-cell-image-container">*/}
                    {/*                                    <img src={review.top_adr} alt="Banner jogo" />*/}
                    {/*                                    </div>*/}
                    {/*                                    <div className="admin__gridView-cell-text-container">*/}
                    {/*                                    <p className="gridView-game">{review.opinion}</p>*/}
                    {/*                                    */}{/*<p className="gridView-game">{review.grade}</p>*/}
                    {/*                                    <div className="card-post__nota card-post__content gridView-game-nota" style={{ backgroundColor: getCoresDasNotas(review.grade) }}>*/}
                    {/*                                        {review.grade}*/}
                    {/*                                    </div>*/}
                    {/*                                    </div>*/}

                    {/*                                </li>*/}
                    {/*                            ))*/}
                    {/*                        ) : (*/}
                    {/*                            <p className='gridView-nonResult'>Não existem reviews no momento</p>*/}
                    {/*                    )}*/}
                    {/*                </div>*/}
                    {/*            </div>*/}

                    {/*        {mostrarDados && (*/}
                    {/*            <div className="admin-card__container ">*/}
                    {/*                <div className="admin__card">*/}
                    {/*                    <h1>Dados da review</h1>*/}
                    {/*                    <div className="admin__row">*/}
                    {/*                        <div className="container__foto-content">*/}
                    {/*                            <div className="card-post__foto-container">*/}
                    {/*                                <img src={reviewPhotoAdr} alt="Foto perfil" className="card-post__foto" />*/}
                    {/*                            </div>*/}
                    {/*                            <div className="card-post__content-container">*/}
                    {/*                                <p className='card-post__user card-post__content"'>{reviewUserName}</p>*/}

                    {/*                                <p className="card-post__game card-post__content">{reviewGameName}</p>*/}
                    {/*                                <div className="card-post__nota card-post__content" style={{ backgroundColor: getCoresDasNotas(reviewGrade) }}>*/}
                    {/*                                    {reviewGrade}*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="admin__row">*/}
                    {/*                        <div className="card-post__descricao-container">*/}
                    {/*                            <div className="card-post__descricao">*/}
                    {/*                                <div className="card-post__descricao">*/}
                    {/*                                    <p>{reviewOpinion}</p>*/}
                    {/*                                </div>*/}
                    {/*                                <div>*/}
                    {/*                                    {reviewImageAdr && (*/}
                    {/*                                        <img src={reviewImageAdr} alt="Foto perfil" className="card-post__foto-opiniao" onClick={() => setLightboxImage(reviewImageAdr)} />*/}
                    {/*                                    )}*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="admin__row">*/}
                    {/*                        <button className="post-cardlike-button" data-review={activeItem}>*/}
                    {/*                            <FontAwesomeIcon icon={faThumbsUp} className={`post-cardlike-icon filled`} style={{ color: '#fff' }} />*/}
                    {/*                            <span className='post-cardlike-likes'>{reviewLikes} Curtidas</span>*/}
                    {/*                        </button>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="admin__btn-container">*/}
                    {/*                        <button className='indicar__btn-aprovar' onClick={handleCancelClick} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Fechar</button>*/}
                    {/*                        <button className='indicar__btn-reprovar' onClick={() => handleReviewDeleteClick()} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Remover</button>*/}
                    {/*                    </div>*/}

                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*        </>*/}
                    {/*)}*/}
                        {opcaoSelecionada === 'users' && (
                        <>
                            <div className="admin__gridView-container">
                                <div className="admin__toolbar-top">
                                    {/*<button className="botao btnSecundario toolbar-button" onClick={handleJogoAddClick}>*/}
                                    {/*    <FontAwesomeIcon icon={faPlus} className="icon-option" />*/}
                                    {/*    Adicionar jogo*/}
                                    {/*</button>*/}
                                    <input
                                        type="text"
                                        placeholder="Pesquisar..."
                                        className="admin__search-input"
                                        value={searchTerm}
                                        onChange={handleSearchUsersChange}
                                    />
                                </div>
                                <div className="admin__gridView">
                                 
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <li key={user.id} className="admin__gridView-cell" >
                                                <div className="admin__gridView-cell-button-container">
                                                    <FontAwesomeIcon icon={faPencil} onClick={() => handleUserEditClick(user)} />
                                                </div>
                                                <div className="admin__gridView-cell-button-container">
                                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleUserDeleteClick(user)} />
                                                </div>
                                                <div className="admin__gridView-cell-image-container">
                                                    <img src={user.photo_adr} alt="Foto perfil" />
                                                </div>
                                                <div className="admin__gridView-cell-text-container">
                                                    <p className="gridView-game">{user.user_name}</p>
                                                    <p className="gridView-game">{user.name}</p>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className='gridView-nonResult'>Não existem usuários cadastrados</p>
                                    )}
                                </div>
                            </div>

                            {mostrarDados && ( 

                                <div className="admin-card__container ">
                                    <div className="admin__card">
                                        <h1>Dados do usuário</h1>
                                        <div className="admin__row">
                                            <label htmlFor="nome" className='admin__label'>Nome:</label>
                                            <input type="text" name="nome" id="nome" className='admin__input' value={nomeUserInput} onChange={(e) => handleInputChange(e, setNomeUserInput)}
                                            />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="descricao" className='admin__label'>Email:</label>
                                            <input type="text" name="email" id="email" className='admin__input' value={emailInput} onChange={(e) => handleInputChange(e, setEmailInput)}
                                            />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="categoria" className='admin__label'>Nickname:</label>
                                            <input type="text" value={nickNameInput} name='user_name' id='user_name' className='admin__input' onChange={(e) => handleInputChange(e, setNickNameInput)}
                                            />
                                        </div>
                                        <div className="admin__row">
                                            <label htmlFor="categoria" className='admin__label'>Data aniversário:</label>
                                            <input type="date" value={dateInput} name='data_nasc' id='data_nasc' className='admin__input' onChange={(e) => handleInputChange(e, setDatenput)}
                                            />
                                        </div>
                                   
                                        <div className="perfil-info__info admin__perfil-info__plataformas">
                                            {steamUser && (
                                                <div>
                                                    <a href={`https://steamcommunity.com/id/${steamUser}`}>
                                                        <img src={Steam} alt="steam" />
                                                        {/*<span>{steamUser}</span>*/}
                                                    </a>
                                                </div>
                                            )}
                                            {discordUser && (
                                                <div>
                                                    <a href={`https://discordapp.com/users/${discordUser}`}>
                                                        <img src={Discord} alt="discord" />
                                                        {/*<span>{discordUser}</span>*/}
                                                    </a>
                                                </div>
                                            )}
                                            {epicUser && (
                                                <div>
                                                    <a href={`https://www.epicgames.com/id/${epicUser}`}>
                                                        <img src={EpicGames} alt="epic" />
                                                        {/*<span>{epicUser}</span>*/}
                                                    </a>
                                                </div>
                                            )}
                                            {twitchUser && (
                                                <div>
                                                    <a href={`https://www.twitch.tv/${twitchUser}`}>
                                                        <img src={Twitch} alt="twitch" />
                                                        {/*<span>{twitchUser}</span>*/}
                                                    </a>
                                                </div>
                                            )}
                                            {githubUser && (
                                                <div>
                                                    <a href={`https://github.com/${githubUser}`}>
                                                        <img src={Github} alt="github" />
                                                        {/*<span>{githubUser}</span>*/}
                                                    </a>
                                                </div>
                                            )}
                                        </div>

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

                                            <div className="admin__bannerImageContainer">
                                                <p className="admin__bannerImageText">Banner de capa</p>
                                                <div className="admin__bannerImageWrap">
                                                    {selectedBannerImage && (
                                                        <div className="admin__image-preview image-preview__banner">
                                                            <img src={selectedBannerImage} alt="Imagem de capa" onClick={() => handleClearImage(setSelectedBannerImage)} />
                                                            <label className="admin__overlay" onClick={() => handleClearImage(setSelectedBannerImage)}>
                                                                <FontAwesomeIcon icon={faPencil} />
                                                            </label>
                                                        </div>
                                                    )}
                                                    {!selectedBannerImage && (
                                                        <label htmlFor="indicar__baner" className="admin__file-input-label">
                                                            <FontAwesomeIcon icon={faPencil} />
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
                                            <button className='indicar__btn-aprovar' onClick={handleUpdateUser} style={{ cursor: 'pointer' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} style={{ cursor: 'pointer' }}>Cancelar</button>
                                        </div>

                                    </div>
                                </div>

                            )}

                        </>
                    )}
                        {opcaoSelecionada === 'admins' && (
                            <>
                            <div className="admin__gridView-container">
                                <div className="admin__toolbar-top">
                                    <button className="botao btnSecundario toolbar-button" onClick={handleAdminAddClick}>
                                        <FontAwesomeIcon icon={faPlus} className="icon-option" />
                                        Adicionar
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Pesquisar..."
                                        className="admin__search-input"
                                        value={searchTerm}
                                        onChange={handleSearchAdminChange}
                                    />
                                </div>
                                    <div className="admin__gridView">
                                       {admins.length > 0 ? (
                                            admins.map((admin) => (
                                                <li key={admin.id} className="admin__gridView-cell" >
                                                    <div className="admin__gridView-cell-button-container">
                                                        <FontAwesomeIcon icon={faPencil} onClick={() => handleAdminEditClick(admin)} />
                                                    </div>
                                                    <div className="admin__gridView-cell-button-container">
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleAdminDeleteClick(admin)} />
                                                    </div>
                                                    <div className="admin__gridView-cell-image-container">
                                                        <img src={admin.photo_adr} alt="Foto perfil" onError={handleImageError} />
                                                    </div>
                                                    <div className="admin__gridView-cell-text-container">
                                                        <p className="gridView-game">{admin.user_name}</p>
                                                        <p className="gridView-game">{admin.name}</p>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='gridView-nonResult'>Não existem administradores cadastrados</p>
                                        )}
                                    </div>
                                </div>

                            {mostrarDados && (
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
                                        {adicionar && (
                                            <>
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
                                            </>
                                        )}
                                        <div className="admin__btn-container">
                                            <button className='indicar__btn-aprovar' onClick={handleUpdateAdmin} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Confirmar</button>
                                            <button className='indicar__btn-reprovar' onClick={handleCancelClick} style={{ cursor: activeItem ? 'pointer' : 'default' }}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </>
                        )}
                    </div>
            {/*</div>*/}
            </div>
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
            {lightboxImage && (
                <Lightbox
                    imageSrc={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                />
            )}
        </div >
    );
}

export default Admin;
