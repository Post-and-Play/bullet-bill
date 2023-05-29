import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';

const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar-profileicon">
      <img
        src="caminho/para/foto-de-perfil.jpg"
        alt="Foto de Perfil"
        className="profilepicture"
        onClick={toggleMenu}
      />

      {menuVisible && (
        <ul className="profile__menu">
          <li>
            <Link to="/perfil" className="menu__link">Ver Perfil</Link>
          </li>
          <Link to="/login" className="menu__link">Sair</Link>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;