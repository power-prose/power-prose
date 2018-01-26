
const WatsonSpeech = require("watson-speech");
const axios = require("axios");

let state = {text: ''};

document.querySelector(".on-button").addEventListener("click", event => {
  axios
    .get("/api/speech-to-text/token")
    .then(res => res.data)
    .then(token => {

      let stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token,
        object_mode: false
      });

      stream.setEncoding("utf8"); // get text instead of Buffers for on data events

      stream.on("data", function(data) {
        console.log(data);
        state.text += data;

      });

      stream.on("error", function(err) {
        console.log(err);
      });

      document.querySelector(".stop-button").addEventListener("click", () => {
        stream.stop = stream.stop.bind(stream);
        stream.stop();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

document.querySelector(".result-button").addEventListener("click", () => {
  console.log('STATE!!!!!!', state);
  let watchWords = ["I'm no expert", "just", "Does that make sense", "like", "I'm not sure", "sorry"];
  console.log(analyze(state.text, watchWords));
})



function analyze(spokenText, watchWords) {
  let regWords = watchWords.map(word => {
    return {word: word, regex: new RegExp(word, 'gi')};
  })

  let wordFrequencies = {};
  for (let i = 0; i < regWords.length; i++) {
    let found = spokenText.match(regWords[i].regex);
    //currently only capturing number of times a word was spoken, *not* the snippet/context around it
    if (found) wordFrequencies[found[0].toLowerCase()] = found.length;
  }
  return wordFrequencies;

}
