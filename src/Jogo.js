import './Jogo.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FotoPerfil from './image/foto.png'
import UnoPerfil from './image/uno-perfil.png'
import UnoBanner from './image/banner-uno.png'
import LoopHero from './image/loop-hero.png'
import DuelLink from './image/duel-link.png'
import Hearthstone from './image/hearthstone.png'
import HeartIcon from './icons/heart-solid.svg'

import Adalberto from './image/perfil-adalberto.png';
import Cleber from './image/perfil-cleber.png';

import Navbar from './components/navbar';
import PostButton from './components/postButton'

import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import arrowDownCircleFill from '@iconify-icons/bi/arrow-down-circle-fill';

<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

const Jogo = () => {
=======
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import api from './services/Api';
import { Modals } from './components/Modals';

const Jogo = () => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const gameId = params.get('id');
    const root = document.getElementById('root');
    const modals = new Modals();

    const [name, setName] = useState('');
    const [genders, setGenders] = useState('');
    const [description, setDescription] = useState('');
    const [coverAdr, setCoverAdr] = useState('');
    const [topAdr, setTopAdr] = useState('');
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState('');
    const [genderArray, setGenderArray] = useState([]);

    if (!gameId) {
        if (root) {
            modals.htmlDialog(
                root,
                'Identificador do Game inválido!',
                modals.msgboxButtons.okOnly,
                modals.msgboxIcons.warning,
                'Mensagem!',
                {
                    ok: (evt) => {
                        return;
                    }
                });
        }
    }

>>>>>>> origin/games
    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        nextArrow: <></>,
        prevArrow: <></>,
    };

    const images = [
        LoopHero,
        DuelLink,
        Hearthstone,
        FotoPerfil,
        FotoPerfil,
        FotoPerfil,
        FotoPerfil,
        FotoPerfil,
        FotoPerfil
    ];

    const handleSlideDown = () => {
        if (sliderRef.current) {
            const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
            const slidesToShow = settings.slidesToShow;
            const nextSlideIndex = slideIndex + slidesToShow;
            sliderRef.current.slickGoTo(nextSlideIndex);
        }
    };

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

