import React, {useContext} from 'react';
import ButtonsAPI from '../../utils/ButtonsAPI';
import ProfileContext from '../context/ProfileContext';
import NotificationsAPI from '../../utils/NotificationsAPI';
import UserAPI from '../../utils/UserAPI';
import './index.css';

function FollowButton(props) {
    const {toggleProfile} = useContext(ProfileContext);
    const obj = {
        user: props.user.data[0].username,
        profile: props.profile.data[0].username
    }
    const notificationFollow = {
        username: props.profile.data[0].username,
        title: `User ${props.user.data[0].username} is following you`
    }
    const notificationBuddy =  {
        username: props.profile.data[0].username,
        title: `User ${props.user.data[0].username} is now your buddy!`
    }
    function handleFollow() {
        if (props.followingMe) {
            NotificationsAPI.add(notificationBuddy);
            ButtonsAPI.buddy(obj);
            UserAPI.getUser(props.profile.data[0].username)
            .then(res => toggleProfile(res));
        } else {
            NotificationsAPI.add(notificationFollow);
            ButtonsAPI.follow(obj)
            UserAPI.getUser(props.profile.data[0].username)
            .then(res => toggleProfile(res));
        }
    }
    return <button className="FollowButton" onClick={handleFollow}>Follow</button>
}

export default FollowButton