const $levels = {"easy": 3, "medium": 5, "hard": 7}; 
const $levelNumber = { 3: 'easy', 5: 'medium', 7: 'hard' };
const $imgWidth = 100; // mole's width 
const $imgHeight = 80; // mole's height
const $imgsTheme = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" };
const $gameMoment = { "start": "beginning", "end": "ending" };
const $initialTime = 10;
let $saveRankError; 
var $timeGame = $initialTime; // Game time
var $idChronoGame; // controls Chrono setInterval
var $idChronoStartGame;
var $currentLevel = $levels['medium']; 

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

  $("#btnLevel").click(function() {
    $("#level-modal").css("display", "block");
    $("#endgame").css("display", "none");
    $("#level-selection").css("display", "flex");
  });

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
  $(".backdrop").click(function() {
    $("#level-modal").css("display", "none");
    $("#endgame").css("display", "none");
    $("#level-selection").css("display", "none");
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
  if($timeGame < 5){
    timerNearEnd()
  }
  ($timeGame >= 0)?$("#chrono").text($secondsFormat):endGame();
}

function endGame() {
  $("#chrono").css("animation", "");
  clearIntervals()
  saveScore();
}

function saveRankError() {
  if ($saveRankError) {
    $("#saveRankError").text($saveRankError);
  } 

  $timeGame = $initialTime;
  createRank();
  $("#score").text("0");
  $("#chrono").text($timeGame);
  btnCtrl($gameMoment.end);
}

function selectLevel(level) {
  $("#level-modal").css("display", "none");
  $currentLevel = $levels[level];
  fillBoard()
}

// create board (box) according difficulty level
function fillBoard() {
  const $level = $currentLevel; 
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
    $img.attr('draggable', false);
    $($img).click(function(){updateScore(this)});
    $($div).append($img);
  
    $("#board").append($div); 
  }
}

function startGame() {
  const $level = $currentLevel; 
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

function updateScore($img) {
  if($($img).attr("src").search($imgsTheme.active) != -1) {
    $("#score").html(Number($("#score").text())+1);
    $($img).attr("src", `img/${$imgsTheme.dead}`)
  }
}

function saveScore() {
  const user = JSON.parse(localStorage.getItem('user'));
  const url = 'http://localhost:8080/rank/saveRank';

  const level = $levelNumber[$currentLevel];

  const payload = {
    score: $("#score").text(),
    level,
    user
  }

  axios.post(url, payload)
    .then(s => { return saveRankError() })
    .catch(e => {
      if(e.response) {
        const { data } = e.response;
        $saveRankError = data;
      }
      return saveRankError();
    });
}

function createRank() {
  $("#player-score").html($("#score").text())
  let $tbody = $("#data-table");             
  $tbody.empty();
  
  const level = $levelNumber[$currentLevel];
  $.getJSON(`http://localhost:8080/rank/l=${level}`,         
  function ($ranks) {             
    for ($i = 0; $i < $ranks.length; $i++) {                 
      $tbody.append($('<tr>')                 
        .append($('<td>').text($ranks[$i].score))                
        .append($('<td>').text($ranks[$i].user.user))                 
        .append($('<td>').text($ranks[$i].level)));
      }         
    }); 
    $("#level-modal").css("display", "block");
    $("#level-selection").css("display", "none");
    $("#endgame").css("display", "flex");
}
 
function timerNearEnd() {
  $("#chrono").css("animation", "timer 1s ease infinite");
} 

// async function service(url, payload) {
//   const response = await axios.post(url, payload);
//   return response;
// }