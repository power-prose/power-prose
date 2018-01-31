import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const AllConversationsData = props => {
  const { conversations } = props;

  return (
    <div className="container-horizontal">
      <p>I am the AllConversationsData component.</p>
    </div>
  );
};

const mapState = state => {
  return {
    conversations: state.allConversations
  };
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsData));
