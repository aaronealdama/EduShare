import React from 'react';

const ProfileContext = React.createContext({
    userProfile: null,
    userId: null,
    toggleProfile: () => {},
    toggleId: () => {}
});

export default ProfileContext;