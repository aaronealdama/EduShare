import React, {useState} from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Update from './pages/Update';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import UserInteractions from './pages/UserInteractions';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginContext from './components/context/LoginContext';
import "./css/App.css";
import NotificationContext from './components/context/NotificationContext';
import ProfileContext from './components/context/ProfileContext';

function App() {
    const [login, setLogin] = useState({
        loggedIn: null,
        user: null,
        toggleFalse: () => setLogin({...login, loggedIn: false}),
        toggleUser: (data) => setLogin({...login, loggedIn: true, user: data}),
        toggleLogout: () => setLogin({...login, loggedIn: false, user: null})
    });
    const [notification, setNotification] = useState({
        notifications: null,
        toggleNotifications: (data) => setNotification({...notification, notifications: data})
    });
    const [profile, setProfile] = useState({
        userProfile: null,
        userId: null,
        toggleProfile: (data) => setProfile({...profile, userProfile: data}),
        toggleId: (id) => setProfile({...profile, id: id})
    })
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/signup" component={Signup}/>
                    <LoginContext.Provider value={login}>                        
                        <Route exact path="/login" component={Login}/>            
                        <Route exact path="/home" component={Home}/>
                        <ProfileContext.Provider value={profile}>
                            <Route exact path="/profile/:id" component={Profile}/>
                        </ProfileContext.Provider>
                        <Route exact path="/update" component={Update}/>
                        <Route exact path="/search" component={Search}/>
                        <NotificationContext.Provider value={notification}>
                            <Route exact path="/notifications" component={Notifications}/>
                        </NotificationContext.Provider>
                        <Route exact path="/follows" component={UserInteractions}/>
                    </LoginContext.Provider>
                    <Route exact path="/404" component={NotFound}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;