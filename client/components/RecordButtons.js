import React, { Component } from "react";
import Snippets from './Snippets'
import { connect } from "react-redux";
import { postNewConvo, setRecordedText, setConvoStartTime, setConvoEndTime } from "../store";
const WatsonSpeech = require("watson-speech");
const axios = require("axios");


// TODO: undefined gets logged out whenever microphone picks up speech....

const request = require('request');

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

  componentDidMount() {
  }

  // handleStart = () => // we can do this instead of binding in the constructor
  handleStart() {
    const startTime = new Date();
    //this.props.dispatchStartTime(startTime);
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
          //console.log(data);
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
    this.props.dispatchText(updatedText)
    console.log(updatedText);
    console.log('@@@', this.state.hasStarted)
  }

  handleStop() {
    const endTime = new Date();
    //this.props.dispatchEndTime(endTime)

    this.stream.stop = this.stream.stop.bind(this.stream);
    this.stream.stop();
    this.setState({ preSubmit: true, hasStarted: false})
    console.log("***", this.state.preSubmit)
    // make form appear
  }

  togglePlay = () => {
    if (!this.state.hasStarted) this.handleStart()
    else this.handleStop()
  }

  render() {
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
          {/* <button className="stop-button" onClick={this.handleStop}>
            STOP
          </button> */}
        </div>
        <div>
          {this.state.preSubmit &&
            <div>
              <Snippets />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {}; // pull in text from state.allConversations.text and then send it to the thunkcreator re lines below
};

//need to create a conversation in db with appropriate data
const mapDispatch = (dispatch) => {
  return {
    // send conversation to thunk with the text on it already & change thunk creator accordingly
    // handleSubmit(event) {
    //   event.preventDefault();

    //   const conversationData = {
    //     name: event.target.recordingName.value
    //   }
    //   dispatch(postNewConvo(conversationData))
    // },
    dispatchText(text) {
      dispatch(setRecordedText(text));
    }
    //,
  //   dispatchStartTime(startTime) {
  //     dispatch(setConvoStartTime(startTime));
  //   },
  //   dispatchEndTime(endTime) {
  //     dispatch(setConvoEndTime(endTime))
  //   }
  }
};

export default connect(mapState, mapDispatch)(RecordButtons);
