import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {FaAlignRight} from 'react-icons/fa';
import './index.css';
import LoginContext from '../context/LoginContext';
import LoginAPI from '../../utils/LoginAPI';

function NavBar() {
    const [toggle, setToggle] = useState(false);
    const {toggleLogout, user} = useContext(LoginContext);
    function handleToggle() {
        setToggle(true);
    }
    function handleClick() {
        LoginAPI.logout(user.data[0].username);
        toggleLogout();
    }
    const username = user.data[0].username;
    return (
        <div>
            <div className="NavBar">
                <button className="NavBar-button" onClick={handleToggle}>
                    <FaAlignRight/>
                </button>
                <ul className={toggle ? "nav-links show-nav": "nav-links"}>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        {username === null ? <Link to="/">Login</Link> : <Link to={`/profile/${username}`}>Profile</Link>}
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        { username === null ? "" : <Link onClick={handleClick} to="/">Logout</Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar;