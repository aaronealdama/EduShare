import React from 'react';

const LoginContext = React.createContext({
    loggedIn: null,
    username: null,
    toggleFalse: () => {},
    toggleChange: () => {},
    toggleLogout: () => {}
});

export default LoginContext;