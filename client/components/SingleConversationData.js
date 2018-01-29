import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';


const SingleConversationData = (props) => {
  const { conversation } = props;

  return (
    <div className="container-horizontal">
    <p>I am the SingleConversationData component. My job is to render data related to a conversation that the user has chosen. I have access to this conversartion through props.</p>
    </div>
  )
};

// something we need to think through here is how to conditionally render snippets -- how will the component know whether this conversation is the user's most recent conversation?
const mapState = (state) => {
  return {
    conversation: state.chosenConversation
  }
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(SingleConversationData));
