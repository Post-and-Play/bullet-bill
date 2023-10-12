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
import Lightbox  from './components/LightBox';
=======

import React, { useRef, useState, useEffect } from 'react';
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import api from './services/Api'
<<<<<<< HEAD
import { getAuth } from './services/Auth';
import { Modals } from './components/Modals';
import { useNavigate } from 'react-router-dom';
=======
import { getUser } from './services/Auth';
import { Modals } from './components/Modals';

import api from './services/Api'
import { getUser } from './services/Auth';
import { Modals } from './components/Modals';
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

const Jogo = () => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const initialGameId = params.get('id');
<<<<<<< HEAD

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [currentUser, setCurrentUser] = useState();
=======
    const root = document.getElementById('root');
    const modals = new Modals();

>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
    const [averageRating, setAverageRating] = useState(0); // Média de notas
    const [roundedAverageRating, setRoundedAverageRating] = useState();
    const [lightboxImage, setLightboxImage] = useState(null);

    const navigate = useNavigate();
=======
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

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
<<<<<<< HEAD
                        navigate('/home');
=======
                        return;
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                    }
                });
        }
    }

<<<<<<< HEAD
    // const sliderRef = useRef(null);

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {
            setCurrentUser(user);
        } else {
            navigate('/');
        }
    }

    // const settings = {
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     vertical: true,
    //     verticalSwiping: true,
    //     nextArrow: <></>,
    //     prevArrow: <></>,
    // };

    // const images = [
    //     LoopHero,
    //     DuelLink,
    //     Hearthstone,
    //     FotoPerfil,
    //     FotoPerfil,
    //     FotoPerfil,
    //     FotoPerfil,
    //     FotoPerfil,
    //     FotoPerfil
    // ];
=======
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
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

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
    const getMediaColor = (averageRating) => {
        // Mapeie a média para um índice no array de cores
        const index = Math.min(Math.floor(averageRating * 2), coresDasNotas.length - 1);
        return coresDasNotas[index];
    };

    const getCoresDasNotas = (nota) => {
    // Calcula o índice arredondado com base na nota
    const indice = Math.round(nota * 2);
    
    // Retorna a cor correspondente no array de cores
    return coresDasNotas[indice];
    };      
=======
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
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

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

<<<<<<< HEAD
                    const totalRating = mappedReviews.reduce((acc, review) => acc + review.grade, 0);
                    const averageRating = totalRating / mappedReviews.length;


                    const roundedAverageRating = parseFloat(averageRating.toFixed(1));

                    
                    // Atualize o estado de média do rating
                    setAverageRating(averageRating);
                    setRoundedAverageRating(roundedAverageRating);

                    setReviewCount(mappedReviews.length);
                    setReviews(mappedReviews);
                    

                    // Atualize o estado de likes com base nas revisões obtidas
                    const updatedReviewLikes = {};
                    mappedReviews.forEach((review) => {
                        updatedReviewLikes[review.id] = review.userLiked;
                    });
                    setReviewLikes(updatedReviewLikes);
                    } else {
                    setReviews([]);
                    }
                } catch (err) {
                    setReviews([]);
                }
                };
    const mediaColor = getMediaColor(averageRating);
    // const handleSlideDown = (review) => {
    //     if (sliderRef.current) {
    //         const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
    //         const slidesToShow = settings.slidesToShow;
    //         const nextSlideIndex = slideIndex + slidesToShow;
    //         sliderRef.current.slickGoTo(nextSlideIndex);
    //     }
    // };

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
=======
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
      
          if (isUserLiked) {
            // Se o usuário já curtiu a revisão, envie uma solicitação POST para a rota de "dislike" no servidor
            await api.post('/api/like', {
              // Inclua os campos necessários na solicitação, como user_id e review_id
              user_id: review.user_id,
              review_id: review.id,
            });
          } else {
            // Se o usuário ainda não curtiu a revisão, envie uma solicitação POST para a rota de "like" no servidor
            await api.post('/api/like', {
              // Inclua os campos necessários na solicitação, como user_id e review_id
              user_id: review.user_id,
              review_id: review.id,
            });
            await api.post(`/api/review?id=${review.id}`, {
                user_id: review.user_id,
                game_id: review.game_id,
                grade: review.grade,
                image_adr: review.image_adr,
                opinion: review.opinion,
                likes: newLikesAsString,
                id: review.id,
            });
          }
      
          // Atualize o estado de likes apenas para a revisão específica clicada
          setReviewLikes((prevLikes) => ({
            ...prevLikes,
            [review.id]: !isUserLiked, // Inverte o estado de curtida para a revisão clicada
          }));
      
          // Atualize o número de curtidas localmente
          setReviews((prevReviews) =>
            prevReviews.map((prevReview) =>
              prevReview.id === review.id
                ? { ...prevReview, likes: newLikes }
                : prevReview
            )
          );
        } catch (error) {
          console.error(`Erro ao curtir o post ${review.id}:`, error);
        }
      };


