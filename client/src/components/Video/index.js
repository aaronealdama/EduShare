import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import VideoAPI from '../../utils/VideoAPI';

function Video(props) {
    const {username} = useContext(LoginContext);
    const [liked, setLiked] = useState(false);
    function handleLike(event) {
        const obj = {
            id: event.target.id,
            username: JSON.parse(username)
        }
        VideoAPI.likeVideo(obj)
        setLiked(true);
    }
    useEffect(() => {
        props.content.who_liked.forEach(user => {
            if (user === JSON.parse(username)) setLiked(true)
        })
    })
    return (
        <div>
            <div className="Video">
                <video width="200" height="250" controls>
                    <source src={props.content.video_url} type="video/mp4"/>
                </video>
                <div className="Video-body">
                    <h3>{props.content.title}</h3>
                    <p>{props.content.date}</p>
                    <p>{props.content.author}</p>
                    <div className="Video-buttonGroup">
                        {!liked ? <button id={props.content.id} onClick={handleLike}>Like</button> : ""}
                        <Link className="Video-goTo" to={`/profile/${props.content.author}`}>
                            Go to Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Video;