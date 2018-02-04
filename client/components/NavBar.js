import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store";
// import {Navbar, FormGroup, FormControl, Button, Nav, NavItem} from "react-bootstrap";

const NavBar = props => {
  const { handleClick, isLoggedIn } = props;

  const loggedOutNav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );


//react bootstrap attempt - did not work at all
//   const loggedOutNav = (
//    <Navbar defaultExpanded={true}>
//   <Navbar.Header>
//     <Navbar.Brand>
//       <a href="#brand">React-Bootstrap</a>
//     </Navbar.Brand>
//     <Navbar.Toggle />
//   </Navbar.Header>
//   <Navbar.Collapse>
//     <Nav>
//       <NavItem eventKey={1} href="#">
//         Link
//       </NavItem>
//       <NavItem eventKey={2} href="#">
//         Link
//       </NavItem>
//     </Nav>
//     <Nav pullRight>
//       <NavItem eventKey={1} href="#">
//         Link Right
//       </NavItem>
//       <NavItem eventKey={2} href="#">
//         Link Right
//       </NavItem>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>
//   );

  const loggedInNav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(NavBar));
