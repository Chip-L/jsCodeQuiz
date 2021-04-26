// this ugly block of text is the json object to be parsed into the question array. I had to hack my way around this for some reason I can't use \n or \" so \n==**n \" = |
let JS_Obj =
  '{"list":[{"question":"Inside which HTML element do we put the JavaScript?", "answerOptions":["<javascript>", "<script>", "<scripting>", "<js>"], "realAnswer":"<script>", "userAnswer":null}, {"question":"What is the correct JavaScript syntax to change the content of the HTML element below?**n**n<p id = |demo|>This is a demonstration.</p>", "answerOptions":["documentgetElement(|p|).innerHTML = |Hello World!|;", "document.getElementByld(|demo|).innerHTML = |Hello World!|;", "document.getElementByName(|p|).innerHTML = |Hello World!|;", "#demo.innerHTML = |Hello World!|;"], "realAnswer":"document.getElementByld(|demo|).innerHTML = |Hello World!|;", "userAnswer":null}, {"question":"Where is the correct place to insert a JavaScript?", "answerOptions":["The <body> section", "The <head> section", "Both the <head> section and the <body> section are correct"], "realAnswer":"Both the <head> section and the <body> section are correct", "userAnswer":null}, {"question":"What is the correct syntax for referring to an external script called |xxx.js|?", "answerOptions":["<script src=|xxx.js|>", "<script href= |xxx.js|>", "<script name=|xxx.js|>"], "realAnswer":"<script src=|xxx.js|>", "userAnswer":null}, {"question":"The external JavaScript file must contain the <script> tag.", "answerOptions":["True", "False"], "realAnswer":"False", "userAnswer":null}, {"question":"How do you write |Hello World| in an alert box?", "answerOptions":["alert(|Hello World|);", "msg(|Hello World|);", "alertBox(|Hello World|);", "msgBox(|Hello World|);"], "realAnswer":"alert(|Hello World|);", "userAnswer":null}, {"question":"How do you create a function in JavaScript?", "answerOptions":["function myFunction()", "function = myFunction()", "function:myFunction()"], "realAnswer":"function myFunction()", "userAnswer":null}, {"question":"How do you call a function named |myFunction|?", "answerOptions":["call myFunction()", "call function myFunction()", "myFunction()"], "realAnswer":"myFunction()", "userAnswer":null}, {"question":"How to write an IF statement in JavaScript?", "answerOptions":["if (i == 5)", "if i = 5 then", "if i == 5 then", "if i = 5"], "realAnswer":"if (i == 5)", "userAnswer":null}, {"question":"How to write an IF statement for executing some code if |i| is NOT equal to 5?", "answerOptions":["if (i != 5)", "if i <> 5", "if i =! 5 then", "if (i <> 5)"], "realAnswer":"if (i != 5)", "userAnswer":null}, {"question":"How does a WHILE loop start?", "answerOptions":["while (i <= 10; i++)", "while i = 1 to 10", "while (i <= 10)"], "realAnswer":"while (i <= 10)", "userAnswer":null}, {"question":"How does a FOR loop start?", "answerOptions":["for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)"], "realAnswer":"for (i = 0; i <= 5; i++)", "userAnswer":null}, {"question":"How can you add a comment in a JavaScript?", "answerOptions":["\'This is a comment", "<!—This is a comment— >", "//This is a comment"], "realAnswer":"//This is a comment", "userAnswer":null}, {"question":"How to insert a comment that has more than one line?", "answerOptions":["<!—This comment has**nmore than one line—>", "/*This comment has**nmore than one line*/", "//This comment has**nmore than one line//"], "realAnswer":"/*This comment has**nmore than one line*/", "userAnswer":null}, {"question":"What is the correct way to write a JavaScript array?", "answerOptions":["var colors = 1 = (|red|), 2 = (|green|), 3 = (|blue|)", "var colors = [|red|, |green|, |blue|]", "var colors = |red|, |green|, |blue|", "var colors = (1:|red|, 2:|green|, 3:|blue|)"], "realAnswer":"var colors = [|red|, |green|, |blue|]", "userAnswer":null}, {"question":"How do you round the number 7.25, to the nearest integer?", "answerOptions":["Math.rnd(7.25)", "Math.round(7.25)", "rnd(7.25)", "round(7.25)"], "realAnswer":"Math.round(7.25)", "userAnswer":null}, {"question":"How do you find the number with the highest value of x and y?", "answerOptions":["top(x, y)", "Math.max(xf y)", "Math.ceilfx, y)", "ceil(x, y)"], "realAnswer":"Math.max(xf y)", "userAnswer":null}, {"question":"What is the correct JavaScript syntax for opening a new window called |w2|?", "answerOptions":["w2 = window.open(|http://www.w3schools.com|);", "w2 = window.new(|http://www.w3schools.com|);"], "realAnswer":"w2 = window.open(|http://www.w3schools.com|);", "userAnswer":null}, {"question":"JavaScript is the same as Java.", "answerOptions":["True", "False"], "realAnswer":"False", "userAnswer":null}, {"question":"How can you detect the client\'s browser name?", "answerOptions":["navigator.appName", "client.navName", "browser.name"], "realAnswer":"navigator.appName", "userAnswer":null}, {"question":"Which event occurs when the user clicks on an HTML element?", "answerOptions":["onclick", "onchange", "onmouseover", "onmouseclick"], "realAnswer":"onclick", "userAnswer":null}, {"question":"How do you declare a JavaScript variable?", "answerOptions":["variable carName;", "var carName;", "V carName;"], "realAnswer":"var carName;", "userAnswer":null}, {"question":"Which operator is used to assign a value to a variable?", "answerOptions":["-", "X", "=", "*"], "realAnswer":"=", "userAnswer":null}, {"question":"What will the following code return: Boolean(10 > 9)", "answerOptions":["NaN", "True", "False"], "realAnswer":"True", "userAnswer":null}, {"question":"JavaScript is case-sensitive.", "answerOptions":["True", "False"], "realAnswer":"True", "userAnswer":null}]} ';

