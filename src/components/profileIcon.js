import React, { useState } from 'react';

import '../components/profileIcon.css'

const ProfileMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="navbar-profile__icon">
            <img
                src="caminho/para/foto-de-perfil.jpg"
                alt="Foto de Perfil"
                className="profile__picture"
                onClick={toggleMenu}
            />

            {menuVisible && (
                <ul className="profile__menu">
                    <li>Ver Perfil</li>
                    <li>Editar Perfil</li>
                    <li>Sair</li>
                </ul>
            )}
        </div>
    );
};

export default ProfileMenu;