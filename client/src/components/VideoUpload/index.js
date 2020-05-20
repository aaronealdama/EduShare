import React, {useState, useContext} from 'react';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import VideoAPI from '../../utils/VideoAPI';
import { v4 as uuidv4 } from 'uuid';

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function VideoUpload() {
    const [video, setVideo] = useState({
        title: '',
        id: uuidv4(),
        videoURL: '',
        author: ''
    });
    const {username} = useContext(LoginContext);
    setVideo({
        ...video,
        author: JSON.parse(username)
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
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={video.title}
                    onChange={handleChange}
                />
                <input
                    placeholder="Video"
                    value={video.videoURL}
                    onChange={handleVideo}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default VideoUpload;