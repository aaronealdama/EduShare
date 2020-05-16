import React from 'react';
import Notification from '../Notification';

function NotificationsList(props) {
    return (
        <div>
            {props.notifications.map(notification => {
                <Notification info={notification}/>
            })}
        </div>
    )
};

export default NotificationsList;