import React, {useState} from 'react';
import Person from '../Person';
import NavBar from '../NavBar';
import './index.css';

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
            <NavBar/>
            <div className="FriendsList-row">
                <div className="FriendsList-col">
                    <div className="FriendsList-btnGroup FriendsList-row">
                        <button 
                            className={buttonGroup.buddies ? "FriendsList-activeBtn" : "FriendsList-btn"} 
                            onClick={toggleBuddies}>
                            Buddies
                        </button>
                        <button 
                            className={buttonGroup.following ? "FriendsList-activeBtn" : "FriendsList-btn"} 
                            onClick={toggleFollowing}>
                            Following
                        </button>
                    </div>
                    <div className="FriendsList-results">
                        {
                            buttonGroup.following === true ? props.following.length > 0 ? 
                            props.following.map(follower => {
                                return <Person username={follower}/>
                            }) : <h2 className="FriendsList-h2">None following</h2> : 
                            props.buddies.length > 0 ?
                            props.buddies.map(buddie => {
                                return <Person username={buddie}/>
                            }) : <h2 className="FriendsList-h2">No buddies</h2>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsList;
