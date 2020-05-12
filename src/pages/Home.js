import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/LoginContext';

function Home() {
    const {login} = useContext(LoginContext);
    return (
        <div>
            {login === true ? <h1>Welcome back!</h1> : <Redirect to='/'/>}
        </div>
    )
}

export default Home;