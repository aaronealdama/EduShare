import React from 'react';

const LoginContext = React.createContext({
    loggedIn: null,
    user: null,
    toggleFalse: () => {},
    toggleUser: () => {},
    toggleLogout: () => {}
});

export default LoginContext;