import React from 'react'

import '../components/navbar.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../image/PAP.png';
import ProfileIcon from '../components/profileIcon';
import Searchbar from '../components/searchbar';

const navbar = () => {
    return (
        <div>
            <nav className='nav__navbar'>
                <div className="nav__logo">
                    <a href="Home.js">
                        <img src={Logo} alt="Logo" className='nav-img__logo' />
                    </a>
                </div>
                <div className="search__bar">
                    <Searchbar />
                </div>
                <div className="profile__icon">
                    <ProfileIcon />
                </div>
            </nav>
        </div>
    )
}

export default navbar