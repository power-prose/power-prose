import React from 'react';
import connect from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { fetchCurrentWatchWords } from store;
// we need to decide when we want to fetch watchWords from store; we can do it when this component mounts but we may want to load all data when the NavBar component mounts or something like that

const WatchWords = (props) => {
  const { watchWords } = props

  return (
    <div>
      This is the WatchWords component.
      It has access to an array of all watch words from state.
    </div>
  )
};

// as a stretch feature in the future, this field will be populated with watchWords associated with the currentUser on state, rather than all watchWords in the database
const mapState = (state) => {
  return {
    watchWords: state.watchWords
  }
};

const mapDispatch = (dispatch) => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(WatchWords));
