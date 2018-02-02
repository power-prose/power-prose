import React from "react";
import { withRouter } from "react-router-dom";
import { SingleConversationData, ConversationList, UserSentences } from "./";

const SingleConversationView = props => {
  return (
    <div className="container-inner-horizontal">
      <ConversationList />
      <div className="container-right container-vertical ">
        <SingleConversationData />
        <UserSentences />
      </div>
    </div>
  );
};

export default withRouter(SingleConversationView);
