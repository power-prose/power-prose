const getUserMedia = require('getusermedia');
const MicrophoneStream = require('microphone-stream');

document.querySelector('.on-button').addEventListener('click', () => {
  var micStream = new MicrophoneStream();

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      console.log(stream)
      micStream.setStream(stream);
      console.log('!!!!!!', micStream)
    }).catch(function(error) {
      console.log(error);
    });

  // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
  micStream.on('data', function(chunk) {
    console.log('!!!!chunk', chunk)
    // Optionally convert the Buffer back into a Float32Array
    // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
    var raw = MicrophoneStream.toRaw(chunk)
    console.log('!!!!!', raw)
    //...

    // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
   });

  // or pipe it to another stream
  // micStream.pipe(/*...*/);

  // It also emits a format event with various details (frequency, channels, etc)
  micStream.on('format', function(format) {
    console.log(format);
  });

  // Stop when ready
  // document.getElementById('.on-button').addEventListener('click', () => {
  //   micStream.stop();
  // };
})



//
// // on button click get media from user's microphone
// document.querySelector('.on-button').addEventListener('click', () => {
//   console.log('******** START ********')
//   navigator.mediaDevices.getUserMedia({ audio: true })
//     .then(stream => {
//       let audioTracks = stream.getAudioTracks()
//       console.log(audio)
//       let chunks = []
//       for (var key in data) {
//         chunks.push(data[key])
//       }
//       let blob = new Blob(chunks)
//       return blob
//     })
// })
//


// document.querySelector('.stop-button').


// 1. Define a method that does something useful with the return value from the asynchronous call ; this method is part of the observer (defines, but does not invoke, the Subscriber's onNext handler).
// onNext --> An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.
// const myOnNext = (data) => console.log(data)
//
// // 2. Define (but do not invoke) the asynchronous call itself as an Observable.
// // http://reactivex.io/documentation/operators/create.html
// const myObservable = navigator.mediaDevices.getUserMedia({ audio: true })
//
// let source = Rx.Observable.create(observer => {
//     observer.onNext();
//     observer.onCompleted();
// });
//
// var subscription = source.subscribe(
//     function (x) { console.log('Next: ' + x); },
//     function (err) { console.log('Error: ' + err); },
//     function () { console.log('Completed'); });



// 3. Attach the observer to that Observable by subscribing it (this also initiates the actions of the Observable).
// subscribes the Subscriber to the Observable, and invokes the Observable
// myObservable.subscribe(myOnNext);

// 4. Go on with your business; whenever the call returns, the observer’s method will begin to operate on its return value or values — the items emitted by the Observable.




// 2. get media from device, wrap it in an observable
// navigator.MediaDevices.getUserMedia()
// returns a Promise whose fulfillment handler receives a MediaStream object when the requested media has successfully been obtained.
// i think we can wrap this in an observabale and subscribe something to the changes

// 3. pipe audio to a speech to text API via sockets by subscribing this action to the observable

// 4. wrap the response from the speech to test API in an observabale

// 5. subscribe some function to the observable in 4 above
// this might be a simple filtering function for MVP, a natural language processer, etc.