// make panels and other items universally accessible
let header = document.querySelector("header");
let openDisp = document.querySelector(".opening");
let quizDisp = document.querySelector(".quiz");
let endOfGameDisp = document.querySelector(".endGame");
let highScoreDisp = document.querySelector(".highScore");

// timer variables - need accessed from multiple functions
let timeAllowed = 500; // this is in seconds
let timePenalty = 15; // this is in seconds
let timer;
let timeLeft;

// question variabes
let questionList;
let questionNum;
let correctCount;

// assign events to buttons on start page
document.querySelector("#openingStart").addEventListener("click", startQuiz);
document
  .querySelector("#openingHighScore")
  .addEventListener("click", displayHighScores);
document.querySelector("#timePenalty").textContent = timePenalty;

// ensure proper screens (and header) are displayed for each panel
function showScreen(screenName) {
  switch (screenName) {
    // no opening screen-it is only reached on load.
    case "Quiz":
      openDisp.setAttribute("style", "display: none");
      header.setAttribute("style", "visibility: visible");
      quizDisp.setAttribute("style", "display: block");
      endOfGameDisp.setAttribute("style", "display: none");
      highScoreDisp.setAttribute("style", "display: none");
      break;

    case "GameOver":
      openDisp.setAttribute("style", "display: none");
      quizDisp.setAttribute("style", "display: none");
      header.setAttribute("style", "visibility: visible");
      endOfGameDisp.setAttribute("style", "display: flex");
      highScoreDisp.setAttribute("style", "display: none");
      break;

    case "HighScore":
      openDisp.setAttribute("style", "display: none");
      header.setAttribute("style", "visibility: hidden");
      quizDisp.setAttribute("style", "display: none");
      endOfGameDisp.setAttribute("style", "display: none");
      highScoreDisp.setAttribute("style", "display: block");
      break;
    default:
      console.log("Error: ShowScreen switch has wrong name");
  }
}

function setTime() {
  // call a function to be executed every 1000 milliseconds
  timer = setInterval(function () {
    timeLeft--;

    displayTimer(timeLeft);

    // check less than - penalty can move it below 0
    if (timeLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timer);
      timeLeft = 0;
      displayTimer(timeLeft);
      // Calls function to display the end of game
      displayGameOver();
    }
  }, 1000);
}

