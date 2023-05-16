const constraints = { audio: true };
let mediaRecorder;
let chunks = [];

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const audioURL = URL.createObjectURL(blob);
    const audioElement = document.getElementById("audioElement");
    audioElement.src = audioURL;
  };
});

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');

recordButton.addEventListener('click', () => {
  mediaRecorder.start();
  recordButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
  chunks = [];
});


mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    const audioURL = URL.createObjectURL(blob);
    const audioElement = document.getElementById('audioElement');
    audioElement.src = audioURL;
    chunks = [];
    
    // Remove the src attribute to disable download
    audioElement.removeAttribute('src');
  };