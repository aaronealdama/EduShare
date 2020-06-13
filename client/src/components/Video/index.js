import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import VideoAPI from "../../utils/VideoAPI";
import "./index.css";

function Video(props) {
  const { user } = useContext(LoginContext);
  const [video, setVideo] = useState(null);
  const [load, setLoad] = useState({
    checked: false,
    liked: false,
  });
  function newDate(time) {
    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const result = date.toLocaleDateString("en", options);
    return result;
  }
  function handleLike(event) {
    console.log(event);
    const obj = {
      id: event.target.id,
      username: user.data[0].username,
    };
    VideoAPI.likeVideo(obj);
    setLoad({ ...load, liked: true });
  }
  useEffect(() => {
    const obj = {
      id: props.content.id,
    };
    VideoAPI.getVideo(obj).then((res) => setVideo(res));
  }, [load]);
  console.log(load.liked, load.checked);
  if (video !== null && !load.checked && user !== null) {
    console.log("hey");
    if (video.data[0].who_liked.length > 0) {
      console.log("yeet");
      video.data[0].who_liked.forEach((like) => {
        console.log(like);
        if (like === user.data[0].username) {
          console.log("hi");
          setLoad({ ...load, liked: true });
        }
      });
    }
    setLoad({ ...load, checked: true });
  }
  return (
    <div>
      <div className="Video">
        <div className="Video-container">
          <video width="100" height="100" controls>
            <source src={props.content.video_url} type="video/mp4" />
          </video>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="Video-body">
              <h3 className="Video-h3">{props.content.title}</h3>
              <p className="Video-para">{newDate(props.content.date)}</p>
              <p className="Video-para">{props.content.author}</p>
              <p className="Video-para">
                Likes:
                {video !== null ? video.data[0].likes : ""}
              </p>
            </div>
            <div className="Video-buttonGroup">
              {user !== null ? (
                !load.liked ? (
                  <button
                    className="Video-btn"
                    id={props.content.id}
                    onClick={handleLike}
                  >
                    Like
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <Link
                className="Video-btn"
                to={`/profile/${props.content.author}`}
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
