import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import VideoAPI from '../../utils/VideoAPI';
import './index.css';

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
                <div className="Video-container">
                    <video width="100" height="100" controls>
                        <source src={props.content.video_url} type="video/mp4"/>
                    </video>
                    <div className="Video-body">
                        <h3 className="Video-h3">{props.content.title}</h3>
                        <p className="Video-para">{props.content.date}</p>
                        <p className="Video-para">{props.content.author}</p>
                    </div>
                    <div className="Video-buttonGroup">
                        {!liked ? <button 
                            className="Video-btn" 
                            id={props.content.id} 
                            onClick={handleLike}>
                            Like
                        </button> : ""}
                        <Link className="Video-btn" to={`/profile/${props.content.author}`}>
                            Go to Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Video;