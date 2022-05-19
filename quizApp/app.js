"use strict";

// import questions from "./questions.js";

const questionsForGame = [
  {
    question:
      "Who is the current president of the federal republic and sovereign states of the west African country Nigeria?",
    options: ["Sanwo Olu", "Buhari", "Goodluck Ebele Jonathan", "Tinubu"],
  },

  {
    question: "Who is the current governor of Lagos?",
    options: ["Buhari", "Sanwo Olu", "Goodluck Ebele Jonathan", "Tinubu"],
  },

  {
    question: "Which of these was a former governor of Lagos",
    options: ["Sanwo Olu", "Tinubu", "Buhari", "Goodluck Ebele Jonathan"],
  },

  {
    question: "Which of these politicians was a former president?",
    options: ["Sanwo Olu", "Goodluck Ebele Jonathan", "Buhari", "Tinubu"],
  },
];

const cashToWin = [
  "0",
  "5,000",
  "7,500",
  "10,000",
  "15,000",
  "20,000",
  "50,000",
];
const startButton = document.querySelector(".gameStart");
const dropCloseBtn = document.querySelector(".dropbtn");
const dropIcons = document.querySelectorAll(".drop");
const lifeLinesBox = document.querySelector(".dropdown-lifelines");
const lifeLines = document.querySelectorAll(".lifeline");
const overlay = document.querySelector(".overlay");
const questionEL = document.querySelector(".question");
const allOptionTextEl = document.querySelectorAll(".op");
const allOptionButtonEl = document.querySelectorAll(".option");
const questionNumber = document.querySelector(".questionNo");
const cashWon = document.querySelector(".money");

const qnA = [...questionsForGame];
let currentSelection;
let randomIndex;

function listenerToggle(domEl, removeOrAdd, funcName) {
  if (removeOrAdd == "add") {
    domEl.addEventListener("click", funcName);
  } else if (removeOrAdd == "remove") {
    domEl.removeEventListener("click", funcName);
  }
}

const lifelineToggle = function () {
  dropIcons[0].classList.toggle("hidden");
  dropIcons[1].classList.toggle("hidden");
  lifeLinesBox.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  console.log("baba");
};

function lifeLineUsed() {
  this.classList.add("used");
  lifelineToggle();
  this.removeEventListener("click", lifeLineUsed);
}

// dropCloseBtn.addEventListener("click", () => {
//   lifelineToggle();

//   // lifeLinesBox.style.display = dropIcons[0].classList.contains("hidden")
//   //   ? "block"
//   //   : "none";
// });

const hasWon = function (win = true) {
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "remove", checker);

    if (win) {
      questionNumber.textContent = `YOU WON ${
        document.querySelector(".cash").textContent
      }!!🥇🎉`;
    } else {
      questionNumber.textContent = `YOU LOST`;
    }
  }
};

function renderQ(selection, gameplay = true) {
  if (selection && selection.question && gameplay) {
    cashWon.textContent = cashToWin[Number(questionNumber.textContent)];
    questionNumber.textContent = `${Number(questionNumber.textContent) + 1}`;
    questionNumber.classList.remove("hidden");
    questionEL.textContent = selection.question;

    const options = [...selection.options];
    for (const x of allOptionTextEl) {
      const randomIndex = Math.trunc(Math.random() * options.length);
      x.textContent = options[randomIndex];
      // console.log(x.parentElement);
      x.parentElement.style.backgroundColor = "";
      options.splice(randomIndex, 1);
      //   console.log(index, optionCopy);
    }
  } else {
    if (!(selection && selection.question)) {
      hasWon();
    } else {
      console.log("Uh oh");
    }
  }
}

// optionList.classList();

const nextQuestion = function () {
  randomIndex = Math.trunc(Math.random() * qnA.length);
  currentSelection = { ...qnA.splice(randomIndex, 1)[0] };

  return currentSelection;
};

function checker() {
  const ansPick = this.children.item(1).textContent;
  const randomFlash = Math.trunc(Math.random() * 4000);

  this.classList.add("flash");
  setTimeout(() => {
    console.log(randomFlash);
    this.classList.remove("flash");
    let correctOrNot = ansPick === currentSelection.options[1];
    this.style.backgroundColor = correctOrNot ? "green" : "red";

    if (correctOrNot) {
      setTimeout(() => {
        renderQ(nextQuestion(), correctOrNot);
      }, 1000);
    } else hasWon(false);
  }, randomFlash);
}

// const optionCopy = [...options];

function begin() {
  renderQ(nextQuestion());

  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "add", checker);
  }
  for (const lifeline of lifeLines) {
    listenerToggle(lifeline, "add", lifeLineUsed);
  }
  dropCloseBtn.addEventListener("click", lifelineToggle);
  console.log("done");
}

startButton.addEventListener("click", begin);
