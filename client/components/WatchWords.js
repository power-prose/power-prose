import React from 'react';
import connect from 'react-redux';
import { withRouter } from 'react-router-dom';


const WatchWords = (props) => {
  const { watchWords } = props

  return (
    <h1>I am the WatchWords component. My job is to render a list of all watch words. I have access to all those words through props.<h1>
  )
};

// as a stretch feature in the future, this field will be populated with watchWords associated with the currentUser on state, rather than all watchWords in the database
const mapState = (state) => {
  return {
    watchWords: state.watchWords
  }
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(WatchWords));
