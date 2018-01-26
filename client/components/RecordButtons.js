import React, { Component } from "react";
import { connect } from "react-redux";
import { analyzeText } from "../utils";
const WatsonSpeech = require("watson-speech");
const axios = require("axios");

class RecordButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {}

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

        this.stream.on("data", function(data) {
          console.log(data);
          handleUpdate(data);
        });

        this.stream.on("error", function(err) {
          console.log(err);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleUpdate(data) {
    let updatedText = this.state.text + data;
    this.setState({ text: updatedText });
  }

  handleStop() {
    this.stream.stop = this.stream.stop.bind(this.stream);
    this.stream.stop();
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
  return {};
};

export default connect(mapState)(RecordButtons);
