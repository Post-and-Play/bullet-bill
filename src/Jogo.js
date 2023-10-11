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

import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import api from './services/Api'
import { getUser } from './services/Auth';
import { Modals } from './components/Modals';

const Jogo = () => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const initialGameId = params.get('id');
    const root = document.getElementById('root');
    const modals = new Modals();

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState([]);
    const [name, setName] = useState('');
    const [genders, setGenders] = useState('');
    const [description, setDescription] = useState('');
    const [coverAdr, setCoverAdr] = useState('');
    const [topAdr, setTopAdr] = useState('');
    const [rating, setRating] = useState('');
    const [genderArray, setGenderArray] = useState([]);
    const [gameId, setGameId] = useState(initialGameId);
    const [userId, setUserId] = useState('');
    const [reviewId, setReviewId] = useState(initialGameId);
    const [reviewLikes, setReviewLikes] = useState({});
    const [reviewCount, setReviewCount] = useState([]);

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


    const getCurrentUser = async () => {

        let user = await getUser();
        if (user) {
            const response = await api.get('./api/users?id=' + user.id);
            if (response.data.id) {
                setUserId(response.data.id)
            }
        }
    }

    const getReviews = async (gameId) => {
        if (!gameId) {
            console.error("gameId não é válido:", gameId);
            return;
        }
        try {
            console.log("gameId in getReviews:", gameId);

            const response = await api.get(`/api/reviews/game?id=${gameId}`);
            console.log(response);

            if (response.data) {
                const filteredReviews = response.data.filter((review) => review.game_id === parseInt(gameId));

                const mappedReviews = await Promise.all(
                    filteredReviews.map(async (review) => {
                        const userResponse = await api.get(`/api/users?id=${review.user_id}`);

                        // Verifique se o usuário atual curtiu esta revisão
                        const userLiked = reviewLikes[review.id] || false;

                        return {
                            ...review,
                            userPhoto: userResponse.data.photo_adr,
                            username: userResponse.data.name,
                            userLiked: userLiked, // Adicione informações sobre se o usuário atual curtiu ou não esta revisão
                        };
                    })
                );

                setReviewCount(mappedReviews.length)       
                setReviews(mappedReviews);

                // Atualize o estado de likes com base nas revisões obtidas
                const updatedReviewLikes = {};
                mappedReviews.forEach((review) => {
                    updatedReviewLikes[review.id] = review.userLiked;
                });
                setReviewLikes(updatedReviewLikes);

                setReviews(mappedReviews);
            } else {
                setReviews([]);
            }
        } catch (err) {
            setReviews([]);
        }
    };

    const handleSlideDown = (review) => {
        if (sliderRef.current) {
            const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
            const slidesToShow = settings.slidesToShow;
            const nextSlideIndex = slideIndex + slidesToShow;
            sliderRef.current.slickGoTo(nextSlideIndex);
        }
    };


    const handleLike = async (review) => {
        try {
            // Verifique se o usuário atual já curtiu esta revisão
            const isUserLiked = reviewLikes[review.id] || false;

            // Obtenha o número atual de curtidas como um número inteiro
            const currentLikes = parseInt(review.likes) || 0;

            // Calcule o novo número de curtidas com base no estado atual e na ação do usuário
            const newLikes = isUserLiked ? currentLikes - 1 : currentLikes + 1;

            // Converta newLikes em uma string antes de enviá-lo para o servidor
            const newLikesAsString = newLikes.toString();

            // Envie a solicitação POST para a rota de "like" no servidor Go
            await api.post(`/api/like`, {
                // Inclua os campos necessários na solicitação, como user_id, review_id, etc.
                user_id: review.user_id, // Certifique-se de ter o ID do usuário disponível
                review_id: review.id // Certifique-se de ter o ID da revisão disponível
            });

            // Atualize o estado de likes apenas para a revisão específica clicada
            setReviewLikes((prevLikes) => ({
                ...prevLikes,
                [review.id]: !isUserLiked, // Inverte o estado de curtida para a revisão clicada
            }));
        } catch (error) {
            console.error(`Erro ao curtir o post ${review.id}:`, error);
        }
    };



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
            // Defina o ID do jogo com base em como você está obtendo o ID do jogo da página atual
            // Exemplo: const gameId = obterIDDoJogoDaPagina(); 
            setGameId(initialGameId);
            await getReviews(initialGameId);
        };
        fetchData();
    }, [initialGameId]);

    useEffect(() => {
        const fetchData = async () => {
            await getCurrentGame();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getCurrentUser();
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="jogo__banner-container">
                <img src={coverAdr} alt="Banner" className='jogo__banner' />
                <div className="jogo__banner_gradient"></div>
                <div className="jogo__info-container">
                    <div className="jogo__info-img-container">
                        <div className="jogo__info-img">
                            <img src={topAdr} alt="Foto jogo" />
                        </div>
                        <div className="jogo__info-jogo-container">
                            <div className="jogo__info-titulo-container">
                                <div className="jogo__info-titulo">
                                    <h1 className='jogo__titulo'>{name}</h1>
                                    <div className="jogo__nota-jogo">
                                        <span>{rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="jogo__categoria-container">
                                {genderArray.map((g, i) => (
                                    <div key={i} className="pesquisa__categoria">
                                        {g}
                                    </div>
                                ))}
                                {/*<div className="jogo__categoria">Party</div>*/}
                                {/*<div className="jogo__categoria">Estratégia</div>*/}
                            </div>
                            <div className="jogo__rank-container">
                                <div className="jogo__rank">
                                    <Icon icon="solar:ranking-linear" className='jogo__rank-icon' />
                                    <span className='jogo__rank-ranking'>{reviewCount} Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jogo__sinopse-container">
                        <div className="jogo__sinopse">
                            <Icon icon="mingcute:quote-left-fill" className='jogo__sinopse-quoteIcon quoteIcon-left' />
                            <p className='jogo__sinopse-texto'>{description}</p>
                            <p className='jogo__sinopse-texto'>{description}</p>
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
                {Array.isArray(reviews) && reviews.map((review) => (
                    <div className="jogo__post" key={review.id}>
                        <div className="jogo__post-info-perfil-container">
                            <a href="#" className="jogo__post-foto-user">
                                <img src={review.userPhoto} alt="Foto perfil" className="jogo__post-foto-user" />
                            </a>
                            <div className="jogo__post-info-user">
                                <p className="jogo__post-nomeUser">{review.username}</p>
                                <div className="jogo__post-nota" style={{ backgroundColor: getCoresDasNotas(review.grade) }}>
                                    {review.grade}
                                </div>
                            </div>
                        </div>
                        <div className="jogo__post-descricao-container">
                            <div className="jogo__post-descricao">
                                <div>
                                    <p>{review.opinion}</p>
                                </div>
                                <div>
                                    {review.image_adr && (
                                        <img src={review.image_adr} alt="Foto perfil" className="jogo__post-foto-opiniao" />
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="post-cardlike-button-container">
                            <button className="post-cardlike-button" onClick={() => handleLike(review)}>
                                <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${review.userLiked ? 'filled' : ''}`} />
                                <span className='post-cardlike-likes'>{review.likes}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <PostButton />
        </div>
    )
}

export default Jogo