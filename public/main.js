const startBtn = document.getElementById('startBtn');
const transcriptText = document.getElementById('transcript');
const elevator = document.getElementById('elevator');
const speechBubble = document.getElementById('speechBubble');
const scoreText = document.getElementById('score');

let score = 0;

async function sendToGPT(transcript) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: transcript })
  });

  if (!response.ok) {
    console.error(await response.text());
    return;
  }

  const data = await response.json();
  const message = data.choices[0].message.content.trim();
  console.log(message);
  transcriptText.textContent = message;

  const investmentMatch = message.match(/\$\s?[\d,]+(\.\d+)?/);
  const investmentAmount = investmentMatch ? parseFloat(investmentMatch[0].replace(/[\$,]/g, '')) : 0;
  score += investmentAmount;
  scoreText.textContent = `Score: $${score}`;

  let fontSize = 32;
  while (speechBubble.scrollHeight > elevator.clientHeight || speechBubble.scrollWidth > elevator.clientWidth) {
    fontSize--;
    transcriptText.style.fontSize = `${fontSize}px`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let recognizing = false;
  let finalTranscript = '';

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function () {
    recognizing = true;
  };

  recognition.onresult = function (event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + '. ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    transcriptText.textContent = finalTranscript + interimTranscript;

    if (speechBubble.scrollHeight > elevator.clientHeight || speechBubble.scrollWidth > elevator.clientWidth) {
      transcriptText.textContent = finalTranscript.trim();
      recognition.stop();
      startBtn.style.display = 'block';
      recognizing = false;
      console.log(finalTranscript.trim());
      sendToGPT(finalTranscript.trim());
      return;
    }
  }

  recognition.onerror = function (event) {
    console.error(event.error);
  };

  startBtn.addEventListener('click', function () {
    recognition.start();
    startBtn.style.display = 'none';
    finalTranscript = '';
    transcriptText.textContent = '';
  });
});
