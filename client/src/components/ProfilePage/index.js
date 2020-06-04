import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import NavBar from "../NavBar";
import UserAPI from "../../utils/UserAPI";
import FollowButton from "../FollowButton";
import UnFollowButton from "../UnFollowButton";
import UpdateButton from "../UpdateButton";
import ProfileVideoFeed from "../ProfileVideoFeed";
import ProfileInfo from "../ProfileInfo";
import Online from "../Online";
import NotOnline from "../NotOnline";
import "./index.css";

function ProfilePage(props) {
  const { user, toggleUser } = useContext(LoginContext);
  const [profile, setProfile] = useState(null);
  const [checked, setChecked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followingMe, setFollowingMe] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [clicked, setClicked] = useState(false);
  const id = props.id;
  useEffect(() => {
    if (user !== null) {
      UserAPI.getUser(user.data[0].username).then((data) => {
        toggleUser(data);
      });
      if (user.data[0].username === id) {
        setIsUser(true);
      }
    }
    UserAPI.getUser(id).then((data) => {
      setProfile(data);
    });
  }, []);
  console.log(profile);
  if (user !== null && profile !== null && !checked) {
    user.data[0].following.forEach((follower) => {
      if (follower === id) setFollowing(true);
    });
    profile.data[0].following.forEach((follower) => {
      if (follower === user.data[0].username) setFollowingMe(true);
    });
    setChecked(true);
  }
  function handleClick() {
    setClicked(true);
  }
  function handleRedirect() {
    setRedirect(true);
  }
  return (
    <div>
      {redirect ? <Redirect to="/update" /> : ""}
      <NavBar />
      {profile && (
        <div className="Profile">
          <div className="Profile-Container">
            <div className="Profile-containerLeft">
              <ProfileInfo profile={profile} />
              {user !== null ? isUser ? (
                <div className="ProfilePage-rowBtn">
                  <UpdateButton redirect={handleRedirect} />
                </div>
              ) : following ? (
                <div className="ProfilePage-rowBtn">
                  <UnFollowButton
                    user={user}
                    profile={profile}
                    clicked={handleClick}
                  />
                </div>
              ) : (
                <div className="ProfilePage-rowBtn">
                  <FollowButton
                    user={user}
                    profile={profile}
                    clicked={handleClick}
                    followingMe={followingMe}
                  />
                </div>
              ) : ""}
              <div className="ProfilePage-row">
                {!isUser ? profile.data[0].is_online ? <Online /> : <NotOnline /> : ""}
              </div>
            </div>
            <div className="Profile-containerRight">
              <ProfileVideoFeed profile={profile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
