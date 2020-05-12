import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../components/Logo';
import LoginContext from '../components/LoginContext';

function Homepage() {
    const [redirect, setRedirect] = useState({
        redirectLogin: false,
        redirectSignup: false
    })
    const {login} = useContext(LoginContext);
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
            {login === true ? <Redirect to="/home"/> : ''}
                <Logo/>
                <button onClick={onClickLogin}>Login</button>
                <button onClick={onClickSignup}>Signup</button>
            {redirect.redirectLogin === true ? <Redirect to="/login"/> : ''}
            {redirect.redirectSignup === true ? <Redirect to="/signup"/> : ''}
        </div>
    )
}

export default Homepage;