import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import UserAPI from '../utils/UserAPI';
import FriendsList from '../components/FriendsList';
import NavBar from '../components/NavBar';
import NotificationsList from '../components/Notifications';
import VideoUpload from '../components/VideoUpload';
import VideoFeed from '../components/VideoFeed';

function Home() {
    const {loggedIn, username} = useContext(LoginContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        UserAPI.getUser(JSON.parse(username)).then(res => {
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
            <VideoUpload/>
            <VideoFeed following={user.following}/>
        </div>
    )
}

export default Home;