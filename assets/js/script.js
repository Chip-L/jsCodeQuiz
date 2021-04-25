let JS_Obj =
  '{[{"question": "Inside which HTML element do we put the JavaScript?","answerOptions": ["<javascript>", "<script>", "<scripting>", "<js>"],"realAnswer": "<script>"},{"question": "What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id = "demo">This is a demonstration.</p>","answerOptions": ["documentgetElement("p").innerHTML = "Hello World!"; ","document.getElementByld("demo").innerHTML = "Hello World!"; ","document.getElementByName("p").innerHTML = "Hello World!";","#demo.innerHTML = "Hello World!";"],"realAnswer": "document.getElementByld("demo").innerHTML = "Hello World!"; "},{"question": "Where is the correct place to insert a JavaScript?","answerOptions": ["The <body> section ","The <head> section","Both the <head> section and the <body> section are correct"],"realAnswer": "Both the <head> section and the <body> section are correct"},{"question": "What is the correct syntax for referring to an external script called "xxx.js"?","answerOptions": ["<script src="xxx.js">","<script href= "xxx.js">","<script name="xxx.js">"],"realAnswer": "<script src="xxx.js">"},{"question": "The external JavaScript file must contain the <script> tag.","answerOptions": ["True", "False"],"realAnswer": "False"},{"question": "How do you write "Hello World" in an alert box?","answerOptions": ["alert("Hello World");","msg("Hello World"); ","alertBox("Hello World");","msgBox("Hello World");"],"realAnswer": "alert("Hello World");"},{"question": "How do you create a function in JavaScript?","answerOptions": ["function myFunction()","function = myFunction()","function:myFunction()"],"realAnswer": "function myFunction()"},{"question": "How do you call a function named "myFunction"?","answerOptions": ["call myFunction()","call function myFunction()","myFunction()"],"realAnswer": "myFunction()"},{"question": "How to write an IF statement in JavaScript?","answerOptions": ["if (i == 5) ","if i = 5 then","if i == 5 then","if i = 5"],"realAnswer": "if (i == 5) "},{"question": "How to write an IF statement for executing some code if "i" is NOT equal to 5?","answerOptions": ["if (i != 5) ","if i <> 5","if i =! 5 then","if (i <> 5)"],"realAnswer": "if (i != 5) "},{"question": "How does a WHILE loop start?","answerOptions": ["while (i <= 10; i++) ","while i = 1 to 10 ","while (i <= 10)"],"realAnswer": "while (i <= 10)"},{"question": "How does a FOR loop start?","answerOptions": ["for (i <= 5; i++) ","for i = 1 to 5","for (i = 0; i <= 5)","for (i = 0; i <= 5; i++)"],"realAnswer": "for (i = 0; i <= 5; i++)"},{"question": "How can you add a comment in a JavaScript?","answerOptions": ["\'This is a comment ","<!—This is a comment— > ","//This is a comment"],"realAnswer": "//This is a comment"},{"question": "How to insert a comment that has more than one line?","answerOptions": ["<!—This comment has\nmore than one line—>","/*This comment has\nmore than one line*/","//This comment has\nmore than one line//"],"realAnswer": "/*This comment has\nmore than one line*/"},{"question": "What is the correct way to write a JavaScript array?","answerOptions": ["var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")","var colors = ["red", "green", "blue"] ","var colors = "red", "green", "blue"","var colors = (1:"red", 2:"green", 3:"blue")"],"realAnswer": "var colors = ["red", "green", "blue"] "},{"question": "How do you round the number 7.25, to the nearest integer?","answerOptions": ["Math.rnd(7.25)","Math.round(7.25)","rnd(7.25)","round(7.25)"],"realAnswer": "Math.round(7.25)"},{"question": "How do you find the number with the highest value of x and y?","answerOptions": ["top(x, y) ","Math.max(xf y) ","Math.ceilfx, y) ","ceil(x, y)"],"realAnswer": "Math.max(xf y) "},{"question": "What is the correct JavaScript syntax for opening a new window called "w2" ?","answerOptions": ["w2 = window.open("http://www.w3schools.com"); ","w2 = window.new("http://www.w3schools.com");"],"realAnswer": "w2 = window.open("http://www.w3schools.com"); "},{"question": "JavaScript is the same as Java.","answerOptions": ["True", "False"],"realAnswer": "False"},{"question": "How can you detect the client\'s browser name?","answerOptions": ["navigator.appName", "client.navName", "browser.name"],"realAnswer": "navigator.appName"},{"question": "Which event occurs when the user clicks on an HTML element?","answerOptions": ["onclick", "onchange", "onmouseover", "onmouseclick"],"realAnswer": "onclick"},{"question": "How do you declare a JavaScript variable?","answerOptions": ["variable carName; ", "var carName;", "V carName;"],"realAnswer": "var carName;"},{"question": "Which operator is used to assign a value to a variable?","answerOptions": ["-", "X", "=", "*"],"realAnswer": "="},{"question": "What will the following code return: Boolean(10 > 9)","answerOptions": ["NaN", "True", "False"],"realAnswer": "True"},{"question": "JavaScript is case-sensitive.","answerOptions": ["True", "False"],"realAnswer": "True"}]}';

// This is the opening display panel
let openDisp = document.querySelector(".opening");
let startBtn = document.querySelector(".start");
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
  setTime();

  // start for loop
  displayQuestion(
    questionNum,
    "This is the question's text\nand this is the second line."
  );
  //end for loop

  // displayGameOver(false); <-- resting counter... don't turn on until ready to actually call
  //function of site has been passed to displayGameOver()
}

function displayGameOver(outOfTime) {
  clearInterval(timer);
  // quizDisp.setAttribute("style","display: none");
}

function setTime() {
  // call a function to be executed every 1000 milliseconds
  timer = setInterval(function () {
    timeLeft--;
    console.log("setTime");

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
  // console.log("displayTimer");
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
  //   submitBtn.addEventListener("click", submitHighscore);
  // }
}
