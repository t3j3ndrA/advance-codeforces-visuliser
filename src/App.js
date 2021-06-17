import React, { useState } from "react";
// Local file imports begins

import { UserDetails } from "./components/userStatus"; // rating wise chart+verdict chart + tagwise chart + languages used chart
import UserInfo from "./components/userInfo"; // Two tables 1. Info of handle, 2. Contenst of handle
// Local file imports closed

function App() {
  const [handleName, setHandleName] = useState("");
  const [fetchStatus, setFetchStatus] = useState(false);
  const handleNameHandler = (e) => {
    setFetchStatus(false);
    setHandleName(e.target.value);
  };
  const fetchClicked = (e) => {
    e.preventDefault();
    setFetchStatus(true);
  };

  return (
    <>
      <div className="container">
        <header className="main-heading">
          <h2>Advance Codeforces Visuliser</h2>
        </header>
        <div className="input-taker">
          <div className="input-and-button-container">
            <input
              className="input-handle"
              type="text"
              value={handleName}
              onChange={handleNameHandler}
              autoFocus
              placeholder="Enter a CF handle"
            />
            <button className="btn handleInput" onClick={fetchClicked}>
              Fetch Details
            </button>
          </div>
        </div>
        <div className="user-info">
          {fetchStatus && <UserInfo handle={handleName} />}
        </div>
        <div className="user-status">
          {fetchStatus && <UserDetails handle={handleName} />}
        </div>
        <div className="developed-by">
          {fetchStatus && <p> Developer : t3j3ndrA</p>}
        </div>
      </div>
    </>
  );
}

export default App;
