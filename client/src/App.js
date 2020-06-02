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

function App() {
    const [login, setLogin] = useState({
        loggedIn: null,
        user: null,
        toggleFalse: () => setLogin({...login, loggedIn: false}),
        toggleUser: (data) => setLogin({...login, loggedIn: true, user: data}),
        toggleLogout: () => setLogin({...login, loggedIn: false, user: null})
    });
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/signup" component={Signup}/>
                    <LoginContext.Provider value={login}>                        
                        <Route exact path="/login" component={Login}/>            
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/profile/:id" component={Profile}/>
                        <Route exact path="/update" component={Update}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/notifications" component={Notifications}/>
                        <Route exact path="/follows" component={UserInteractions}/>
                    </LoginContext.Provider>
                    <Route exact path="/404" component={NotFound}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;