import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import UserAPI from "../utils/UserAPI";
import VideoAPI from "../utils/VideoAPI";
import Person from "../components/Person";
import Video from "../components/Video";
import "../css/Search.css";

// Unfinished, need to add somethings before properly finishing
function Search() {
  const [search, setSearch] = useState("");
  const [content, setContent] = useState({
    all: null,
    filtered: null,
  });
  const [buttonState, setButtonState] = useState({
    users: true,
    videos: false,
  });
  useEffect(() => {
    if (buttonState.users) {
      UserAPI.getAllUsers().then((res) => {
        setContent({
          ...content,
          all: res,
        });
      });
    } else {
      VideoAPI.getVideos().then((res) => {
        setContent({
          ...content,
          all: res,
        });
      });
    }
  }, [buttonState]);
  function handleChange(event) {
    setSearch(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (buttonState.users) {
      filterUsers(search);
    } else {
      filterVideos(search);
    }
    setSearch("");
  }
  function toggleUsers() {
    if (buttonState.users) return;
    setButtonState({
      users: true,
      videos: false,
    });
  }
  function toggleVideos() {
    if (buttonState.videos) return;
    setButtonState({
      users: false,
      videos: true,
    });
  }
  // function for filtering out users
  function filterUsers(search) {
    if (!search.length) return;
    const filtered = content.all.reduce((allUsers, user) => {
      const array = Object.values(user);
      array.forEach((item) => {
        if (item.indexOf(search.toString()) > -1) {
          allUsers.push(user);
        }
      });
      return allUsers;
    }, []);
    setContent({
      ...content,
      filtered: filtered,
    });
  }
  // function for filtering videos
  function filterVideos(search) {
    if (!search.length) return;
    const filtered = content.all.reduce((allVideos, video) => {
      const array = Object.values(video);
      array.forEach((item) => {
        if (item.indexOf(search.toString()) > -1) {
          allVideos.push(video);
        }
      });
      return allVideos;
    }, []);
    setContent({
      ...content,
      filtered: filtered,
    });
  }
  return (
    <div>
      <NavBar />
      <div className="Search-container">
        <div className="Search-col">
          <div className="Search-searchContainer">
            <div className="Search-row">
              <button
                className={
                  buttonState.users ? "Search-activeBtn" : "Search-btn"
                }
                onClick={toggleUsers}
              >
                Users
              </button>
              <button
                className={
                  buttonState.videos ? "Search-activeBtn" : "Search-btn"
                }
                onClick={toggleVideos}
              >
                Videos
              </button>
            </div>
            <div className="Search-row">
              <form className="Search-form" onSubmit={handleSubmit}>
                <div className="Search-row">
                  <input
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                    name="search"
                    className="Search-input"
                  />
                </div>
                <div className="Search-row">
                  <button className="Search-submitBtn">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div
            className={
              content.filtered !== null
                ? "Search-results"
                : "Search-resultsNull"
            }
          >
            <div className="Search-resultsContainer">
              {content.filtered === null ? (
                <h1 className="Search-h1">
                  No search entered or no results found
                </h1>
              ) : buttonState.users ? (
                content.filtered.map((user) => {
                  return <Person username={user.username} />;
                })
              ) : (
                content.filtered
                  .sort((a, b) => {
                    return b.likes - a.likes;
                  })
                  .map((video) => {
                    return <Video content={video} />;
                  })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
