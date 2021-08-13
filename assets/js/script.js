// make panels and other items universally accessible
let header = document.querySelector("header");
let openDisp = document.querySelector(".opening");
let quizDisp = document.querySelector(".quiz");
let endOfGameDisp = document.querySelector(".endGame");
let highScoreDisp = document.querySelector(".highScore");
let submitBtn = document.querySelector(".submit");

// timer variables - need accessed from multiple functions
let timeAllowed = 120; // this is in seconds
let timePenalty = 15; // this is in seconds
let timer;
let timeLeft;

// question variables
let questionList = makeQuestionArray();
let questionNum;
let correctCount;
let checkAnswer = (qNum) =>
  questionList[qNum].userAnswer === questionList[qNum].realAnswer;

// Highscore variables
let getHighScoreList = () =>
  JSON.parse(localStorage.getItem("highScores")) || [];
let score;
let hasBeenSubmitted; // prevent entering initials multiple items

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
      highScoreDisp.setAttribute("style", "display: flex");
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
  hasBeenSubmitted = false;

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

// this is called when the answer is submitted and will go back to the display answer
function displayNextQuestion(event) {
  // record the user's answer
  questionList[questionNum].userAnswer = event.target.textContent;

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

  let totalQsMsg = "";
  let timeRemainingMsg = "";
  score = Math.round((correctCount / questionList.length) * 100);

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
  document.querySelector("#totalQs").textContent = totalQsMsg;
  document.querySelector("#timeRemaining").textContent = timeRemainingMsg;

  document.querySelector("#gameOverStart").addEventListener("click", startQuiz);
  document
    .querySelector("#gameOverHighScore")
    .addEventListener("click", displayHighScores);

  // show the got high score section?
  dispGetHighScore();
}

function dispGetHighScore() {
  // check to see if high score
  let highScoreSection = document.querySelector("section.gotHighScore");
  let initialsInput = document.querySelector("#initials");
  let gotHighScore = false;
  let highScoreList = getHighScoreList();

  //is highscore??
  if (highScoreList.length < 10) {
    gotHighScore = true;
  } else {
    for (let i = 0; i < highScoreList.length; i++) {
      if (score > highScoreList[i].score) {
        gotHighScore = true;
        break; // found a highscore - get out.
      }
    }
  }

  console.log("open screen? ", gotHighScore);
  if (gotHighScore) {
    //get score
    highScoreSection.setAttribute("style", "display: flex");
    initialsInput.value = "";
    submitBtn.setAttribute("style", "display: block");

    document
      .querySelector(".submit")
      .addEventListener("click", recordHighScore);
    document
      .querySelector(".gotHighScore form")
      .addEventListener("submit", recordHighScore);
  }
}

function recordHighScore(event) {
  // console.log("record high score fn--submitted?", hasBeenSubmitted);
  event.preventDefault(); // stop screen refresh

  if (!hasBeenSubmitted) {
    hasBeenSubmitted = !hasBeenSubmitted;

    let highScoreList = getHighScoreList();
    let objScore = { initials: "", score: 0 };

    let initialsInput = document.querySelector("#initials");

    objScore.initials = initialsInput.value.trim();
    objScore.score = score;

    // add score to the beginning of the array, then sort the array to keep latest tie first
    highScoreList.unshift(objScore);
    //sort array (array.sort() or for loop that compares i to i+1 and swap if needed)
    highScoreList.sort(function (a, b) {
      return b.score - a.score;
    });

    // keep only the top 10
    if (highScoreList.length > 10) {
      highScoreList.length = 10;
    }

    //display high score section to get initials
    localStorage.setItem("highScores", JSON.stringify(highScoreList));
    // remove button so it can't be submitted a second time.
    submitBtn.setAttribute("style", "display: none");
  }
}

function displayHighScores() {
  showScreen("HighScore");

  //show highscore list
  let highScoreList = getHighScoreList();
  let tblHighScoreList = document.querySelector("#tblHighScoreList");

  // add header
  tblHighScoreList.innerHTML = "<tr><th>Initials</th><th>Score</th></tr>";

  // ensure there is at least 1 empty object
  if (highScoreList.length === 0) {
    highScoreList.push({ initials: " ", score: 0 });
  }

  console.log(highScoreList);
  // add the objects from highScoreList to the table
  for (let i = 0; i < highScoreList.length; i++) {
    let tr = document.createElement("tr");
    let tdInitials = document.createElement("td");
    let tdScore = document.createElement("td");

    tdInitials.textContent = highScoreList[i].initials;
    tdScore.textContent = highScoreList[i].score;

    tr.appendChild(tdInitials);
    tr.appendChild(tdScore);
    tblHighScoreList.appendChild(tr);
  }

  document
    .querySelector("#highScoreStart")
    .addEventListener("click", startQuiz);
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
        'document.getElement("p").innerHTML = "Hello World!";',
        'document.getElementById("demo").innerHTML = "Hello World!";',
        'document.getElementByName("p").innerHTML = "Hello World!";',
        '#demo.innerHTML = "Hello World!";',
      ],
      realAnswer: 'document.getElementById("demo").innerHTML = "Hello World!";',
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
        "Math.max(x, y)",
        "Math.ceil(x, y)",
        "ceil(x, y)",
      ],
      realAnswer: "Math.max(x, y)",
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
