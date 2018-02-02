import React from "react";
import { withRouter } from "react-router-dom";
import { SingleConversationData, ConversationList, UserSentences } from "./";

const SingleConversationView = props => {
  return (
          <div className="container-horizontal">
        <ConversationList />
    <div className="container-vertical container-right">
      <SingleConversationData />
      <UserSentences />
    </div>
    </div>
  );
};

export default withRouter(SingleConversationView);
