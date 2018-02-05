import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateUserWatchWord, postUserWatchWord, updateUser } from "../store";
import {
  Avatar,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Chip,
  Dialog,
  Divider,
  FlatButton,
  FontIcon,
  TextField
} from "material-ui";
import { dateParser2 } from "../utils";

export class WatchWordList extends Component {
  constructor(props) {
    super(props);
    this.state = { newWatchWord: "", dialogOpen: false };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user.acceptedInitialWatchWords === false) {
      this.setState({ dialogOpen: true });
    }
  }

  handleFormChange = event => {
    this.setState({
      newWatchWord: event.target.value
    });
  };

  handleRequestDelete = () => {
    alert("You clicked the delete button.");
  };

  handleChipClick = () => {
    alert("You clicked the Chip.");
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    const { user } = this.props;
    const userId = user.id;
    const request = { acceptedInitialWatchWords: true };
    console.log("userId and request", userId, request);
    this.setState({ dialogOpen: false });
    this.props.updateUser(userId, request);
  };

  render() {
    const { watchWords, user } = this.props;
    const { newWatchWord } = this.state;
    const dialogAction = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];

    return (
      <div className="container-watchwords">
        <Card style={{width: "270px"}}>
          <CardTitle
          title="Your WatchWords"
          style={{backgroundColor: "#DBF3E3"}}
          titleStyle={{ "fontFamily": "Amaranth, sans-serif", "fontWeight": "bold"}}
          titleColor="#0E254C"
          />

          <CardText>
            {watchWords.length &&
              watchWords.map(word => (
                <div key={word.id} style={styles.wrapper}>
                  <Chip

                    labelStyle={{ color: "#0e254c" }}
                    backgroundColor="#FFFFFF"
                    onRequestDelete={event =>
                      this.props.onDeleteClick(event, word.id)
                    }
                    onClick={this.handleChipClick}
                    style={{
                      marginBottom: 10,
                      border: "0.5px solid #0e254c"
                    }}
                  >
                    {word.wordOrPhrase}
                  </Chip>
                </div>
              ))}

          <br />
          <form
            style={styles.textFieldStyle}
            onSubmit={this.props.handleSubmit}
          >
            <TextField
              style={{marginBottom: '15px'}}
              inputStyle={{color: "#0E254C"}}
              underlineFocusStyle={{ borderColor: "#C98E34"}}
              floatingLabelFocusStyle={{color: "#C98E34"}}
              fullWidth={true}
              floatingLabelText="Enter a new watchword"
              name="newwatchword"
              value={newWatchWord}
              onChange={this.handleFormChange}
            />
            <br />
            <FlatButton
              label="Submit"
              secondary={true}
              style={{
                marginBottom: "5px",
                color: "#0e254c",
                border: "1px solid #0e254c"
              }}
              backgroundColor="#f0ddd4"
              hoverColor="rgb(204,242,218)"
              keyboardFocused={false}
            />
          </form>
          </CardText>
        </Card>



        <div>
          <Dialog
            title="Get Started with Watch Words"
            actions={dialogAction}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
            Welcome! We have preloaded your account with a set of suggested
            watch words. Please use the sidebar to the left to personalize your
            list.
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    watchWords: state.watchWords.activeWatchWords,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    onDeleteClick(event, wordId) {
      event.preventDefault();
      dispatch(updateUserWatchWord(wordId));
    },
    handleSubmit(event) {
      event.preventDefault();
      console.log("!!!!!", event.target.newwatchword.value);
      let wordOrPhrase = event.target.newwatchword.value;
      dispatch(postUserWatchWord({ wordOrPhrase }));
    },
    updateUser(userId, request) {
      dispatch(updateUser(userId, request));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(WatchWordList));

const styles = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

// import React from 'react';
// import Avatar from 'material-ui/Avatar';
// import FontIcon from 'material-ui/FontIcon';
// import SvgIconFace from 'material-ui/svg-icons/action/face';
// import {blue300, indigo900} from 'material-ui/styles/colors';
