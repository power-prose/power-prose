// const getUserMedia = require('getusermedia');
// // const MicrophoneStream = require('microphone-stream');
// const WatsonSpeech = require('watson-speech');
//
// const token = `0eLR4Oufd%2BgBFAQbyXb2dnERvojh6KOp6O22KTrIK85g%2F3xqJ3%2FoTU23mikujSecmpjKSmjxjmlChjSP9rFYm0ECeT3gU%2B%2BdS35Fn%2F1gFhX%2BsoJ3yRPp5sV1jw7WGZwOcW9c2Vw0%2BFea0uwjxXSKOCHoWOix5MdGnD0xNm2hGwMkLo7zg4oOWwYzT1kbqxYXdx93bueK4BC0M5VeQztiR%2BMU3NuQ3b4BYxBZESy2qKQGAWzFM5%2Ftwq2qSFv%2Bh8g2W6Q8N%2BOoihxaafrkchUIQ4ciahxhCGlbJPx0lQiOLCDXVuCOdZhjojQw1NPGx%2Bm005B1dmwUzJlC3UT2%2Fvy2hHdSkHuwP%2FC819GcGEN%2BN%2B80FdLXvgzauCCCyGdr4HJ7ocGLkJIDFYH28fTErqA8z8QcGyJvnOEhQdfF0mtYNuZ3Iwv3qctm%2BGX9z%2Fr9Kw3iBK1dvr%2Fm9Dvt9DWQT1nyyC%2FyiUkaQaeiocQ576WOeznJampOxYsVQyhtPkuNweq8jPocC9ZJICBp7Nb5NGeTjoTH7vd29RHM05JZJbw6t0O7Q3Hf6h5wH%2FlcCu5qTv6%2BFrAF34SUdNVut26w1Op74zUQXXONGjnDGxBlpHB1r97wwxiogZhd70PhI7Jkt5%2FiYO9kwD0sUt3Ge6oSsNsVg4pEzCA15g7SLeIjP4YRHv%2Fw4zU94ksZk%2Bk0E23E%2Fe5ZCr3%2BkK1p2ZntYQEbAfPlwBq%2FBODflC4K5%2F3DUJcq72Xfgv%2F6zPxMqqPI6OuT4cWZ2qQPiecZCJbeOuWhTYcsWKxpJo5tnMfFeGWv5i02sPDgbD2Q3EiFiwj9ZuXDc%2FOM8cGPxBoJRwZlMZ2YSB2LeKHCfySLTNN9avyLYXD86SS4uaCtSwXVDmRik26kx6ewO2zWWAEarz7yruclTWHRvWyeWnry%2Bl8Re1kJFoWVf69Sjo6Q1bPhsYGQtKoNSYsAG6IMVzEAG0dSmPgurmP8IvQiU4wC1NG7mHkOuawyahQ%3D`
// // const wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize'
// //   + '?watson-token=' + token
// //   + '&model=es-ES_BroadbandModel';
// // var websocket = new WebSocket(wsURI);
// //
// // websocket.onopen = function(evt) { onOpen(evt) };
// // websocket.onclose = function(evt) { onClose(evt) };
// // websocket.onmessage = function(evt) { onMessage(evt) };
// // websocket.onerror = function(evt) { onError(evt) };
// //
// // function onOpen(evt) {
// //   var message = {
// //     'action': 'start',
// //     'content-type': 'audio/l16;rate=22050'
// //   };
// //   websocket.send(JSON.stringify(message));
// // }
// //
// // function onMessage(evt) {
// //   console.log(evt.data);
// // }
//
// document.querySelector('.on-button').addEventListener('click', (event) => {
//   let stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
//    token,
//    object_mode: false
//  });
//
//  stream.setEncoding('utf8'); // get text instead of Buffers for on data events
//
//  stream.on('data', function(data) {
//    console.log(data);
//  });
//
//  stream.on('error', function(err) {
//      console.log(err);
//  });
//
// document.querySelector('.stop-button').addEventListener('click', () => {
//   stream.stop.bind(stream)
//   })
//   .catch(function(error) {
//    console.log(error);
//   });
// })
//
//
//
//
//
//
//
// // document.querySelector('.on-button').addEventListener('click', (event) => {
// //   var micStream = new MicrophoneStream();
// //   // websocket.open()
// //
// //   navigator.mediaDevices.getUserMedia({ audio: true })
// //     .then(function(stream) {
// //       console.log(stream)
// //       micStream.setStream(stream);
// //     }).catch(function(error) {
// //       console.log(error);
// //     });
// //
// //   // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
// //   micStream.on('data', function(chunk) {
// //     // console.log('!!!!chunk', chunk);
// //     let blob = new Blob(chunk);
// //     console.log(blob)
// //     websocket.send(blob);
// //    });
// //
// //   // It also emits a format event with various details (frequency, channels, etc)
// //   micStream.on('format', function(format) {
// //     console.log(format);
// //   });
// //
// //   // Stop when ready
// //   document.querySelector('.stop-button').addEventListener('click', () => {
// //     micStream.stop();
// //     websocket.send(JSON.stringify({ 'action': 'stop' }))
// //   })
// // })
//
//
//
// //
// // // on button click get media from user's microphone
// // document.querySelector('.on-button').addEventListener('click', () => {
// //   console.log('******** START ********')
// //   navigator.mediaDevices.getUserMedia({ audio: true })
// //     .then(stream => {
// //       let audioTracks = stream.getAudioTracks()
// //       console.log(audio)
// //       let chunks = []
// //       for (var key in data) {
// //         chunks.push(data[key])
// //       }
// //       let blob = new Blob(chunks)
// //       return blob
// //     })
// // })
// //
//
//
// // document.querySelector('.stop-button').
//
//
// // 1. Define a method that does something useful with the return value from the asynchronous call ; this method is part of the observer (defines, but does not invoke, the Subscriber's onNext handler).
// // onNext --> An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.
// // const myOnNext = (data) => console.log(data)
// //
// // // 2. Define (but do not invoke) the asynchronous call itself as an Observable.
// // // http://reactivex.io/documentation/operators/create.html
// // const myObservable = navigator.mediaDevices.getUserMedia({ audio: true })
// //
// // let source = Rx.Observable.create(observer => {
// //     observer.onNext();
// //     observer.onCompleted();
// // });
// //
// // var subscription = source.subscribe(
// //     function (x) { console.log('Next: ' + x); },
// //     function (err) { console.log('Error: ' + err); },
// //     function () { console.log('Completed'); });
//
//
//
// // 3. Attach the observer to that Observable by subscribing it (this also initiates the actions of the Observable).
// // subscribes the Subscriber to the Observable, and invokes the Observable
// // myObservable.subscribe(myOnNext);
//
// // 4. Go on with your business; whenever the call returns, the observer’s method will begin to operate on its return value or values — the items emitted by the Observable.
//
//
//
//
// // 2. get media from device, wrap it in an observable
// // navigator.MediaDevices.getUserMedia()
// // returns a Promise whose fulfillment handler receives a MediaStream object when the requested media has successfully been obtained.
// // i think we can wrap this in an observabale and subscribe something to the changes
//
// // 3. pipe audio to a speech to text API via sockets by subscribing this action to the observable
//
// // 4. wrap the response from the speech to test API in an observabale
//
// // 5. subscribe some function to the observable in 4 above
// // this might be a simple filtering function for MVP, a natural language processer, etc.
