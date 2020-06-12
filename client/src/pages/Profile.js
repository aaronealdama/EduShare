import React, {useEffect, useContext} from "react";
import { useParams} from "react-router-dom";
import ProfilePage from "../components/ProfilePage";
import UserAPI from "../utils/UserAPI";
import ProfileContext from '../components/context/ProfileContext';

function Profile() {
  const {profile, toggleProfile} = useContext(ProfileContext);
  const { id } = useParams();
  const username = id;
  useEffect(() => {
    UserAPI.getUser(username).then(res => {
      toggleProfile(res)
    });
  }, [profile]);
  console.log(profile);
  return (
    <div>
      {profile !== null ? <ProfilePage profile={profile} id={id} /> : ""}
    </div>
  );
}

export default Profile;
