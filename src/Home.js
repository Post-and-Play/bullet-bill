import '../src/Home.css'

import React from 'react';
import PostButton from './components/PostButton';
import Navbar from './components/navbar';

const Home = () => {

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Carousel Example</h2>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    {/* Indicators */}
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    {/* Wrapper for slides */}
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="la.jpg" alt="Los Angeles" style={{ width: '100%' }} />
                            <div className="carousel-caption">
                                <h3>Los Angeles</h3>
                                <p>LA is always so much fun!</p>
                            </div>
                        </div>
                        <div className="item">
                            <img src="chicago.jpg" alt="Chicago" style={{ width: '100%' }} />
                            <div className="carousel-caption">
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                            </div>
                        </div>
                        <div className="item">
                            <img src="ny.jpg" alt="New York" style={{ width: '100%' }} />
                            <div className="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div>
                    </div>
                    {/* Left and right controls */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className="custom-container">
                <div className="container__card-post">
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src="" alt="Foto perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Usuário</span>
                                <span className='card-post__game card-post__content'>Jogo</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src="" alt="Foto perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Usuário</span>
                                <span className='card-post__game card-post__content'>Jogo</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src="" alt="Foto perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Usuário</span>
                                <span className='card-post__game card-post__content'>Jogo</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                    </div>
                    <div className="card-post">
                        <div className="container__foto-content">
                            <div className="card-post__foto-container">
                                <a href="#">
                                    <img src="" alt="Foto perfil" className='card-post__foto' />
                                </a>
                            </div>
                            <div className="card-post__content-container">
                                <span className='card-post__user card-post__content'>Usuário</span>
                                <span className='card-post__game card-post__content'>Jogo</span>
                                <div className="card-post__nota card-post__content">10</div>
                            </div>
                        </div>
                        <div className="card-post__descricrao">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet atque perferendis laudantium officiis libero vero molestias facilis doloribus, aliquid corporis perspiciatis blanditiis soluta, quasi repellendus ad. Adipisci, ipsa facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident porro maiores distinctio eveniet repellendus, dolorem quae incidunt quis laboriosam dolore. Provident labore optio molestias magnam commodi deserunt in ex voluptatem.</p>
                        </div>
                    </div>
                </div>
            </div>
            <PostButton />
        </div>
    );
}

export default Home;