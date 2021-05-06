const $levels = {"easy": 3, "medium": 5, "hard": 7}; 
const $imgWidth = 100; // mole's width 
const $imgHeight = 80; // mole's height
const $imgsTheme = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" };
const $gameMoment = { "start": "beginning", "end": "ending" };
const $initialTime = 10;
var $timeGame = $initialTime; // Game time
var $idChronoGame; // controls Chrono setInterval
var $idChronoStartGame;

$(document).ready(function() {
  $("#chrono").text($timeGame);
  fillBoard();
  $("#btnPlay").click(
    function(){
      btnCtrl($gameMoment.start);
      $idChronoStartGame = setInterval(startGame, 1180);
      $idChronoGame = setInterval(startChronoGame, 1000);
    }
  );

  $("#btnPause").click(function(){
    clearIntervals();
    btnCtrl($gameMoment.end);
  });
  $("#btnStop").click(function(){
    endGame();
  });
  $("#btnExit").click(function(){
    window.location.replace("./login/index.html");
  });

});

function btnCtrl(gameMoment) {
  const isBegin = (gameMoment === $gameMoment.start) ? true : false; 

  $("#btnPause").prop("disabled", !isBegin);
  $("#btnStop").prop("disabled", !isBegin);
  $("#btnPlay").prop("disabled", isBegin);
}

function startChronoGame() {
  let $secondsFormat = (--$timeGame).toLocaleString("pt-br", {minimumIntegerDigits: 2});
  ($timeGame >= 0)?$("#chrono").text($secondsFormat):endGame();
}

function endGame() {
  clearIntervals()
  alertWifi(`Fim de jogo. Sua pontuação foi ${$("#score").text()}`, false, 0, `./img/${$imgsTheme.default}`, "50")
  $timeGame = $initialTime;
  $("#score").text("0");
  $("#chrono").text($timeGame);
  btnCtrl($gameMoment.end);
}

// create board (box) according difficulty level
function fillBoard() {
  const $level = getLevel(); 
  let $boardWidth = $imgWidth * $level; 
  let $boardHeight = $imgHeight * $level; 

  $("#board").css({"width": $boardWidth, "height": $boardHeight});

  placeBoardHoles($level); 
}

// Insert mole's holes into the board
function placeBoardHoles($level) {
  $("#board").empty();

  for($i = 0; $i < Math.pow($level, 2); $i++){
    let $div = $("<div></div>"); 
    let $img = $("<img>").attr({"src": `./img/${$imgsTheme.default}`, "id": `mole-${$i+1}`});
    $($img).click(function(){updateScore(this)});
    $($div).append($img);
  
    $("#board").append($div); 
  }
}

function startGame() {
  const $level = getLevel(); 
  $randNumber = getRandomNumber(1, Math.pow($level, 2));
  $(`#mole-${$randNumber}`).attr("src", `./img/${$imgsTheme.active}`);
  setTimeout(() => {
    $(`#mole-${$randNumber}`).attr("src", `./img/${$imgsTheme.default}`)
  }, 1000);
}

function clearIntervals() {
  clearInterval($idChronoStartGame);
  clearInterval($idChronoGame);
}

// generate a random number between "min" e "max"
function getRandomNumber(min, max) {
  return Math.round((Math.random() * Math.abs(max - min)) + min);
}

// returns the number corresponding to the difficulty level
function getLevel() {
  return $levels[$("#level").val()]; 
}

function updateScore($img) {
  if($($img).attr("src").search($imgsTheme.active) != -1) {
    $("#score").html(Number($("#score").text())+1);
    $($img).attr("src", `img/${$imgsTheme.dead}`)
  }
}