import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ProfilePage from '../components/ProfilePage';
import UserAPI from '../utils/UserAPI';

function Profile() {
    const [profile, setProfile] = useState(null);
    const {id} = useParams();
    const username = id;
    console.log(username);
    useEffect(() => {
        console.log('hi');
        UserAPI.getUser(username)
        .then(res => {
            console.log('hello');
            setProfile(res)
        })
    })
    console.log(profile);
    return (
        <div>      
            {profile === null ? "" : <ProfilePage profile={profile} id={id}/>}       
        </div>
    )
}

export default Profile;