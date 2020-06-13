import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginContext from "../components/context/LoginContext";
import UserAPI from "../utils/UserAPI";
import axios from "axios";
import "../css/Update.css";
import NavBar from "../components/NavBar";
import { useDropzone } from "react-dropzone";

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function Update() {
  const { loggedIn, user, toggleUser } = useContext(LoginContext);
  const [update, setUpdate] = useState({
    profile_pic: user.data[0].profile_pic,
    teaches: "",
    about: "",
  });
  const [rejected, setRejected] = useState({
    reject: false,
    multiple: null,
    wrongFile: null,
  });
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
    onDropRejected: handleRejected,
    onDropAccepted: handleProfilePic,
  });
  useEffect(() => {
    setUpdate({ ...update, profile_pic: user.data[0].profile_pic });
  }, [user]);
  function handleChange(event) {
    setUpdate({
      ...update,
      [event.target.name]: event.target.value,
    });
  }
  function handleRejected() {
    setRejected({ ...rejected, reject: true });
    if (rejectedFiles.length > 1) {
      setRejected({ ...rejected, multiple: true });
    } else {
      setRejected({ ...rejected, wrongFile: true });
    }
  }
  function handleProfilePic(event) {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios({
      method: "post",
      url: CLOUDINARY_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: fd,
    }).then((res) => {
      setUpdate({
        ...update,
        profile_pic: res.data.secure_url,
      });
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      username: user.data[0].username,
      profile_pic: update.profile_pic,
      teaches: update.teaches,
      about: update.about,
    };
    UserAPI.updateProfile(obj);
    setUpdate({
      ...update,
      teaches: "",
      about: "",
    });
    setRejected({
      reject: false,
      multiple: null,
      wrongFile: null,
    });
    UserAPI.getUser(user.data[0].username).then((res) => toggleUser(res));
  }
  return (
    <div>
      {loggedIn !== true ? <Redirect to="/" /> : ""}
      <NavBar />
      {user !== null ? (
        <div className="Update-row">
          <div className="Update-col">
            <form className="Update-form" onSubmit={handleSubmit}>
              <div className="Update-row">
                <img
                  className="Update-img"
                  src={update.profile_pic}
                  alt={`${user.data[0].first_name} ${user.data[0].last_name}`}
                />
              </div>
              <div className="Update-inputDiv">
                <label className="Update-label" for="profile_pic">
                  Profile Picture
                </label>
                <div className="Update-row">
                  <div {...getRootProps({ className: "Update-input" })}>
                    <input {...getInputProps()} />
                    <p className="VideoUpload-inputPara">
                      {update.profile_pic !== ""
                        ? update.profile_pic
                        : "Profile Pic"}
                    </p>
                  </div>
                  <div
                    className={
                      rejected.reject
                        ? "VideoUpload-rejected"
                        : "VideoUpload-none"
                    }
                  >
                    <p
                      className={
                        rejected.multiple === true
                          ? "VideoUpload-rejectPara"
                          : "VideoUpload-none"
                      }
                    >
                      Cannot upload multiple files
                    </p>
                    <p
                      className={
                        rejected.wrongFile === true
                          ? "VideoUpload-rejectPara"
                          : "VideoUpload-none"
                      }
                    >
                      Wrong file type uploaded only JPEG and PNG files accepted
                    </p>
                  </div>
                </div>
              </div>
              <div className="Update-inputDiv">
                <label className="Update-label" htmlFor="teaches">
                  Teaches
                </label>
                <div className="Update-row">
                  <input
                    type="text"
                    name="teaches"
                    value={update.teaches}
                    placeholder="Teaches"
                    onChange={handleChange}
                    className="Update-input"
                    id="teaches"
                  />
                </div>
              </div>
              <div className="Update-inputDiv">
                <label className="Update-label" htmlFor="about">
                  About
                </label>
                <div className="Update-row">
                  <input
                    className="Update-about"
                    name="about"
                    value={update.about}
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Update;
