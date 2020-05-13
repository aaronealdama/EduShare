import React from 'react';

function Person(props) {
    return (
        <div className="Person">
            <p>{props.first_name}</p>
        </div>
    )
}

export default Person;