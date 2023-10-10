import './Perfil.css'

import React, { useState } from 'react';
<<<<<<< HEAD
=======
import { useParams } from 'react-router-dom';
>>>>>>> origin/games
import Steam from './icons/steam.png'
import Discord from './icons/discord.png'
import EpicGames from './icons/epic-games.png'
import Twitch from './icons/twitch.png'
import Github from './icons/github.png'

import ConfigButton from './components/ConfigButton';

import PostButton from './components/postButton';
import Navbar from './components/navbar';

import Banner from './image/banner-cleber.png'
import FotoPerfil from './image/perfil-cleber.png'

import Stray from './icons/Render background/icon-Stray.png'
import Valorant from './icons/Render background/icon - valorant.png'
import NeonWhite from './icons/Render background/icon - Neon White.png'
<<<<<<< HEAD
=======
import api from './services/Api';
import { getUser } from './services/Auth';
import { Modals } from './components/Modals';
>>>>>>> origin/games

import { FaUserPlus, FaCheck } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Perfil = () => {
<<<<<<< HEAD
    const [following, setFollowing] = useState(false);
    const [liked, setLiked] = useState(false);
    const isPerfilPessoal = false;  //false = outro user, true = user pessoal
    const spanValueSteam = 'Rodolfinho08';
    const spanValueDiscord = 'Dolfi#2917';
    const spanValueEpic = 'RodolfinhoGamers';
    const spanValueTwitch = 'rOdOL25k';
    const spanValueGithub = 'DolfDev';
=======
    const [following, setFollowing] = useState('');
    const [liked, setLiked] = useState('');
    const [name ,setName]= useState ('');
    // const [mail ,setMail]= useState ('');
    // const [user_name, setUsername] = useState();
    const [followed, setFollowed] = useState('');
    const [description, setDescription] = useState('');

    const isPerfilPessoal = false;  //false = outro user, true = user pessoal

    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [steamNick, setSteamNick] = useState('');
    const [epicGamesNick, setEpicGamesNick] = useState('');
    const [twitchNick, setTwitchNick] = useState('');
    const [githubNick, setGithubNick] = useState('');
    const [discordNick, setDiscordNick] = useState('');

    const getCurrentUser = async() => {

        let user = await getUser();
        if (user) {
                const response = await api.get('./api/users?id=' + user.id);
                if (response.data.id){
                    
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
                    
                }
        }
    }
    

>>>>>>> origin/games
    const handleFollow = () => {
        setFollowing(!following);
    };


    const handleLike = () => {
        setLiked(!liked);
    };

<<<<<<< HEAD
=======
    // const handleUser_nameChange = (event) => {
    //     setUsername(event.target.value);
    // };


    getCurrentUser()
>>>>>>> origin/games
    return (
        <div className='perfil__page-container'>
            <Navbar />
            <header className="perfil-banner__container">

<<<<<<< HEAD
                <img src={Banner} alt="Banner usuário" className='perfil-banner__banner' />
                <div className="perfil-banner__foto">
                    <img src={FotoPerfil} alt="Foto perfil" className='perfil__foto' />
                </div>
                <ConfigButton />
=======
                <img src={bannerImage} alt="Banner usuário" className='perfil-banner__banner' />
                <div className="perfil-banner__foto">
                    <img src={profileImage} alt="Foto perfil" className='perfil__foto' />
                </div>
                <ConfigButton >
                </ConfigButton>
>>>>>>> origin/games
            </header>

            <div className="perfil-info-post__container">
                <div className="perfil-info__container">
                    <section className="perfil-info__nome-container">
                        <div className="perfil-info__follow-container">
<<<<<<< HEAD
                            <h1>Cleber</h1>
=======
                            <h1>{name}</h1>
>>>>>>> origin/games
                            {!isPerfilPessoal && (
                                <button
                                    className={`perfil-info__follow-button ${following ? 'following' : ''}`}
                                    onClick={handleFollow}
                                >
                                    {following ? (
                                        <FaCheck className="perfil-info__follow-icon" />
                                    ) : (
                                        <FaUserPlus className="perfil-info__follow-icon" />
                                    )}
                                    {following ? 'Seguindo' : 'Seguir'}
                                </button>
                            )}
                        </div>
                        <div className="perfil-info__follow-container">
<<<<<<< HEAD
                            <p className='perfil-info__folllow'>97 seguidores</p>
                            <p className='perfil-info__folllow'>552 seguindo</p>
=======
                            <p className='perfil-info__folllow'>{followed} seguidores</p>
                            <p className='perfil-info__folllow'>{following} seguindo</p>
>>>>>>> origin/games
                        </div>

                    </section>
                    <section className="perfil-info__info-container">
                        <div className="perfil-info__info perfil-info__plataformas">
                            <div>
<<<<<<< HEAD
                                <a href={`https://steamcommunity.com/id/${spanValueSteam}`}>
                                    <img src={Steam} alt="steam" />
                                    <span>Cleber_Fire</span>
                                </a>
                            </div>
                            <div>
                                <a href={`https://discordapp.com/users/${spanValueDiscord}`}>
                                    <img src={Discord} alt="discord" />
                                    <span>CleberBow#1322</span>
                                </a>
                            </div>
                            <div>
                                <a href={`https://www.epicgames.com/id/${spanValueEpic}`}>
                                    <img src={EpicGames} alt="epic" />
                                    <span>CleberFireXx</span>
                                </a>
                            </div>
                            <div>
                                <a href={`https://www.twitch.tv/${spanValueTwitch}`}>
                                    <img src={Twitch} alt="twitch" />
                                    <span>cLebinhoBowXX</span>
                                </a>
                            </div>
                            <div>
                                <a href={`https://github.com/${spanValueGithub}`}>
                                    <img src={Github} alt="github" />
                                    <span>CleberV</span>
=======
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
>>>>>>> origin/games
                                </a>
                            </div>
                        </div>
                        <div className="perfil-info__info perfil-info__descricao">
                            <h2>Descrição</h2>
<<<<<<< HEAD
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit corporis quaerat veniam cum, debitis aliquam cumque mollitia aspernatur. Atque enim sit at rerum vitae placeat eveniet omnis aliquam dolorum hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, in minima illo dignissimos, natus commodi aliquam perspiciatis laudantium similique ratione adipisci nostrum delectus aliquid at nam impedit possimus. Inventore, blanditiis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque magni rem dolor et, neque quod libero saepe, repellat ad id velit vel inventore voluptatem facilis eligendi adipisci nesciunt illum? Harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab est veniam, omnis ducimus, delectus soluta ipsum quidem architecto eligendi laborum illum voluptas enim explicabo vero, praesentium ex aliquid at cum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores saepe ullam, iste deserunt totam magni impedit laborum doloribus laboriosam ipsam in illo eius. Ad quae quis similique rem nam nemo! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil iste laboriosam minima voluptatem. Autem voluptas, ut sit voluptatum perspiciatis blanditiis hic deleniti sunt reiciendis consequuntur beatae sed inventore ducimus aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ipsam, autem corrupti magni eius blanditiis et ea in natus eveniet itaque, ab, iure suscipit mollitia inventore? Quisquam ex optio maiores.</p>
=======
                            <p>{description}</p>
>>>>>>> origin/games
                        </div>
                    </section>
                </div>
                <div className="perfil-post__container">
                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src={Stray} alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Stray</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                    </article>

                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src={Valorant} alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Valorant</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                        <button className="perfil-post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`perfil-post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </article>

                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src={NeonWhite} alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Neon White</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                    </article>
                </div>
            </div>

            <PostButton />
        </div>
    )
}

export default Perfil