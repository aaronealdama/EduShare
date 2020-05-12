import React from 'react';

const LoginContext = React.createContext({
    login: null,
    toggleLogin: () => {},
    toggleFalse: () => {}
});

export default LoginContext;