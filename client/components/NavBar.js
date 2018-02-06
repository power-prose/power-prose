import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  logout,
  clearAllConversations,
  clearChosenConversation,
  clearUserWatchWords
} from "../store";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
    const loggedOutNav = (
      <div>
        <Navbar color="faded" light expand="md">
          <NavLink className="navbar-brand" to="/">
            Power Prose
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link nav-logout" to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link nav-logout" to="/signup">
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    );

    const loggedInNav = (
      <div>
        <Navbar color="faded" light expand="md">
          <NavLink className="navbar-brand" to="/">
            Power Prose
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/speak">
                  Speak
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/single-conversation">
                  Single Conversation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/all-conversations">
               All Conversations
             </NavLink>
             </NavItem>
              <NavItem>
                <a
                  className="nav-link nav-logout"
                  onClick={handleClick}
                  to="/"
                >
                  Logout
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );

    const nav = isLoggedIn ? loggedInNav : loggedOutNav;

    return nav;
  }
}

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
