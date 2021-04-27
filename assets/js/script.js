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
let questionList = makeQuestionArray();
let questionNum;
let correctCount;

// assign events to buttons on start page
document.querySelector("#openingStart").addEventListener("click", startQuiz);
document
  .querySelector("#openingHighScore")
  .addEventListener("click", displayHighScores);
document.querySelector("#timePenalty").textContent = timePenalty;

function secsToMins(secs) {
  let m = Math.floor(secs / 60);
  if (m === 0) {
    m = "0";
  }
  let s = Math.floor(secs % 60);
  if (s < 10) {
    s = "0" + s;
  }

  return m + ":" + s;
}

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
function displayTimer(timeLeft) {
  // console.log("displayTimer");
  let timerEl = document.querySelector(".timer");

  timerEl.textContent = secsToMins(timeLeft);
}

function startQuiz() {
  //initialize variables
  questionNum = 0;
  correctCount = 0;
  timeLeft = timeAllowed;

  showScreen("Quiz");

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
      timeRemainingMsg = "You even had " + secsToMins(timeLeft) + " remaining!";
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

  console.log(score);
  dispGetHighScore(score);
}

let highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];

function dispGetHighScore(score) {
  console.log("get high score fn ", score);
  // check to see if high score
  //{[{"initials":"xxx", "score":1}, {...}]}
  let highScoreSection = document.querySelector("section.gotHighScore");
  let submitBtn = document.querySelector(".submit");
  let scorePosition = 11;

  console.log(highScoreList);
  if (highScoreList.length === 0) {
    scorePosition = 0;
  } else {
    for (let i = 0; i < highScoreList.length; i++) {
      if (score > highScoreList[i].score) {
        scorePosition = i;
        break;
      }
    }
  }

  console.log(scorePosition);
  if (scorePosition <= 10) {
    //get score
    highScoreSection.setAttribute("style", "display: block");
    console.log("open screen");

    submitBtn.addEventListener("click", function () {
      console.log("click submit");
      recordHighScore(scorePosition, score);
    });
  }
}

function recordHighScore(scorePosition, score) {
  console.log("record high score fn");
  let objScore = { initials: "", score: 0 };

  let initialsInput = document.querySelector("#initials");

  objScore.initials = initialsInput.value.trim();
  objScore.score = score;

  highScoreList.splice(scorePosition, 0, objScore);
  if (highScoreList.length > 10) {
    highScoreList.length = 10; // truncate to keep at 10
  }

  //display high score section to get initials
  localStorage.setItem("highScores", JSON.stringify(highScoreList));
}

function displayHighScores() {
  console.log("displayHighScores");
  showScreen("HighScore");
}

