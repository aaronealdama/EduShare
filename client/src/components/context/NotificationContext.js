import React from 'react';

const NotificationContext = React.createContext({
    notifications: null,
    toggleNotifications: () => {}
});

export default NotificationContext;