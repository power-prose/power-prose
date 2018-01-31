import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


const WatchWords = (props) => {
  const { watchWords } = props

  return (
    <div id="container-watch-words" className="card">
    <div className="card-header">You are currently tracking these watch words and phrases</div>
      <ul className="list-group list-group-flush">
        {watchWords.map(word => <li className="list-group-item" key={word.id}>{word.wordOrPhrase}</li>)}
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
