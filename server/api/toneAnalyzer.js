const router = require('express').Router();
const request = require('request');

module.exports = router;

router.post('/analyze', (req, res, next) => {
    const toneUsername = process.env.WATSON_TONE_ANALYSIS_USERNAME;
    const tonePassword = process.env.WATSON_TONE_ANALYSIS_PASSWORD;
    const toneUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21";

    const data = {};

    data.text = req.body.speechText;
    request.post({
      url: toneUrl,
      json: data,
      auth: {
        user: toneUsername,
        pass: tonePassword
      }
    }, function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log(body);
      res.send(body);
    })
})

