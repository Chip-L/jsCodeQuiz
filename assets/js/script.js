// This is the opening display panel
let openDisp = document.querySelector(".openingPanel");
let startBtn = document.querySelector(".startButton");

startBtn.addEventListener("click", function () {
  openDisp.setAttribute("style", "display: none;");
});
