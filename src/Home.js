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


import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Slider from 'react-slick';

import { Icon } from '@iconify/react';

import PostButton from './components/postButton';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Get from './Get';


const Home = () => {
    const sliderRef = useRef(null);

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

    const [dados, setDados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dados'); // Endpoint para obter dados do banco de dados
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados do banco de dados:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleUserProfileClick = (e) => {
        navigate('/perfil');
    };

    const handleGameProfileClick = (e) => {
        navigate('/jogo');
    };


    return (
        <div>
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
                    <div className="card-post">
                        {dados.map((item) => (
                            <div key={item.id}>
                                <div className="container__foto-content" key={item.id}>
                                    <div className="card-post__foto-container">
                                        <a href="" onClick={handleUserProfileClick}>
                                            <img src={item.foto} alt="Foto Perfil" className='card-post__foto' />
                                        </a>
                                    </div>
                                    <div className="card-post__content-container">
                                        <span className='card-post__user card-post__content'>{item.user}</span>
                                        <span className='card-post__game card-post__content' onClick={handleGameProfileClick}>{item.game}</span>
                                        <div className="card-post__nota card-post__content">{item.nota}</div>
                                    </div>
                                </div>
                                <div className="card-post__descricrao">
                                    <p>{item.descricao}</p>
                                </div>
                                <button className="post-card__like-button" onClick={handleLike}>
                                    <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <PostButton />
                </div>
            </div>
        </div>
    );
}

export default Home;