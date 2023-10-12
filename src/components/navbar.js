import React from 'react'
import { Link } from 'react-router-dom';

import '../components/navbar.css';
<<<<<<< HEAD
//import 'bootstrap/dist/css/bootstrap.min.css';
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
import Logo from '../image/PAP.png';
import ProfileIcon from '../components/profileIcon';
import Searchbar from '../components/searchbar';

<<<<<<< HEAD
const navbar = ({ hideSearchbar, currentUser }) => {
=======
const navbar = ({ hideSearchbar }) => {
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
    return (
        <div>
            <nav className='nav__navbar'>
                <div className="nav__logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className='nav-img__logo' />
                    </Link>
                </div>
                <div className="search__bar">
<<<<<<< HEAD
                    {!hideSearchbar && <Searchbar currentUser={currentUser} />}
                </div>
                <div className="profile__icon">
                    {!hideSearchbar && <ProfileIcon currentUser={currentUser} />}
=======
                    {!hideSearchbar && <Searchbar />}
                </div>
                <div className="profile__icon">
                    {!hideSearchbar && <ProfileIcon />}
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                </div>
            </nav>
        </div>
    )
}

export default navbar