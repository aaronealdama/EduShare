import React from 'react';
import ButtonsAPI from '../../utils/ButtonsAPI';

function UnFollowButton(props) {
    const obj = {
        user: props.user,
        profile: props.profile
    }
    function handleClick() {
        ButtonsAPI.remove(obj)
        .then(() => props.clicked());
    }
    return <button onClick={handleClick}>Unfollow</button>
}

export default UnFollowButton;