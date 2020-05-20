import React from 'react';
import UserFeed from '../UserFeed';

function VideoFeed(props) {
    return (
        <div>
            {props.following.map(followed => {
                return <UserFeed user={followed}/>
            })}
        </div>
    )
}

export default VideoFeed;