import React from 'react';
import UserFeed from '../UserFeed';
import './index.css';

function VideoFeed(props) {
    console.log(props.following);
    return (
        <div>
            <div className="VideoFeed-container">
                <h1 className="VideoFeed-h1">Video Feed</h1>
                {props.following.length !== 0 ? props.following.map(followed => {
                    return <UserFeed user={followed}/>
                }) : <h2 className="VideoFeed-h2">Empty</h2>}
            </div>
        </div>
    )
}

export default VideoFeed;