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

let music = new Audio('audio/music.mp3');
music.volume = 0.15;
music.loop = true;

const dialogues = [
  [
    "You're an inglorious and underpaid Computer Science graduate.",
    "Sick of the office life, you've decided to start your own company.",
    "You haven't totally worked out the details yet, but you're excited to share your incredible genius with the world.",
    "You decided to check out a nearby venture capital conference to harass some investors.",
    "SHOW_INVESTOR",
    "You're in luck! You've run into an angel investor in the elevator!",
    "This is your moment. Just like they taught you in business school, the best pitches always happen in elevators.",
    "And remember. Elevators have <i>Limited Space</i> for your big brain ideas. You'll need to use it wisely and distill your pitch to the essentials. See how many words we can fit in here? It's not a lot. If I keep going on about unimportant details, I might get cut off!",
    "Investor: Good morning.",
    "You: Hi! Mind if I pitch my startup?",
    "Investor: Go ahead.",
    "Think! What's your idea? What's the next big thing?",
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
    "Think! What's your idea? What's the next big thing?",
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
    "Think! What's your idea? What's the next big thing?",
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
    "Think! What's your idea? What's the next big thing?",
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
    "Think! What's your idea? What's the next big thing?",
    "You: So, it's a work in progress, but I had an idea for {IDEA}!"
  ],
  [
    "HIDE_INVESTOR",
    "RESULT",
    "END"
  ]
]

