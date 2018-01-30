import React from "react";
import { withRouter } from "react-router-dom";
import { SingleConversationData, ListOfConversations } from "./";

const SingleConversationView = props => {
  return (
    <div className="container-vertical container-right">
      <h1>
        I am the SingleConversationView component
      </h1>
      <SingleConversationData />
      <ListOfConversations />
    </div>
  );
};

export default withRouter(SingleConversationView);
