import React, {useState, useContext} from 'react';
import ButtonsAPI from '../../utils/ButtonsAPI';
import ProfileContext from '../context/ProfileContext';
import UserAPI from '../../utils/UserAPI';
import './index.css';

function UnFollowButton(props) {
    const {toggleProfile} = useContext(ProfileContext);
    const [checked, setChecked] = useState(false);
    const [buddy, setBuddy] = useState(false);
    const obj = {
        user: props.user.data[0].username,
        profile: props.profile.data[0].username
    }
    console.log(buddy);
    if (!checked) {
        props.profile.data[0].buddies.forEach(buddy => {
            if (buddy === props.user.data[0].username) setBuddy(true);
        })
        setChecked(true);
    }
    function handleClick() {
        if (!buddy) {
            ButtonsAPI.unfollow(obj)
            UserAPI.getUser(props.profile.data[0].username)
            .then(res => toggleProfile(res));
        } else {
            ButtonsAPI.remove(obj)
            UserAPI.getUser(props.profile.data[0].username)
            .then(res => toggleProfile(res));
        }
    }
    return <button className="UnfollowButton" onClick={handleClick}>Unfollow</button>
}

export default UnFollowButton;