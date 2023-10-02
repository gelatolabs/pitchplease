const transcriptText = document.getElementById('transcript');
const elevator = document.getElementById('elevator');
const speechBubbleContainer = document.getElementById('speechBubbleContainer');
const speechBubble = document.getElementById('speechBubble');
const playerSprite = document.getElementById('player');
const investorSprite = document.getElementById('investor');
const scoreText = document.getElementById('score');
const leaderboard = document.getElementById('leaderboard');
const ideaSpinnerContainer = document.getElementById('ideaSpinnerContainer');
const ideaSpinner = document.getElementById('ideaSpinner');

const dialogues = [
  [
    "You're an inglorious and underpaid Computer Science graduate.",
    "Sick of the office life, you've decided to start your own company.",
    "You haven't totally worked out the details yet, but you're excited to share your incredible genius with the world.",
    "You decided to check out a nearby venture capital conference to harass some investors.",
    "SHOW_INVESTOR",
    "You're in luck! You've run into an angel investor in the elevator!",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: Go ahead.",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "NEW_DAY",
    "Well, you've run out of money for your {PREVIOUS_IDEA} and now you need to convince an investor to give you Series B funding.",
    "You may have to pivot from your idea, but you've learned a lot and you're feeling confident.",
    "You're on your way to meet with your girlfriend and you step into the elevator.",
    "SHOW_INVESTOR",
    "Wow, what luck! A manager at a major hedge fund just walked through the doors.",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: Sure, how bad could your pitch be?",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "NEW_DAY",
    "Well, you've run out of money for your {PREVIOUS_IDEA} and now you need to convince an investor to give you Series C funding.",
    "You may have to pivot from your idea, but you've learned a lot and you're feeling confident.",
    "You're on your way to meet with your wife and you step into the elevator.",
    "SHOW_INVESTOR",
    "Wow, what luck! A partner at a major VC firm just walked into the elevator. This could be the big break you need.",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: Yeah... I guess.",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "NEW_DAY",
    "Well, you've run out of money for your {PREVIOUS_IDEA} and now you need to convince an investor to give you Series D funding.",
    "You may have to pivot from your idea, but you've learned a lot and you're feeling confident.",
    "You're on your way to meet with your accountant and you step into the elevator.",
    "SHOW_INVESTOR",
    "Wow, what luck! A GameStop millionaire, surely he'll have good taste.",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: I guess I can't stop you?",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "NEW_DAY",
    "Well, you've run out of money for your {PREVIOUS_IDEA} and now you need to convince an investor to give you Series E funding.",
    "You may have to pivot from your idea, but you've learned a lot and you're feeling confident.",
    "You're on your way to meet with your divorce lawyer and you step into the elevator.",
    "SHOW_INVESTOR",
    "Wow, what luck! A Dogecoin millionaire just walked into the elevator. He must make level-headed decisions.",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: Please don't.",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "THE END"
  ]
]

const ideas = [
  "the first VR dating app",
  "the next big B2B SaaS product",
  "a VR game",
  "an eBay clone but for rich people",
  "an eBay clone but for poor(er) people",
  "Twitter for dogs. I mean, X for dogs",
  "a metaverse on the blockchain",
  "a video game on the blockchain",
  "an app that tracks people but doesn't sound creepy",
  "some new marketing software for B2B companies",
  "an AI company that makes movie scripts",
  "an AI company that makes animated tv shows",
  "an investment company that uses AI",
  "a VR game that doesn't have guns or music",
  "an AI company that helps optimize space in warehouses",
  "a Tinder clone but for dogs",
  "an AI that functions as an interior decorator",
  "a company that helps people find doctors they actually like",
  "an AI company that will help people think my corporation isn't evil",
  "a space company that scams billionaires to spend them to space",
  "an AI company that helps optimize space on our sales floor",
  "a car company but it only sells cars to kids",
  "an app to hire people to help you win a fight",
  "a self-defense multi-tool",
  "VR glasses",
  "a 4D printer",
  "a lottery number predictor",
  "a free speech generator",
  "a DIY home root canal kit",
  "a life-sized Lego house",
  "a Veganizer ray",
  "a smart lawnmower",
  "a site called OnlyCans"
]

const results = [
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "",
    ""
  ],
  [
    "Protecting yourself in the streets is tough these days but a hard sell in this economy.",
    "Scoreee!! I bet my next idea will really tickle an investor's feather!"
  ],
  [
    "Seeing is believing however creepy glasses may not quite be ready for mainstream just yet!",
    "WOOT! There's probably something else that could also really pique a VC's interest!"
  ],
  [
    "Maybe this idea needs a bit more work to make it to the next dimension.",
    "Time to go back to the future! The next investor will surely recognize my unicorn potential!"
  ],
  [
    "It seemed amazing on the surface but there must be a missing semicolon somewhere!",
    "What a jackpot!! I can just feel it, I'm going to score even bigger next time!"
  ],
  [
    "It was going great until you found out the investor is from Canada.",
    "There's still big money in the social media space, who knew? I hope the next investor has even deeper pockets!"
  ],
  [
    "Everybody's afraid of the dentist, however the injections probably were a bit much!",
    "That was a real winner! The pandemic really did elevate the DIY sector!"
  ],
  [
    "I was so sure stepping on legos could actually be a good thing for once!",
    "Thank you inflation - I knew this would appeal to the right maniac!"
  ],
  [
    "I guess I shouldn't have expected much from someone with bbq sauce on their chin.",
    "The vegan movement is real! Let's get on saving the planet - flower power!"
  ],
  [
    "Not that surprising given the prototype cost us one arm and a leg!",
    "Big win for me and the environment! Let's keep those lithium mines pumping!"
  ],
  [
    "I have a feeling there's some fierce competition in this space.",
    "Hawww yeah! Next step is to work on promoting our two can melon promotion!"
  ]
]

