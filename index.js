import GameManager from "./src/GameManager.js";

function createGameSpace(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  document.body.style.display = "flex";
  document.body.style.placeContent = "center";

  document.body.appendChild(canvas);
  return [canvas, canvas.getContext("2d")];
}

// Create canvas
const [canvas, ctx] = createGameSpace(620, window.innerHeight-1);

const game = new GameManager(canvas);

document.querySelector("#lives").innerHTML = "❤️❤️❤️";
document.querySelector("#highScore").innerHTML = localStorage.getItem("RaceCarHighScore")

game.start();

game.setOnLifeChange(displayer);

//for displaying lives
function displayer(life) {
  let lifeStr = "";
  for (let i = 0; i < life; i++) {
    lifeStr += "❤️";
  }
  document.querySelector("#lives").innerHTML = lifeStr;
}

game.setOnScoreChange((score) => {
  document.querySelector("#score").innerHTML = score;
});

game.setOnGameOver((score)=>{
  const scoreValue = localStorage.getItem("RaceCarHighScore") || 0
  if (scoreValue < score) {
    localStorage.setItem("RaceCarHighScore", score);
  }
  alert("YOU LOST :(")
  window.location.reload()
})
