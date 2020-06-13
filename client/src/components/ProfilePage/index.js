import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import ProfileContext from "../context/ProfileContext";
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
  const { userProfile, toggleProfile, userId, toggleId } = useContext(
    ProfileContext
  );
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
    if (userProfile === null && userId === null) {
      UserAPI.getUser(id).then((data) => {
        toggleProfile(data);
      });
      toggleId(id);
    }
    if (userProfile !== null && userId !== id) {
      UserAPI.getUser(id).then((data) => {
        toggleProfile(data);
      });
      toggleId(id);
    }
    if (user !== null && userProfile !== null) {
      user.data[0].following.forEach((follower) => {
        if (follower === id) {
          setFollowing(true);
        }
      });
      userProfile.data[0].following.forEach((follower) => {
        if (follower === user.data[0].username) setFollowingMe(true);
      });
    }
  }, [clicked, id]);
  function handleRedirect() {
    setRedirect(true);
  }
  function handleClicked() {
    setClicked(true);
  }
  return (
    <div>
      {redirect ? <Redirect to="/update" /> : ""}
      <NavBar />
      {userProfile && (
        <div className="Profile">
          <div className="Profile-Container">
            <div className="Profile-containerLeft">
              <ProfileInfo profile={userProfile} />
              {user !== null ? (
                isUser ? (
                  <div className="ProfilePage-rowBtn">
                    <UpdateButton redirect={handleRedirect} />
                  </div>
                ) : following ? (
                  <div className="ProfilePage-rowBtn">
                    <UnFollowButton
                      user={user}
                      profile={userProfile}
                      clicked={handleClicked}
                    />
                  </div>
                ) : (
                  <div className="ProfilePage-rowBtn">
                    <FollowButton
                      user={user}
                      profile={userProfile}
                      followingMe={followingMe}
                      clicked={handleClicked}
                    />
                  </div>
                )
              ) : (
                ""
              )}
              <div className="ProfilePage-row">
                {!isUser ? (
                  userProfile.data[0].is_online ? (
                    <Online />
                  ) : (
                    <NotOnline />
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="Profile-containerRight">
              <ProfileVideoFeed profile={userProfile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
