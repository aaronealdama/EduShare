import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import LoginContext from '../context/LoginContext';
import LoginAPI from '../../utils/LoginAPI';

function NavBar() {
    const {toggleLogout, user} = useContext(LoginContext);
    function handleClick() {
        LoginAPI.logout(user.data[0].username);
        toggleLogout();
    }
    return (
        <div>
            <nav class="NavBar">
                <div className="NavBar-container">
                    <ul className="NavBar-list">
                        <li className="NavBar-listItem">
                            {user !== null ? user.data[0].username === null ? "" : <Link className="NavBar-link" to="/home">Home</Link> : ""}
                        </li>
                        <li className="NavBar-listItem">
                            <Link className="NavBar-link" to="/search">Search</Link>
                        </li>
                        <li className="NavBar-listItem">
                            {user !== null ? user.data[0].username === null ? <Link to="/">Login</Link> : <Link className="NavBar-link" to={`/profile/${user.data[0].username}`}>Profile</Link> : ""}
                        </li>
                        <li className="NavBar-listItem">
                            <Link className="NavBar-link" to="/contact">Contact</Link>
                        </li>
                        <li className="NavBar-listItem">
                            { user !== null ? user.data[0].username === null ? "" : <Link className="NavBar-link" onClick={handleClick} to="/">Logout</Link> : ""}
                        </li>
                        <li className="NavBar-listItem">
                            {user !== null ? user.data[0].username === null ? "" : <Link className="NavBar-link" to="/notifications">Notifications</Link> : ""}
                        </li>
                        <li className="NavBar-listItem">
                            {user !== null ? user.data[0].username === null ? "" : <Link className="NavBar-link" to="/follows">Follows</Link> : ""}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;