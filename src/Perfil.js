import './Perfil.css';
import React, { useState, useEffect, useId } from 'react';
import { useParams } from 'react-router-dom';
import Steam from './icons/steam.png';
import Discord from './icons/discord.png';
import EpicGames from './icons/epic-games.png';
import Twitch from './icons/twitch.png';
import Github from './icons/github.png';
import ConfigButton from './components/ConfigButton';
import PostButton from './components/postButton';
import Navbar from './components/navbar';
import Banner from './image/banner-cleber.png';
import FotoPerfil from './image/perfil-cleber.png';
import api from './services/Api';
import { getUser } from './services/Auth';
import { FaUserPlus, FaCheck } from 'react-icons/fa';

const Perfil = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [following, setFollowing] = useState('');
  const [liked, setLiked] = useState('');
  const [name, setName] = useState('');
  const [followed, setFollowed] = useState('');
  const [description, setDescription] = useState('');
  const isPerfilPessoal = true; //false = outro user, true = user pessoal
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [steamNick, setSteamNick] = useState('');
  const [epicGamesNick, setEpicGamesNick] = useState('');
  const [twitchNick, setTwitchNick] = useState('');
  const [githubNick, setGithubNick] = useState('');
  const [discordNick, setDiscordNick] = useState('');
  const [posts, setPosts] = useState([]);
  const initialUserId = params.get('id');
  const [userId, setUserId] = useState(initialUserId);
  

  const getCurrentUser = async () => {
    let user = await getUser();
    if (user) {
      const response = await api.get('./api/users?id=' + user.id);
      if (response.data.id) {
        setName(response.data.name);
        setFollowed(response.data.followed);
        setFollowing(response.data.following);
        setDescription(response.data.description);
        setTwitchNick(response.data.twitch_user);
        setDiscordNick(response.data.discord_user);
        setEpicGamesNick(response.data.epic_user);
        setSteamNick(response.data.steam_user);
        setGithubNick(response.data.github_user);
        setProfileImage(response.data.photo_adr);
        setBannerImage(response.data.top_adr);
        setUserId(response.data.id);
      }
    }
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

  const handleFollow = () => {
    setFollowing(!following);
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
            console.log(userResponse);
            console.log(gameResponse);
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
      setPosts([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPosts(userId);
    };
    fetchData();
  }, [userId]);

  getCurrentUser();

  return (
    <div className="perfil__page-container">
      <Navbar />
      <header className="perfil-banner__container">
        <img src={bannerImage} alt="Banner usuário" className="perfil-banner__banner" />
        <div className="perfil-banner__foto">
          <img src={profileImage} alt="Foto perfil" className="perfil__foto" />
        </div>
        <ConfigButton></ConfigButton>
      </header>

      <div className="perfil-info-post__container">
        <div className="perfil-info__container">
          <section className="perfil-info__nome-container">
            <div className="perfil-info__follow-container">
              <h1>{name}</h1>
              {!isPerfilPessoal && (
                <button
                  className={`perfil-info__follow-button ${following ? 'following' : ''}`}
                  onClick={handleFollow}
                >
                  {following ? <FaCheck className="perfil-info__follow-icon" /> : <FaUserPlus className="perfil-info__follow-icon" />}
                  {following ? 'Seguindo' : 'Seguir'}
                </button>
              )}
            </div>
            <div className="perfil-info__follow-container">
              <p className="perfil-info__folllow">{followed} seguidores</p>
              <p className="perfil-info__folllow">{following} seguindo</p>
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
                  <a href="">
                    <img src={post.gamePhoto} alt="Foto jogo" className="perfil-post-card__foto" />
                  </a>
                </div>
                <div className="perfil-post-card__content-container">
                  <a href={`jogo?id=${post.game_id}`} className="perfil-post-card__game perfil-post__content">{post.gameName}</a>
                  <div className="perfil-post-card__nota perfil-post__content" style={{ backgroundColor: getCoresDasNotas(post.grade) }}>
                  {post.grade}
                </div>
                </div>
              </div>
              <div className="perfil-post-card__descricao">
                    <p alt="Opiniao" className="perfil-post-card__descricao-txt">{post.opinion}</p>
                    {post.image_adr && (
                      <img src={post.image_adr} alt="Foto perfil" className="perfil-post-card__descricao-img" />
                    )}
                  </div>
            </article>
          ))}
        </div>
      </div>

      <PostButton />
    </div>
  );
};

export default Perfil;