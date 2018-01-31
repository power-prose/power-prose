import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AllConversationsCarousel, Login, Signup, NavBar, LoggedOutHome, LoggedInHome, Footer } from "./";
import { me } from "../store";
import RecordButtons from "./RecordButtons";

class UserInterface extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <NavBar />
        <div className="container-horizontal">
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {isLoggedIn && <Route path="/" component={LoggedInHome} />}
            <Route path="/" component={LoggedOutHome} />
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />

          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(UserInterface));
