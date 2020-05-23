import React from 'react';
import Notification from '../Notification';

function NotificationsList(props) {
    return (
        <div>
            <h1>Notification List</h1>
            <div className="NotificationsList-container">
                {props.notifcations !== null ? props.notifications.map(notification => {
                   return <Notification info={notification}/>
                }) : ""}
            </div>
        </div>
    )
};

export default NotificationsList;