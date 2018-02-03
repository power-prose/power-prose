import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserWatchWord, postUserWatchWord } from '../store/index';
import { Avatar, Card, CardHeader, CardText, Chip, Divider, FontIcon, RaisedButton, TextField } from 'material-ui';


export class WatchWordList extends Component {
  constructor(props) {
    super(props);
    this.state = { newWatchWord: '' }
  }

  handleChange = (event) => {
    this.setState({
      newWatchWord: event.target.value
    });
  };

  handleRequestDelete = () => {
    alert('You clicked the delete button.');
  }

  handleClick = () => {
    alert('You clicked the Chip.');
  }

  render () {
    const { watchWords, user } = this.props;
    const { newWatchWord } = this.state;

    return (
      <div className="container-watchwords">
      <Card style={styles.cardStyle}>
        <CardHeader title="Your WatchWords" />
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
          <br />
          <form style={styles.textFieldStyle} onSubmit={this.props.handleSubmit}>
            <TextField
              style={styles.textFieldStyle}
              name='newwatchword'
              hintText='Enter a new watchword'
              value={newWatchWord}
              onChange={this.handleChange}
            /><br />
            <RaisedButton label="Submit" secondary={true} style={styles.buttonStyle} />
          </form>
        </Card>
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
      console.log('!!!!!', event.target.newwatchword.value)
      let wordOrPhrase = event.target.newwatchword.value
      dispatch(postUserWatchWord({ wordOrPhrase }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WatchWordList));

const styles = {
  chip: {
    margin: 10,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldStyle: {
    margin: -4
  },
  cardStyle: {
    maxWidth: 260
  },
  buttonStyle: {
    margin: 12
  }
};




// import React from 'react';
// import Avatar from 'material-ui/Avatar';
// import FontIcon from 'material-ui/FontIcon';
// import SvgIconFace from 'material-ui/svg-icons/action/face';
// import {blue300, indigo900} from 'material-ui/styles/colors';
