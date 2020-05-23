import React from 'react';
import Video from '../Video';

function ProfileVideoFeed(props) {
    return (
        <div>
            {props.profile.posted.sort((a, b) => {
                return a.date - b.date;
            }).map(video => {
                return <Video content={video}/>
            })}
        </div>
    )
}

export default ProfileVideoFeed;