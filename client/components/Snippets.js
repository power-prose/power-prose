import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = theme => ({
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


 export default class Snippets extends React.Component {

  state = {
    open: false,
    snippets: this.props.chosenConversation.snippets,
    watchWords: this.props.chosenConversation.watchWords,
    recordingName: ''
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  handleRequestDelete = specificSnippet => () => {
    console.log(">><<", this.state.watchWords)

    const snippets = this.state.snippets
    const snippetToDelete = snippets.indexOf(specificSnippet);
    const watchWordToDecId = snippets.splice(snippetToDelete, 1)[0].watchWordId

    //GET THE WATCHWORD TO DECREMENT - SNIPPETS DELETE INDIVIDUALLY ONLY EVER AN ARRAY OF ONE
    const watchWordToDec = this.state.watchWords.filter(watchWord => watchWord.id === watchWordToDecId)[0]

    const count = watchWordToDec.watchWordOccurrence.countOfTimesUsed

    const newCount = watchWordToDec.watchWordOccurrence.countOfTimesUsed = count - 1


    //MAKE A NEW WATCHWORDS OBJECT WITH THE UPDATED COUNT
    let newWWObj = [...(this.state.watchWords.filter(watchWord => watchWord.id !== 7)), watchWordToDec]

    this.setState({ snippets, watchWords: newWWObj });

    //CURRENTLY LOADING THE LOCAL STATE WITH A WATCH WORD OF COUNT 0
    console.log("STATE:", this.state)

  }


  handleClick = (event) => {
    console.log(event.target.value)
  }

  handleChange = (event) => {
    const recordingName = event.target.value
    console.log(recordingName)
    this.setState({recordingName})

  }


  render() {

    const actions = [
      <FlatButton
        label="Confirm All"
        secondary={true}
        styles= {styles.leftIcon}
        onClick={this.handleClose}

      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
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
          title="Scrollable Dialog"
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

      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     snippets: state.chosenConservation.snippets
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(){

//     }
//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(Snippets));

/* <form onSubmit={this.props.handleSubmit}>
<label htmlFor="Name">Title your recording</label>
<input
  type="text"
  name="recordingName"
  placeholder="Title your Recording"
/>
<button type="submit" >Submit</button>
</form> */
