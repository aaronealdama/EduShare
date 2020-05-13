import React, {useState, useContext} from 'react';
import Person from '../Person';

function FriendsList(props) {
    const [buttonGroup, setButtonGroup] = useState({
        following: true,
        buddies: false
    });
    function toggleBuddies() {
        setButtonGroup({following: false, buddies: true})
    } 
    function toggleFollowing() {
        setButtonGroup({following: true, buddies: false})
    }
    return (
        <div>
            <div className="FriendsList-buttonGroup" style={{display: "flex"}}>
                <button onClick={toggleBuddies}>Buddies</button>
                <button onClick={toggleFollowing}>Following</button>
            </div>
            {buttonGroup.following === true ? props.following.map(follower => {
                return <Person info={follower}/>
            }) : props.buddies.map(buddie => {
                return <Person info={buddie}/>
            })}
        </div>
    )
}

export default FriendsList;
