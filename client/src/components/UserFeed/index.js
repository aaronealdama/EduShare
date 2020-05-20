import React, {useEffect, useState} from 'react';
import UserAPI from '../../utils/UserAPI';
import Video from '../Video';

function UserFeed(props) {
    const [user, setUser] = useState({})
    useEffect(() => {
        UserAPI.getUser(props.user)
        .then(res => {
            setUser(res);
        })
    })
    return (
        <div>
            {user.posted.sort((a, b) => {
                return b.date - a.date;
            }).map(video => {
                return <Video content={video}/>
            })}
        </div>
    )
}

export default UserFeed