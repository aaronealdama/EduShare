import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import UserAPI from '../utils/UserAPI';
import FriendsList from '../components/FriendsList';
import NavBar from '../components/NavBar';
import NotificationsList from '../components/Notifications';

function Home() {
    const {loggedIn, username} = useContext(LoginContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        UserAPI.getUser(username).then(res => {
            setUser(res);
        })
    }, []);
    console.log(user);
    return (
        <div>
            {loggedIn === false ? <Redirect to='/'/> : ''}
            <NavBar/>
            <FriendsList following={user.data[0].following} buddies={user.data[0].buddies}/>
            <NotificationsList notifications={user.notifications}/>
        </div>
    )
}

export default Home;