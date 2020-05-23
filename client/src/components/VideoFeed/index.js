import React from 'react';
import UserFeed from '../UserFeed';

function VideoFeed(props) {
    return (
        <div>
            <h1>Video Feed</h1>
            {props.following ? props.following.map(followed => {
                return <UserFeed user={followed}/>
            }): ""}
        </div>
    )
}

export default VideoFeed;