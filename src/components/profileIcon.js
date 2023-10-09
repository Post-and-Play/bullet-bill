import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';

import FotoPerfil from '../image/foto.png'
import { logout } from '../services/Auth';
import { Icon } from '@iconify/react';

const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar-profileicon">
      <a href="favoritos">
        <Icon icon="ri:heart-line" color="#b0afe6" width="45" height="45" hFlip={true} />
      </a>

      <img
        src={FotoPerfil}
        alt="Foto de Perfil"
        className="profile__picture"
        onClick={toggleMenu}
      />

      {menuVisible && (
        <ul className="profile__menu">
          <li>
            <Link to="/perfil" className="menu__link">Ver Perfil</Link>
          </li>
          <li>
            <Link to="/indicar-jogo" className="menu__link">Indicar um jogo</Link>
          </li>
          <li onClick={() => { logout(); window.location.assign('/'); }}>
            <p className="menu__link">Sair</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;