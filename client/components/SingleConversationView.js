import React from "react";
import { withRouter } from "react-router-dom";
import { SingleConversationData, ListOfConversations, WatchWords } from "./";

const SingleConversationView = props => {
  return (
          <div className="container-horizontal">
        <WatchWords />
    <div className="container-vertical container-right">
      <h1>
        I am the SingleConversationView component
      </h1>
      <SingleConversationData />
      <ListOfConversations />
    </div>
    </div>
  );
};

export default withRouter(SingleConversationView);
