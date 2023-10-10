import React from 'react'
import { Link } from 'react-router-dom';

import '../components/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../image/PAP.png';
import ProfileIcon from '../components/profileIcon';
import Searchbar from '../components/searchbar';

const navbar = ({ hideSearchbar }) => {
    return (
        <div>
            <nav className='nav__navbar'>
                <div className="nav__logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className='nav-img__logo' /> 
                    </Link>
                </div>
                <div className="search__bar">
                    {!hideSearchbar && <Searchbar />}
                </div>
                <div className="profile__icon">
                    {!hideSearchbar && <ProfileIcon />}
                </div>
            </nav>
        </div>
    )
}

export default navbar