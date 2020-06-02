import React, {useContext} from 'react';
import NotificationsList from '../components/NotificationsList';
import LoginContext from '../components/context/LoginContext';
import NotLoggedIn from '../components/NotLoggedIn';

function Notifications() {
    const {loggedIn, user} = useContext(LoginContext);
    return (
    <div>
        {loggedIn ? <NotificationsList notifications={user.data[0].notifications}/> : NotLoggedIn}
    </div>
    )
}

export default Notifications;