import React, { useContext, useEffect } from "react";
import NotificationsList from "../components/NotificationsList";
import NotificationsContext from "../components/context/NotificationContext";
import LoginContext from "../components/context/LoginContext";
import NotLoggedIn from "../components/NotLoggedIn";
import UserAPI from "../utils/UserAPI";
import NavBar from "../components/NavBar";

function Notifications() {
  const { notifications, toggleNotifications } = useContext(
    NotificationsContext
  );
  const { user, loggedIn } = useContext(LoginContext);
  useEffect(() => {
    UserAPI.getUser(user.data[0].username).then((res) =>
      toggleNotifications(res.data[0].notifications)
    );
  }, []);
  console.log(notifications);
  return (
    <div>
      <NavBar />
      {loggedIn ? (
        <NotificationsList notifications={notifications} />
      ) : (
        NotLoggedIn
      )}
    </div>
  );
}

export default Notifications;
