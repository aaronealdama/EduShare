import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import UserAPI from '../utils/UserAPI';
import axios from 'axios';

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function Update() {
    const {loggedIn, username} = useContext(LoginContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        UserAPI.getUser(username)
        .then(res => {
            setUser(res);
        })
    });
    const [update, setUpdate] = useState({
        profile_pic: '',
        teaches: '',
        about: ''
    })
    function handleChange(event) {
        setUpdate({
            ...update,
            [event.target.name]: event.target.value
        })
    }
    function handleProfilePic(event) {
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
        })
        .then((res) => {
            setUpdate({
                ...update,
                profile_pic: res.data.secure_url
            });
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        UserAPI.updateProfile(username, update.profile_pic, update.teaches, update.about)
        setUpdate({
            profile_pic: '',
            teaches: '',
            about: ''
        });
    }
    return (
        <div>
            {loggedIn !== true ? <Redirect to="/"/> : ""}
            <form onSubmit={handleSubmit}>
                <img src={user.profile_pic}/>
                <input
                    type="file"
                    name="profile_pic"
                    placeholder="Profile Pic"
                    onChange={handleProfilePic}
                />
                <input
                    type="text"
                    name="teaches"
                    value={user.teaches}
                    placeholder="Teaches"
                    onChange={handleChange}
                />
                <input
                    className="Update-about"
                    name="about"
                    value={user.about}
                    placeholder="About Me"
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default Update;