const ideas = [
  "the first VR dating app",
  "the next big B2B SaaS product",
  "an eBay clone but for rich people",
  "Twitter for dogs. I mean, X for dogs",
  "a metaverse on the blockchain",
  "a video game on the blockchain",
  "an app that tracks people but doesn't sound creepy",
  "some new marketing software for B2B companies",
  "an AI company that makes movie scripts",
  "an investment company that uses AI",
  "a VR game that doesn't have guns or music",
  "an AI company that helps optimize space in warehouses",
  "a Tinder clone but for dogs",
  "an AI that functions as an interior decorator",
  "a company that helps people find doctors they actually like",
  "an AI company that will help people think my corporation isn't evil",
  "a space company that scams billionaires to spend them to space",
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
    // the first VR dating app
    "They probably took the reduction in spending by Metta at Facecrook value.",
    "It's about time - VR has been flirtually ready to take off for too long!"
  ],
  [
    // the next big B2B SaaS product
    "The idea just wasn't big enough to fit the software requirements.",
    "That's money in the bank! Now it's time to start printing crypto!"
  ],
  [
    // an eBay clone but for rich people
    "Bougiebay seemed like such a good idea!",
    "Woo-hoo, I had a feeling 2nd hand designer undergarments might be a winner!"
  ],
  [
    // Twitter for birds. I mean, X for birds
    "I guess the tweets per minute just weren't fast enough for adequate investor stimulation.",
    "Meep meep!  Maybe the next hot feature will involve nested loops!"
  ],
  [
    // a metaverse on the blockchain
    "Metaverses just can't seem to catch a break these days, maybe insert more buzzwords next time?",
    "Yess!  I'm going to invest everything I have too - what could go wrong?"
  ],
  [
    // a video game on the blockchain
    "Hmmm a video game on top of the block chain might be a bit unstable.",
    "Hooray!  I wonder if we could port a glass of winecraft."
  ],
  [
    // an app that tracks people but doesn't sound creepy
    "Personal information and hygiene can definitely be touchy subjects.",
    "As long as we shrink the EULA font and keep making it longer everything will be ok!"
  ],
  [
    // some new marketing software for B2B companies
    "Advertising never really was my cup of tea.",
    "Bro 2 Bro companies are where it's at, easy money!"
  ],
  [
    // an AI company that makes movie scripts
    "That investor was probably related to one of those Hollywood writers.",
    "Cha-ching!  Those Hollywood writers won't stand a chance!"
  ],
  [
    // an investment company that uses AI
    "I just don't get it - when has AI ever failed us before?",
    "Excellent!  Time to get started on this Ponzi scheme!"
  ],
  [
    // a VR game that doesn't have guns or music
    "Maybe we should try the VR dating space instead, I've heard good things about Flirtual.",
    "I knew this would work!  Now we must rely on a tech conglomerate to launch an affordable quality headset!"
  ],
  [
    // an AI company that helps optimize space in warehouses
    "That didn't quite work out but what about a game that rotates shapes to form lines with catchy music?",
    "Wooohooo - time to create some boxing videos to test filling those gaps!"
  ],
  [
    // a Tinder clone but for dogs
    "Puppy love is so underappreciated.",
    "Supporting our pet love lives was such an easy sell!  Look out for hump-day!"
  ],
  [
    // an AI that functions as an interior decorator
    "If AI can't drive a car I suppose we can't expect it to drive a paintbrush.",
    "This is so exciting - I'll finally be able to bring all my Minecraft fantasies to life!"
  ],
  [
    // a company that helps people find doctors they actually like
    "Maybe we should hire a real Doctor to consult next time instead of a dentist.",
    "Sweet!  I wonder how much Facecrook will pay us for medical records!"
  ],
  [
    // an AI company that will help people think my corporation isn't evil
    "Maybe it's an impossible task after all.",
    "I wonder who our first client might be - oh look Zark Muckerberg is blowing up my phone!"
  ],
  [
    // a space company that scams billionaires to send them to the moon
    "Lunar flexing just doesn't seem to have the appeal it once did.",
    "That's one small step for me and one big step for con artistry."
  ],
  [
    // a car company but it only sells cars to kids
    "I guess we never really considered the insurance implications!  DOH!",
    "Now all we need to come up with is a catchy jingle - something like 1-877.."
  ],
  [
    // an app to hire people to help you win a fight
    "Too bad, this would have come in handy in my highschool years!",
    "A little \"hired help\" can always come in handy!  I'll never lose a fight again!"
  ],
  [
    // a self-defense multi-tool
    "Protecting yourself in the streets is tough these days but a hard sell in this economy.",
    "Scoreee!! I bet my next idea will really tickle an investor's feather!"
  ],
  [
    // VR glasses
    "Seeing is believing however creepy glasses may not quite be ready for mainstream just yet!",
    "WOOT! There's probably something else that could also really pique a VC's interest!"
  ],
  [
    // a 4D printer
    "Maybe this idea needs a bit more work to make it to the next dimension.",
    "Time to go back to the future! The next investor will surely recognize my unicorn potential!"
  ],
  [
    // a lottery number predictor
    "It seemed amazing on the surface but there must be a missing semicolon somewhere!",
    "What a jackpot!! I can just feel it, I'm going to score even bigger next time!"
  ],
  [
    // a free speech generator
    "It was going great until you found out the investor is from Canada.",
    "There's still big money in the social media space, who knew? I hope the next investor has even deeper pockets!"
  ],
  [
    // a DIY home root canal kit
    "Everybody's afraid of the dentist, however the injections probably were a bit much!",
    "That was a real winner! The pandemic really did elevate the DIY sector!"
  ],
  [
    // a life-sized Lego house
    "I was so sure stepping on legos could actually be a good thing for once!",
    "Thank you inflation - I knew this would appeal to the right maniac!"
  ],
  [
    // a Veganizer ray
    "I guess I shouldn't have expected much from someone with bbq sauce on their chin.",
    "The vegan movement is real! Let's get on saving the planet - flower power!"
  ],
  [
    // a smart lawnmower
    "Not that surprising given the prototype cost us one arm and a leg!",
    "Big win for me and the environment! Let's keep those lithium mines pumping!"
  ],
  [
    // a site called OnlyCans
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

    const spinSound = new Audio('audio/spin.mp3');
    spinSound.volume = 0.25;
    spinSound.play();

    setTimeout(() => {
      spinSound.pause();
      new Audio('audio/ding.mp3').play();
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
  transcriptText.style.fontSize = '44px';
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
        } else if (line === 'END') {
          if (score < 200000) {
            line = 'Perhaps you just weren\'t cut out for entrepreneurship.  Maybe try something less volatile like a 9-5 career for a soulless corporation that will slowly suck your essence away until you reach the grave.';
          } else if (score < 700000) {
            line = 'Not a bad start!  Keep playing this game until your fingers bleed and you might just have a shot at the big time!';
          } else {
            line = 'Excellent work - but did you reach deep enough into those pockets? Play again and see if there is a limit to your genius!';
          }
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
    transcriptText.innerHTML = '<i>Initializing speech recognition...</i>';
    speechBubbleContainer.className = 'player pitch waiting';
    music.volume = 0.05;
    recognition.start();
  } else {
    endGame();
  }
}

async function endPitch() {
  recognition.stop();
  new Audio('audio/ding.mp3').play();
  music = new Audio('audio/music.mp3');
  music.volume = 0.15;
  music.loop = true;
  music.play();
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
    body: JSON.stringify({ prompt: transcript, budget: (difficulty + 1) * 100000 })
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
  lastScore = investmentAmount;
  score += investmentAmount;
  scoreText.textContent = `Score: $${score}`;

  let fontSize = 44;
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

function scaleViewport() {
  if (window.outerWidth < 500) {
    const scale = window.outerWidth / 500;
    document.getElementById('viewport').setAttribute('content', `width=device-width, initial-scale=${scale} maximum-scale=${scale} user-scalable=no`);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  scaleViewport();

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
    if (music.paused || !music.currentTime)
      music.play();

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

window.addEventListener('resize', scaleViewport);