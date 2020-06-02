import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import NavBar from '../components/NavBar';
import VideoUpload from '../components/VideoUpload';
import VideoFeed from '../components/VideoFeed';
import ProfileInfo from '../components/ProfileInfo';
import UpdateButton from '../components/UpdateButton';
import "../css/Home.css";

function Home() {
    const {loggedIn, user} = useContext(LoginContext);
    const [redirect, setRedirect] = useState(false);   
    
    function handleRedirect() {
        setRedirect(true);
    }
    console.log(user);
    return (
        <div>
            {loggedIn === null ? <Redirect to='/'/> : ''}
            {redirect ? <Redirect to="/update"/> : ""}
            <NavBar/>
           {user !== null ? <div className="Home-row">
                <div className="Home-col">
                    <div className="Home-info">
                        <ProfileInfo profile={user}/>
                        <div className="Home-updateBtn">
                            <UpdateButton user={user} redirect={handleRedirect}/>
                        </div>
                    </div>
                </div>
                <div className="Home-col">
                    <div className="Home-video">
                        <VideoUpload/>
                        <VideoFeed following={user.data[0].following}/>
                    </div>
                </div>
            </div> : ""}
        </div>
    )
}

export default Home;