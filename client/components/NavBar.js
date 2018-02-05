import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, clearAllConversations, clearChosenConversation, clearUserWatchWords } from "../store";

const NavBar = props => {
  const { handleClick, isLoggedIn } = props;

  const loggedOutNav = (
  <div id="nav-div">
    <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor" : "white"}}>
      <NavLink className="navbar-brand" to="/">
      Power Prose
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="#navbarSupportedContent"
        aria-expanded={false}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto" />
        <NavLink className="nav-link nav-logout" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link nav-logout" to="/signup">
          Sign Up
        </NavLink>
      </div>
    </nav>
    </div>
  );



  const loggedInNav = (
    <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor" : "white"}}>
      <NavLink className="navbar-brand" to="/">
        Power Prose
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div  className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul id="nav-div" className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/speak">
              Speak
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/single-conversation">
              Single Conversation
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/all-conversations">
              All Conversations
            </NavLink>
          </li>
        </ul>

        <NavLink className="nav-link nav-logout" onClick={handleClick} to="/">
          Logout
        </NavLink>
      </div>
    </nav>
  );

  const nav = isLoggedIn ? loggedInNav : loggedOutNav;

  return nav;
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearAllConversations());
      dispatch(clearChosenConversation());
      dispatch(clearUserWatchWords());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(NavBar));
