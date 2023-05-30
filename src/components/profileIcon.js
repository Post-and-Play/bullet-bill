import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';

import FotoPerfil from '../image/foto.png'

const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar-profileicon">
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
            <Link to="/login" className="menu__link">Sair</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;