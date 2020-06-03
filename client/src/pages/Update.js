import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import LoginContext from '../components/context/LoginContext';
import UserAPI from '../utils/UserAPI';
import axios from 'axios';
import '../css/Update.css';
import NavBar from '../components/NavBar';

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function Update() {
    const {loggedIn, user} = useContext(LoginContext);
    const [update, setUpdate] = useState({
        profile_pic: '',
        teaches: '',
        about: ''
    })
    const username = user.data[0].username;
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
            <NavBar/>
            {user !== null ? <div className="Update-row">
                <div className="Update-col">
                    <form className="Update-form" onSubmit={handleSubmit}>
                        <div className="Update-row">
                            <img 
                                className="Update-img" 
                                src={user.data[0].profile_pic} 
                                alt={`${user.data[0].first_name} ${user.data[0].last_name}`}
                            />
                        </div>
                        <div className="Update-inputDiv">
                            <label className="Update-label" for="profile_pic">
                                Profile Picture
                            </label>
                            <div className="Update-row">
                                <input
                                    type="file"
                                    name="profile_pic"
                                    placeholder="Profile Pic"
                                    onChange={handleProfilePic}
                                    className="Update-input"
                                    id="profile_pic"
                                />
                            </div>
                        </div>
                        <div className="Update-inputDiv">
                            <label className="Update-label" for="teaches">
                                Teaches
                            </label>
                            <div className="Update-row">
                                <input
                                    type="text"
                                    name="teaches"
                                    value={user.data[0].teaches}
                                    placeholder="Teaches"
                                    onChange={handleChange}
                                    className="Update-input"
                                    id="teaches"
                                />
                            </div>
                        </div>
                        <div className="Update-inputDiv">
                            <label className="Update-label" for="about">
                                About
                            </label>
                            <div className="Update-row">
                                <input
                                    className="Update-about"
                                    name="about"
                                    value={user.data[0].about}
                                    placeholder="About Me"
                                    onChange={handleChange}
                                    className="Update-input"
                                    id="about"
                                />
                            </div>
                        </div>
                        <div className="Update-row">
                            <button className="Update-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div> : ""}
        </div>
    )
}

export default Update;