// populates the timer on the screen
// ToDo: make this display minutes and seconds
function displayTimer(timeLeft) {
  // console.log("displayTimer");
  let timerEl = document.querySelector(".timer");

  if (timeLeft !== 1) {
    timerEl.textContent = timeLeft + " seconds";
  } else {
    timerEl.textContent = timeLeft + " second";
  }
  return;
}

function startQuiz() {
  //initialize variables
  questionNum = 0;
  correctCount = 0;
  timeLeft = timeAllowed;

  showScreen("Quiz");

  //enter questions to site
  let question = JSON.parse(JS_Obj); // reads in an array "list"
  questionList = question.list; // eliminate array "list"
  // fix placeholders
  for (let i = 0; i < questionList.length; i++) {
    questionList[i].question = questionList[i].question
      .replaceAll("**n", "\n")
      .replaceAll("|", '"');
    for (let j = 0; j < questionList[i].answerOptions.length; j++) {
      questionList[i].answerOptions[j] = questionList[i].answerOptions[j]
        .replaceAll("**n", "\n")
        .replaceAll("|", '"');
    }
    questionList[i].realAnswer = questionList[i].realAnswer
      .replaceAll("**n", "\n")
      .replaceAll("|", '"');
  }

  // ToDo: shuffle questions

  // display screen
  displayTimer(timeLeft);
  setTime();

  // Pass functionality to displayQuestion which will set up the iteration through the questions
  displayQuestion();
}

function displayQuestion() {
  let answerList = document.querySelector(".quiz ul.answers");

  //clear the last question's list:
  answerList.innerHTML = "";

  // add question
  // add 1 to questionNum because it is an index, so it starts count at 0
  document.querySelector("#questionNum").textContent = questionNum + 1 + ".";
  // can't use innerHTML here because I'm actually displaying HTML text in questions and that will cause the element to actually display.
  document.querySelector("#questionText").textContent =
    questionList[questionNum].question;

  // add list items
  for (let i = 0; i < questionList[questionNum].answerOptions.length; i++) {
    let newLi = document.createElement("li");
    newLi.textContent = questionList[questionNum].answerOptions[i];
    newLi.setAttribute("class", "button");
    newLi.setAttribute("id", "answer" + i);
    answerList.appendChild(newLi);
    answerList.children[i].addEventListener("click", displayNextQuestion);
  }
}

let checkAnswer = (qNum) =>
  questionList[qNum].userAnswer === questionList[qNum].realAnswer;

// this is called when the answer is submitted and will go back to the display anwer
function displayNextQuestion(event) {
  // record the user's answer
  questionList[questionNum].userAnswer = event.toElement.innerText;

  // check for penalty
  if (checkAnswer(questionNum)) {
    correctCount++;
  } else {
    timeLeft -= timePenalty;
  }

  // get next question
  // question list is 1 behind actual display position. when I get to the last item, I displayed 25 but questionNum == 24 after recording questionNum 25's answer, go to game over screen
  questionNum++;
  if (questionNum < questionList.length) {
    // console.log("click exit:" + questionNum);
    displayQuestion();
  } else {
    displayGameOver();
  }
}

function displayGameOver() {
  clearInterval(timer);
  showScreen("GameOver");

  let score = Math.round((correctCount / questionList.length) * 100);
  let totalQsMsg = "";
  let timeRemainingMsg = "";

  // set messages
  if (correctCount === questionList.length) {
    totalQsMsg = "Wow! You got all " + questionList.length + " correct!";

    if (timeLeft > 0) {
      timeRemainingMsg = "You even had " + timeLeft + " remaining!";
    }
  } else {
    totalQsMsg =
      "Keep working! You got " +
      correctCount +
      " out of " +
      questionList.length +
      " correct.";
  }

  // put it on the screen
  document.querySelector("#scoreValue").textContent = score + "%";
  // console.log(totalQsMsg);
  document.querySelector("#totalQs").textContent = totalQsMsg;
  document.querySelector("#timeRemaining").textContent = timeRemainingMsg;

  document.querySelector("#gameOverStart").addEventListener("click", startQuiz);
  document
    .querySelector("#gameOverHighScore")
    .addEventListener("click", displayHighScores);
}

function displayHighScores() {
  console.log("displayHighScores");
  showScreen("HighScore");
}
