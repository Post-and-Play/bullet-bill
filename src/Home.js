import '../src/Home.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LeagueOfLegends from './icons/Render background/Imagens/icon/icon - League of Legends.png'
import CSGO from './icons/Render background/Imagens/icon/icon--CSGO.png'
import EldenRing from './icons/Render background/Imagens/icon/icon--EldenRing.png'
import Osu from './icons/Render background/Imagens/icon/icon--Osu.png'
import Skyrim from './icons/Render background/Imagens/icon/icon--Skryim.png'
<<<<<<< HEAD
//import Cleitin from './image/perfil-cleitin.png';
//import Atreus from './image/perfil-atreus.png';
//import Kratus from './image/perfil-kratus.png';
//import Adalberto from './image/perfil-adalberto.png';
//import Cleber from './image/perfil-cleber.png';
//import Gabriel from './image/perfil-gabriel.png';

import React, { useRef, useState, useEffect } from 'react'; // Importe o useEffect aqui
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
=======
import Cleitin from './image/perfil-cleitin.png';
import Atreus from './image/perfil-atreus.png';
import Kratus from './image/perfil-kratus.png';
import Adalberto from './image/perfil-adalberto.png';
import Cleber from './image/perfil-cleber.png';
import Gabriel from './image/perfil-gabriel.png';

import React, { useRef, useState, useEffect } from 'react'; // Importe o useEffect aqui

import React, { useRef, useState, useEffect } from 'react'; // Importe o useEffect aqui

import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react';

>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
import PostButton from './components/postButton';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modals } from './components/Modals';
<<<<<<< HEAD
import { getAuth } from './services/Auth';
import api from './services/Api'
import Lightbox  from './components/LightBox';

const Home = () => {

    const [currentUser, setCurrentUser] = useState();

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [userId, setUserId] = useState(null);
    const sliderRef = useRef(null);
    const [lightboxImage, setLightboxImage] = useState(null);

=======
import { Modals } from './components/Modals';

import { getAuth, getUser } from './services/Auth';
import api from './services/Api'
import { getAuth, getUser } from './services/Auth';
import api from './services/Api'

const Home = () => {

    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [userId, setUserId] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [userId, setUserId] = useState(null);

    const sliderRef = useRef(null);
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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

<<<<<<< HEAD
    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
            setUserId(user.id);
        } else {
            navigate('/');
        }
    }

=======
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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

<<<<<<< HEAD
    const handleLike = (event) => {
        setLiked(!liked);
        const idreview = event.target.getAttribute('data-review');
        if (idreview) {
            const postData = {
                review_id: Number(idreview),
                user_id: currentUser.id
            }
            const response = api.post('./api/reviews', postData);
            if (response.data.id) {
                const icon = event.target.getFirstElement();
                if (icon) {

                }
            }
        }
=======
    const handleLike = () => {
        setLiked(!liked);
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
    ];

    const getCoresDasNotas = (nota) => {
=======
      ];
      const getCoresDasNotas = (nota) => {
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
        // Calcula o índice arredondado com base na nota
        const indice = Math.round(nota * 2);
    
        // Retorna a cor correspondente no array de cores
        return coresDasNotas[indice];
      };      

<<<<<<< HEAD
=======


>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
    const getReviews = async () => {
        try {

            const response = await api.get('./api/reviews');
            if (response.data) {
                const mappedReviews = await Promise.all(
                    response.data.map(async (reviews) => {
                        const userResponse = await api.get(`/api/users?id=${reviews.user_id}`);
                        const gameResponse = await api.get(`/api/games?id=${reviews.game_id}`);
<<<<<<< HEAD
                        //console.log(userResponse)
                        //console.log(gameResponse)
=======
                        console.log(userResponse)
                        console.log(gameResponse)
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
            loading.show();
            await getCurrentUser();
            await getGames();
            await getReviews();
            loading.close();
=======
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
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    return (
<<<<<<< HEAD
        <div>
            <Navbar currentUser={currentUser} />
            {/* <div className="home__bemAvaliado-slider">
=======
        <div onLoad={() => getAuth()}>
            <Navbar />
            <div className="home__bemAvaliado-slider">
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
            </div> */}
=======
            </div>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
            <div className="custom-container">
                <div className="container__card-post">
                    {reviews.map((review) => (
                        <div className="card-post" key={review.id}>
                            <div className="container__foto-content">
                                <div className="card-post__foto-container">
                                    <a href={`perfil?id=${review.user_id}`}>
                                        <img src={review.userPhoto} alt="Foto perfil" className="card-post__foto" />
                                    </a>
                                </div>
                                <div className="card-post__content-container">
                                    <span className="card-post__user card-post__content">{review.username}</span>
                                    <a href={`jogo?id=${review.game_id}`} className="card-post__game card-post__content">{review.gameName}</a>
                                    <div className="card-post__nota card-post__content" style={{ backgroundColor: getCoresDasNotas(review.grade) }}>
                                    {review.grade}
                                </div>
                                </div>
                            </div>
                            <div className="card-post__descricao-container">
                                <div className="card-post__descricao">
                                    <div className="card-post__descricao">
                                        <p>{review.opinion}</p>
                                    </div>
                                    <div>
                                        {review.image_adr && (
<<<<<<< HEAD
                                            <img src={review.image_adr} alt="Foto perfil" className="card-post__foto-opiniao" onClick={() => setLightboxImage(review.image_adr)}/>
=======
                                            <img src={review.image_adr} alt="Foto perfil" className="card-post__foto-opiniao" />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                                        )}
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD
                            <button className="post-card__like-button" data-review={review.id} onClick={handleLike}>
=======
                            <button className="post-card__like-button" onClick={handleLike}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`post-card__heart-icon ${liked ? 'filled' : ''}`}
                                />
                            </button>
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
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`post-card__heart-icon ${liked ? 'filled' : ''}`}
                                />
                            </button>
                        </div>
                    ))}
<<<<<<< HEAD
                    {lightboxImage && (
                    <Lightbox
                    imageSrc={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                        />
                    )}
                    <PostButton currentUser={currentUser} />
=======
                    ))}
                    <PostButton />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                </div>
            </div>
        </div>

    );
}

export default Home;