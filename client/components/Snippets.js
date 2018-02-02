import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SingleConversationView from './SingleConversationView';
import { updateConversation } from '../store';

const styles = theme => ({
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'block',
    flexWrap: 'wrap',
  },
  hoverColor: 'blue300'
});


 export default class Snippets extends React.Component {

  state = {
    open: false,
    snippets: this.props.chosenConversation.snippets,
    watchWords: this.props.chosenConversation.watchWords,
    recordingName: '',
    deleted: false,
    updateSent: false
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    //this.props.handleSubmit()
    this.setState({open: false, updateSent: true});
  };


  handleRequestDelete = specificSnippet => () => {

    const snippets = this.state.snippets
    const snippetToDelete = snippets.indexOf(specificSnippet);

    //***GET ID OF DELETED SNIPPET
    const watchWordToDecId = snippets.splice(snippetToDelete, 1)[0].watchWordId

    //***GET THE WATCHWORD TO DECREMENT
    const watchWordToDec = this.state.watchWords.filter(watchWord => watchWord.id === watchWordToDecId)[0]

    const count = watchWordToDec.watchWordOccurrence.countOfTimesUsed

    const newCount = watchWordToDec.watchWordOccurrence.countOfTimesUsed = count - 1


    //***REPLACE WATCHWORD OBJ WITH NEW ONE WITH UPDATED WORD COUNT
    let newWWObj = [...(this.state.watchWords.filter(watchWord => watchWord.id !== watchWordToDecId)), watchWordToDec]

    this.setState({ snippets, watchWords: newWWObj, deleted: true });

    console.log("STATE:", this.state)

  }


  handleClick = (event) => {
    console.log(event.target.value)
  }

  handleChange = (event) => {
    const recordingName = event.target.value
    this.setState({recordingName})

  }


  render() {

    const actions = [
      <FlatButton
        label="Confirm All"
        secondary={true}
        disabled={!this.state.recordingName}
        style= {{float: 'left'}}
        onClick={this.handleClose}

      />,
      <FlatButton
        label="Save Changes"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.deleted || !this.state.recordingName}
        onClick={this.handleClose}
      />,
    ];
    const snippetMenu = this.state.snippets.map((snippet, i) => {
    return (<Chip
        key={i}
        value={`${ i + 1}`}
        name= "snippetName"
        id ={i}
        onClick={this.handleClick}
        onRequestDelete={this.handleRequestDelete(snippet)}
        style={styles.chip}
        >{snippet.text}
        </Chip>)
  })

    return (
      <div>
        <RaisedButton label="Confirm your snippets" onClick={this.handleOpen} />
        <Dialog
          title="Review & Edit Your Recording"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent = {true}
        >
           <form >
          <input
            type="text"
            style={{marginBottom: 2 + 'em'}}
            name="recordingName"
            placeholder="Title your Recording"
            onChange= {this.handleChange}
          />
        </form>
          {snippetMenu}

        </Dialog>
        {this.state.updateSent && <SingleConversationView /> }
      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     chosenConversation: state.chosenConservation
//   }
// }

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(){
      //MAKING A NEW CONVERSATION OBJECT
      const conversationData = {...this.props.chosenConversation}
      conversationData.watchWords = this.state.watchWords.filter(watchWord => watchWord.watchWordOccurrence.countOfTimesUsed !== 0)
      conversationData.name = this.state.recordingName

      //SENDING TO THE BACKEND
      dispatch(updateConversation(conversationData))

    }
  }
}

// export default withRouter(connect(mapState, mapDispatch)(Snippets));

//NOTES FOR LYSSA
//FINISH MAKING DISPATCH BUT FIRST MAKE A PUT ROUTE THAT UPDATES A CONVERSATION
