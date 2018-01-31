const request = require('request');


const analyzeTone = (conversationText, onSuccess) => {

    const toneUsername = process.env.WATSON_TONE_ANALYSIS_USERNAME;
    const tonePassword = process.env.WATSON_TONE_ANALYSIS_PASSWORD;
    const toneUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21";

    const data = {};

    data.text = conversationText;
    request.post({
        // request does not return a promise
        url: toneUrl,
        json: data,
        auth: {
            user: toneUsername,
            pass: tonePassword
        }
    }, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);

        const processedTones = {};
        body.document_tone.tones.forEach(tone => {
            processedTones[tone.tone_id] = tone.score
        })
        onSuccess(processedTones);
    })

}

module.exports = { analyzeTone }