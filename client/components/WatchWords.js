import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


const WatchWords = (props) => {
  const { watchWords } = props

  return (
    <div id="container-watch-words" className="container-vertical">
    <p>I AM THE WATCHWORDS COMPONENT</p>
    <ul>
    {watchWords.map(word => <li key={word.id}>{word.wordOrPhrase}</li>)}
    </ul>
    </div>
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
