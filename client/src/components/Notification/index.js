import React from 'react';

function Notification(props) {
    return (
        <div className="Notification">
            <p>{props.notification}</p>
        </div>
    )
};

export default Notification