let score = 0;
let lastScore = 0;
let difficulty = 0;
let dialogueIndex = 0;
let lineIndex = 0;
let state = 'normal';
let previousIdea = '';
let finalTranscript = '';
let recognition;

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function spinIdeas(line, callback) {
  if (line.includes('{IDEA}')) {
    state = 'waiting';
    speechBubbleContainer.style.display = 'none';
    ideaSpinnerContainer.style.display = 'block';

    const shuffledIdeas = shuffleArray(ideas);
    ideaSpinner.innerHTML = [...shuffledIdeas, ...shuffledIdeas]
      .map(idea => `<span>${idea}</span>`)
      .join('');

    ideaSpinner.style.animation = 'spin 5000ms linear infinite';

    setTimeout(() => {
      const computedStyle = window.getComputedStyle(ideaSpinner);
      ideaSpinner.style.animation = 'none';
      ideaSpinner.style.transform = computedStyle.transform;

      previousIdea = shuffledIdeas[1];
      line = line.replace('{IDEA}', previousIdea);
      setTimeout(() => {
        ideaSpinner.innerHTML = '';
        speechBubbleContainer.style.display = 'block';
        ideaSpinnerContainer.style.display = 'none';
        state = 'normal';
        callback(line);
      }, 2000);
    }, 3000);
  } else {
    callback(line);
  }
}

function nextDialogue() {
  const lines = dialogues[dialogueIndex];

  if (dialogueIndex <= 0) {
    difficulty = 0;
  } else if (dialogueIndex <= 2) {
    difficulty = 1;
  } else {
    difficulty = 2;
  }
  if (lineIndex < lines.length) {
    let line = lines[lineIndex];
    if (line.includes('{PREVIOUS_IDEA}'))
      line = line.replace('{PREVIOUS_IDEA}', previousIdea.replace(/^(a |an |the |some )/i, ''));
    spinIdeas(line, (line) => {
      if (line === 'NEW_DAY') {
        elevator.className = '';
        speechBubbleContainer.style.display = 'none';
        const black = document.createElement('div');
        black.className = 'fadeToBlack';
        elevator.appendChild(black);
      } else if (line === 'SHOW_INVESTOR') {
        new Audio('audio/open.mp3').play();
        investorSprite.src = `img/investor${difficulty}.png`;
        investorSprite.style.display = 'block';
        elevator.className = 'open';
        speechBubbleContainer.style.display = 'none';
      } else if (line === 'HIDE_INVESTOR') {
        new Audio('audio/close.mp3').play();
        investorSprite.style.display = 'none';
        elevator.className = 'open';
        speechBubbleContainer.style.display = 'none';
      } else {
        if (line === 'RESULT') {
          const previousIdeaIndex = ideas.indexOf(previousIdea);
          const performance = lastScore < 50000 ? 0 : 1;
          line = results[previousIdeaIndex][performance];
        }
        elevator.className = '';
        speechBubbleContainer.style.display = 'block';
        transcriptText.innerHTML = line;
        speechBubbleContainer.className = line.startsWith('You:') ? 'player' : line.startsWith('Investor:') ? 'investor' : 'narrator';
      }
      lineIndex++;
    })
  } else if (dialogueIndex < dialogues.length - 1) {
    state = 'waiting';
    dialogueIndex++;
    lineIndex = 0;
    finalTranscript = '';
    transcriptText.innerHTML = '<i>Please wait...</i>';
    speechBubbleContainer.className = 'player pitch waiting';
    recognition.start();
  } else {
    endGame();
  }
}

async function endPitch() {
  new Audio('audio/ding.mp3').play();
  recognition.stop();
  speechBubbleContainer.className = 'investor';
  transcriptText.textContent = 'Investor: That\'s my stop. Hmm...';
  console.log(finalTranscript);
  await sendToGPT(finalTranscript);
}

async function sendToGPT(transcript) {
  state = 'waiting';

  const response = await fetch('/api/gpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: transcript, budget: difficulty * 100000 })
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
  previousScore = investmentAmount;
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
  try {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  } catch (error) {
    alert('Your browser does not support speech recognition. Please use Chrome/Safari or check your permissions. Sorry!');
    return;
  }
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function () {
    setTimeout(() => {
      state = 'recognizing';
      speechBubbleContainer.className = 'player pitch listening';
      transcriptText.innerHTML = '<i>Pitch aloud...</i>';
    }, 2000);
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

  recognition.onend = function () {
    if (state === 'recognizing')
      endPitch();
  };

  recognition.onerror = function (event) {
    console.error(event.error);
  };

  elevator.addEventListener('click', function () {
    if (state === 'waiting') {
      return;
    } else if (state === 'recognizing') {
      endPitch();
    } else if (state === 'gameover') {
      window.location.href = '/';
    } else {
      nextDialogue();
    }
  });

  nextDialogue();
});