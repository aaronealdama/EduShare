import React from "react";
import Video from "../Video";
import "./index.css";

function ProfileVideoFeed(props) {
  console.log(props, props.profile);
  return (
    <div>
      {props.profile.data[0].posted.length > 0 ? (
        props.profile.data[0].posted
          .sort((a, b) => {
            return a.date - b.date;
          })
          .map((video) => {
            return <Video content={video} />;
          })
      ) : (
        <h2 className="ProfileVideoFeed-h2">No videos posted</h2>
      )}
    </div>
  );
}

export default ProfileVideoFeed;
