import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import ProfilePage from "../components/ProfilePage";
import UserAPI from "../utils/UserAPI";

function Profile() {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const username = id;
  useEffect(() => {
    UserAPI.getUser(username).then((res) => {
      setProfile(res);
    });
  }, []);
  return (
    <div>
      {profile !== null ? <ProfilePage profile={profile} id={id} /> : ""}
    </div>
  );
}

export default Profile;
