import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../components/Logo';
import LoginContext from '../components/context/LoginContext';
import "../css/Homepage.css";

function Homepage() {
    const [redirect, setRedirect] = useState({
        redirectLogin: false,
        redirectSignup: false
    })
    const {loggedIn} = useContext(LoginContext);
    function onClickLogin() {
        setRedirect({
            ...redirect,
            redirectLogin: true
        })
    }
    function onClickSignup() {
        setRedirect({
            ...redirect,
            redirectSignup: true
        })
    }
    return (
        <div>
            {loggedIn === true ? <Redirect to="/home"/> : ''}
            <div className="Homepage-container">
                <div className="Homepage-row">
                    <Logo/>
                </div>
                <div className="Homepage-row">
                    <button className="Homepage-btn" onClick={onClickLogin}>Login</button>
                    <button className="Homepage-btn" onClick={onClickSignup}>Signup</button>
                </div>
            </div>
            {redirect.redirectLogin === true ? <Redirect to="/login"/> : ''}
            {redirect.redirectSignup === true ? <Redirect to="/signup"/> : ''}
        </div>
    )
}

export default Homepage;