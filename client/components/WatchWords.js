import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserWatchWord, postUserWatchWord } from '../store/index';
import { log } from 'util';


const WatchWords = (props) => {
  const { watchWords, user } = props
  console.log("USER", user.id)

  return (
    <div id="container-watch-words" className="card">
      <div className="card-header">Your watch words and phrases</div>
      <div className="list-group list-group-flush">
        {
          watchWords.length && watchWords.map(word => (
            <div>
              <div className="list-group-item" key={word.id}>{word.wordOrPhrase}</div>
              <button onClick={(event) => props.onDeleteClick(event, word.id)}>Delete</button>
            </div>
          ))
        }
        <div>

          <form onSubmit={props.handleSubmit}>
            <div>
              <label htmlFor="addWord">Add a Word</label>
              <input
                defaultValue="your word here"
                type="text"
                name="addWord"
                placeholder="Enter Word"
              />
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


const mapState = (state) => {
  return {
    watchWords: state.watchWords.activeWatchWords,
    user: state.user
  }
};

const mapDispatch = (dispatch) => {
  return {
    onDeleteClick(event, wordId) {
      event.preventDefault();
      console.log('I am in the onDeleteClick event!')
      dispatch(updateUserWatchWord(wordId))
    },
    handleSubmit(event) {
      console.log("inside handle submit", event.target.addWord.value)

      event.preventDefault();
      let wordOrPhrase = event.target.addWord.value
      dispatch(postUserWatchWord({ wordOrPhrase }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WatchWords));
