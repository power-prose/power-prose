import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


 export default class Snippets extends React.Component {

  state = {
    open: false,
    snippets: this.props.chosenConversation.snippets
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  handleRequestDelete = specificSnippet => () => {

    //const updatedChosenConv = Object.assign({}, this.props.chosenConversation)
    const snippets = this.state.snippets
    const snippetToDelete = snippets.indexOf(specificSnippet);
    snippets.splice(snippetToDelete, 1);

    //NOT DELETING SINCE SET STATE IS BASED ON LOCAL STATE
    //MAYBE STILL HAVE LOCAL STATE AND SET STATE HERE
    //DISPATCH ON HANDLE SUBMIT A CONVERSATION OBJECT THATS FED FROM THE LOCAL STATE
    this.setState({ snippets });


  }


  handleClick = (event) => {
    console.log(event.target.value)
  }


  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
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
         I am the Snippets component. My job is to render snippets for the user most recent conversation. I have access to these snippets through props. The current vision is that I am rendered after the User stops the record button.
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
