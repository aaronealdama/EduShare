import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import UserAPI from '../utils/UserAPI';
import Person from '../components/Person';

// Unfinished, need to add somethings before properly finishing
function Search() {
    const [search, setSearch] = useState('');
    const [content, setContent] = useState({
        all: null,
        filtered: null
    });
    const [buttonState, setButtonState] = useState({
        users: true,
        videos: false
    });
    useEffect(() => {
        if (buttonState.users) {
            UserAPI.getAllUsers()
            .then(res => {
                setContent({
                    ...content,
                    all: res
                });
            })
        }
    },[buttonState])
    function handleChange(event) {
        setSearch(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (buttonState.users) {
            filterUsers(search);
        } else {
            filterVideos(search)
        }
        setSearch('');
    }
    function toggleUsers() {
        if (buttonState.users) return;
        setButtonState({
            users: true,
            videos: false
        });
    }
    function toggleVideos() {
        if (buttonState.videos) return;
        setButtonState({
            users: false,
            videos: true
        })
    }
    function filterUsers(search) {
        if (!search.length) return;
        const filtered = content.reduce((allUsers, user) => {
            const array = Object.values(user);
            array.forEach(item => {
                if (item.indexOf(search.toString()) > -1) {
                    allUsers.push(user);
                }
            })
            return allUsers
        }, []);
        setContent({
            ...content,
            filtered: filtered
        });
    }
    // function for filtering videos
    return (
        <div>
            <NavBar/>
            <div className="Search-form">
                <ul>
                    <li className={buttonState.users ? "active" : ""}>
                        <button onClick={toggleUsers}>Users</button>
                    </li>
                    <li className={buttonState.videos ? "active" : ""}>
                        <button onClick={toggleVideos}>Videos</button>
                    </li>
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Search"
                        value={search}
                        onChange={handleChange}
                        name="search"
                    />
                    <button>Submit</button>
                </form>
            </div>
            <div className="Search-results">
                {buttonState.users ? content.filtered.map(user => {
                    return <Person username={user.username}/>
                }) : content.filtered.map(vid => {
                    return (
                        <div></div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;