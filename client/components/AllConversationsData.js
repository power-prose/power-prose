import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';


const AllConversationsData = (props) => {
  const { conversations } = props;

  return (
    <h1>I am the AllConversationsData component.</h1>
  )
};

// something we need to think through here is how to conditionally render snippets -- how will the component know whether this conversation is the user's most recent conversation?
const mapState = (state) => {
  return {
    conversations: state.allConversations
  }
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsData));
