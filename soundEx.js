// chrome.tabs.executeScript({
//     code: 'var chatBox = document.getElementsByClassName("z38b6 CnDs7d hPqowe");'
// })
// // zWfAib Z319Jd eFmLfc a1pVef
// function myFunc(){
//     console.log("YES")
// }
// var mutationObserver = new MutationObserver(myFunc());

// mutationObserver.observe(element, option);


var a = document.querySelector("#start")
a.addEventListener("click", function () {
    chrome.tabs.executeScript({
        code: 'myFunc()'
    })
})
chrome.tabCapture.capture({
    audio: true,
    video: false
}, function (stream) {
    // var ctx = new AudioContext();
    // output = ctx.createMediaStreamSource(stream);
    // output.connect(ctx.destination)
    // // console.log(ctx.decodeAudioData(new ArrayBuffer()))
    // ctx.decodeAudioData(stream.response, function(buffer) {
    //     myBuffer = buffer;
    //     songLength = buffer.duration;
    //     source.buffer = myBuffer;
    //     source.playbackRate.value = playbackControl.value;
    //     source.connect(audioCtx.destination);
    //     source.loop = true;

    //     loopstartControl.setAttribute('max', Math.floor(songLength));
    //     loopendControl.setAttribute('max', Math.floor(songLength));
    //   },

    //   function(e){"Error with decoding audio data" + e.error});

    var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024, 1, 1);

    input.connect(context.destination);
    processor.connect(context.destination);
    
    
    var b = document.querySelector("#start");
    var clicked = false;
     var chunks = [];
     var dest = context.createMediaStreamDestination();
     var mediaRecorder = new MediaRecorder(stream);

     b.addEventListener("click", function(e) {
       if (!clicked) {
           mediaRecorder.start();
           e.target.innerHTML = "Stop recording";
           clicked = true;
         } else {
           mediaRecorder.stop();
           e.target.disabled = true;
         }
     });

     mediaRecorder.ondataavailable = function(evt) {
       // push each chunk (blobs) in an array
       chunks.push(evt.data);
     };

     mediaRecorder.onstop = function(evt) {
       // Make blob out of our blobs, and open it.
       var blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
       console.log(blob)
       document.querySelector("audio").src = URL.createObjectURL(blob);
     };














    processor.onaudioprocess = function (e) {
        // Do something with the data, i.e Convert this to WAV
        //   console.log(e.inputBuffer);



        var inputBuffer = e.inputBuffer;

        // The output buffer contains the samples that will be modified and played
        var outputBuffer = e.outputBuffer;
        for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            var inputData = inputBuffer.getChannelData(channel).buffer;
            var outputData = outputBuffer.getChannelData(channel).buffer;
            // Loop through the 4096 samples
        }

    };

});
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log(request, sender, sendResponse)
//     if (request.message === "stream") {
//       var stream = request.stream;

//       if (!stream) {
//         console.log("stream is null");
//         return;
//       }

//       console.log(stream);
//       loadStream(stream);
//     }
//     else if (request.message === "statusChanged") {
//       console.log("statusChanged");
//     }
//   });