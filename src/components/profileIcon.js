<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> origin/games
import { Link } from 'react-router-dom';
import '../components/profileIcon.css';

import FotoPerfil from '../image/foto.png'
<<<<<<< HEAD

const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
=======
import { logout } from '../services/Auth';
import api from '../services/Api';
import { getUser } from '../services/Auth';
import { Modals } from '../components/Modals';


const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);



  const getCurrentUser = async() => {

    let user = await getUser();
    if (user) {
        const response = await api.get('./api/users?id=' + user.id);
        if (response.data.id){

            setProfileImage(response.data.photo_adr);

        }
      }

  }
>>>>>>> origin/games

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

<<<<<<< HEAD
  return (
    <div className="navbar-profileicon">
      <img
        src={FotoPerfil}
=======
    useEffect(() => {
        const fetchData = async () => {
            await getCurrentUser();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

  return (
    <div className="navbar-profileicon">
      <img
        src={profileImage}
>>>>>>> origin/games
        alt="Foto de Perfil"
        className="profile__picture"
        onClick={toggleMenu}
      />

      {menuVisible && (
        <ul className="profile__menu">
          <li>
            <Link to="/perfil" className="menu__link">Ver Perfil</Link>
          </li>
<<<<<<< HEAD
          <li>
            <Link to="/login" className="menu__link">Sair</Link>
=======
                  <li onClick={() => { logout(); window.location.assign('/'); }}>
            <p className="menu__link">Sair</p>
>>>>>>> origin/games
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;