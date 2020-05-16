import React, {useState, useEffect} from 'react';
import UserAPI from '../../utils/UserAPI';
import {Link} from 'react-router-dom';

function Person(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        UserAPI.getUser(props.username)
        .then(res => {
            setUser(res);
        });
    });
    return (
        <div>
            <div className="Person">
                <div className="Person-Tab">
                    <div className="Person-TabContent" style={{display: "flex"}}>
                        <div className="Person-pic">
                            <img src={user.profile_pic}/>
                        </div>
                        <div className="Person-info">
                            <p>{`${user.first_name} ${user.last_name}`}</p>
                            <p>Teaches: {user.teaches}</p>
                        </div>
                        <a className="Person-linkButton">
                            <Link to={`/profile/${user.username}`}>Visit</Link>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Person;