>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

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
<<<<<<< HEAD
                setReviews(response.data.reviews);
                await getReviews(response.data.id);
                await getCurrentUser();
                
=======
                setReview(response.data.reviews);
                setGenderArray(genders.split(',').map((genders) => genders.trim()));
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
      
    useEffect(() => {
        const fetchData = async () => {
            // Defina o ID do jogo com base em como você está obtendo o ID do jogo da página atual
            // Exemplo: const gameId = obterIDDoJogoDaPagina();
            
            loading.show();
            await getCurrentGame();
    
            // Mova a atualização do estado de genderArray para dentro desta função de efeito
            // após a chamada de getCurrentGame()
            if (genders) {
                const categories = genders.split(',').map((category) => category.trim());
                setGenderArray(categories);
            }
    
            loading.close();
        }
    
        fetchData();
    }, [genders]);
    
    console.log('genders:', genders);
    console.log('genderArray:', genderArray);
    return (
        <div>
            <Navbar currentUser={currentUser} />
            <div className="jogo__banner-container">
                <img src={coverAdr} alt="Banner" className='jogo__banner' />
                <div className="jogo__banner_gradient"></div>
=======

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
                <img src={coverAdr} alt="Banner" className='jogo__banner' />
                <div className="jogo__banner_gradient"></div>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                <div className="jogo__info-container">
                    <div className="jogo__info-img-container">
                        <div className="jogo__info-img">
                            <img src={topAdr} alt="Foto jogo" />
<<<<<<< HEAD
=======
                            <img src={topAdr} alt="Foto jogo" />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                        </div>
                        <div className="jogo__info-jogo-container">
                            <div className="jogo__info-titulo-container">
                                <div className="jogo__info-titulo">
                                    <h1 className='jogo__titulo'>{name}</h1>
<<<<<<< HEAD
                                    <div className="jogo__nota-jogo" style={{ backgroundColor: mediaColor }}>
                                        <span>{roundedAverageRating}</span>
=======
                                    <h1 className='jogo__titulo'>{name}</h1>
                                    <div className="jogo__nota-jogo">
                                        <span>{rating}</span>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                                    </div>
                                </div>
                            </div>
                            <div className="jogo__categoria-container">
<<<<<<< HEAD
                                {genderArray.map((ge, i) => (
                                    <div key={i} className="pesquisa__categoria">
                                        {ge}
=======
                                {genderArray.map((g, i) => (
                                    <div key={i} className="pesquisa__categoria">
                                        {g}
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
=======
                            <p className='jogo__sinopse-texto'>{description}</p>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                            <Icon icon="mingcute:quote-right-fill" className='jogo__sinopse-quoteIcon quoteIcon-right' />
                        </div>
                    </div>
                    </div>
<<<<<<< HEAD
            </div>
            {/* <div className="jogo__semelhantes-slider">
=======
                </div>
            </div>
            <div className="jogo__semelhantes-slider">
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
            </div> */}
=======
            </div>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
            <div className="jogo__posts-container">
                {Array.isArray(reviews) && reviews.map((review) => (
                    <div className="jogo__post" key={review.id}>
                        <div className="jogo__post-info-perfil-container">
<<<<<<< HEAD
                            <a href={`/perfil?id=${review.user_id}`} className="jogo__post-foto-user">
=======
                            <a href="#" className="jogo__post-foto-user">
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
                                        <img src={review.image_adr} alt="Foto perfil" className="jogo__post-foto-opiniao"  onClick={() => setLightboxImage(review.image_adr)} />
=======
                                        <img src={review.image_adr} alt="Foto perfil" className="jogo__post-foto-opiniao" />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                                    )}
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD
                        
=======
                        <div className="post-cardlike-button-container">
                            <button className="post-cardlike-button" onClick={() => handleLike(review)}>
                                <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${review.userLiked ? 'filled' : ''}`} />
                                <span className='post-cardlike-likes'>{review.likes}</span>
                            </button>
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                        <div className="post-cardlike-button-container">
                            <button className="post-cardlike-button" onClick={() => handleLike(review)}>
                                <FontAwesomeIcon icon={faHeart} className={`post-cardheart-icon ${review.userLiked ? 'filled' : ''}`} />
                                <span className='post-cardlike-likes'>{review.likes}</span>
                            </button>
                        </div>
                    </div>
                ))}
<<<<<<< HEAD
            </div>
                {lightboxImage && (
                    <Lightbox
                    imageSrc={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                />
            )}
            <PostButton currentUser={currentUser} />
=======
                ))}
            </div>
            <PostButton />
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
        </div>
    )
}

<<<<<<< HEAD
export default Jogo
=======
export default Jogo
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
