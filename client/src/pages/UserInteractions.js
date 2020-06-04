import React, {useContext} from 'react';
import FriendsList from '../components/FriendsList';
import NotLoggedIn from '../components/NotLoggedIn';
import LoginContext from '../components/context/LoginContext';

function UserInteractions() {
    console.log('hey');
    const {loggedIn, user} = useContext(LoginContext);
    console.log(user);
    return (
        <div>
            {loggedIn ? <FriendsList following={user.data[0].following} buddies={user.data[0].buddies}/>
            : <NotLoggedIn/>    
        }
        </div>
    )
}

export default UserInteractions;