<<<<<<< HEAD
=======
    const getCurrentGame = async () => {
        try {

            const response = await api.get('./api/games?id=' + gameId);
            if (response.data.id) {
                setName(response.data.name);
                setGenders(response.data.genders);
                setDescription(response.data.description);
                setCoverAdr(response.data.cover_adr);
                setTopAdr(response.data.top_adr);
                setRating(response.data.rating);
                setReviews(response.data.reviews);
                setGenderArray(genders.split(',').map((genders) => genders.trim()));
            }
            else {
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Game não encontrado!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }
            }

        }
        catch (err) {
            if (root) {
                modals.htmlDialog(
                    root,
                    'Game não encontrado!\n' + err.message,
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.warning,
                    'Mensagem!',
                    {
                        ok: (evt) => {

                        }
                    });
            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await getCurrentGame();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

>>>>>>> origin/games
    return (
        <div>
            <Navbar />
            <div className="jogo__banner-container">
<<<<<<< HEAD
                <img src={UnoBanner} alt="Banner" className='jogo__banner' />
                <div className="jogo__info-container">
                    <div className="jogo__info-img-container">
                        <div className="jogo__info-img">
                            <img src={UnoPerfil} alt="Foto jogo" />
=======
                <img src={coverAdr} alt="Banner" className='jogo__banner' />
                <div className="jogo__banner_gradient"></div>
                <div className="jogo__info-container">
                    <div className="jogo__info-img-container">
                        <div className="jogo__info-img">
                            <img src={topAdr} alt="Foto jogo" />
>>>>>>> origin/games
                        </div>
                        <div className="jogo__info-jogo-container">
                            <div className="jogo__info-titulo-container">
                                <div className="jogo__info-titulo">
<<<<<<< HEAD
                                    <h1 className='jogo__titulo'>Uno</h1>
=======
                                    <h1 className='jogo__titulo'>{name}</h1>
>>>>>>> origin/games
                                    <div className="jogo__nota-jogo">
                                        <span>5.2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="jogo__categoria-container">
<<<<<<< HEAD
                                <div className="jogo__categoria">Party</div>
                                <div className="jogo__categoria">Estratégia</div>
=======
                                {genderArray.map((genders, index) => (
                                    <div key={index} className="pesquisa__categoria">
                                        {genders}
                                    </div>
                                ))}
                                {/*<div className="jogo__categoria">Party</div>*/}
                                {/*<div className="jogo__categoria">Estratégia</div>*/}
>>>>>>> origin/games
                            </div>
                            <div className="jogo__rank-container">
                                <div className="jogo__rank">
                                    <Icon icon="solar:ranking-linear" className='jogo__rank-icon' />
<<<<<<< HEAD
                                    <span className='jogo__rank-ranking'>Ranking: #50</span>
=======
                                    <span className='jogo__rank-ranking'>Ranking: #{rating}</span>
>>>>>>> origin/games
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jogo__sinopse-container">
                        <div className="jogo__sinopse">
                            <Icon icon="mingcute:quote-left-fill" className='jogo__sinopse-quoteIcon quoteIcon-left' />
<<<<<<< HEAD
                            <p className='jogo__sinopse-texto'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam autem laborum expedita ab veniam sapiente consequatur vero sed vel sit ipsa quas fugiat, nemo officia, sunt aspernatur animi blanditiis atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eligendi odio optio nihil quis? Voluptatibus, laborum sapiente perspiciatis repellat ea voluptatem impedit illo laudantium repellendus. Illum aspernatur delectus iste rem!</p>
=======
                            <p className='jogo__sinopse-texto'>{description}</p>
>>>>>>> origin/games
                            <Icon icon="mingcute:quote-right-fill" className='jogo__sinopse-quoteIcon quoteIcon-right' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="jogo__semelhantes-slider">
                <div className="jogo__semelhantes-container">
                    <Slider ref={sliderRef} {...settings} className="slider-centered">
                        {images.map((image, index) => (
                            <div key={index} className="image-slider__item">
                                <a href="#">
                                    <img src={image} alt={`Imagem ${index + 1}`} className="image-slider__image" />
                                </a>
                            </div>
                        ))}
                    </Slider>
                    <div className="carousel-icon slider-centered" onClick={handleSlideDown} >
                        <Icon icon="ep:arrow-up-bold" rotate={2} />
                    </div>
                </div>
            </div>
            <div className="jogo__posts-container">
                <div className="jogo__post">
                    <div className="jogo__post-info-perfil-container">
                        <a href="#" className='jogo__post-foto-user'>
                            <img src={Cleber} alt="Foto perfil" className='jogo__post-foto-user' />
                        </a>
                        <div className="jogo__post-info-user">
                            <p className='jogo__post-nomeUser'>Cleber</p>
                            <div className="jogo__post-nota">10</div>
                        </div>
                    </div>
                    <div className="jogo__post-descricao-container">
                        <div className="jogo__post-descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim natus iste aliquid vel tenetur animi! Repellendus reprehenderit natus sapiente suscipit. Ex deserunt corrupti quasi perferendis officia ad. Qui, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis, architecto quia molestias numquam mollitia. Alias possimus laboriosam accusantium? Laudantium, culpa mollitia consequatur quo qui vitae numquam magnam quisquam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quidem quam dolor modi iste ea, eius et magnam in. Modi ipsum dignissimos ab atque nemo nam, quasi fugit. Impedit, minus.</p>
                        </div>
                    </div>
                    <button className="post-cardlike-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${liked ? 'filled' : ''}`} />
                    </button>
                </div>
                <div className="jogo__post">
                    <div className="jogo__post-info-perfil-container">
                        <a href="#" className='jogo__post-foto-user'>
                            <img src={Adalberto} alt="Foto perfil" className='jogo__post-foto-user' />
                        </a>
                        <div className="jogo__post-info-user">
                            <p className='jogo__post-nomeUser'>Adalberto</p>
                            <div className="jogo__post-nota">10</div>
                        </div>
                    </div>
                    <div className="jogo__post-descricao-container">
                        <div className="jogo__post-descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim natus iste aliquid vel tenetur animi! Repellendus reprehenderit natus sapiente suscipit. Ex deserunt corrupti quasi perferendis officia ad. Qui, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis, architecto quia molestias numquam mollitia. Alias possimus laboriosam accusantium? Laudantium, culpa mollitia consequatur quo qui vitae numquam magnam quisquam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quidem quam dolor modi iste ea, eius et magnam in. Modi ipsum dignissimos ab atque nemo nam, quasi fugit. Impedit, minus.</p>
                        </div>
                    </div>
                    <button className="post-cardlike-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${liked ? 'filled' : ''}`} />
                    </button>
                </div>
                <div className="jogo__post">
                    <div className="jogo__post-info-perfil-container">
                        <a href="#" className='jogo__post-foto-user'>
                            <img src="" alt="Foto perfil" className='jogo__post-foto-user' />
                        </a>
                        <div className="jogo__post-info-user">
                            <p className='jogo__post-nomeUser'>Cleber</p>
                            <div className="jogo__post-nota">10</div>
                        </div>
                    </div>
                    <div className="jogo__post-descricao-container">
                        <div className="jogo__post-descricao">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, possimus. Praesentium esse reiciendis maxime, harum amet unde incidunt quibusdam? Earum nobis dolor animi deserunt est iste! Quisquam magni placeat quaerat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, minus quibusdam consequatur inventore deserunt velit maiores sequi tempora minima eos possimus voluptatem, ab exercitationem totam, adipisci reiciendis tenetur beatae expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat blanditiis sed, molestiae exercitationem doloribus reprehenderit enim officia consequatur illum! Possimus tenetur aspernatur magnam nemo rem incidunt similique? Sint, sequi veniam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores perspiciatis rem doloremque quidem eaque voluptas sed veniam hic tempora fuga dicta rerum non quia ab dolorum mollitia, esse modi ex? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae minima consectetur illum molestiae, veniam beatae quos aut repellendus maxime. Sit laborum veniam atque inventore saepe veritatis consectetur hic voluptate aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim natus iste aliquid vel tenetur animi! Repellendus reprehenderit natus sapiente suscipit. Ex deserunt corrupti quasi perferendis officia ad. Qui, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis, architecto quia molestias numquam mollitia. Alias possimus laboriosam accusantium? Laudantium, culpa mollitia consequatur quo qui vitae numquam magnam quisquam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quidem quam dolor modi iste ea, eius et magnam in. Modi ipsum dignissimos ab atque nemo nam, quasi fugit. Impedit, minus.</p>
                        </div>
                    </div>
                    <button className="post-cardlike-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${liked ? 'filled' : ''}`} />
                    </button>
                </div>
                <div className="jogo__post">
                    <div className="jogo__post-info-perfil-container">
                        <a href="#" className='jogo__post-foto-user'>
                            <img src="" alt="Foto perfil" className='jogo__post-foto-user' />
                        </a>
                        <div className="jogo__post-info-user">
                            <p className='jogo__post-nomeUser'>Cleber</p>
                            <div className="jogo__post-nota">10</div>
                        </div>
                    </div>
                    <div className="jogo__post-descricao-container">
                        <div className="jogo__post-descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim natus iste aliquid vel tenetur animi! Repellendus reprehenderit natus sapiente suscipit. Ex deserunt corrupti quasi perferendis officia ad. Qui, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis, architecto quia molestias numquam mollitia. Alias possimus laboriosam accusantium? Laudantium, culpa mollitia consequatur quo qui vitae numquam magnam quisquam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quidem quam dolor modi iste ea, eius et magnam in. Modi ipsum dignissimos ab atque nemo nam, quasi fugit. Impedit, minus.</p>
                        </div>
                    </div>
                    <button className="post-cardlike-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${liked ? 'filled' : ''}`} />
                    </button>
                </div>
                <div className="jogo__post">
                    <div className="jogo__post-info-perfil-container">
                        <a href="#" className='jogo__post-foto-user'>
                            <img src="" alt="Foto perfil" className='jogo__post-foto-user' />
                        </a>
                        <div className="jogo__post-info-user">
                            <p className='jogo__post-nomeUser'>Cleber</p>
                            <div className="jogo__post-nota">10</div>
                        </div>
                    </div>
                    <div className="jogo__post-descricao-container">
                        <div className="jogo__post-descricao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim natus iste aliquid vel tenetur animi! Repellendus reprehenderit natus sapiente suscipit. Ex deserunt corrupti quasi perferendis officia ad. Qui, voluptatum? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis perspiciatis, architecto quia molestias numquam mollitia. Alias possimus laboriosam accusantium? Laudantium, culpa mollitia consequatur quo qui vitae numquam magnam quisquam dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quidem quam dolor modi iste ea, eius et magnam in. Modi ipsum dignissimos ab atque nemo nam, quasi fugit. Impedit, minus.</p>
                        </div>
                    </div>
                    <button className="post-cardlike-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${liked ? 'filled' : ''}`} />
                    </button>
                </div>
            </div>
            <PostButton />
        </div>
    )
}

export default Jogo