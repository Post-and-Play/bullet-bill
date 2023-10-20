import './Perfil.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Steam from './icons/steam.png';
import Discord from './icons/discord.png';
import EpicGames from './icons/epic-games.png';
import Twitch from './icons/twitch.png';
import Github from './icons/github.png';
import ConfigButton from './components/ConfigButton';
import PostButton from './components/postButton';
import Navbar from './components/navbar';
import Lightbox from './components/LightBox';
import api from './services/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth } from './services/Auth';
import { FaUserPlus, FaCheck, FaTrash } from 'react-icons/fa';
import { Modals } from './components/Modals';

const AdminPerfil = () => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [currentUser, setCurrentUser] = useState();
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        let user = await getAuth();
        if (user) {

            setCurrentUser(user);
            setUserId(user.id);
            setName(user.name);
            setProfileImage(user.photo_adr);
            setBannerImage(user.top_adr);
         
        } else {
            navigate('/admin');
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            loading.show();
            await getCurrentUser();
            loading.close();
        };
        fetchData();
    }, []);

    return (
        <div className="perfil__page-container">
          <Navbar currentUser={currentUser} />
          <header className="perfil-banner__container">
            <img src={bannerImage} alt="Banner usuário" className="perfil-banner__banner" />
            <div className="perfil-banner__foto">
              <img src={profileImage} alt="Foto perfil" className="perfil__foto" />
            </div>
            <ConfigButton currentUser={currentUser} />
          </header>
          <div className="perfil-info-post__container">
            <div className="perfil-info__container">
              <section className="perfil-info__nome-container">
                <div className="perfil-info__follow-container">
                  <h1>{name}</h1>
                </div>
              </section>
              <section className="perfil-info__info-container">
                <div className="perfil-info__info perfil-info__descricao">
                  {/*<h2>Descrição</h2>*/}
                  {/*<p>{description}</p>*/}
                </div>
              </section>
            </div>
          </div>
          {lightboxImage && (
            <Lightbox
              imageSrc={lightboxImage}
              onClose={() => setLightboxImage(null)}
            />
          )}
          <PostButton currentUser={currentUser} />
        </div>
    );
};

export default AdminPerfil;