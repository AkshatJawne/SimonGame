var buttonColors = ["red", "blue", "green", "yellow"];
var gamePatterns = [];
var userClickedPattern = [];
var levelNum = 0;
var gamePlaying = false

$(document).keypress(function () {
  if (!gamePlaying) {
    $("#level-title").text("Level 0");
    nextSequence();
    gamePlaying = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer (currentLevel) {

  if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePatterns.length) {

      setTimeout (function () {
        nextSequence ();
      }, 1500);

    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")

    setTimeout (function () {
      $("body").removeClass("game-over");
    }, 5000);
    startOver();
  }

}

function nextSequence () {

  userClickedPattern = [];
  levelNum++;

  $("#level-title").html("Level " + levelNum);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePatterns.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
}


function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress (currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout (function () {
    $(".btn").removeClass("pressed");
  }, 100)

}

function startOver () {
  levelNum = 0;
  gamePatterns = [];
  gamePlaying = false;
}
