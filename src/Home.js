import '../src/Home.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LeagueOfLegends from './icons/Render background/Imagens/icon/icon - League of Legends.png'
import CSGO from './icons/Render background/Imagens/icon/icon--CSGO.png'
import EldenRing from './icons/Render background/Imagens/icon/icon--EldenRing.png'
import Osu from './icons/Render background/Imagens/icon/icon--Osu.png'
import Skyrim from './icons/Render background/Imagens/icon/icon--Skryim.png'

import Cleitin from './image/perfil-cleitin.png';
import Atreus from './image/perfil-atreus.png';
import Kratus from './image/perfil-kratus.png';
import Adalberto from './image/perfil-adalberto.png';
import Cleber from './image/perfil-cleber.png';
import Gabriel from './image/perfil-gabriel.png';

import React, { useRef, useState, useEffect } from 'react'; // Importe o useEffect aqui

import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react';

import PostButton from './components/postButton';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modals } from './components/Modals';

import { getAuth, getUser } from './services/Auth';
import api from './services/Api'

const Home = () => {

    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [userId, setUserId] = useState(null);

    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        horizSwiping: true,
        horizSwiping: true,
        nextArrow: <></>,
        prevArrow: <></>,
    };

    const images = [
        LeagueOfLegends,
        CSGO,
        EldenRing,
        Osu,
        Skyrim
    ];

    const handleSlideRight = () => {
        if (sliderRef.current) {
            const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
            const slidesToShow = settings.slidesToShow;
            const nextSlideIndex = slideIndex + slidesToShow;
            sliderRef.current.slickGoTo(nextSlideIndex);
        }
    };

    const handleSlideLeft = () => {
        if (sliderRef.current) {
            const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
            const slidesToShow = settings.slidesToShow;
            const nextSlideIndex = slideIndex - slidesToShow;
            sliderRef.current.slickGoTo(nextSlideIndex);
        }
    };
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const getGames = async () => {

        try {
            const response = await api.get('./api/games/search');
            if (response.data) {
                setGames(response.data);
            }
            else {
                setGames([]);
            }
        } catch (err) {
            setGames([]);
        }

    }

    const getReviews = async () => {
        try {

            const response = await api.get('./api/reviews');
            if (response.data) {
                const mappedReviews = await Promise.all(
                    response.data.map(async (reviews) => {
                        const userResponse = await api.get(`/api/users?id=${reviews.user_id}`);
                        const gameResponse = await api.get(`/api/games?id=${reviews.game_id}`);
                        console.log(userResponse)
                        console.log(gameResponse)
                        return {
                            ...reviews,
                            userPhoto: userResponse.data.photo_adr,
                            username: userResponse.data.name,
                            gameName: gameResponse.data.name,

                        };
                    })
                );
                setReviews(mappedReviews);
            } else {
                setReviews([]);
            }
        } catch (err) {
            setReviews([]);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            if (user) {
                const response = await api.get(`/api/users?id=${user.id}`);
                if (response.data.id) {
                    setUserId(response.data.id)
                }
            }
        };

        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getGames();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getReviews();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    return (
        <div onLoad={() => getAuth()}>
            <Navbar />
            <div className="home__bemAvaliado-slider">
                <div className="home__bemAvaliado-container">
                    <div className="home-carousel-icon" onClick={handleSlideLeft} >
                        <Icon icon="ep:arrow-up-bold" rotate={3} className="image-slider__image" />
                    </div>
                    <Slider ref={sliderRef} {...settings} className="slider-centered custom-slider">
                        {images.map((image, index) => (
                            <div key={index} className="home-image-slider__item">
                                <a href="#" className='home-image-slider__link'>
                                    <img src={image} alt={`Imagem ${index + 1}`} className="home-image-slider__image" />
                                </a>
                            </div>
                        ))}
                    </Slider>
                    <div className="home-carousel-icon" onClick={handleSlideRight} >
                        <Icon icon="ep:arrow-up-bold" rotate={1} />
                    </div>
                </div>
            </div>
            <div className="custom-container">
                <div className="container__card-post">
                    {reviews.map((review) => (
                        <div className="card-post" key={review.id}>
                            <div className="container__foto-content">
                                <div className="card-post__foto-container">
                                    <a href="#">
                                        <img src={review.userPhoto} alt="Foto perfil" className="card-post__foto" />
                                    </a>
                                </div>
                                <div className="card-post__content-container">
                                    <span className="card-post__user card-post__content">{review.username}</span>
                                    <a href={`jogo?id=${review.game_id}`} className="card-post__game card-post__content">{review.gameName}</a>
                                    <div className="card-post__nota card-post__content">{review.grade}</div>
                                </div>
                            </div>
                            <div className="card-post__descricao-container">
                                <div className="card-post__descricao">
                                    <div className="card-post__descricao">
                                        <p>{review.opinion}</p>
                                    </div>
                                    <div>
                                        {review.image_adr && (
                                            <img src={review.image_adr} alt="Foto perfil" className="card-post__foto-opiniao" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="post-card__like-button" onClick={handleLike}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`post-card__heart-icon ${liked ? 'filled' : ''}`}
                                />
                            </button>
                        </div>
                    ))}
                    <PostButton />
                </div>
            </div>
        </div>

    );
}

export default Home;