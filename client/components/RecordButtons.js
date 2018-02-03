import React, { Component } from "react";
import Snippets from './Snippets'
import { connect } from "react-redux";
import { postNewConvo, setConvoStartTime, setConvoEndTime } from "../store";
const WatsonSpeech = require("watson-speech");
const axios = require("axios");


// TODO: undefined gets logged out whenever microphone picks up speech....

const chosenConversation = {
snippets: [{
  text: ' ... i’m no expert but I think we might want to consider ...',
  conversationId: 21,
  watchWordId: 1
} , {
  text: '... i’m no expert but what I would suggest is ... ',
  conversationId: 21,
  watchWordId: 1
} , {
  text: '... i just want to say that i’m on board with that ...',
  conversationId: 21,
  watchWordId: 2
} , {
  text: '... i’m just not sure that’s the best approach',
  conversationId: 21,
  watchWordId: 7
} , {
  text: ' ... i’m just not sure that’s the way to go',
  conversationId: 21,
  watchWordId: 7
}],

watchWords: [
  {id: 7, wordOrPhrase: "not sure", watchWordOccurrence:
  {countOfTimesUsed: 2, conversationId: 21, watchWordId: 7}},
  {id: 2, wordOrPhrase: "just", watchWordOccurrence:
  {countOfTimesUsed: 1, conversationId: 21, watchWordId: 2}},
  {id: 1, wordOrPhrase: "no expert", watchWordOccurrence: {countOfTimesUsed: 2, conversationId: 21, watchWordId: 1}}
  ]
}


class RecordButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preSubmit: false,
      text: ""
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  // handleStart = () => // we can do this instead of binding in the constructor
  handleStart() {
    const startTime = new Date();
    this.props.dispatchStartTime(startTime);
    this.setState({hasStarted: true })
    const handleUpdate = this.handleUpdate;
    axios // consider moving axios request to the store; we need to send in the ability to handle the update
      .get("/api/speech-to-text/token")
      .then(res => res.data)
      .then(token => {
        this.stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
          token,
          object_mode: false
        });
        this.stream.setEncoding("utf8"); // get text instead of Buffers for on data events

        this.stream.on("data", function (data) {
          console.log(data);
          handleUpdate(data);
        });

        this.stream.on("error", function (err) {
          console.log(err);
        });
      })
      .catch(function (error) {
        console.log(error); // display errors to user with error component
      });
  }

  handleUpdate(data) {
    let updatedText = this.state.text + data;
    this.setState({ text: updatedText});
    console.log(updatedText);

  }

  handleStop() {
    const endTime = new Date();
    this.props.dispatchEndTime(endTime)
    console.log('THIS STATE TEXT!!!!', this.state.text);
    this.stream.stop = this.stream.stop.bind(this.stream);
    this.stream.stop()
    setTimeout(() => this.props.handleConvoPost(this.state.text), 3000)

    this.setState({ preSubmit: true, hasStarted: false})


    // make form appear
  }

  handleTimer() {
    const currentTime = this.state.endTime - this.state.startTime
  }

  togglePlay = () => {
    if (!this.state.hasStarted) this.handleStart()
    else this.handleStop()
  }

  render() {
    let snippetsLength
    let snippets = this.props.chosenConversation ? this.props.chosenConversation.snippets : []
    if (snippets) snippetsLength = snippets.length
    console.log("$$$", this.props.chosenConversation)

    let buttonColor = this.state.hasStarted ? 'red' : 'yellow'
    return (
      <div>
        <h1>Record Buttons Here</h1>
        <div className="on-button-container">
          <button
          className="on-button" style={{backgroundColor: buttonColor}}
          onClick={this.togglePlay}>{this.state.hasStarted ? 'STOP' : 'START'}
          </button>
        </div>
        <div>
          {snippetsLength  &&
          <div>
            <Snippets open={true} convo={this.props.chosenConversation} />
          </div>}
          </div>
        </div>
    );
  }
}

const mapState = state => {
  return {
    startTime: state.startTime,
    endTime: state.endTime,
    chosenConversation: state.chosenConversation
  }
};

//need to create a conversation in db with appropriate data
const mapDispatch = (dispatch) => {
  return {
    // send conversation to thunk with the text on it already & change thunk creator accordingly

    handleConvoPost(text) {
      let date = new Date().toString();
      let slicedDate = date.slice(0, (date.indexOf('G') - 1));
      const conversationData = {
        name: `Recording ${slicedDate}`,
        text: text
      }
      dispatch(postNewConvo(conversationData))
    },
    dispatchStartTime(startTime) {
      dispatch(setConvoStartTime(startTime));
    },
    dispatchEndTime(endTime) {
      dispatch(setConvoEndTime(endTime))
    }
  }
};

export default connect(mapState, mapDispatch)(RecordButtons);
