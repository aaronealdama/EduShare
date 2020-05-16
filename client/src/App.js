import React, {useState} from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Update from './pages/Update';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginContext from './components/context/LoginContext';

function App() {
    const [login, setLogin] = useState({
        loggedIn: null,
        username: null,
        toggleFalse: () => setLogin({...login, loggedIn: false}),
        toggleChange: (text) => setLogin({loggedIn: true, username: text}),
        toggleLogout: () => setLogin({loggedIn: false, username: null})
    });
    return (
        <div>
            <LoginContext.Provider value={login}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/profile/:username" component={Profile}/>
                        <Route exact path="/update" component={Update}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </LoginContext.Provider>
        </div>
    )
}

export default App;