// I originally tried to do this with a JSON, but it made an  ugly block of text. Furthermore, I had to hack my way around the quotes and new lines by using placeholders: \n==**n \" = |
function makeQuestionArray() {
  qList = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answerOptions: ["<javascript>", "<script>", "<scripting>", "<js>"],
      realAnswer: "<script>",
      userAnswer: "",
    },
    {
      question:
        'What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id = "demo">This is a demonstration.</p>',
      answerOptions: [
        'documentgetElement("p").innerHTML = "Hello World!";',
        'document.getElementByld("demo").innerHTML = "Hello World!";',
        'document.getElementByName("p").innerHTML = "Hello World!";',
        '#demo.innerHTML = "Hello World!";',
      ],
      realAnswer: 'document.getElementByld("demo").innerHTML = "Hello World!";',
      userAnswer: "",
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      answerOptions: [
        "The <body> section",
        "The <head> section",
        "Both the <head> section and the <body> section are correct",
      ],
      realAnswer: "Both the <head> section and the <body> section are correct",
      userAnswer: "",
    },
    {
      question:
        'What is the correct syntax for referring to an external script called "xxx.js"?',
      answerOptions: [
        '<script src="xxx.js">',
        '<script href= "xxx.js">',
        '<script name="xxx.js">',
      ],
      realAnswer: '<script src="xxx.js">',
      userAnswer: "",
    },
    {
      question: "The external JavaScript file must contain the <script> tag.",
      answerOptions: ["True", "False"],
      realAnswer: "False",
      userAnswer: "",
    },
    {
      question: 'How do you write "Hello World" in an alert box?',
      answerOptions: [
        'alert("Hello World");',
        'msg("Hello World");',
        'alertBox("Hello World");',
        'msgBox("Hello World");',
      ],
      realAnswer: 'alert("Hello World");',
      userAnswer: "",
    },
    {
      question: "How do you create a function in JavaScript?",
      answerOptions: [
        "function myFunction()",
        "function = myFunction()",
        "function:myFunction()",
      ],
      realAnswer: "function myFunction()",
      userAnswer: "",
    },
    {
      question: 'How do you call a function named "myFunction"?',
      answerOptions: [
        "call myFunction()",
        "call function myFunction()",
        "myFunction()",
      ],
      realAnswer: "myFunction()",
      userAnswer: "",
    },
    {
      question: "How to write an IF statement in JavaScript?",
      answerOptions: [
        "if (i == 5)",
        "if i = 5 then",
        "if i == 5 then",
        "if i = 5",
      ],
      realAnswer: "if (i == 5)",
      userAnswer: "",
    },
    {
      question:
        'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
      answerOptions: [
        "if (i != 5)",
        "if i <> 5",
        "if i =! 5 then",
        "if (i <> 5)",
      ],
      realAnswer: "if (i != 5)",
      userAnswer: "",
    },
    {
      question: "How does a WHILE loop start?",
      answerOptions: [
        "while (i <= 10; i++)",
        "while i = 1 to 10",
        "while (i <= 10)",
      ],
      realAnswer: "while (i <= 10)",
      userAnswer: "",
    },
    {
      question: "How does a FOR loop start?",
      answerOptions: [
        "for (i <= 5; i++)",
        "for i = 1 to 5",
        "for (i = 0; i <= 5)",
        "for (i = 0; i <= 5; i++)",
      ],
      realAnswer: "for (i = 0; i <= 5; i++)",
      userAnswer: "",
    },
    {
      question: "How can you add a comment in a JavaScript?",
      answerOptions: [
        "'This is a comment",
        "<!—This is a comment— >",
        "//This is a comment",
      ],
      realAnswer: "//This is a comment",
      userAnswer: "",
    },
    {
      question: "How to insert a comment that has more than one line?",
      answerOptions: [
        "<!—This comment has\nmore than one line—>",
        "/*This comment has\nmore than one line*/",
        "//This comment has\nmore than one line//",
      ],
      realAnswer: "/*This comment has\nmore than one line*/",
      userAnswer: "",
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      answerOptions: [
        'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        'var colors = ["red", "green", "blue"]',
        'var colors = "red", "green", "blue"',
        'var colors = (1:"red", 2:"green", 3:"blue")',
      ],
      realAnswer: 'var colors = ["red", "green", "blue"]',
      userAnswer: "",
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      answerOptions: [
        "Math.rnd(7.25)",
        "Math.round(7.25)",
        "rnd(7.25)",
        "round(7.25)",
      ],
      realAnswer: "Math.round(7.25)",
      userAnswer: "",
    },
    {
      question: "How do you find the number with the highest value of x and y?",
      answerOptions: [
        "top(x, y)",
        "Math.max(xf y)",
        "Math.ceilfx, y)",
        "ceil(x, y)",
      ],
      realAnswer: "Math.max(xf y)",
      userAnswer: "",
    },
    {
      question:
        'What is the correct JavaScript syntax for opening a new window called "w2"?',
      answerOptions: [
        'w2 = window.open("http://www.w3schools.com");',
        'w2 = window.new("http://www.w3schools.com");',
      ],
      realAnswer: 'w2 = window.open("http://www.w3schools.com");',
      userAnswer: "",
    },
    {
      question: "JavaScript is the same as Java.",
      answerOptions: ["True", "False"],
      realAnswer: "False",
      userAnswer: "",
    },
    {
      question: "How can you detect the client's browser name?",
      answerOptions: ["navigator.appName", "client.navName", "browser.name"],
      realAnswer: "navigator.appName",
      userAnswer: "",
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      answerOptions: ["onclick", "onchange", "onmouseover", "onmouseclick"],
      realAnswer: "onclick",
      userAnswer: "",
    },
    {
      question: "How do you declare a JavaScript variable?",
      answerOptions: ["variable carName;", "var carName;", "V carName;"],
      realAnswer: "var carName;",
      userAnswer: "",
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      answerOptions: ["-", "X", "=", "*"],
      realAnswer: "=",
      userAnswer: "",
    },
    {
      question: "What will the following code return: Boolean(10 > 9)",
      answerOptions: ["NaN", "True", "False"],
      realAnswer: "True",
      userAnswer: "",
    },
    {
      question: "JavaScript is case-sensitive.",
      answerOptions: ["True", "False"],
      realAnswer: "True",
      userAnswer: "",
    },
  ];

  return qList;
}
