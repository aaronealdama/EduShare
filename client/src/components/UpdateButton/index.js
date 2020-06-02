import React from 'react';
import "./index.css";

function UpdateButton(props) {
    return <button className="UpdateButton" onClick={props.redirect}>Update</button>
}

export default UpdateButton;