import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

// set displayedWatchWords on local state for the AllConversationsSidebar
// the toggle renders watchWords from the store
// turning toggles on or off changes displayedWatchWords on local state via onToggle builtin function
// the graph renders lines from local state, capturing changes from toggle as they occur

export class AllConversationsSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedWatchWords: props.watchWords.map(watchWordObj => watchWordObj.wordOrPhrase)
      // displayedWatchWords: ['Just', 'I'm sorry', etc.]
    }
  }

  handleToggle = (word) => {
    const { displayedWatchWords } = this.state
    // if the word passed via the onToggle event is not currently in the displayedWatchWords on local state, reset state with the word added to the array, else reset state with the word filtered from the array
    displayedWatchWords.indexOf(word) === -1 ? this.setState({displayedWatchWords: displayedWatchWords.push(word)}) : this.setState({displayedWatchWords: displayedWatchWords.filter(watchWord => watchWord !== word)});
  }

  render () {
    const { watchWords } = this.props

    return (
      <div id="container-watch-words">
        <div style={styles.block}>
          {
            watchWords.length && watchWords.map(watchWord => (
              <Toggle
                label={watchWord.wordOrPhrase}
                defaultToggled={true}
                onToggle={this.handleToggle(watchWord.wordOrPhrase)}
                style={styles.toggle}
              />
            ))
          }
        </div>
      </div>
    )
  }
};

// set list of tones on local state
const mapState = (state) => {
  return {
    watchWords: state.watchWords
  }
};

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(AllConversationsSidebar));
