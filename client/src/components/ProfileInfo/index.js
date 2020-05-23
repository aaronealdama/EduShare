import React from 'react';

function ProfileInfo(props) {
    return (
        <div className="ProfileInfo">
            <img src={props.profile.profile_pic} alt=""/>
            <div className="ProfileInfo-content">
                <p>{`${props.profile.first_name} ${props.profile.last_name}`}</p>
                <p>{props.profile.username}</p>
                <p>{props.profile.email}</p>
                <p>{props.profile.teaches}</p>
                <p>{props.profile.about}</p>
            </div>
        </div>
    )
}

export default ProfileInfo