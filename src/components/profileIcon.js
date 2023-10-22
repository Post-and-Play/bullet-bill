import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';

import FotoPerfil from '../image/foto.png'
import { logout } from '../services/Auth';
import { Icon } from '@iconify/react';


const ProfileMenu = ({ currentUser }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleImageError = (event) => {
        event.target.src = FotoPerfil;
    }

    useEffect(() => {
        if (currentUser)
            setProfileImage(currentUser.photo_adr);
    }, [currentUser]);

    //window.addEventListener('click', () => { if (menuVisible === true ) setMenuVisible(false) })
  
    return (
        <div className="navbar-profileicon">
            {!window.location.pathname.includes('/admin') ?
                <a href="favoritos">
                    <Icon icon="ri:heart-line" color="#b0afe6" width="45" height="45" hFlip={true} />
                </a> : <br />
            }
        
          <img
                src={profileImage}
                alt="Foto de Perfil"
                className="profile__picture"
                onClick={toggleMenu}
                onError={handleImageError}
          />

          {menuVisible && (
            <ul className="profile__menu">
                <li>
                    {window.location.pathname.includes('/admin') ? 
                        <Link to="/admin/perfil" className="menu__link">Ver Perfil</Link> :
                        <Link to="/perfil" className="menu__link">Ver Perfil</Link>
                    }
                </li>
             
                {!window.location.pathname.includes('/admin') ?
                    <li>
                        <Link to="/indicar-jogo" className="menu__link">Indicar um jogo</Link>
                    </li> : <br />
                }
            
                <li onClick={() => {
                    logout();
                    if (window.location.pathname.includes('/admin')) {
                        window.location.assign('/admin');
                    }
                    else {
                        window.location.assign('/');
                    }
                }}>
                <p className="menu__link">Sair</p>
              </li>
            </ul>
          )}
        </div>
  );
};

export default ProfileMenu;