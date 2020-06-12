import React, {useContext} from 'react';
import NotificationsAPI from '../../utils/NotificationsAPI';
import NotificationsContext from '../context/NotificationContext';
import LoginContext from '../context/LoginContext';
import {Link} from 'react-router-dom';
import './index.css';

function Notification(props) {
    const {toggleNotifications} = useContext(NotificationsContext);
    const {user} = useContext(LoginContext);
    const profileUsername = props.notification.split(" ")[1];
    function handleDelete() {
        const obj = {
            username: user.data[0].username,
            notification: props.notification,
        }
        NotificationsAPI.delete(obj)
        .then(res => toggleNotifications(res.data[0].notifications))
    }
    return (
        <div>
            <div className="Notification-row">
                <div className="Notification">
                    <p className="Notification-para">{props.notification}</p>
                    <div className="Nofication-btnGroup">
                        <button 
                            onClick={handleDelete} 
                            className="Notification-btnDelete"
                        >
                            Delete
                        </button>
                        <Link className="Notification-btn" to={`/profile/${profileUsername}`}>
                            View Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Notification;