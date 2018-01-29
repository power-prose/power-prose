import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';


const Snippets = (props) => {
  const { snippets } = props;

  return (
    <h1>I am the Snippets component. My job is to render snippets for the user most recent conversation. I have access to these snippets through props. The current vision is that I am conditionally rendered by the FeaturedConversation component.</h1>
  )
}

const mapState = (state) => {
  return {
    snippets: state.chosenConservation.snippets
  }
}

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Snippets));
