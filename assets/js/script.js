// This is the opening display panel
let openDisp = document.querySelector(".opening");
let startBtn = document.querySelector(".startButton");
let main = document.querySelector("main");
let header = document.querySelector("header");
let quizDisp = document.querySelector(".quiz");
let answersDisp = document.querySelector("answers");
let submitBtn = document.querySelector(".submit");

// timer variables - need accessed from multiple functions
let timer;
let timeLeft;

// question variabes
let questionNum;

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitHighscore);

function startQuiz() {
  // local variables

  //initialize other variables
  questionNum = 0;
  timeLeft = 50;

  // hide .openingPanel and display header and .quizPanel
  openDisp.setAttribute("style", "display: none");
  main.setAttribute("style", "margin-top: none");
  header.setAttribute("style", "visibility: visible");
  quizDisp.setAttribute("style", "display: block");

  //enter questions to site

  // pick questions

  // display screen
  displayTimer(timeLeft);
  countdown();

  // start for loop
  displayQuestion(
    questionNum,
    "This is the question's text\nand this is the second line."
  );
  //end for loop

  displayGameOver(false);
  //function of site has been passed to displayGameOver()
}

function displayGameOver(outOfTime) {
  clearInterval(timer);
  // quizDisp.setAttribute("style","display: none");
}

// from class work 04.10-Stu_Timers-Intervals
function countdown() {
  console.log("countdown");
  // call a function to be executed every 1000 milliseconds
  timer = setInterval(function () {
    timeLeft--;
    console.log(timeLeft);

    displayTimer(timeLeft);

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timer);
      // Calls function to display the end of game
      displayGameOver(true);
    }
  }, 1000);
}

// populates the timer on the screen
// ToDo: make this display minutes and seconds
function displayTimer(timeLeft) {
  console.log("displayTimer");
  let timerEl = document.querySelector(".timer");

  if (timeLeft !== 1) {
    timerEl.textContent = timeLeft + " seconds";
  } else {
    timerEl.textContent = timeLeft + " second";
  }
  return;
}

function displayQuestion(qNum, qText) {
  // add 1 to qNum because it is an index, so it starts count at 0
  document.querySelector("#questionNum").innerHTML = qNum + 1 + ".";
  document.querySelector("#questionText").innerHTML = qText;
}

/* This will create a div for the Game Over screen that will update the questions solved and the time taken. */
function createHighScoreDiv() {
  // set scores
  document.querySelector("#qAnswered").innerHTML = questionNum;
  // ToDo: show as min/sec
  document.querySelector("#timeTaken").innerHTML = timeLeft;

  // if (on highscore list) {
  //   document
  //     .querySelector(".gotHighScore")
  //     .setAttribute("style", "display: block");
  // }
}
