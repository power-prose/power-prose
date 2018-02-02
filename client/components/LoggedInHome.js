import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
    WatchWords,
    SingleConversationView,
    Speak,
    AllConversationsView
} from "./";
import {
    me,
    fetchAllConversations,
    fetchInitialConversation,
    fetchUserWatchWords,
    fetchActiveWatchWords
} from "../store";

class LoggedInHome extends Component {
    componentDidMount() {
        this.props.loadUserData();
        this.props.fetchConversationsAndWatchWords(this.props.user.id);
    }
    render() {

        return (
            <div className="container-outer-horizontal">

                <Switch>
                    <Route path="/speak" component={Speak} />
                    <Route
                        path="/single-conversation"
                        component={SingleConversationView}
                    />
                    <Route
                        path="/all-conversations"
                        component={AllConversationsView}
                    />
                    <Route component={Speak} />
                </Switch>
            </div>
        );
    }
}

const mapState = state => {
    return {
        user: state.user
    };
};

const mapDispatch = dispatch => {
    return {
        loadUserData() {
            dispatch(me());
        },
        fetchConversationsAndWatchWords(userId) {
            dispatch(fetchAllConversations(userId));
            dispatch(fetchInitialConversation(userId));
            dispatch(fetchUserWatchWords(userId));
            dispatch(fetchActiveWatchWords(userId))
        }
    };
};

export default withRouter(connect(mapState, mapDispatch)(LoggedInHome));
