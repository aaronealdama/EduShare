import React from 'react';
import Video from '../Video';

function ProfileVideoFeed(props) {
    console.log(props, props.profile);
    return (
        <div>
            {props.profile.data[0].posted.sort((a, b) => {
                return a.date - b.date;
            }).map(video => {
                return <Video content={video}/>
            })}
        </div>
    )
}

export default ProfileVideoFeed;