// This is the opening display panel
let openDisp = document.querySelector(".openingPanel");
let startBtn = document.querySelector(".startButton");
let main = document.querySelector("main");
let header = document.querySelector("header");
let quizDisp = document.querySelector(".quizPanel");
let questionDisp = document.querySelector(".question");
let answersDisp = document.querySelector("answers");

startBtn.addEventListener("click", function () {
  openDisp.setAttribute("style", "display: none");
  main.setAttribute("style", "margin-top: none");
  header.setAttribute("style", "display: flex");
  quizDisp.setAttribute("style", "display: block");
});
