import React from "react";

export function NavigationBar(props) {
  return (
    <nav className="navbar navbar-expand-md p-0 my-nav-color">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img className="game-hub-logo" src="img/logo-black.png" alt="Game Hub Logo" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item my-nav-font">
              <a className="nav-link" href="/home" aria-label="Link to home page">Home</a>
            </li>
            <li className="nav-item my-nav-font">
              <a className="nav-link" href="/quiz" aria-label="Link to quiz page">Quiz</a>
            </li>
            <li className="nav-item my-nav-font">
              <a className="nav-link" href="/games" aria-label="Link to games page">Games</a>
            </li>
            <li className="nav-item my-nav-font">
              <a className="nav-link" href="/friends" aria-label="Link to friends page">Friends</a>
            </li>
            <li className="nav-item my-nav-font">
              <a className="nav-link" id="profile-link" href="/profile" aria-label="Link to profile page">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile" aria-label="Link to profile page"><img src="img/profile-pic.png" className="profile-pic" aria-hidden="true" alt="profile avatar" /></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}