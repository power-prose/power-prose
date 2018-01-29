import React, { Component } from "react";
import { connect } from "react-redux";
import { analyzeText } from "../utils";
import { postNewConvo } from "../store/index";
const WatsonSpeech = require("watson-speech");
const axios = require("axios");

const request = require('request');

class RecordButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tones: [],
      preSubmit: false
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.handleTone = this.handleTone.bind(this);

  }

  componentDidMount() {
  }

  handleStart() {
    const handleUpdate = this.handleUpdate;
    axios
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
        console.log(error);
      });
  }

  handleUpdate(data) {
    let updatedText = this.state.text + data;
    this.setState({ text: updatedText });
    console.log(updatedText);
  }

  handleStop() {
    this.stream.stop = this.stream.stop.bind(this.stream);
    this.stream.stop();
    this.setState({preSubmit: true})
    //make form appear

  }

  handleResults() {
    let watchWords = [
      "I'm no expert",
      "just",
      "Does that make sense",
      "like",
      "I'm not sure",
      "sorry"
    ];
    console.log(analyzeText(this.state.text, watchWords));
  }

  handleTone() {
    axios.post('/api/toneAnalyzer/analyze', { speechText: this.state.text })
      .then(res => {
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <h1>Record Buttons Here</h1>
        <div className="on-button-container">
          <button className="on-button" onClick={this.handleStart}>
            START
          </button>
        </div>
        <div>
          <button className="stop-button" onClick={this.handleStop}>
            STOP
          </button>
        </div>
        <div>
          <button className="result-button" onClick={this.handleResults}>
            RESULTS
          </button>
          <button className="result-button" onClick={this.handleTone}>
            TONE
        </button>
        </div>
        <div>
          {this.state.preSubmit &&
          <div>
            <form onSubmit = {this.handleSubmit}>
              <label htmlFor="Name">Title your recording</label>
              <input
                type = "text"
                name = "recordingName"
                placeholder = "Title your Recording"
              />
              <button>Submit</button>
            </form>
        </div>
        }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

//need to create a conversation in db with appropriate data
const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      console.log(event.target.recordingName.value)
      const convoData = {
        //make a form show up that takes input and on that handlesubmit
        name: event.target.recordingName.value,
        tones: []
        //eventually pass in time
      }
      dispatch(postNewConvo(convoData))
    }
  }
};

export default connect(mapState, mapDispatch)(RecordButtons);

// const RecordingNameForm = (props) => {
//   return (
//     <div>
//     <form onSubmit = {props.handleSubmit}>
//       <label htmlFor="Name">Title your recording</label>
//       <input
//         type = "text"
//         name = "recordingName"
//         placeholder = "Title your Recording"
//       />
//       <button>Submit</button>
//     </form>
//   </div>
//   )
// }
