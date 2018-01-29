import React from "react";
import { withRouter } from "react-router-dom";
import { SingleConversationData, ListOfConversations } from "./";
import { connect } from "react-redux";

const SingleConversationView = props => {
  return (
    <div>
      <h1>
        I am the SingleConversationView component. My job is to render data
        related to a conversation that the user has chosen. I have access to
        this conversartion through props.
      </h1>
      <SingleConversationData />
      <ListOfConversations />
    </div>
  );
};

export default withRouter(SingleConversationView);
