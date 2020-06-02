import React from 'react';
import ButtonsAPI from '../../utils/ButtonsAPI';

function FollowButton(props) {
    const obj = {
        user: props.user.username,
        profile: props.profile.username
    }
    function handleFollow() {
        if (props.followingMe) {
            ButtonsAPI.buddy(obj)
            .then(() => props.clicked());
        } else {
            ButtonsAPI.follow(obj)
            .then(() => props.clicked());
        }
    }
    return <button onClick={handleFollow}>Follow</button>
}

export default FollowButton