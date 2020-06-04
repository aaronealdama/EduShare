import React from 'react';
import "./index.css";

function ProfileInfo(props) {
    return (
        <div className="ProfileInfo">
            <div className="ProfileInfo-imgContainer">
                <img className="ProfileInfo-img" src={props.profile.data[0].profile_pic} alt=""/>
            </div>
            <div className="ProfileInfo-content">
                <p className="ProfileInfo-para">
                    {`${props.profile.data[0].first_name} ${props.profile.data[0].last_name}`}
                </p>
                <div className="ProfileInfo-paraDiv">
                    <label className="ProfileInfo-label">Username:</label>
                    <p className="ProfileInfo-para">{props.profile.data[0].username}</p>
                </div>
                <div className="ProfileInfo-paraDiv">
                    <label className="ProfileInfo-label">Email:</label>
                    <p className="ProfileInfo-para">{props.profile.data[0].email}</p>
                </div>
                <div className="ProfileInfo-paraDiv">
                    <label className="ProfileInfo-label">Teaches:</label>
                    <p className="ProfileInfo-para">{props.profile.data[0].teaches}</p>
                </div>
                <div className="ProfileInfo-paraDiv">
                    <label className="ProfileInfo-label">About:</label>
                    <p className="ProfileInfo-para">{props.profile.data[0].about}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo