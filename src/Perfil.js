import './Perfil.css'

import React from 'react'
import { Icon } from '@iconify/react';

import PostButton from './components/postButton';
import Navbar from './components/navbar';

import Banner from './image/banner.png'
import FotoPerfil from './image/foto.png'

const Perfil = () => {
    return (
        <div className='perfil__page-container'>
            <Navbar />
            <header className="perfil-banner__container">
                <img src={Banner} alt="Banner usuário" className='perfil-banner__banner' />
                <div className="perfil-banner__foto">
                    <img src={FotoPerfil} alt="Foto perfil" className='perfil__foto' />
                </div>
                <Icon icon="ph:gear" className='perfil-banner__gearIcon' />
            </header>
            <div className="perfil-info-post__container">
                <div className="perfil-info__container">
                    <section className="perfil-info__nome-container">
                        <h1>Rodolfo</h1>
                        <div className="perfil-info__follow-container">
                            <p className='perfil-info__folllow'>29 seguidores</p>
                            <p className='perfil-info__folllow'>11 seguindo</p>
                        </div>
                    </section>
                    <section className="perfil-info__info-container">
                        <div className="perfil-info__info perfil-info__plataformas">
                        </div>
                        <div className="perfil-info__info perfil-info__descricao">
                            <h2>Descrição</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit corporis quaerat veniam cum, debitis aliquam cumque mollitia aspernatur. Atque enim sit at rerum vitae placeat eveniet omnis aliquam dolorum hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, in minima illo dignissimos, natus commodi aliquam perspiciatis laudantium similique ratione adipisci nostrum delectus aliquid at nam impedit possimus. Inventore, blanditiis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque magni rem dolor et, neque quod libero saepe, repellat ad id velit vel inventore voluptatem facilis eligendi adipisci nesciunt illum? Harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab est veniam, omnis ducimus, delectus soluta ipsum quidem architecto eligendi laborum illum voluptas enim explicabo vero, praesentium ex aliquid at cum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores saepe ullam, iste deserunt totam magni impedit laborum doloribus laboriosam ipsam in illo eius. Ad quae quis similique rem nam nemo! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil iste laboriosam minima voluptatem. Autem voluptas, ut sit voluptatum perspiciatis blanditiis hic deleniti sunt reiciendis consequuntur beatae sed inventore ducimus aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ipsam, autem corrupti magni eius blanditiis et ea in natus eveniet itaque, ab, iure suscipit mollitia inventore? Quisquam ex optio maiores.</p>
                        </div>
                    </section>
                </div>
                <div className="perfil-post__container">
                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src="" alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Overwatch</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                    </article>

                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src="" alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Overwatch</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                    </article>

                    <article className="perfil-post__post">
                        <div className="perfil-post-container__foto-content">
                            <div className='perfil-post-card-post__foto-container'>
                                <a href="">
                                    <img src="" alt="Foto jogo" className="perfil-post-card__foto" />
                                </a>
                            </div>
                            <div className='perfil-post-card__content-container'>
                                <h3 className='perfil-post-card__game perfil-post__content'>Overwatch</h3>
                                <div className="perfil-post-card__nota perfil-post__content">7</div>
                            </div>
                        </div>
                        <div className="perfil-post-card__descricrao">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ducimus error facere maxime, distinctio optio excepturi atque accusantium aliquid fuga nostrum iste dolore porro illum quibusdam? Aut odit sapiente eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic, voluptatem quas commodi voluptate reiciendis ipsum consectetur. Accusantium ab error aliquam voluptatem. Error repellat a rerum iure voluptatum quae voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit asperiores vel dolorem dolore aperiam fuga aut, quisquam ducimus eius quo nesciunt maiores dolor eveniet amet. Modi quaerat tempora fugit consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quae debitis id deserunt dolores quia nihil quaerat. Eaque itaque labore voluptate repellat unde. Tempora cupiditate architecto ducimus fuga nemo sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet rem neque eos, vero voluptatibus placeat repellendus aliquid voluptas corrupti recusandae aliquam ex optio minima dolores voluptatem voluptatum velit dicta?</p>
                        </div>
                    </article>
                </div>
            </div>

            <PostButton />
        </div>
    )
}

export default Perfil