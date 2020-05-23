import React, {useState} from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Update from './pages/Update';
import NotFound from './pages/NotFound';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginContext from './components/context/LoginContext';

function App() {
    const [login, setLogin] = useState({
        loggedIn: null,
        user: null,
        toggleFalse: () => setLogin({...login, loggedIn: false}),
        toggleUser: (data) => setLogin({loggedIn: true, user: data}),
        toggleLogout: () => setLogin({loggedIn: false, user: null})
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
                    </LoginContext.Provider>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;