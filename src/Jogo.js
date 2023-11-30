import './Jogo.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navbar from './components/navbar';
import PostButton from './components/postButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRankingStar, faThumbsUp, faTrash, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';


// import arrowDownCircleFill from '@iconify-icons/bi/arrow-down-circle-fill';
import Lightbox  from './components/LightBox';
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

import api from './services/Api'
import { getAuth } from './services/Auth';
import { Modals } from './components/Modals';
import { useNavigate } from 'react-router-dom';

const Jogo = () => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const initialGameId = params.get('id');

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [gameId, setGameId] = useState(initialGameId);
    const [currentUser, setCurrentUser] = useState();
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [genders, setGenders] = useState('');
    const [description, setDescription] = useState('');
    const [coverAdr, setCoverAdr] = useState('');
    const [topAdr, setTopAdr] = useState('');
    const [rating, setRating] = useState('');
    const [genderArray, setGenderArray] = useState([]);
   
    const [userId, setUserId] = useState();
    const [userLikes, setUserLikes] = useState([]);
    const [reviewId, setReviewId] = useState(0);
    const [reviewLikes, setReviewLikes] = useState({});
    const [reviewCount, setReviewCount] = useState([]);
    const [averageRating, setAverageRating] = useState(0); // Média de notas
    const [roundedAverageRating, setRoundedAverageRating] = useState();
    const [lightboxImage, setLightboxImage] = useState(null);
   
    const [favorite, setFavorite] = useState();
    const [favoriteId, setFavoriteId] = useState(null);

    const navigate = useNavigate();

    const handleCheckFavorite = async (user) => {
        try {

            if (!user.id) {
                console.error('ID de usuário inválido');
                return;
            }

            if (!gameId) {
                console.error('ID de jogo inválido');
                return;
            }

            // Envie uma solicitação à API para verificar se o jogo é favorito
            const response = await api.get(`/api/favorite/user?id=${user.id}`);
            //console.log(response);

            if (response.status === 200) {
                //console.log('Response Data: ' + JSON.stringify(response.data));
                if (response.data.length > 0) {
                    let favoriteItem = await response.data.find((a) => { return a.game_id == gameId });
                    if (favoriteItem) {
                        setFavoriteId(favoriteItem.id);
                        setFavorite(true);
                        //console.log('Found Favorite: ' + favoriteItem);
                    }
                    else {
                        setFavorite(false);
                        //console.log('Not Found Favorite');
                    }
                } else { 
                    setFavorite(false);
                    //console.log('Not Found Favorite')
                }
             
           
            } else {
                setFavorite(false);
                console.log('Not Found Favorite');
            }
        } catch (error) {
            console.error('Erro ao verificar se o jogo é favorito:', error);
            setFavorite(false);
        }
    };

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

    // const sliderRef = useRef(null);

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


    // const handleSlideDown = (review) => {
    //     if (sliderRef.current) {
    //         const slideIndex = sliderRef.current.innerSlider.state.currentSlide;
    //         const slidesToShow = settings.slidesToShow;
    //         const nextSlideIndex = slideIndex + slidesToShow;
    //         sliderRef.current.slickGoTo(nextSlideIndex);
    //     }
    // };

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

    const getReviews = async (gameId, likes) => {

        if (!gameId) {
            console.error("gameId não é válido:", gameId);
            return;
        }

        try {
            console.log("gameId in getReviews:", gameId);

            const response = await api.get(`/api/reviews/game?id=${gameId}`);
           
            if (response.status === 200) {
                const filteredReviews = response.data;
                if (filteredReviews.length > 0) {

                    const mappedReviews = await filteredReviews.map((review) => {
                        return {
                            ...review,
                            userLiked: likes.find((like) => { return like.review_id === review.id }) ? true : false,
                        };
                    });

                    const totalRating = mappedReviews.reduce((acc, review) => acc + review.grade, 0);
                    const averageRating = totalRating / mappedReviews.length;
                    const roundedAverageRating = parseFloat(averageRating.toFixed(1));

                    // Atualize o estado de média do rating
                    setAverageRating(averageRating);
                    setRoundedAverageRating(roundedAverageRating);

                    setReviewCount(mappedReviews.length);
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

    const mediaColor = getMediaColor(averageRating);

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

    const handleFavorite = async () => {

        try {

            if (!currentUser.id) {
                console.error('ID de usuário inválido');
                return;
            }

            if (!gameId) {
                console.error('ID de jogo inválido');
                return;
            }

            // Converta os IDs para inteiros
            const favoriteUserId = parseInt(currentUser.id);

            // Envie uma solicitação à API para criar um novo registro na tabela "favorite"
            const favoriteData = {
                game_id: gameId,
                user_id: favoriteUserId,
            };

            // Enviar os dados para a API usando um pedido POST
            const response = await api.post('/api/favorite', favoriteData);

            if (response.data.id) {
                // A ação foi bem-sucedida, você pode realizar alguma ação adicional aqui
                // Atualize o estado `favoriteing` para refletir a ação do usuário
                setFavoriteId(response.data.id);
                setFavorite(true); // ou setFollowing(!favoriteing) dependendo de como você deseja atualizar o estado
                await getCurrentGame();

            } else {
                console.error('Falha ao adicionar como favorito:', response.data.message);
            }
        } catch (error) {
            console.log(currentUser.id);
            console.log(gameId);
            console.error('Erro ao adicionar como favorito:', error);
        }
    };

    const handleUnFavorite = async () => {
        try {

            if (!currentUser.id) {
                console.error('ID de usuário inválido');
                return;
            }

            if (!gameId) {
                console.error('ID de jogo inválido');
                return;
            }

            // Execute a solicitação DELETE à API para deixar de seguir o usuário
            const response = await api.delete(`/api/favorite?id=${favoriteId}`);

            if (response.data.OK) {
                // A ação de deixar de seguir foi bem-sucedida.
                // Atualize o estado `favoriteing` para refletir que o usuário não está mais seguindo.
                setFavorite(false);
                await getCurrentGame();
            } else {
                console.error('Falha ao remover de favoritos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao remover de favoritos:', error);
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

                let user = await getAuth();
                if (user) {
                    setCurrentUser(user);
                    if (user) {
                        if (user.id && gameId) {
                            await handleCheckFavorite(user);
                            const likes = await handleCheckUserLikes(user);
                            await getReviews(gameId, likes);   
                        }
                    } else {
                        navigate('/');
                    }

                } else {
                    navigate('/');
                }

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

    const handleDeleteReview = async (postId, postUserId) => {
        console.log("postId:", postId);
        console.log("currentUser:", currentUser.id);
        console.log("postUserId:", postUserId);
        if (!postId || !currentUser || !currentUser.id) {
            console.error("ID da publicação ou ID do usuário não é válido:", postId, currentUser);
            return;
        }


        if (root) {
            modals.htmlDialog(
                root,
                'Remover essa postagem?',
                modals.msgboxButtons.yesNo,
                modals.msgboxIcons.question,
                'Mensagem!',
                {
                    yes: async (evt) => {
                        // Converta ambos os IDs para números inteiros
                        const postIdInt = parseInt(postId);
                        const currentUserID = parseInt(currentUser.id);

                        if (currentUserID === postUserId) {
                            console.log("Permissão concedida. IDs correspondem.");
                            try {
                                await api.delete(`/api/review?id=${postIdInt}`);

                                setReviews((prevReviews) => prevReviews.filter((prevReview) => prevReview.id !== postIdInt));
                                window.location.reload();
                                loading.show();
                                loading.close();
                            } catch (error) {
                                console.error('Erro ao deletar a revisão:', error);
                            }
                        } else {
                            console.error("Você não tem permissão para excluir esta revisão.");
                        }
                    },
                    no: (evt) => {
                        return;
                    }
                });
        }

       
    };

    useEffect(() => {
        const fetchData = async () => {
            // Defina o ID do jogo com base em como você está obtendo o ID do jogo da página atual
            // Exemplo: const gameId = obterIDDoJogoDaPagina();
            
            loading.show();

            if (!initialGameId) {
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Identificador do Game inválido!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                navigate('/home');
                            }
                        });
                }
            }
            
            await setGameId(Number(initialGameId));
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

    }, []);
    
    //console.log('genders:', genders);
    //console.log('genderArray:', genderArray);
   

    return (
        <div className="container-root">
            <Navbar currentUser={currentUser} />
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
                                    <div className="jogo__nota-jogo" style={{ backgroundColor: mediaColor }}>
                                        <span>{roundedAverageRating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="jogo__categoria-container">
                                {genderArray.map((ge, i) => (
                                    <div key={i} className="pesquisa__categoria">
                                        {ge}
                                    </div>
                                ))}
                            </div>
                            <div className="jogo__rank-container">
                                <div className="jogo__rank">
                                    <FontAwesomeIcon icon={faRankingStar} className='jogo__rank-icon' />
                                    {/*<Icon icon="solar:ranking-linear" className='jogo__rank-icon' />*/}
                                    <span className='jogo__rank-ranking'>{reviewCount} Reviews</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className={`jogo-info__favorite-button ${favorite ? 'following' : ''}`}
                                    onClick={favorite ? handleUnFavorite : handleFavorite}>                    
                                    {favorite ? <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${favorite ? 'filled' : ''}`} style={{ marginRight: '6px', color: '#ff7373' }} /> 
                                        : <FontAwesomeIcon icon={faHeart} className={`post-card__heart-icon ${favorite ? 'filled' : ''}`} style={{ marginRight: '6px', color: '#eee' }} />  
                                    }
                                    {favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="jogo__sinopse-container">
                        <div className="jogo__sinopse">
                            <FontAwesomeIcon icon={faQuoteLeft} className='jogo__sinopse-quoteIcon quoteIcon-left' />
                            <p className='jogo__sinopse-texto'>{description}</p>
                            <FontAwesomeIcon icon={faQuoteRight} className='jogo__sinopse-quoteIcon quoteIcon-right' />
                        </div>
                    </div>
                    </div>
            </div>
            {/* <div className="jogo__semelhantes-slider">
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
            </div> */}
            <div className="jogo__posts-container">
                {Array.isArray(reviews) && reviews.map((review, index) => (
                    <div className="jogo__post" key={index}>
                        <div className="jogo__post-info-perfil-container">
                            <a href={`/perfil?id=${review.user_id}`} className="jogo__post-foto-user">
                                <img src={review.photo_adr} alt="Foto perfil" className="jogo__post-foto-user" />
                            </a>
                            <div className="jogo__post-info-user">
                                <p className="jogo__post-nomeUser">{review.name}</p>
                                {console.log(review)}
                                <div className="jogo__post-nota" style={{ backgroundColor: getCoresDasNotas(review.grade) }}>
                                    {review.grade}
                                </div>
                                <div className="jogo__post-remove">
                                    {currentUser && currentUser.id === review.user_id && (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className='delete-icon'
                                            onClick={() => handleDeleteReview(review.id, review.user_id)} // Use uma função anônima
                                        />

                                    )}
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
                                        <img src={review.image_adr} alt="Foto perfil" className="jogo__post-foto-opiniao"  onClick={() => setLightboxImage(review.image_adr)} />
                                    )}
                                </div>
                            </div>
                        </div>                     
                        <div className="post-cardlike-button-container">
                            <button className="post-cardlike-button" onClick={(event) => { handleLike(event, index) }}>
                                {review.userLiked ? 
                                    <FontAwesomeIcon icon={faThumbsUp} className={`post-cardlike-icon filled`} style={{ color: '#795FA1' }} /> :
                                    <FontAwesomeIcon icon={faThumbsUp} className={`post-cardlike-icon filled`} style={{ color: '#ddd' }} />}                          
                                <span className='post-cardlike-likes'>{review.likes} Curtidas</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
                {lightboxImage && (
                    <Lightbox
                    imageSrc={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                />
            )}
            <PostButton currentUser={currentUser} />
        </div>
    )
}

export default Jogo
