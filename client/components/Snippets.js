import React from "react";
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { updateConversationThunk } from "../store";
import {SnippetChip} from './';

class Snippets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
      watchWords: [],
      recordingName: "",
      deleted: false,
      updateSent: false
    };
  }

  componentDidMount = () => {
    if (this.props.convo.id) {
      this.setState({
        snippets: this.props.convo.snippets,
        watchWords: this.props.convo.userWatchWords,
        recordingName: this.props.convo.name
      });
    }
  };


  handleClose = () => {
    const conversationData = { ...this.props.convo };
    conversationData.userWatchWords = this.state.watchWords.filter(
      watchWord => watchWord.watchWordOccurrence.countOfTimesUsed !== 0
    );
    conversationData.name = this.state.recordingName;
    this.props.handleSubmit(conversationData);
    this.setState({ updateSent: true });
  };

  handleRequestDelete = specificSnippet => () => {
    const snippets = this.state.snippets;
    const snippetToDelete = snippets.indexOf(specificSnippet);

    //***GET ID OF DELETED SNIPPET
    const watchWordToDecId = snippets.splice(snippetToDelete, 1)[0]
      .userWatchWordId;

    //***GET THE WATCHWORD TO DECREMENT
    const watchWordToDec = this.state.watchWords.filter(
      watchWord => watchWord.id === watchWordToDecId
    )[0];

    const count = watchWordToDec.watchWordOccurrence.countOfTimesUsed;

    const newCount = (watchWordToDec.watchWordOccurrence.countOfTimesUsed =
      count - 1);

    //***REPLACE WATCHWORD OBJ WITH NEW ONE WITH UPDATED WORD COUNT
    let newWWObj = [
      ...this.state.watchWords.filter(
        watchWord => watchWord.id !== watchWordToDecId
      ),
      watchWordToDec
    ];

    this.setState({ snippets, watchWords: newWWObj, deleted: true });
  };

  handleChange = event => {
    const recordingName = event.target.value;
    this.setState({ recordingName });
  };

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        secondary={true}
        keyboardFocused={false}
        onClick={this.handleClose}
      />
    ];
    const snippetMenu = this.state.snippets.map((snippet, i) => {
      return (
        <SnippetChip
        key={i}
          i={i}
          snippet={snippet}
          onRequestDelete={this.handleRequestDelete}
        />
      );
    });
    return (
      <div>
        <Dialog
          title="Review Your Recording"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <div>
        <TextField
        floatingLabelText="Name your recording"
      floatingLabelFixed={true}
          id="rr"
          name="recordingName"
              placeholder={this.props.convo.name}
              value={this.state.recordingName}
              onChange={this.handleChange}
        />
        </div>
          <label>
            See every time you used a WatchWord below. Are any of them
            exceptions to the rule? Remove them from the list and your data
            won't include them.
          </label>
          {snippetMenu}
        </Dialog>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(conversationData) {
      dispatch(updateConversationThunk(conversationData, ownProps.history));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Snippets));
