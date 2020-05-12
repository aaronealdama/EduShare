import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import SignupAPI from '../../utils/SignupAPI';

function SignupForm() {
    const [signup, setSignup] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    });
    const [state, setState] = useState({
        exists: null,
        redirect: false
    });
    function handleChange(event) {
        setSignup({
            ...signup,
            [event.target.name]: event.target.value
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        SignupAPI.find(signup).then(res => {
            console.log(res);
            if (res.message === "user does not exist") {
                SignupAPI.signup(signup)
                setSignup({
                    first_name: '',
                    last_name: '',
                    email: '',
                    username: '',
                    password: ''
                });
                setState({
                    ...state,
                    redirect: true
                })
            } else if (res.message === "user already exists") {
                setState({
                    ...state,
                    exists: true
                })
            }
        })
    }
    function userExists() {
        return (
            <div>
                <h2>Username already exists</h2>
            </div>
        )
    }
    return(
        <div>
            {state.redirect === true ? <Redirect to="/home"/> : ''}
            {state.exists === true ? userExists : ""}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="first_name"
                    value={signup.first_name}
                    placeholder="First Name"
                />
                <input
                    onChange={handleChange}
                    name="last_name"
                    value={signup.last_name}
                    placeholder="Last Name"
                />
                <input
                    onChange={handleChange}
                    name="email"
                    value={signup.email}
                    placeholder="Email"
                />
                <input
                    onChange={handleChange}
                    name="username"
                    value={signup.username}
                    placeholder="Username"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    value={signup.password}
                    placeholder="Password"
                />
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;