import React, {useState, useEffect} from 'react';
import UserAPI from '../../utils/UserAPI';
import {Link} from 'react-router-dom';
import './index.css';

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
                    <div className="Person-TabContent"> 
                        <img className="Person-img" src={user.profile_pic} alt=""/>
                        <div className="Person-info">
                            <p className="Person-para">{`${user.first_name} ${user.last_name}`}</p>
                            <p className="Person-para">Teaches: {user.teaches}</p>
                        </div>
                        <Link className="Person-link" to={`/profile/${user.username}`}>Visit</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Person;