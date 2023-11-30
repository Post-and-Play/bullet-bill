import './Perfil.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './image/banner0.png';
import FotoPerfil from './image/foto.png';
import Steam from './icons/steam.png';
import Discord from './icons/discord.png';
import EpicGames from './icons/epic-games.png';
import Twitch from './icons/twitch.png';
import Github from './icons/github.png';
import ConfigButton from './components/ConfigButton';
import PostButton from './components/postButton';
import Navbar from './components/navbar';
import Lightbox from './components/LightBox';
import api from './services/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { getAuth } from './services/Auth';
import { Modals } from './components/Modals';

const Perfil = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const initialUserId = params.get('id');

    const [currentUser, setCurrentUser] = useState();
    const [following, setFollowing] = useState();
    const [followingId, setFollowingId] = useState(null);
    const [liked, setLiked] = useState('');
    const [name, setName] = useState('');
    const [followed, setFollowed] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [steamNick, setSteamNick] = useState('');
    const [epicGamesNick, setEpicGamesNick] = useState('');
    const [twitchNick, setTwitchNick] = useState('');
    const [githubNick, setGithubNick] = useState('');
    const [discordNick, setDiscordNick] = useState('');
    const [posts, setPosts] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [userIdU, setUserIdU] = useState(initialUserId); //you
    const [userId, setUserId] = useState(initialUserId);
    const navigate = useNavigate();
    const isPerfilPessoal = userId ? false : true;
    const [followingCount, setFollowingCount] = useState();

    const handleCheckFollowing = async (user, userid) => {
        try {
            if (!user.id || !userId) {
            console.error('IDs de usuário inválidos');
            return;
        }

        // Verifique se o `userId` não é o mesmo que o `currentUser.id`
            if (user.id === userId) {
            console.error('Você não pode verificar se segue a si mesmo.');
            return;
        }

        // Envie uma solicitação à API para verificar se o usuário atual segue o usuário da página atual
            const response = await api.get(`/api/follow?following_user_id=${user.id}&followed_user_id=${userid}`);

        if (response.data.id) {
                // O usuário atual já segue o usuário da página atual
                setFollowingId(response.data.id);
                setFollowing(true);
        } else {
                // O usuário atual não segue o usuário da página atual
                setFollowing(false);
        }
        } catch (error) {
            console.error('Erro ao verificar se o usuário segue:', error);
            setFollowing(false);
        }
    };

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {

            await setCurrentUser(user);

            if (userId) {
                let userPerfil = await getUserData();
                if (userPerfil) {
                    setName(userPerfil.name);
                    setFollowed(userPerfil.followed);
                    setFollowing(userPerfil.following);
                    setDescription(userPerfil.description);
                    setTwitchNick(userPerfil.twitch_user);
                    setDiscordNick(userPerfil.discord_user);
                    setEpicGamesNick(userPerfil.epic_user);
                    setSteamNick(userPerfil.steam_user);
                    setGithubNick(userPerfil.github_user);
                    setProfileImage(userPerfil.photo_adr);
                    setBannerImage(userPerfil.top_adr);
                    await getPosts(userPerfil.id);

                    //Verifique se o usuário atual segue o usuário da página atual
                    if (user) {
                        if (user.id && userId) {
                            await handleCheckFollowing(user, userId);
                        }
                    } else {
                        navigate('/');
                    }

                }
            } else {
                setUserIdU(user.id);
                setUserId(null);
                setName(user.name);
                setFollowed(user.followed);
                setFollowing(user.following);
                setDescription(user.description);
                setTwitchNick(user.twitch_user);
                setDiscordNick(user.discord_user);
                setEpicGamesNick(user.epic_user);
                setSteamNick(user.steam_user);
                setGithubNick(user.github_user);
                setProfileImage(user.photo_adr);
                setBannerImage(user.top_adr);
                await getPosts(user.id);
            }

        } else {
            navigate('/home');
        }

    };

    const getUserData = async () => {
        try {
            const response = await api.get(`/api/users?id=${userId}`);
            if (response.data.id) {
            return response.data;
            }
            return null
        } catch (err) {
            console.log(err.message);
            return null
        }
    }

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

    const handleFollow = async () => {
        try {
            if (!currentUser.id || !userId) {
                console.error('IDs de usuário inválidos');
                return;
            }

            // Verifique se o `userId` não é o mesmo que o `currentUser.id`
            if (currentUser.id == userId) {
                console.error('Você não pode seguir a si mesmo.');
                return;
            }

            // Converta os IDs para inteiros
            const followingUserId = parseInt(currentUser.id);
            const followedUserId = parseInt(userId);

            // Envie uma solicitação à API para criar um novo registro na tabela "follow"
            const followData = {
                following_user_id: followingUserId,
                followed_user_id: followedUserId,
            };

            // Enviar os dados para a API usando um pedido POST
            const response = await api.post('/api/follow', followData);

            if (response.data.id) {
                // A ação foi bem-sucedida, você pode realizar alguma ação adicional aqui
                // Atualize o estado `following` para refletir a ação do usuário
                setFollowingId(response.data.id);
                setFollowing(true); // ou setFollowing(!following) dependendo de como você deseja atualizar o estado
                await getCurrentUser();

            } else {
                console.error('Falha ao seguir o usuário:', response.data.message);
            }
        } catch (error) {
            console.log(currentUser.id);
            console.log(userId);
            console.error('Erro ao seguir o usuário:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            if (!currentUser.id || !userId) {
                console.error('IDs de usuário inválidos');
                return;
            }
            console.log(userId, currentUser.id)

            // Verifique se o `userId` não é o mesmo que o `currentUser.id`
            if (currentUser.id == userId) {
                console.error('Você não pode deixar de seguir a si mesmo.');
                return;
            }

            // Execute a solicitação DELETE à API para deixar de seguir o usuário
            const response = await api.delete(`/api/follow?id=${followingId}`);

            console.log(followingId)
            if (response.data.OK) {
                // A ação de deixar de seguir foi bem-sucedida.
                // Atualize o estado `following` para refletir que o usuário não está mais seguindo.
                setFollowing(false);
                await getCurrentUser();
            } else {
              window.location.reload()
                // console.error('Falha ao deixar de seguir o usuário:', response.data.message);
                
            }
        } catch (error) {
            console.error('Erro ao deixar de seguir o usuário:', error);
            window.location.reload()
        }
    };

    // Função para obter o número de seguidores
    const getFollowingCount = async () => {
      try {
          if (userId) {
              const response = await api.get(`/api/users?id=${userId}`);
              if (response.data.id) {
                  setFollowingCount(response.data.following);
              } else {
                  setFollowingCount(0);
              }
          }
      } catch (error) {
          console.error('Erro ao obter o número de seguidores:', error);
      }
    };

    const getPosts = async (userId) => {
        try {
            console.log("userId in getReviews:", userId);

            const response = await api.get(`/api/reviews/user?id=${userId}`);
            console.log(response.data);

            if (response.data) {
            const filteredPosts = response.data.filter((post) => post.user_id === parseInt(userId));
            const mappedPosts = await Promise.all(
                filteredPosts.map(async (post) => {
                const userResponse = await api.get(`/api/users?id=${post.user_id}`);
                const gameResponse = await api.get(`/api/games?id=${post.game_id}`);
              
                return {
                    ...post,
                    userPhoto: userResponse.data.photo_adr,
                    username: userResponse.data.name,
                    gamePhoto: gameResponse.data.top_adr,
                    gameName: gameResponse.data.name,
                };
                })
            );
            
            
           
            
            setPosts(mappedPosts);
            } else {

            setPosts([]);
            }
        } catch (err) {
            console.log(err.message);
            setPosts([]);
        }
    };

    const handleDeleteReview = async (userIdU, postUserId) => {
        if (!currentUser || !currentUser.id) {
            console.error("ID do usuário não é válido:", currentUser);
            return;
        }

        if (root) {
            modals.htmlDialog(
                root,
                'Remover essa postagem?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt) => {
                        // Converta ambos os IDs para números inteiros
                        const userIdInt = parseInt(userIdU);
                        const currentUserID = parseInt(currentUser.id);

                        if (currentUserID === postUserId) {
                            console.log("Permissão concedida. IDs correspondem.");
                            try {
                                await api.delete(`/api/review?id=${userIdInt}`);

                                // Atualize o estado `posts` para refletir que a revisão foi removida
                                setPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== userIdInt));
                            } catch (error) {
                                console.error('Erro ao deletar a revisão:', error);
                            }
                        } else {
                            console.error("Você não tem permissão para excluir esta revisão.");
                        }
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }
       
    };

    const handleBannerError = (event) => {
        event.target.src = Banner;
    }

    const handleImageError = (event) => {
        event.target.src = FotoPerfil;
    }

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            await getFollowingCount()
            loading.close();
        };
        fetchData();
    }, []);

      return (
          <div className="container-root">
          <Navbar currentUser={currentUser} />
            <header className="perfil-banner__container">
            <img src={!bannerImage ? Banner : bannerImage} alt="Banner usuário" className="perfil-banner__banner" onError={handleBannerError} />
            <div className="perfil-banner__foto">
               <img src={profileImage} alt="Foto perfil" className="perfil__foto" onError={handleImageError} />
            </div>
            {!userId ? <ConfigButton currentUser={currentUser} /> : <br />}
          </header>
          <div className="perfil-info-post__container">
            <div className="perfil-info__container">
              <section className="perfil-info__nome-container">
                <div className="perfil-info__follow-container">
                  <h1>{name}</h1>
                  {!isPerfilPessoal && (
                    <button
                    className={`perfil-info__follow-button ${following ? 'following' : ''}`}
                    onClick={following ? handleUnfollow : handleFollow}
                  >
                    {following ? 'Deixar de Seguir' : 'Seguir'}
                  </button>
                  )}
                </div>
                <div className="perfil-info__follow-container">
                  <p className="perfil-info__folllow">{followed} seguidores</p>
                  <p className="perfil-info__folllow">{followingCount} seguindo</p>
                  {console.log(followingCount)}
                </div>
              </section>
              <section className="perfil-info__info-container">
                <div className="perfil-info__info perfil-info__plataformas">
                  <div>
                    <a href={`https://steamcommunity.com/id/${steamNick}`}>
                      <img src={Steam} alt="steam" />
                      <span>{steamNick}</span>
                    </a>
                  </div>
                  <div>
                    <a href={`https://discordapp.com/users/${discordNick}`}>
                      <img src={Discord} alt="discord" />
                      <span>{discordNick}</span>
                    </a>
                  </div>
                  <div>
                    <a href={`https://www.epicgames.com/id/${epicGamesNick}`}>
                      <img src={EpicGames} alt="epic" />
                      <span>{epicGamesNick}</span>
                    </a>
                  </div>
                  <div>
                    <a href={`https://www.twitch.tv/${twitchNick}`}>
                      <img src={Twitch} alt="twitch" />
                      <span>{twitchNick}</span>
                    </a>
                  </div>
                  <div>
                    <a href={`https://github.com/${githubNick}`}>
                      <img src={Github} alt="github" />
                      <span>{githubNick}</span>
                    </a>
                  </div>
                </div>
                <div className="perfil-info__info perfil-info__descricao">
                  <h2>Descrição</h2>
                  <p>{description}</p>
                </div>
              </section>
            </div>
            <div className="perfil-post__container">
              {posts.map((post) => (
                <article key={post.id} className="perfil-post__post">
                  <div className="perfil-post-container__foto-content">
                    <div className="perfil-post-card-post__foto-container">
                      <a href={`/jogo?id=${post.game_id}`}>
                        <img src={post.gamePhoto} alt="Foto jogo" className="perfil-post-card__foto" />
                      </a>
                    </div>
                    <div className="perfil-post-card__content-container">
                      <a href={`/jogo?id=${post.game_id}`} className="perfil-post-card__game perfil-post__content">{post.gameName}</a>
                      <div className="perfil-post-card__nota perfil-post__content" style={{ backgroundColor: getCoresDasNotas(post.grade) }}>
                        {post.grade}
                      </div>
                    </div>
                  </div>
                    <div className="perfil-post-card__descricao">
                        <p alt="Opiniao" className="perfil-post-card__descricao-txt">{post.opinion}</p>
                        {post.image_adr && (
                          <img src={post.image_adr} alt="Foto perfil" className="perfil-post-card__descricao-img" onClick={() => setLightboxImage(post.image_adr)} />
                        )}
                    </div>
                    <div className="perfil-post_remove">
                        {userIdU === currentUser.id && (
                              <FontAwesomeIcon
                                            icon={faTrash}
                                            className='delete-icon'
                                            onClick={() => handleDeleteReview(post.id, post.user_id)} // Use uma função anônima
                                        />
                        )}
                    </div>
                </article>
              ))}
            </div>
          </div>
          {lightboxImage && (
            <Lightbox
              imageSrc={lightboxImage}
              onClose={() => setLightboxImage(null)}
            />
          )}
          <PostButton currentUser={currentUser} />
        </div>
      );
};

export default Perfil;