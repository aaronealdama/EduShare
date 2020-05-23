import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import FriendsList from '../components/FriendsList';
import NavBar from '../components/NavBar';
import NotificationsList from '../components/NotificationsList';
import VideoUpload from '../components/VideoUpload';
import VideoFeed from '../components/VideoFeed';
import ProfileInfo from '../components/ProfileInfo';
import UpdateButton from '../components/UpdateButton';

function Home() {
    const {loggedIn, user} = useContext(LoginContext);
    const [redirect, setRedirect] = useState(false);   
    
    function handleRedirect() {
        setRedirect(true);
    }
    return (
        <div>
            {loggedIn === false ? <Redirect to='/'/> : ''}
            {redirect ? <Redirect to="/update"/> : ""}
            <NavBar/>
            <div className="Home-userInfo">
                <ProfileInfo profile={user}/>
                <UpdateButton user={user} redirect={handleRedirect}/>
            </div>  
            <FriendsList following={user.data[0].following} buddies={user.data[0].buddies}/>
            <NotificationsList notifications={user.data[0].notifications}/>
            <VideoUpload/>
            <VideoFeed following={user.data[0].following}/>
        </div>
    )
}

export default Home;