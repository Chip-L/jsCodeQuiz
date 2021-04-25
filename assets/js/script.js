// This is the opening display panel
let openDisp = document.querySelector(".openingPanel");
let startBtn = document.querySelector(".startButton");
let main = document.querySelector("main");
let header = document.querySelector("header");
let quizDisp = document.querySelector(".quizPanel");
let answersDisp = document.querySelector("answers");

// timer variables - need accessed from multiple functions
let timer;
let timeLeft = 50;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  // local variables
  let questionNum = 0;

  openDisp.setAttribute("style", "display: none");
  main.setAttribute("style", "margin-top: none");
  header.setAttribute("style", "display: flex");
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
      timerEl.textContent = timeLeft + " seconds remaing.";
    } else {
      timerEl.textContent = timeLeft + " second remaing.";
    }

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timer);
      // Calls function to display the end of game
      displayMessage();
    }
  }, 1000);
}

function displayQuestion(qNum, qText) {
  // add 1 to qNum because it is an index, so it starts count at 0
  document.querySelector("#questionNum").textContent = qNum + 1 + ".";
  document.querySelector("#questionText").textContent = qText;
}
