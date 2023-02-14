var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var userLevel = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    userLevel = 0;
}

function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
    console.log(this.id);
    /* var userChosenColour = this.id; outra forma de escrever a linha 19 */
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (gameStarted) {
      checkAnswer(userLevel++);
    }

});

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel == level) {
      console.log("acertou");
      level++;
      setTimeout(function () {
        nextSequence();
      }, 1000);

    } 
  } else {
        console.log("errou");
        gameStarted = false;
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over. Aperte uma tecla para recomeçar");
        startOver();
  }
  }

  function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
    userLevel = 0;
  }

/* 

1. Create a new function called startOver().

2. Call startOver() if the user gets the sequence wrong.

3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.




*/ 