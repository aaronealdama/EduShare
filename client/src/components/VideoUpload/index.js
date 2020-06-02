import React, {useState, useContext} from 'react';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import VideoAPI from '../../utils/VideoAPI';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function VideoUpload() {
    const {user} = useContext(LoginContext);
    const [video, setVideo] = useState({
        title: '',
        id: uuidv4(),
        videoURL: '',
        author: user.data[0].username
    });
    
    function handleChange(event) {
        setVideo({
            ...video,
            title: event.target.value 
        })
    }
    function handleVideo(event) {
        const file = event.target.files[0];
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        axios({
            method: 'post',
            url: CLOUDINARY_URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: fd
        }).then(res => {
            setVideo({
                ...video,
                videoURL: res.data.secure_url
            })
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        VideoAPI.postVideo(video);
        setVideo({
            title: '',
            id: uuidv4(),
            videoURL: '',
            author: ''
        })
    }
    return (
        <div>
            <div className="VideoUpload-container">
                <form onSubmit={handleSubmit}>
                    <div className="VideoUpload-col">
                        <div className="VideoUpload-inputDiv">
                            <label 
                                for="title" 
                                className="VideoUpload-label"
                            >
                                Title
                            </label>
                            <div className="VideoUpload-inputContainer">
                                <input
                                    placeholder="Title"
                                    value={video.title}
                                    onChange={handleChange}
                                    className="VideoUpload-input"
                                    id="title"
                                />
                            </div>
                        </div>
                        <div className="VideoUpload-inputDiv">
                            <label 
                                for="video" 
                                className="VideoUpload-label"
                            >
                                Video
                            </label>
                            <div className="VideoUpload-inputContainer">
                                <input
                                    placeholder="Video"
                                    value={video.videoURL}
                                    onChange={handleVideo}
                                    className="VideoUpload-input"
                                    id="video"
                                />
                            </div>
                        </div>
                        {video.videoURL !== '' ? <button className="VideoUpload-btn">Submit</button> : <h3 className="VideoUpload-h3">No video selected</h3>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VideoUpload;