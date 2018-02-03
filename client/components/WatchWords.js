import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserWatchWord, postUserWatchWord } from '../store/index';
import { Avatar, Chip, FontIcon } from 'material-ui';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';


export class WatchWords extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleRequestDelete = () => {
    alert('You clicked the delete button.');
  }

  handleClick = () => {
    alert('You clicked the Chip.');
  }

  render () {
    const { watchWords, user } = this.props;

    return (
      <div>
          {
            watchWords.length && watchWords.map(word => (
              <div key={word.id} style={styles.wrapper}>
                <Chip
                  onRequestDelete={(event) => this.props.onDeleteClick(event, word.id)}
                  onClick={this.handleClick}
                  style={styles.chip}
                >
                  {word.wordOrPhrase}
                </Chip>
              </div>
            ))
          }
          <form onSubmit={this.props.handleSubmit}>
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
    )
  }
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
      dispatch(updateUserWatchWord(wordId))
    },
    handleSubmit(event) {
      event.preventDefault();
      let wordOrPhrase = event.target.addWord.value
      dispatch(postUserWatchWord({ wordOrPhrase }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WatchWords));

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};



// import React from 'react';
// import Avatar from 'material-ui/Avatar';
// import FontIcon from 'material-ui/FontIcon';
// import SvgIconFace from 'material-ui/svg-icons/action/face';
// import {blue300, indigo900} from 'material-ui/styles/colors';
