import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {WatchWords, SingleConversationView, Speak, AllConversationsView} from './';
import { me } from '../store';


class LoggedInHome extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }
    render() {

        return (
            <div>


                    <WatchWords />
                    <Switch>
                        <Route path="/speak" component={Speak}/>
                        <Route path="/single-conversation" component={SingleConversationView} />
                        <Route path="/all-conversations" component={AllConversationsView} />
                        <Route component={SingleConversationView} />
                    </Switch>

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

export default withRouter(connect(mapState, mapDispatch)(LoggedInHome));

