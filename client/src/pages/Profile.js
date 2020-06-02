import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import ProfilePage from '../components/ProfilePage';
import UserAPI from '../utils/UserAPI';

function Profile() {
    const [profile, setProfile] = useState(null);
    const {id} = useParams();
    const username = id;
    console.log(username);
    useEffect(() => {
        UserAPI.getUser(username)
        .then(res => {
            setProfile(res)
        })
    }, [])
    console.log(profile);
    return (
        <div>      
            {profile === null ? <Redirect to="/404"/> : <ProfilePage profile={profile} id={id}/>}       
        </div>
    )
}

export default Profile;