import React from "react";
import Video from "../Video";
import "./index.css";

function ProfileVideoFeed(props) {
  console.log(props, props.profile);
  return (
    <div style={{marginTop: "10px"}}>
      {props.profile.data[0].posted.length > 0 ? (
        props.profile.data[0].posted
          .sort((a, b) => {
            return a.date - b.date;
          })
          .map((video) => {
            return (
            <div style={{display: "flex", justifyContent: "center"}}>
              <Video content={video} />
            </div>
            );
          })
      ) : (
        <h2 className="ProfileVideoFeed-h2">No videos posted</h2>
      )}
    </div>
  );
}

export default ProfileVideoFeed;
