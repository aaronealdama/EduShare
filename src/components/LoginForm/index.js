import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import LoginAPI from '../../utils/LoginAPI';
import LoginContext from '../../components/LoginContext';

function LoginForm() {
    const {toggleLogin, login, toggleFalse} = useContext(LoginContext);
    const [loginInput, setLoginInput] = useState({
        username: '',
        password: ''
    })
    function handleChange(event) {
        setLoginInput({
            ...loginInput,
            [event.targest.name]: event.target.value
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        LoginAPI.login(loginInput)
        .then(res => {
            if (res.message === "found user") {
                toggleLogin();
                setLoginInput({
                    username: '',
                    password: ''
                })
                return <Redirect to="/home"/>
            } else {
                toggleFalse();
            }
        })
    }
    function notFound() {
        return (
            <div>
                <h1>User not found</h1>
            </div>
        )
    }
    return (
        <div>
            {login === false ? notFound : ''}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="username"
                    value={loginInput.username}
                    placeholder="Username"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    value={loginInput.password}
                    placeholder="Password"
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;