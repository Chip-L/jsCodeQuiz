// This is the opening display panel
let openDisp = document.querySelector(".opening");
let startBtn = document.querySelector(".startButton");
let main = document.querySelector("main");
let header = document.querySelector("header");
let quizDisp = document.querySelector(".quiz");
let answersDisp = document.querySelector("answers");

// timer variables - need accessed from multiple functions
let timer;
let timeLeft;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  // local variables
  let questionNum = 0;

  //initialize other variables
  timeLeft = 50;

  // hide .openingPanel and display header and .quizPanel
  openDisp.setAttribute("style", "display: none");
  main.setAttribute("style", "margin-top: none");
  header.setAttribute("style", "visibility: visible");
  quizDisp.setAttribute("style", "display: block");

  //enter questions to site

  // pick questions

  displayQuestion(
    questionNum,
    "This is the question's text\nand this is the second line."
  );

  countdown();
}

// from class work 04.10-Stu_Timers-Intervals
function countdown() {
  let timerEl = document.querySelector(".timer");

  // call a function to be executed every 1000 milliseconds
  timer = setInterval(function () {
    timeLeft--;
    if (timeLeft !== 1) {
      timerEl.textContent = timeLeft + " seconds";
    } else {
      timerEl.textContent = timeLeft + " second";
    }

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timer);
      // Calls function to display the end of game
      displayGameOver(true);
    }
  }, 1000);
}

function displayQuestion(qNum, qText) {
  // add 1 to qNum because it is an index, so it starts count at 0
  document.querySelector("#questionNum").textContent = qNum + 1 + ".";
  document.querySelector("#questionText").textContent = qText;
}

function displayGameOver(outOfTime) {
  // if(!outOfTime) {
  clearInterval(timer);
  // }
  // quizDisp.setAttribute("style","display: none");
}
