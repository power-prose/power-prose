import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, NavBar, RecordButtons } from './';
import { me } from '../store';


class UserInterface extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }
    render() {
        const { isLoggedIn } = this.props

        return (
            <div>
                <NavBar />
                <main>


                    <Switch>
                        {/* Routes placed here are available to all visitors */}
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/" component={RecordButtons} />
                        {
                            isLoggedIn &&
                            <Switch>
                                {/* Routes placed here are only available after logging in */}
                                <Route path="/" component={RecordButtons} />
                            </Switch>
                        }
                        {/* Displays our Login component as a fallback */}
                        <Route component={Login} />
                    </Switch>
                </main>
            </div>

        )
    }
}

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserInterface));

