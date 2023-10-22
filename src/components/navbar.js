import React from 'react'
import { Link } from 'react-router-dom';

import '../components/navbar.css';
import Logo from '../image/PAP.png';
import ProfileIcon from '../components/profileIcon';
import Searchbar from '../components/searchbar';

const navbar = ({ hideSearchbar, hideProfileIcon, currentUser }) => {
    return (
        <div>
            <nav className='nav__navbar'>
                <div className="nav__logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className='nav-img__logo' />
                    </Link>
                </div>
                <div className="search__bar">
                    {!hideSearchbar && <Searchbar currentUser={currentUser} />}
                </div>
                <div className="profile__icon">
                    {!hideProfileIcon  && <ProfileIcon currentUser={currentUser} />}
                </div>
            </nav>
        </div>
    )
}

export default navbar