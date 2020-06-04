import React, {useContext} from 'react';
import ButtonsAPI from '../../utils/ButtonsAPI';
import LoginContext from '../context/LoginContext';
import './index.css';

function FollowButton(props) {
    const {toggleUser} = useContext(LoginContext);
    const obj = {
        user: props.user.data[0].username,
        profile: props.profile.data[0].username
    }
    console.log(props);
    function handleFollow() {
        if (props.followingMe) {
            ButtonsAPI.buddy(obj)
            .then(res => {
                toggleUser(res)
            })
        } else {
            ButtonsAPI.follow(obj)
            .then(res => {
                toggleUser(res)
            })
        }
    }
    return <button className="FollowButton" onClick={handleFollow}>Follow</button>
}

export default FollowButton