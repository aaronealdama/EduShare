import React from "react";
import { useParams } from "react-router-dom";
import ProfilePage from "../components/ProfilePage";

function Profile() {
  const { id } = useParams();
  const username = id;
  return (
    <div>
      <ProfilePage id={username} />
    </div>
  );
}

export default Profile;
