const request = require('request');
const axios = require('axios');


const analyzeTone = (conversationText) => {

    const toneUsername = process.env.WATSON_TONE_ANALYSIS_USERNAME;
    const tonePassword = process.env.WATSON_TONE_ANALYSIS_PASSWORD;
    const toneUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21";

    const data = { text: conversationText };
    return axios.request({
        url: toneUrl,
        method: "post",
        data,
        auth: {
            username: toneUsername,
            password: tonePassword
        }
    })
        .then(response => {
            let toneData = {}

            let processedTones = {};
            let tentativeSentences = [];

            response.data.document_tone.tones.forEach(tone => {
                processedTones[tone.tone_id] = tone.score
            })
            toneData.processedTones = processedTones;

            // if there is not more than 1 recorded sentence, the watson api does not return sentence info
            if (response.data.sentences_tone) {
                response.data.sentences_tone.forEach(function (sentence) {
                    sentence.tones.forEach(function (tone) {
                        if (tone.tone_id === "tentative") {
                            tentativeSentences.push(sentence.text)
                        }
                    })
                })
                toneData.tentativeSentences = tentativeSentences;
            } else {
                toneData.tentativeSentences = [];
            }
            return toneData;
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = { analyzeTone }