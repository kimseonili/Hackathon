var button = document.querySelector("#speech");
button.addEventListener('click', function(){speech_to_text()});
var stop = document.querySelector('#stop');
stop.addEventListener('click',function(){stop()})
var korea = document.querySelector("#korea");
var isRecognizing = false;

if ('SpeechRecognition' in window) {
    console.log("음성인식을 지원하는 브라우저입니다.")
}

try {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
} catch (e) {
    console.error(e);
}

recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 5;



function speech_to_text() {

    recognition.start();
    isRecognizing = true;

    recognition.onstart = function () {
        console.log("음성인식이 시작 되었습니다. 이제 마이크에 무슨 말이든 하세요.")
        message.innerHTML = "음성인식 시작...";
        button.innerHTML = "Listening...";
        button.disabled = true;
    }


    recognition.onspeechend = function () {
        message.innerHTML = "버튼을 누르고 아무말이나 하세요.";
        button.disabled = false;
        button.innerHTML = "Start STT";
    }

    recognition.onresult = function (event) {
        console.log('You said: ', event.results[0][0].transcript);
    
        var resText = event.results[0][0].transcript;
        korea.innerHTML = resText;

    
        text_to_speech(resText);

    };

    recognition.onend = function () {
        message.innerHTML = "버튼을 누르고 아무말이나 하세요.";
        button.disabled = false;
        button.innerHTML = "Start STT";
        isRecognizing = false;

    }
}

function stop() {
    recognition.stop();
    message.innerHTML = "버튼을 누르고 아무말이나 하세요.";
    button.disabled = false;
    button.innerHTML = "Start STT";
    isRecognizing = false;
}




function text_to_speech(txt) {
  
    if ('speechSynthesis' in window) {
     
        console.log("음성합성을 지원하는  브라우저입니다.");
    }
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
  
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1.3; 
   
    msg.text = txt;
    msg.lang = 'ko-KR';

    msg.onend = function (e) {
        if (isRecognizing == false) {
            recognition.start();
        }
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
   
}
