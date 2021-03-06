import React from "react";
import Notification from "../Notification";
import "./index.css";

function NotificationsList(props) {
  return (
    <div className="NotificationsList">
      <h1 className="NotificationsList-h1">Notifications List</h1>
      <div className="NotificationsList-row">
        <div className="NotificationsList-container">
          {props.notifications !== null
            ? props.notifications.map((notification) => {
                return <Notification info={notification} />;
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default NotificationsList;
