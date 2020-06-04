import React, { useState, useContext } from "react";
import axios from "axios";
import LoginContext from "../context/LoginContext";
import VideoAPI from "../../utils/VideoAPI";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { Close, CheckCircleOutline } from "@material-ui/icons";
import {useDropzone} from 'react-dropzone';

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

function VideoUpload() {
  const { user } = useContext(LoginContext);
  const [video, setVideo] = useState({
    title: "",
    id: uuidv4(),
    videoURL: "",
    author: user.data[0].username,
  });
  const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'video/*'
  });
  const acceptedFilesItems = acceptedFiles.map(file => {
    <p key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  })
  const rejectedFilesItems = rejectedFiles.map(file => {
    <p key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  });

  function handleChange(event) {
    setVideo({
      ...video,
      title: event.target.value,
    });
  }
  function handleVideo(event) {
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
      setVideo({
        ...video,
        videoURL: res.data.secure_url,
      });
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    VideoAPI.postVideo(video);
    setVideo({
      title: "",
      id: uuidv4(),
      videoURL: "",
      author: "",
    });
  }
  return (
    <div>
      <div className="VideoUpload-container">
        <form onSubmit={handleSubmit}>
          <div className="VideoUpload-col">
            <div className="VideoUpload-inputDiv">
              <label for="title" className="VideoUpload-label">
                Title
              </label>
              <div className="VideoUpload-inputContainer">
                <input
                  type="text"
                  placeholder="Title"
                  value={video.title}
                  onChange={handleChange}
                  className="VideoUpload-input"
                  id="title"
                />
              </div>
            </div>
            <div className="VideoUpload-inputDiv">
              <label for="video" className="VideoUpload-label">
                Video
              </label>
              <div className="VideoUpload-inputContainer">
                <div {...getInputProps({className: 'VideoUpload-dropzone'})}>
                  <input
                    {...getInputProps()}
                    placeholder="Video"
                    value={video.videoURL}
                    onChange={handleVideo}
                    className="VideoUpload-input"
                    id="video"
                  />
                  <h3 className={rejectedFilesItems.length > 0 ? "VideoUpload-h3" : "VideoUpload-none"}>
                    Rejected
                  </h3>
                </div>
              </div>
            </div>
            {video.videoURL !== "" ? (
              <button className="VideoUpload-btn">
                <CheckCircleOutline color="primary" />
                Submit
              </button>
            ) : (
              <div className="VideoUpload-row">
                <Close
                  style={{ color: "purple" }}
                  className="VideoUpload-close"
                  color="error"
                />
                <h3 className="VideoUpload-h3">No video selected</h3>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
