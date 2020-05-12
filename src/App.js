import React, {useState} from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginContext from './components/LoginContext';

function App() {
    const [login, setLogin] = useState({
        login: null,
        toggleLogin: () => setLogin({login: true}),
        toggleFalse: () => setLogin({login: false})
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
                    </Switch>
                </Router>
            </LoginContext.Provider>
        </div>
    )
}

export default App;