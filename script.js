const dragons = [
  {name:"Chimuelo", diff:"Fácil"},
  {name:"Tormenta", diff:"Medio"},
  {name:"Furia Luminosa", diff:"Difícil"},
  {name:"Furia Solar", diff:"Bonus"}
];

let level = 0;
let points = 0;
let lives = 3;
let soundOn = true;
const music = document.getElementById('battle-music');
const roar = document.getElementById('dragon-roar');

function startGame() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  if(soundOn) music.play();
  nextLevel();
}

function toggleSound() {
  soundOn = !soundOn;
  if(soundOn){ music.play(); } else { music.pause(); }
}

function generateEquation(diff) {
  let a,b,c,x1,x2;
  if(diff==="Fácil"){a=1;b=-5;c=6;x1=2;x2=3;}
  else if(diff==="Medio"){a=1;b=-3;c=2;x1=1;x2=2;}
  else if(diff==="Difícil"){a=1;b=-1;c=-6;x1=3;x2=-2;}
  else {a=2;b=-5;c=2;x1=2;x2=0.5;}

  const options = [`${x1}, ${x2}`, `${x1+1}, ${x2+1}`, `${x1-1}, ${x2-1}`].sort(()=>Math.random()-0.5);
  currentEquation = {answer:`${x1}, ${x2}`};

  document.getElementById("equation").textContent = `${a}x² + ${b}x + ${c} = 0`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected){
  if(selected===currentEquation.answer){
    points += 100;
    document.getElementById("message").textContent = "🔥 ¡Ataque exitoso!";
    document.getElementById("points").textContent = points;
    if(soundOn) roar.play();
    nextLevel();
  } else {
    lives -= 1;
    document.getElementById("message").textContent = "💀 Fallaste. El dragón te lanzó fuego.";
    document.getElementById("lives").textContent = lives;
    if(lives<=0){ alert("Juego terminado 🐉\\nPuntos: "+points); location.reload();}
  }
}

function nextLevel(){
  if(level>=dragons.length){ alert("🎉 ¡Has vencido a todos los dragones!"); location.reload(); return;}
  const dragon = dragons[level];
  document.getElementById("level-title").textContent = "Nivel " + (level+1);
  document.getElementById("dragon").textContent = dragon.name + " - Dificultad: " + dragon.diff;
  generateEquation(dragon.diff);
  level++;
}
