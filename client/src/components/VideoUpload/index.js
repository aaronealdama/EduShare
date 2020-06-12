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
  const [rejected, setRejected] = useState({
    reject: false,
    multiple: null,
    wrongFile: null,
  });
  const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'video/*',
    multiple: false,
    onDropRejected: handleRejected,
    onDropAccepted: handleVideo
  });

  function handleRejected() {
    setRejected({...rejected, reject: true});
    if (rejectedFiles.length > 1) {
      setRejected({...rejected, multiple: true});
    } else {
      setRejected({...rejected, wrongFile: true});
    }
  }
  function handleChange(event) {
    setVideo({
      ...video,
      title: event.target.value,
    });
  }
  function handleVideo(event) {
    console.log(event[0]);
    const file = event[0];
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
    setRejected({
      reject: false,
      multiple: null,
      wrongFile: null,
    })
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
                <div {...getRootProps({className: 'VideoUpload-input'})}>
                  <input
                    {...getInputProps()}
                  />
                  <p className="VideoUpload-inputPara">{video.videoURL !== "" ? video.videoURL : "Video"}</p>
                </div>
                <div className={rejected.reject ? "VideoUpload-rejected" : "VideoUpload-none"}>
                    <p className={rejected.multiple === true ? "VideoUpload-rejectPara" : "VideoUpload-none"}>
                      Cannot upload multiple files
                    </p>
                    <p className={rejected.wrongFile === true ? "VideoUpload-rejectPara" : "VideoUpload-none"}>
                      Wrong file type uploaded
                    </p>
                </div>
              </div>
            </div>
            {video.videoURL !== "" ? (
              <div className="VideoUpload-row">
                <button className="VideoUpload-btn">
                  <CheckCircleOutline color="primary" />
                  Submit
                </button>
              </div>
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
