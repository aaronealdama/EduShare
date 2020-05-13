import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/LoginContext';
import UserAPI from '../utils/UserAPI';
import FriendsList from '../components/FriendsList';

function Home() {
    const {loggedIn, username} = useContext(LoginContext);
    const user = UserAPI.getUser(username);
    return (
        <div>
            {loggedIn === false ? <Redirect to='/'/> : ''}
            <FriendsList following={user.data[0].following} buddies={user.data[0].buddies}/>
        </div>
    )
}

export default Home;