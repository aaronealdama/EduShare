import React, {useEffect, useState} from 'react';
import UserAPI from '../../utils/UserAPI';
import Video from '../Video';
import './index.css';

function UserFeed(props) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        UserAPI.getUser(props.user)
        .then(res => {
            setUser(res);
        })
    }, [])
    console.log(user);
    return (
        <div>
            <h2>{props.user}</h2>
            {user !== null ? user.data[0].posted.sort((a, b) => {
                return b.date - a.date;
            }).map(video => {
                return (
                <div className="UserFeed-row">
                    <Video content={video}/>
                </div>
                )
            }) : ""}
        </div>
    )
}

export default UserFeed