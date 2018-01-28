import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux';


const FeaturedConversation = (props) => {
  const conversation = props;

  return (
    <h1>I am the FeaturedConversation component. My job is to render data related to a conversation that the user has chosen. I have access to this conversartion through props.</h1>
  )
};

const mapState = (state) => {
  return {
    conversation: state.chosenConservation
  }
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(FeaturedConversation));
