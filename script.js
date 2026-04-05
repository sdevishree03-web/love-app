let messageCount = 0;

var firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "love-chat.firebaseapp.com",
  databaseURL: "https://love-chat-556d7-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

let username = prompt("Enter your name");
let profilePic = "images/bg1.jpg";

/* 💖 TYPEWRITER */
let message = "This is our little world ❤️\nWhere every message is a memory 💖\nEvery moment is ours ✨";
let typeIndex = 0;

function typeEffect(){
  let el = document.getElementById("typeText");
  if(!el) return;

  if(typeIndex < message.length){
    el.innerHTML += message.charAt(typeIndex) === "\n" ? "<br>" : message.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeEffect, 50);
  }
}

/* 🔥 PAGE LOAD */
window.onload = function(){

  // 💞 COUPLE NAMES
  let yourName = "Devishree";
  let partnerName = "Abhiraj";

  let nameEl = document.getElementById("coupleNames");
  if(nameEl){
    nameEl.innerText = yourName + " 💖 " + partnerName;
  }

  
  // 💖 START TYPEWRITER (FIXED)
  setTimeout(()=>{
    typeEffect();
  },300);
};

/* 🎵 INTRO */
function enterApp(){

  let music = document.getElementById("bgMusic");

  if(music){
    music.volume = 0;
    music.play().catch(()=>{});

    let vol = 0;
    let fade = setInterval(()=>{
      if(vol < 1){
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    },200);
  }

  document.getElementById("introScreen").style.display = "none";
}

/* 🌙 DARK MODE */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* NAV */
function goGame(){ window.location.href="game.html"; }
function goChat(){ location.reload(); }

/* 🎵 MUSIC */
function toggleMusic(){
  let m=document.getElementById("bgMusic");
  if(m) m.paused ? m.play() : m.pause();
}

function changeVolume(s){
  let m = document.getElementById("bgMusic");
  if(m) m.volume = s.value;
}

/* 💬 SEND MESSAGE */
function sendMessage(){
  let input = document.getElementById("messageInput");
  let msg = input.value;

  if(!msg){
    alert("Type message!");
    return;
  }

  db.ref("messages").push({
    text: msg,
    sender: username,
    seen: false
  });

  input.value="";

  messageCount++;

  if(messageCount === 5){
    alert("💖 Surprise! You unlocked a secret message 💌");
    alert("You are the best thing in my life ❤️");
  }
}

/* ❤️ HEART */
function sendLove(){
  db.ref("messages").push({
    text: "❤️",
    sender: username,
    seen: false
  });
}

/* 📩 RECEIVE MESSAGE */
db.ref("messages").on("child_added", snap=>{
  let data=snap.val();
  let box=document.getElementById("chatBox");

  let div=document.createElement("div");
  div.className="message "+(data.sender===username?"me":"other");

  let tick = data.seen ? "✔✔" : "✔";

  div.innerHTML = `<span class="msgText"></span>
  <span class="tick">${tick}</span>`;

  let text = data.text || "";
  let i = 0;
  let span = div.querySelector(".msgText");

  let typing = setInterval(()=>{
    if(i < text.length){
      span.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  },20);

  box.appendChild(div);
  box.scrollTop=box.scrollHeight;

  snap.ref.update({seen:true});
});

/* 💌 LETTERS */
function openLetter(type){
  let msg="";

  if(type==="sad") msg="I'm always here for you ❤️ ,Unaku na yeppoyum erupan d thangoo no matter how worst it turns always remeber your girl is always with you no matter what ,and kovam padatha kind aa eru ,namnba yepdi erukum oo adhu dha nambaku vandhu serum so always choose kindness ,sogam aa erutha enkitta odi vandhuru dont think u dont have anyone at any costedhuna probelm na first enna nu understand panniko aprm react pannu okay aa d thangoo remember ALWAYS YOUR GIRL IS THERE FOR YOU ,LOTS OF LOVE FROM UR BONDA ❤️";
  else if(type==="miss") msg="I miss you more   enaiya miss panuuriya para na la kannuku therira na okay okay tension agatha d thangoo summa kindal panna d thangoo nanum unaiya romba miss pannuren onnum illa lite aa kovam nee cl or text pannitae eru na vandhuruven ana pannama erutha innum kovam paduven solliten nga sirrrr i miss you so so so much thangameeeee ellam seri agi unkitta vandhuren LOVE YOU D THANGAMAEEEEEEE 💖";
  else if(type==="happy") msg="Your happiness is my happiness Enala dha happy aa erukan nu theriyum ana en life la happy aa erukanum nu romba romba pray pannura person la nee dha frst d thangamee i always want u to see happy i wish nee asa padurs ellam unkitta varum odanae nee dha venum nu sollatha enaiya vitu solluren happy aa eru d thangameee STAY HAPPY STAY CUTE BE KIND AND DONT FORGET TO LOVE ME MORE LOTS AND LOTS OF LOVE FROM YOUR THANGAPULLAAAAA❤️";

  document.getElementById("letterText").innerText=msg;
}

/* 🎤 VOICE */
let mediaRecorder;
let audioChunks=[];

function startRecording(){
  navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream=>{
    mediaRecorder=new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable=e=>{
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop=()=>{
      let blob=new Blob(audioChunks);
      let url=URL.createObjectURL(blob);

      db.ref("messages").push({
        audio:url,
        sender:username
      });

      audioChunks=[];
    };

    setTimeout(()=>mediaRecorder.stop(),3000);
  });
}