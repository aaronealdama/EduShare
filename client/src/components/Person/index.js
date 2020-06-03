import React, {useState, useEffect} from 'react';
import UserAPI from '../../utils/UserAPI';
import {Link} from 'react-router-dom';
import './index.css';

function Person(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        UserAPI.getUser(props.username)
        .then(res => {
            setUser(res);
        });
    }, []);
    console.log(user);
    return (
        <div>
            {user !== null ? <div className="Person">
                <div className="Person-Tab">
                    <div className="Person-TabContent"> 
                        <img className="Person-img" src={user.data[0].profile_pic} alt=""/>
                        <div className="Person-info">
                            <p className="Person-para">{`${user.data[0].first_name} ${user.data[0].last_name}`}</p>
                            <p className="Person-para">Teaches: {user.data[0].teaches}</p>
                        </div>
                        <Link className="Person-link" to={`/profile/${user.data[0].username}`}>Visit</Link>
                    </div>
                </div>
            </div> : ""}
        </div>
    )
}

export default Person;