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

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

import { Icon } from '@iconify/react';

import PostButton from './components/postButton';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


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
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Cleitin} alt="Foto perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Cleitin</span>
                                <span className='card-post__game card-post__content'>Elden Ring</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Atreus} alt="Foto Perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Atreus</span>
                                <span className='card-post__game card-post__content'>League of Legends</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Kratus} alt="Foto Perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Kratus</span>
                                <span className='card-post__game card-post__content'>God of War</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Adalberto} alt="Foto Perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Adalberto</span>
                                <span className='card-post__game card-post__content'>The Last Of Us</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Cleber} alt="Foto Perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Cleber</span>
                                <span className='card-post__game card-post__content'>Hitman 3</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src={Gabriel} alt="Foto Perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Gabriel</span>
                                <span className='card-post__game card-post__content'>The Witcher 3</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                        <button className="post-card__like-button" onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${liked ? 'filled' : ''}`} />
                        </button>
                    </div>
                    <PostButton />
                </div>
            </div>
        </div>

    );
}

export default Home;