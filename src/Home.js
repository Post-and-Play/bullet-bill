import '../src/Home.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LeagueOfLegends from './icons/Render background/Imagens/icon/icon - League of Legends.png'
import CSGO from './icons/Render background/Imagens/icon/icon--CSGO.png'
import EldenRing from './icons/Render background/Imagens/icon/icon--EldenRing.png'
import Osu from './icons/Render background/Imagens/icon/icon--Osu.png'
import Skyrim from './icons/Render background/Imagens/icon/icon--Skryim.png'
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
import PostButton from './components/postButton';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Modals } from './components/Modals';
import { getAuth } from './services/Auth';
import api from './services/Api'
import Lightbox  from './components/LightBox';
import Whirligig from 'react-whirligig';


const Home = () => {

    const [currentUser, setCurrentUser] = useState();

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [userId, setUserId] = useState(null);
    const sliderRef = useRef(null);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [userLikes, setUserLikes] = useState([]);

    const navigate = useNavigate();

    const settings = {
        infinite: true,
        height: 300,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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


    const handleCheckUserLikes = async (user) => {
        const response = await api.get(`/api/likes/user?id=${user.id}`);
        if (response.status === 200) {
            //console.log(response.data);
            setUserLikes(response.data);
            return response.data;
        } else {
            console.error(response);
            setUserLikes([]);
            return [];
        }
    }

    const getReviews = async (likes) => {

        try {
          
            const response = await api.get(`/api/reviews`);

            if (response.status === 200) {
                const filteredReviews = response.data;
                if (filteredReviews.length > 0) {

                    const mappedReviews = await filteredReviews.map((review) => {
                        return {
                            ...review,
                            userLiked: likes.find((like) => { return like.review_id === review.id }) ? true : false,
                        };
                    });

                    setReviews(mappedReviews);

                    console.log(mappedReviews);

                    return mappedReviews;

                } else {
                    setReviews([]);
                    console.log('Has not reviews');
                    return [];
                }

            } else {
                setReviews([]);
                console.error(response);
                return [];
            }

        } catch (err) {
            setReviews([]);
            console.error(err);
            return [];
        }

    };

    const handleLike = async (e, index) => {
        e.preventDefault();

        try {

            if (currentUser) {

                //console.log(review);
                if (index >= 0) {

                    if (reviews[index].userLiked === true) {

                        const response = await api.delete(`/api/like?user_id=${currentUser.id}&review_id=${reviews[index].id}`, {
                            user_id: currentUser.id, // Certifique-se de ter o ID do usuário disponível
                            review_id: reviews[index].id // Certifique-se de ter o ID da revisão disponível
                        });

                        if (response.status === 200) {

                            //reviews[index].userLiked = false;
                            //reviews[index].likes -= 1;

                            setReviews(reviews.map((review, i) => {
                                if (i === index) {
                                    review.userLiked = false;
                                    review.likes -= 1;
                                }
                                return { ...review }
                            }));

                            //console.log(reviews[index]);

                        }

                    } else {

                        // Envie a solicitação POST para a rota de "like" no servidor Go
                        const response = await api.post(`/api/like`, {
                            user_id: currentUser.id, // Certifique-se de ter o ID do usuário disponível
                            review_id: reviews[index].id // Certifique-se de ter o ID da revisão disponível
                        });

                        if (response.status === 200) {

                            //reviews[index].userLiked = true;
                            //reviews[index].likes -= 1;

                            setReviews(reviews.map((review, i) => {
                                if (i === index) {
                                    review.userLiked = true;
                                    review.likes += 1;
                                }
                                return { ...review }
                            }));

                            //console.log(reviews[index]);
                        }

                    }


                } else {
                    console.log('indice não encontrado: ' + index);
                }

            } else {

                if (root) {
                    modals.htmlDialog(
                        root,
                        'Problema na identificação do usuário! Tente recarregar a página.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                window.location.reload();
                            }
                        });
                }

            }

        } catch (error) {
            console.error(`Erro ao curtir o post ${reviews[index].id}:`, error);
        }
    };

    const getCurrentUser = async () => {

        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
            setUserId(user.id);
            if (user) {
                if (user.id) {
                    const likes = await handleCheckUserLikes(user);
                    await getReviews(likes);
                }
            } else {
                navigate('/');
            }

        } else {
            navigate('/');
        }

    }

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

        try {
            const response = await api.get('./api/games/ranking');
            if (response.data) {
                setRanking(response.data);
            }
            else {
                setRanking([]);
            }
        } catch (err) {
            setRanking([]);
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

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            await getGames();
            loading.close();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    let whirligig
    const next = () => whirligig.next()
    const prev = () => whirligig.prev()

    return (
        <div className="container-root">
            <Navbar currentUser={currentUser} />

            <div className="home__bemAvaliado-slider">
                <div className="title-container">
                    <h2>Jogos mais avaliados</h2>
                    <hr />
                </div>
                <div className="home__bemAvaliado-container">
                    {/*<div className="home-carousel-icon" onClick={handleSlideLeft} >*/}
                    {/*    <Icon icon="ep:arrow-up-bold" rotate={3} className="image-slider__image" />*/}
                    {/*</div>*/}
                    {/*<Slider ref={sliderRef} {...settings} className="slider-centered custom-slider">*/}
                    {/*    {images.map((image, index) => (*/}
                    {/*        <div key={index} className="home-image-slider__item">*/}
                    {/*            <a href={`/jogo?id=${index}`} className='home-image-slider__link'>*/}
                    {/*                <img src={image} alt={`Imagem ${index + 1}`} className="home-image-slider__image" />*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</Slider>*/}
                    {/*<div className="home-carousel-icon" onClick={handleSlideRight} >*/}
                    {/*    <Icon icon="ep:arrow-up-bold" rotate={1} />*/}
                    {/*</div>*/}
                    <div className="home-carousel-icon" onClick={prev} >
                        <Icon icon="ep:arrow-up-bold" rotate={3} />
                    </div>
                    <Whirligig
                        className="home__slider" 
                        visibleSlides={0}
                        gutter="1em" 
                        infinte={true}
                        preventScroll={true} 
                        animationDuration={300}
                        ref={(_whirligigInstance) => { whirligig = _whirligigInstance }}
                    >
                        {ranking.map((game, index) => (
                                <div key={index} className="home-image-slider__item">
                                    <a href={`/jogo?id=${game.id}`} className='home-image-slider__link'>
                                        <img src={game.top_adr} alt={`Imagem ${index + 1}`} className="home-image-slider__image" />
                                    </a>
                                </div>
                            ))}
                    </Whirligig>
                    <div className="home-carousel-icon" onClick={next} >
                        <Icon icon="ep:arrow-up-bold" rotate={1} />               
                    </div>

                </div>
            </div> 

            <div className="custom-container">
                <div className="title-container">
                    <h2>Ultimas avaliações</h2>
                    <hr />
                </div>
                <div className="container__card-post">
                    {reviews.map((review, index) => (
                        <div className="card-post" key={review.id}>
                            <div className="container__foto-content">
                                <div className="card-post__foto-container">
                                <a href={review.user_id == currentUser.id ? '/perfil' : `/perfil?id=${review.user_id}`}>
                                        <img src={review.photo_adr} alt="Foto perfil" className="card-post__foto" />
                                    </a>
                                </div>
                                <div className="card-post__content-container">
                                <a href={review.user_id == currentUser.id ? '/perfil' : `/perfil?id=${review.user_id}`} className='card-post__user card-post__content"'>{review.name}</a>
                                    
                                    <a href={`jogo?id=${review.game_id}`} className="card-post__game card-post__content">{review.game_name}</a>
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
                                            <img src={review.image_adr} alt="Foto perfil" className="card-post__foto-opiniao" onClick={() => setLightboxImage(review.image_adr)}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="post-cardlike-button" data-review={review.id} onClick={(event) => handleLike(event, index)}>
                                {/*<FontAwesomeIcon*/}
                                {/*    icon={faHeart}*/}
                                {/*    className={`post-card__heart-icon ${liked ? 'filled' : ''}`}*/}
                                {/*/>*/}
                                {review.userLiked ?
                                    <FontAwesomeIcon icon={faThumbsUp} className={`post-cardlike-icon filled`} style={{ color: '#fff' }} /> :
                                    <FontAwesomeIcon icon={faThumbsUp} className={`post-cardlike-icon filled`} style={{ color: '#5E4485' }} />}
                                <span className='post-cardlike-likes'>{review.likes} Curtidas</span>
                            </button>
                        </div>
                    ))}
                    {lightboxImage && (
                    <Lightbox
                    imageSrc={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                        />
                    )}
                    <PostButton currentUser={currentUser} />
                </div>
            </div>
        </div>

    );
}

export default Home;