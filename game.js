// 💖 LARGE QUESTION BANK
let quizQuestions = [
  "What do I love most?",
  "Who is my favorite person?",
  "What makes me happy?",
  "What do I miss the most?",
  "Who is always in my mind?",
  "What do I want right now?",
  "Who completes me?",
  "What is my happiness?",
  "What do I think about daily?",
  "Who is my world?",
  "What do I need the most?",
  "Who makes me smile?",
  "What is my comfort?",
  "Who do I love endlessly?",
  "Who is my everything?"
];
// 💖 LARGE DARE LIST
let dares = [
  "Send a selfie 😘",
  "Say I love you ❤️",
  "Call me now 📞",
  "Send voice note 🎤",
  "Send your current pic 📸",
  "Say something romantic 💖",
  "Send a hug emoji 🤗",
  "Tell me a secret 😏",
  "Say my name 5 times 😍",
  "Send a cute message 💌",
  "Describe me in one word 💖",
  "Say why you love me ❤️",
  "Send a funny selfie 😂",
  "Type 'I miss you' 3 times 😘"
];
// 💖 WHEEL OPTIONS
let wheelOptions = [
  "Send selfie 😘",
  "Call me 📞",
  "Say I love you ❤️",
  "Send cute msg 💖",
  "Send hug emoji 🤗",
  "Tell me secret 😏",
  "Say my name 😍",
  "Send voice note 🎤",
  "Send heart spam ❤️❤️❤️",
  "Tell me why you love me 💞"
];

// 💖 OPTIONS POOL
let quizOptions = [
  ["You ❤️", "Food 😄"],
  ["You 💖", "Friends"],
  ["You 😊", "Sleep 😴"],
  ["You 😘", "Phone 📱"],
  ["You 💞", "Games 🎮"]
];
// ❤️ HEART GAME
function startHeartGame() {
  let area = document.getElementById("gameArea");
  area.innerHTML = "<p>Score: <span id='score'>0</span></p>";
  let score = 0;

  function spawn() {
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random()*90 + "%";
    heart.style.top = "0px";

    heart.onclick = () => {
      score++;
      document.getElementById("score").innerText = score;
      heart.remove();
    };

    area.appendChild(heart);

    let fall = setInterval(()=>{
      heart.style.top = (parseInt(heart.style.top)+5)+"px";
      if(parseInt(heart.style.top)>250){
        heart.remove();
        clearInterval(fall);
      }
    },50);

    setTimeout(spawn,800);
  }

  spawn();
}

// 💋 KISS GAME
function startKissGame() {
  let area = document.getElementById("gameArea");
  area.innerHTML = "<p>Score: <span id='score'>0</span></p>";
  let score = 0;

  function spawn() {
    let kiss = document.createElement("div");
    kiss.innerHTML = "💋";
    kiss.style.position = "absolute";
    kiss.style.left = Math.random()*90 + "%";
    kiss.style.top = "0px";

    kiss.onclick = () => {
      score++;
      document.getElementById("score").innerText = score;
      kiss.remove();
    };

    area.appendChild(kiss);

    let fall = setInterval(()=>{
      kiss.style.top = (parseInt(kiss.style.top)+5)+"px";
      if(parseInt(kiss.style.top)>250){
        kiss.remove();
        clearInterval(fall);
      }
    },50);

    setTimeout(spawn,700);
  }

  spawn();
}

// 🧠 QUIZ
function startQuiz() {

  // pick random question
  let q = quizQuestions[Math.floor(Math.random()*quizQuestions.length)];

  // pick random options
  let opt = quizOptions[Math.floor(Math.random()*quizOptions.length)];

  let fullQ = q + "\n1." + opt[0] + "\n2." + opt[1];

  let ans = prompt(fullQ);

if(ans === "1") {
  alert("Correct ❤️");
  loveResponse();
}
else {
  alert("Wrong 😄 but still love you ❤️");
}
}
// 💖 RANDOM LOVE RESPONSE
function loveResponse(){
  let lines = [
    "You are my everything 💖",
    "I miss you so much 😘",
    "You complete me ❤️",
    "Life is better with you 💞"
  ];

  alert(lines[Math.floor(Math.random()*lines.length)]);
}

// 🎲 DARE
function startDare() {

  let dare = dares[Math.floor(Math.random()*dares.length)];

  alert("💖 Dare: " + dare);
}
// 🎡 SPIN WHEEL
function spinWheel() {

  let wheel = document.getElementById("wheel");
  let sound = document.getElementById("spinSound");

  // 🔊 PLAY SOUND
  sound.currentTime = 0;
  sound.play().catch(()=>{});

  // 🎡 RANDOM ROTATION
  let deg = Math.floor(Math.random() * 3600) + 1000;

  wheel.style.transform = "rotate(" + deg + "deg)";

  // 🎯 FINAL RESULT AFTER SPIN
  setTimeout(() => {

    let result = wheelOptions[Math.floor(Math.random()*wheelOptions.length)];

    document.getElementById("gameArea").innerHTML += 
      "<h3>🎉 Result: " + result + "</h3>";

  }, 2000);
}

// 😊 GUESS MOOD
function guessMood() {
  let ans = prompt("Guess my mood\n1.Happy 😊\n2.Sad 😔");

  if(ans == "1") alert("Yes I'm happy because of you ❤️");
  else alert("No 😄 but you matter ❤️");
}

// 💬 COMPLETE SENTENCE
function completeSentence() {
  let ans = prompt("I love you more than ______");

  alert("Aww ❤️ " + ans + " is cute!");
}

// ⚡ TAP SPEED GAME
function tapGame() {
  let area = document.getElementById("gameArea");
  let count = 0;

  area.innerHTML = "<button id='tapBtn'>Tap Fast!</button><p id='score'></p>";

  let btn = document.getElementById("tapBtn");

  btn.onclick = () => {
    count++;
    document.getElementById("score").innerText = count;
  };

  setTimeout(()=>{
    alert("Time up! Score: " + count);
  },5000);
}