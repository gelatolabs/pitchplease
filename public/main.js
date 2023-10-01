const transcriptText = document.getElementById('transcript');
const elevator = document.getElementById('elevator');
const speechBubbleContainer = document.getElementById('speechBubbleContainer');
const speechBubble = document.getElementById('speechBubble');
const playerSprite = document.getElementById('player');
const investorSprite = document.getElementById('investor');
const scoreText = document.getElementById('score');
const leaderboard = document.getElementById('leaderboard');

const dialogues = [
  [
    "An investor steps into the elevator.",
    "SHOW_INVESTOR",
    "Investor: Good morning.",
    "You: Hi! You look like an investor. Can I pitch you my startup?",
    "Investor: Do I have a choice?",
    "You: Nope, you're stuck in here with me! I'm building {IDEA}."
  ],
  [
    "HIDE_INVESTOR",
    "Player: Let's pivot.",
    "SHOW_INVESTOR",
    "Player: Let me tell you about {IDEA}.",
    "Investor: I'm listening."
  ],
  [
    "HIDE_INVESTOR",
    "Player: Let's try something else.",
    "SHOW_INVESTOR",
    "Player: Spare some change? I'm working on {IDEA}.",
    "Investor: Tell me more."
  ],
  [
    "HIDE_INVESTOR",
    "Player: OK, time to retire.",
    "THE END"
  ]
]

const ideas = [
  "the first VR dating app",
  "the next big B2B SaaS product",
  "a metaverse on the blockchain",
  "Twitter for dogs. I mean, X for dogs."
]

let score = 0;
let dialogueIndex = 0;
let lineIndex = 0;
let state = 'normal';
let finalTranscript = '';
let recognition;

function nextDialogue() {
  const lines = dialogues[dialogueIndex];
  if (lineIndex < lines.length) {
    let line = lines[lineIndex];
    line = line.replace('{IDEA}', ideas[Math.floor(Math.random() * ideas.length)]);
    if (line === 'SHOW_INVESTOR') {
      investorSprite.style.display = 'block';
      elevator.className = 'open';
      speechBubbleContainer.style.display = 'none';
    } else if (line === 'HIDE_INVESTOR') {
      investorSprite.style.display = 'none';
      elevator.className = 'open';
      speechBubbleContainer.style.display = 'none';
    } else {
      elevator.className = '';
      speechBubbleContainer.style.display = 'block';
      transcriptText.textContent = line;
      speechBubbleContainer.className = line.startsWith('You:') ? 'player' : line.startsWith('Investor:') ? 'investor' : 'narrator';
    }
    lineIndex++;
  } else if (dialogueIndex < dialogues.length - 1) {
    dialogueIndex++;
    lineIndex = 0;
    finalTranscript = '';
    transcriptText.innerHTML = '<i>Pitch aloud...</i>';
    speechBubbleContainer.className = 'player pitch';
    recognition.start();
  } else {
    endGame();
  }
}

async function endPitch() {
  recognition.stop();
  speechBubbleContainer.className = 'investor';
  transcriptText.textContent = '🤔';
  console.log(finalTranscript);
  await sendToGPT(finalTranscript);
}

async function sendToGPT(transcript) {
  state = 'responding';

  const response = await fetch('/api/gpt', {
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
  const message = "Investor: " + data.choices[0].message.content.trim().replace(/^[a-zA-Z]*: /, '');
  console.log(message);
  speechBubbleContainer.className = 'investor';
  transcriptText.textContent = message;

  const investmentMatch = message.match(/\$\s?[\d,]+(\.\d+)?/);
  const investmentAmount = investmentMatch ? parseFloat(investmentMatch[0].replace(/[\$,]/g, '')) : 0;
  score += investmentAmount;
  scoreText.textContent = `Score: $${score}`;

  let fontSize = 38;
  while (speechBubble.scrollHeight > elevator.clientHeight || speechBubble.scrollWidth > elevator.clientWidth) {
    fontSize--;
    transcriptText.style.fontSize = `${fontSize}px`;
  }

  state = 'normal';
}

async function endGame() {
  state = 'gameover';

  const name = prompt('Thanks for playing! Enter your name to upload your score to the leaderboard:');
  if (name === null || name === '') return;

  const response = await fetch('/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, name })
  });

  const data = await response.json();

  leaderboard.innerHTML = '<p>Leaderboard</p>' + data.scores.map(score => `<p>${score.name}: $${score.score}</p>`).join('');
  leaderboard.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function () {
    state = 'recognizing';
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
      finalTranscript += interimTranscript;
      endPitch();
    }
  }

  recognition.onerror = function (event) {
    console.error(event.error);
  };

  elevator.addEventListener('click', function () {
    if (state === 'recognizing') {
      endPitch();
    } else if (state === 'gameover') {
      window.location.reload();
    } else if (state !== 'responding') {
      nextDialogue();
    }
  });

  nextDialogue();
});
